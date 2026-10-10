import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, Eye, ArrowLeft, Bot } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import profileImage from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHideFounderCredit } from "@/lib/blog";
import { LanguageToggle } from "@/components/LanguageToggle";
import { BLOG_ORIGIN, Post, aiScore, formatDate, isBlogHost, postPath, readingMinutes } from "@/lib/blog";

export const useLivePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as Post[];
    },
  });

export const PostCard = ({ post }: { post: Post }) => {
  const { lang } = useLanguage();
  return (
    <Link
      to={postPath(post.slug)}
      className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:border-primary/60 transition-colors"
    >
      <div className="aspect-[16/9] bg-muted overflow-hidden">
        {post.cover_url ? (
          <img src={post.cover_url} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary text-xs">~/blog/{post.slug}</div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h2 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground pt-2 border-t border-border/60">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.published_at, lang)}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingMinutes(post.content)} min</span>
          <span
            className="flex items-center gap-1"
            title={lang === "it" ? "Quanto sembra scritto da un'AI (per scherzo)" : "How AI-written this looks (just for fun)"}
          >
            <Bot className="w-3 h-3" />{aiScore(post.content)}%
          </span>
          <span className="flex items-center gap-1 ml-auto"><Eye className="w-3 h-3" />{post.view_count}</span>
        </div>
      </div>
    </Link>
  );
};

const Blog = () => {
  useHideFounderCredit();

  const { lang } = useLanguage();
  const { data: posts, isLoading } = useLivePosts();
  const fullText = lang === "it" ? "Senza filtri." : "Unfiltered.";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      if (++i > fullText.length) clearInterval(t);
    }, 100);
    return () => clearInterval(t);
  }, [fullText]);

  const intro =
    lang === "it"
      ? "Qui dico quello che penso davvero su tech e AI, senza filtri. Opinioni, esperimenti, cose che ho costruito e cose che secondo me il settore sta sbagliando."
      : "This is where I say what I actually think about tech & AI — no filters, no corporate polish. Opinions, experiments, things I've built, and things I think the industry is getting wrong.";

  const canonical = isBlogHost() ? `${BLOG_ORIGIN}/` : `${BLOG_ORIGIN}/`;

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Unfiltered — Michele F. Matozza's blog on tech & AI</title>
        <meta name="description" content="Michele F. Matozza's unfiltered thoughts on tech, AI, startups and building products." />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Unfiltered — Michele F. Matozza's blog" />
        <meta property="og:description" content="Unfiltered thoughts on tech, AI, startups and building products." />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <div className="fixed top-4 right-4 z-50 bg-navbar backdrop-blur-md rounded-full px-2 py-1 border border-border/50">
        <LanguageToggle />
      </div>

      <main>
        <section className="flex items-center justify-center px-6 pt-16 pb-8">
          <div className="max-w-3xl w-full">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1 max-w-md">
                <a href={isBlogHost() ? "https://michelematozza.com" : "/"} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-4">
                  <ArrowLeft className="w-3 h-3" /> michelematozza.com
                </a>
                <div className="mb-4 animate-fade-in">
                  <span className="text-primary text-xs">~/blog $</span>
                  <h1 className="text-3xl md:text-4xl font-bold mt-1">
                    {displayText}
                    <span className="animate-pulse text-primary">_</span>
                  </h1>
                </div>
                <p className="text-xs text-primary mb-3">{lang === "it" ? "Tech · AI · Startup — pensieri di Michele" : "Tech · AI · Startups — thoughts by Michele"}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{intro}</p>
                <p className="fx-glow text-xs mt-3" style={{ animationDelay: "0.15s" }}>
                  {lang === "it" ? "Nessuna frase è stata scritta con l'AI." : "No AI has been used to write any sentence."}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {lang === "it"
                    ? "La percentuale AI sui post? È il mio modo di controllare quanto sto diventando simile a un'AI."
                    : "The AI detector % on each post? That's just me checking how much I'm becoming like an AI."}
                </p>
              </div>
              <img src={profileImage} alt="Michele F. Matozza" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-border flex-shrink-0" />
            </div>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold mb-6"><span className="text-primary">#</span> {lang === "it" ? "Articoli" : "Posts"}</h2>
            {isLoading ? (
              <p className="text-xs text-muted-foreground">loading…</p>
            ) : !posts?.length ? (
              <p className="text-xs text-muted-foreground">{lang === "it" ? "Il primo articolo arriva presto." : "First post coming soon."}</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((p) => <PostCard key={p.id} post={p} />)}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
