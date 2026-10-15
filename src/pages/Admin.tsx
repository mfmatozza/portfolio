import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Plus, Trash2, LogOut, ImagePlus, Save, Send, CalendarClock, FileText, ExternalLink } from "lucide-react";
import { PatternLock } from "@/components/blog/PatternLock";
import { BlogEditor } from "@/components/blog/BlogEditor";
import { Post, adminCall, getAdminToken, postPath, postState, setAdminToken, slugify, uploadImage, formatDate } from "@/lib/blog";
import { cn } from "@/lib/utils";

type Draft = Partial<Post> & { title: string; slug: string; excerpt: string; content: string };
const empty = (): Draft => ({ title: "", slug: "", excerpt: "", content: "", cover_url: null, status: "draft", published_at: null });

const toLocalInput = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
};

const Admin = () => {
  const [authed, setAuthed] = useState(!!getAdminToken());
  const [lockError, setLockError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Draft>(empty());
  const [slugTouched, setSlugTouched] = useState(false);
  const [schedule, setSchedule] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    try {
      const { posts } = await adminCall<{ posts: Post[] }>("list");
      setPosts(posts);
    } catch (e: any) {
      if (!getAdminToken()) setAuthed(false);
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (authed) load();
  }, [authed]);

  const login = async (pattern: string) => {
    try {
      const { token } = await adminCall<{ token: string }>("login", { pattern });
      setAdminToken(token);
      setAuthed(true);
    } catch {
      setLockError(true);
      setTimeout(() => setLockError(false), 600);
    }
  };

  const select = (p: Post) => {
    setDraft(p);
    setSlugTouched(true);
    setSchedule(postState(p) === "scheduled" ? toLocalInput(p.published_at) : "");
  };

  const save = async (mode: "draft" | "publish" | "schedule") => {
    if (!draft.title.trim()) return toast.error("Add a title first");
    const slug = draft.slug || slugify(draft.title);
    if (!slug) return toast.error("Add a valid slug");
    let status = "draft";
    let published_at: string | null = draft.published_at ?? null;
    if (mode === "publish") {
      status = "published";
      if (!published_at || new Date(published_at) > new Date()) published_at = new Date().toISOString();
    } else if (mode === "schedule") {
      if (!schedule) return toast.error("Pick a date & time");
      const d = new Date(schedule);
      if (d <= new Date()) return toast.error("Schedule date must be in the future");
      status = "published";
      published_at = d.toISOString();
    } else {
      status = "draft";
      published_at = null;
    }
    setBusy(true);
    try {
      const { post } = await adminCall<{ post: Post }>("save", {
        post: {
          id: draft.id,
          slug,
          title: draft.title,
          excerpt: draft.excerpt,
          cover_url: draft.cover_url ?? null,
          content: draft.content,
          status,
          published_at,
          ai_score: draft.ai_score ?? null,
        },
      });
      setDraft(post);
      toast.success(mode === "draft" ? "Draft saved" : mode === "publish" ? "Published — live on the blog" : `Scheduled for ${new Date(published_at!).toLocaleString()}`);
      load();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!draft.id || !confirm("Delete this post forever?")) return;
    await adminCall("delete", { id: draft.id });
    setDraft(empty());
    load();
    toast.success("Deleted");
  };

  const onCover = async (f?: File) => {
    if (!f) return;
    try {
      toast.loading("Uploading cover…", { id: "cover" });
      const url = await uploadImage(f);
      setDraft((d) => ({ ...d, cover_url: url }));
      toast.success("Cover uploaded", { id: "cover" });
    } catch (e: any) {
      toast.error(e.message, { id: "cover" });
    }
  };

  if (!authed)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <Helmet><title>Admin</title><meta name="robots" content="noindex, nofollow" /></Helmet>
        <span className="text-primary text-xs">~/admin $ unlock</span>
        <PatternLock onComplete={login} error={lockError} />
        <span className="text-[11px] text-muted-foreground">draw the pattern</span>
      </div>
    );

  const state = draft.id ? postState(draft as Post) : "new";
  const input = "w-full bg-card border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-primary";

  return (
    <div className="min-h-screen px-4 py-8">
      <Helmet><title>Admin — Blog</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-primary text-xs">~/admin/posts</span>
            <button onClick={() => { setAdminToken(null); setAuthed(false); }} className="text-muted-foreground hover:text-primary" aria-label="Lock">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => { setDraft(empty()); setSlugTouched(false); setSchedule(""); }} className="w-full flex items-center justify-center gap-2 border border-dashed border-border rounded-md py-2 text-xs hover:border-primary hover:text-primary">
            <Plus className="w-3.5 h-3.5" /> New post
          </button>
          <ul className="space-y-1.5">
            {posts.map((p) => {
              const s = postState(p);
              return (
                <li key={p.id}>
                  <button onClick={() => select(p)} className={cn("w-full text-left rounded-md px-3 py-2 border border-transparent hover:bg-card", draft.id === p.id && "border-border bg-card")}>
                    <div className="text-xs font-medium truncate">{p.title || "(untitled)"}</div>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground mt-0.5">
                      <span className={cn("uppercase", s === "live" && "text-primary", s === "scheduled" && "text-accent")}>{s}</span>
                      {p.published_at && <span>{formatDate(p.published_at)}</span>}
                      <span className="ml-auto">{p.view_count} reads</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="space-y-4 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted-foreground">status:</span>
            <span className="uppercase text-primary">{state}</span>
            {state === "live" && (
              <a href={postPath(draft.slug)} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                view <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {draft.id && <button onClick={remove} className="ml-auto flex items-center gap-1 text-destructive"><Trash2 className="w-3.5 h-3.5" /> delete</button>}
          </div>

          <input className={cn(input, "text-xl font-bold")} placeholder="Title" value={draft.title}
            onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value, slug: slugTouched ? d.slug : slugify(e.target.value) }))} />
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground shrink-0">/blog/</span>
            <input className={input} placeholder="url-slug" value={draft.slug}
              onChange={(e) => { setSlugTouched(true); setDraft((d) => ({ ...d, slug: slugify(e.target.value) })); }} />
          </div>
          <textarea className={cn(input, "min-h-[70px]")} maxLength={300} placeholder="Short excerpt shown on the card and in link previews" value={draft.excerpt}
            onChange={(e) => setDraft((d) => ({ ...d, excerpt: e.target.value }))} />
          <input className={input} type="number" min={0} max={100} placeholder="GPTZero AI % (0-100, leave empty to hide)"
            value={draft.ai_score ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setDraft((d) => ({ ...d, ai_score: v === "" ? null : Math.max(0, Math.min(100, Math.round(Number(v)))) }));
            }} />

          <label className="block cursor-pointer">
            <div className="aspect-[16/6] rounded-lg border border-dashed border-border overflow-hidden flex items-center justify-center bg-card hover:border-primary">
              {draft.cover_url ? <img src={draft.cover_url} alt="cover" className="w-full h-full object-cover" /> : (
                <span className="flex items-center gap-2 text-xs text-muted-foreground"><ImagePlus className="w-4 h-4" /> Upload cover image</span>
              )}
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => { onCover(e.target.files?.[0]); e.target.value = ""; }} />
          </label>

          <BlogEditor value={draft.content} onChange={(content) => setDraft((d) => ({ ...d, content }))} />

          <div className="flex flex-wrap items-center gap-2 sticky bottom-0 bg-background/90 backdrop-blur py-3 border-t border-border">
            <button disabled={busy} onClick={() => save("draft")} className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-border text-xs hover:border-primary">
              <Save className="w-3.5 h-3.5" /> Save draft
            </button>
            <div className="flex items-center gap-1.5">
              <input type="datetime-local" value={schedule} onChange={(e) => setSchedule(e.target.value)} className="bg-card border border-border rounded-md px-2 py-1.5 text-xs" />
              <button disabled={busy} onClick={() => save("schedule")} className="flex items-center gap-1.5 px-3 py-2 rounded-md border border-border text-xs hover:border-primary">
                <CalendarClock className="w-3.5 h-3.5" /> Schedule
              </button>
            </div>
            <button disabled={busy} onClick={() => save("publish")} className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90">
              <Send className="w-3.5 h-3.5" /> {state === "live" ? "Update" : "Publish now"}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground flex items-center gap-1"><FileText className="w-3 h-3" /> Tip: paste text from anywhere straight into the editor. Select words, then pick an effect or add a link.</p>
        </section>
      </div>
    </div>
  );
};

export default Admin;
