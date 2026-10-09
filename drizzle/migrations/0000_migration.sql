CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  excerpt text NOT NULL DEFAULT '',
  cover_url text,
  content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft',
  published_at timestamptz,
  view_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.posts TO anon, authenticated;
GRANT ALL ON public.posts TO service_role;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read live posts" ON public.posts FOR SELECT TO anon, authenticated
USING (status = 'published' AND published_at IS NOT NULL AND published_at <= now());

CREATE OR REPLACE FUNCTION public.increment_post_view(_slug text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.posts SET view_count = view_count + 1
  WHERE slug = _slug AND status = 'published' AND published_at <= now();
$$;
GRANT EXECUTE ON FUNCTION public.increment_post_view(text) TO anon, authenticated;

CREATE POLICY "Public read blog images" ON storage.objects FOR SELECT USING (bucket_id = 'blog-images');