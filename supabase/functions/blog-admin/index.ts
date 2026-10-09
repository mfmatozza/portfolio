import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const PATTERN_HASH = "1deb5e04fa0302b97179b11030162683738cd44f8fef520959c25b233d66ab48";
const SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(Deno.env.get("SUPABASE_URL")!, SECRET);
const enc = new TextEncoder();

const hex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
const sha256 = async (s: string) => hex(await crypto.subtle.digest("SHA-256", enc.encode(s)));
const hmac = async (s: string) => {
  const key = await crypto.subtle.importKey("raw", enc.encode(SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return hex(await crypto.subtle.sign("HMAC", key, enc.encode(s)));
};
const makeToken = async () => {
  const exp = Date.now() + 1000 * 60 * 60 * 12;
  return `${exp}.${await hmac(`admin:${exp}`)}`;
};
const checkToken = async (t?: string) => {
  if (!t) return false;
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return sig === (await hmac(`admin:${exp}`));
};

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

const PostSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9-]+$/),
  title: z.string().max(300),
  excerpt: z.string().max(600),
  cover_url: z.string().max(2000).nullable().optional(),
  content: z.string().max(500000),
  status: z.enum(["draft", "published"]),
  published_at: z.string().nullable().optional(),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const body = await req.json();
    const action = body?.action;

    if (action === "login") {
      const pattern = typeof body.pattern === "string" ? body.pattern.slice(0, 100) : "";
      await new Promise((r) => setTimeout(r, 400));
      if ((await sha256(pattern)) !== PATTERN_HASH) return json({ error: "Wrong pattern" }, 401);
      return json({ token: await makeToken() });
    }

    if (!(await checkToken(body?.token))) return json({ error: "Unauthorized" }, 401);

    if (action === "list") {
      const { data, error } = await supabase.from("posts").select("*").order("updated_at", { ascending: false });
      if (error) throw error;
      return json({ posts: data });
    }

    if (action === "save") {
      const parsed = PostSchema.safeParse(body.post);
      if (!parsed.success) return json({ error: parsed.error.flatten().fieldErrors }, 400);
      const p = parsed.data;
      const row = { ...p, updated_at: new Date().toISOString(), published_at: p.published_at ?? (p.status === "published" ? new Date().toISOString() : null) };
      const q = p.id
        ? supabase.from("posts").update(row).eq("id", p.id).select().single()
        : supabase.from("posts").insert(row).select().single();
      const { data, error } = await q;
      if (error) return json({ error: error.message }, 400);
      return json({ post: data });
    }

    if (action === "delete") {
      const id = z.string().uuid().parse(body.id);
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "upload-url") {
      const ext = String(body.ext || "jpg").replace(/[^a-z0-9]/gi, "").slice(0, 5) || "jpg";
      const path = `${crypto.randomUUID()}.${ext}`;
      const { data, error } = await supabase.storage.from("blog-images").createSignedUploadUrl(path);
      if (error) throw error;
      return json({ path, token: data.token });
    }

    if (action === "sign") {
      const path = z.string().regex(/^[a-z0-9-]+\.[a-z0-9]+$/i).parse(body.path);
      const { data, error } = await supabase.storage.from("blog-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (error) throw error;
      return json({ url: data.signedUrl });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "Server error" }, 500);
  }
});
