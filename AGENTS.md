# AGENTS.md

- Blog admin writes go only through the `blog-admin` edge function (pattern-unlock token, service role); the `posts` table is public read-only for live posts — keeps the admin secret off the client.
- Routing switches on hostname: `blog.*` serves the blog at `/`, the main domain serves it at `/blog` — one app serves both domains.
- Blog images live in a private bucket and are referenced by long-lived signed URLs — workspace blocks public buckets.
- Blog text-effect CSS (`.fx-*`) lives outside Tailwind `@layer` — classes are generated dynamically and would be purged.
