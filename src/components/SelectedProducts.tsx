import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import lanesShot from "@/assets/products/lanes.jpg";
import whatswrappedShot from "@/assets/products/whatswrapped.jpg";
import clauseopsShot from "@/assets/products/clauseops.jpg";

export const SelectedProducts = () => {
  const { lang } = useLanguage();
  const it = lang === "it";

  const products = [
    {
      name: "Lanes",
      url: "https://trylanes.app",
      image: lanesShot,
      status: it ? "Beta pubblica · in sviluppo attivo" : "Public beta · actively building",
      purpose: it
        ? "Livello di coordinamento per coding agent: mostra cosa fa l'agent di ogni collega, mette in coda le modifiche allo stesso file e dice a ogni agent cosa stanno cambiando gli altri."
        : "A coordination layer for coding agents: shows what every teammate's agent is doing, queues edits to the same file, and tells each agent what the others are changing.",
      outcome: it ? "Contattato da diversi VC per colloqui" : "Approached by several VCs for interviews",
    },
    {
      name: "WhatsWrapped",
      url: "https://whatswrapped.io",
      image: whatswrappedShot,
      status: it ? "Live" : "Live",
      purpose: it
        ? "Trasforma una chat WhatsApp esportata in un recap condivisibile su come parlate davvero, elaborato interamente nel browser."
        : "Turns an exported WhatsApp chat into a shareable recap of how you actually talk, parsed entirely in the browser.",
      outcome: it ? "Oltre 200 utenti nei primi 3 giorni dal lancio" : "200+ users in the first 3 days after launch",
    },
    {
      name: "ClauseOps",
      url: "https://clauseops.com",
      image: clauseopsShot,
      status: it ? "Live" : "Live",
      purpose: it
        ? "Estrae con l'AI gli obblighi tecnici dai contratti aziendali e li verifica continuamente sull'infrastruttura live (AWS, GitHub, Vercel e altre)."
        : "Uses AI to extract enforceable technical obligations from enterprise contracts and continuously checks them against live infrastructure (AWS, GitHub, Vercel and more).",
      outcome: it
        ? "Selezionato tra lo 0,1% delle startup candidate a Prompt a Startup"
        : "Selected in the top 0.1% of startups submitted to Prompt a Startup",
    },
  ];

  return (
    <section id="products" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">{it ? "Prodotti Selezionati" : "Selected Products"}</h2>
        <div className="space-y-6">
          {products.map((p, i) => (
            <article
              key={p.name}
              className="grid md:grid-cols-[260px_1fr] gap-5 p-4 rounded-lg border border-border bg-card animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <a href={p.url} target="_blank" rel="dofollow" className="block overflow-hidden rounded-md border border-border">
                <img
                  src={p.image}
                  alt={`${p.name} ${it ? "schermata" : "screenshot"}`}
                  loading="lazy"
                  className="w-full aspect-[16/10] object-cover object-top hover:scale-[1.02] transition-transform"
                />
              </a>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <a href={p.url} target="_blank" rel="dofollow" className="text-base font-bold hover:text-primary flex items-center gap-1.5">
                    {p.name} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/40 text-primary whitespace-nowrap">
                    {p.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.purpose}</p>
                <dl className="text-xs space-y-1 mt-auto">
                  <div className="flex gap-2">
                    <dt className="text-primary whitespace-nowrap shrink-0">▸ {it ? "Ruolo:" : "Role:"}</dt>
                    <dd className="text-muted-foreground">{it ? "Fondatore & sviluppatore" : "Founder & developer"}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-primary whitespace-nowrap shrink-0">▸ {it ? "Risultato:" : "Outcome:"}</dt>
                    <dd className="text-foreground font-medium">{p.outcome}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
        <Link
          to="/projects"
          className="mt-6 w-full flex items-center justify-between gap-2 px-4 py-2 rounded-lg border border-border bg-card text-xs font-medium hover:border-primary/50 hover:text-primary transition-colors"
        >
          <span>{it ? "Vedi tutti i progetti" : "View all projects"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};
