import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_url: string | null;
  content: string;
  status: string;
  published_at: string | null;
  view_count: number;
  created_at: string;
  updated_at: string;
};

export const isBlogHost = () =>
  typeof window !== "undefined" && window.location.hostname.startsWith("blog.");

export const blogHome = () => (isBlogHost() ? "/" : "/blog");
export const postPath = (slug: string) => (isBlogHost() ? `/${slug}` : `/blog/${slug}`);
export const BLOG_ORIGIN = "https://blog.michelematozza.com";

/** Hide the static "founder @" credit while on a blog page (restored on unmount). */
export function useHideFounderCredit(): void {
  useEffect(() => {
    const el = document.getElementById("founder-credit");
    if (!el) return;
    const prev = el.style.display;
    el.style.display = "none";
    return () => {
      el.style.display = prev;
    };
  }, []);
}

/** Link used on the portfolio to reach the blog. */
export const blogLink = () =>
  typeof window !== "undefined" && window.location.hostname.endsWith("michelematozza.com")
    ? BLOG_ORIGIN
    : "/blog";

export const readingMinutes = (html: string) => {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

export const formatDate = (iso: string | null, lang: "en" | "it" = "en") =>
  iso
    ? new Date(iso).toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);

export const postState = (p: Pick<Post, "status" | "published_at">) => {
  if (p.status !== "published") return "draft";
  if (p.published_at && new Date(p.published_at) > new Date()) return "scheduled";
  return "live";
};

const TOKEN_KEY = "blog-admin-token";
export const getAdminToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setAdminToken = (t: string | null) =>
  t ? sessionStorage.setItem(TOKEN_KEY, t) : sessionStorage.removeItem(TOKEN_KEY);

export async function adminCall<T = any>(action: string, payload: Record<string, unknown> = {}): Promise<T> {
  const { data, error } = await supabase.functions.invoke("blog-admin", {
    body: { action, token: getAdminToken(), ...payload },
  });
  if (error) {
    let msg = error.message;
    try {
      const ctx = await (error as any).context?.json?.();
      if (ctx?.error) msg = typeof ctx.error === "string" ? ctx.error : JSON.stringify(ctx.error);
      if ((error as any).context?.status === 401 && action !== "login") setAdminToken(null);
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return data as T;
}

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const { path, token } = await adminCall<{ path: string; token: string }>("upload-url", { ext });
  const { error } = await supabase.storage.from("blog-images").uploadToSignedUrl(path, token, file);
  if (error) throw error;
  const { url } = await adminCall<{ url: string }>("sign", { path });
  return url;
}
