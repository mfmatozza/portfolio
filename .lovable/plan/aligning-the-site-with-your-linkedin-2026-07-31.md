# Aligning the site with your LinkedIn

LinkedIn blocks scraping, so this is based on the profile text you pasted. Here's what I'd change, in priority order.

## 1. Add the VivaTicket role (biggest gap)

Your current headline says "SWE Intern @ VivaTicket", but that role doesn't exist anywhere on the site. Add it as the first entry in Experience, with the skills you listed there (TypeScript, software infrastructure). I need from you: exact job title, city, start date (and whether it's ongoing), plus 2-3 bullets of what you actually do.

## 2. Rewrite the hero intro

The current paragraph is generic ("20-year-old university student with a strong interest in technology...") and undersells you. LinkedIn shows a much sharper story: Economics + CS at Bocconi, SWE intern, President of HackLab Bocconi, ex Lovable Campus Leader, hackathon winner, guest lecturer. Proposed direction:

> Economics & Computer Science at Bocconi. Software engineering intern at VivaTicket. President of HackLab Bocconi, ex Lovable Campus Leader, and a serial hackathon builder — I turn ideas into shipped products fast.

Plus a one-line tagline under the typed "Hi, I'm Michele" so the headline is scannable in 2 seconds.

## 3. Fix the "Ex Campus Leader @ Lovable" mismatch

The Extracurricular section still lists Lovable as "Jan 2025 - Present". LinkedIn says "Ex". Update the end date and title to match.

## 4. Add a Speaking / Talks section

Two of your top LinkedIn posts are talks — the vibecoding-in-marketing session for Prof. Marcello Mariani's Master's students at Università di Bologna, and the Idea Validation & MVPs session as HackLab President. Nothing on the site mentions this, and it's strong social proof. Small section with title, host, date, one line each.

## 6. Small consistency fixes

- Bocconi dates: site says 2024 - 2027, LinkedIn says Aug 2024 – Jun 2027.

## What I need from you before building

- VivaTicket details (title, dates, location, bullets)
- Lovable Campus Leader end date, July 2027
  &nbsp;

## Technical notes

All changes are content/presentation in existing components: `Hero.tsx`, `Experience.tsx`, `ExtracurricularActivities.tsx`, `Education.tsx`. New sections would be new components (`Talks.tsx`rendered from `Index.tsx`, added to `FloatingNav`, and fully bilingual via `useLanguage()` like every other section. The Person JSON-LD in `Index.tsx` gets `worksFor`, `knowsLanguage`, and `knowsAbout` added for SEO.