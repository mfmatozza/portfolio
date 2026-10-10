import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { ArrowLeft, Calendar, Check, Clock, Eye, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import profileImage from "@/assets/profile.jpg";
import { useHideFounderCredit } from "@/lib/blog";
import { useLanguage } from "@/contexts/LanguageContext";
import { BLOG_ORIGIN, Post, blogHome, formatDate, readingMinutes } from "@/lib/blog";
import NotFound from "./NotFound";

const BlogPost = () => {
  useHideFounderCredit();

  const [shared, setShared] = useState(false);

  const { slug = "" } = useParams();
  const { lang } = useLanguage();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).maybeSingle();
      if (error) throw error;
      return data as Post | null;
    },
  });

  useEffect(() => {
    if (!post) return;
    const key = `viewed:${post.slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    supabase.rpc("increment_post_view", { _slug: post.slug });
  }, [post]);

  const html = useMemo(
    () => (post ? DOMPurify.sanitize(post.content, { ADD_ATTR: ["target", "data-effect"] }) : ""),
    [post],
  );

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-xs text-muted-foreground">loading…</div>;
  if (!post) return <NotFound />;

  const url = `${BLOG_ORIGIN}/${post.slug}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text: post.excerpt || post.title, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      /* user dismissed the share sheet */
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_url || undefined,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    url,
    mainEntityOfPage: url,
    author: { "@type": "Person", name: "Michele Francesco Matozza", url: "https://michelematozza.com/" },
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{`${post.title} — Michele F. Matozza`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={url} />
        {post.cover_url && <meta property="og:image" content={post.cover_url} />}
        <meta property="article:published_time" content={post.published_at ?? ""} />
        <meta property="article:author" content="Michele Francesco Matozza" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.cover_url && <meta name="twitter:image" content={post.cover_url} />}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <main className="px-6 pt-12 pb-24">
        <article className="max-w-2xl mx-auto">
          <Link to={blogHome()} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft className="w-3 h-3" /> {lang === "it" ? "tutti gli articoli" : "all posts"}
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-sm text-muted-foreground leading-relaxed mb-6">{post.excerpt}</p>}
          <div className="flex items-center gap-3 mb-8 text-xs text-muted-foreground">
            <img src={profileImage} alt="" className="w-8 h-8 rounded-full object-cover border border-border" />
            <span className="text-foreground">Michele F. Matozza</span>
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.published_at, lang)}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{readingMinutes(post.content)} min</span>
            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.view_count}</span>
            <button
              onClick={handleShare}
              title={lang === "it" ? "Condividi" : "Share"}
              className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded border border-border text-xs text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              {shared ? <Check className="w-3 h-3 text-primary" /> : <Share2 className="w-3 h-3" />}
              {shared ? (lang === "it" ? "copiato" : "copied") : lang === "it" ? "condividi" : "share"}
            </button>
          </div>
          {post.cover_url && (
            <img src={post.cover_url} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-lg border border-border mb-10" />
          )}
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
