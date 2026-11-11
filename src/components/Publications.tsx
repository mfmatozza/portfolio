import { FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Publications = () => {
  const { lang } = useLanguage();
  const it = lang === "it";

  const publications = [
    {
      title: it ? "Campionamento MCMC per un Modello di Ising 2D" : "MCMC Sampling for a 2D Ising Model",
      role: it ? "Sviluppatore" : "Developer",
      period: it ? "Novembre 2025" : "November 2025",
      description: it
        ? "Implementazione di un campionatore Markov Chain Monte Carlo per il modello di Ising 2D, con ottimizzazione dell'algoritmo di Metropolis, rilevamento di cluster tramite BFS e analisi delle transizioni di fase alla temperatura critica."
        : "Implementation of a Markov Chain Monte Carlo sampler for the 2D Ising model, featuring Metropolis algorithm optimization, cluster detection via BFS, and analysis of phase transitions at critical temperature.",
      tags: it ? ["Python", "MCMC", "Fisica Computazionale"] : ["Python", "MCMC", "Computational Physics"],
      pdf: "/documents/mcmc-ising-model.pdf",
      collaborator: { name: "Luca Pirini", url: "https://piriniluca.com" },
    },
    {
      title: it
        ? "Breve Panoramica dei Sistemi di Crittografia a Chiave Pubblica"
        : "Brief Overview of Public-Key Encryption Systems",
      role: it ? "Autore" : "Author",
      period: it ? "Giugno 2024" : "June 2024",
      description: it
        ? "Saggio che esplora RSA e la Crittografia su Curve Ellittiche, analizzandone i fondamenti matematici, le vulnerabilità incluse le minacce del calcolo quantistico, e i vantaggi comparativi in termini di sicurezza."
        : "Essay exploring RSA and Elliptic Curve Cryptography, analyzing their mathematical foundations, vulnerabilities including quantum computing threats, and comparative security advantages.",
      tags: it ? ["Crittografia", "RSA", "ECC", "Matematica"] : ["Cryptography", "RSA", "ECC", "Mathematics"],
      pdf: "/documents/public-key-encryption.pdf",
    },
  ];

  return (
    <section id="publications" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">{it ? "Pubblicazioni" : "Publications"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {publications.map((publication, index) => (
            <article
              key={publication.pdf}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 animate-fade-in flex flex-col"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start gap-3 mb-1">
                <h3 className="text-base font-bold">{publication.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{publication.period}</span>
              </div>
              <p className="text-primary text-xs font-medium mb-2">{publication.role}</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{publication.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {publication.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-secondary rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              {publication.collaborator && (
                <p className="text-xs text-muted-foreground mb-3">
                  HM:{" "}
                  <a
                    href={publication.collaborator.url}
                    target="_blank"
                    rel="dofollow"
                    className="text-primary hover:underline"
                  >
                    {publication.collaborator.name}
                  </a>
                </p>
              )}
              <div className="mt-auto pt-2 border-t border-border">
                <a
                  href={publication.pdf}
                  target="_blank"
                  rel="dofollow"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{it ? "Vedi PDF" : "View PDF"}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
