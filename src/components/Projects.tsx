import { ExternalLink, Linkedin, FileText, Github, Trophy, Chrome } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Projects = () => {
  const { lang } = useLanguage();
  const it = lang === "it";

  const projects = [
    {
      title: "ClauseOps",
      role: it ? "Fondatore Solo & Sviluppatore" : "Solo founder & Developer",
      period: it ? "Marzo 2026" : "March 2026",
      description: it
        ? "Estrae obblighi tecnici applicabili dai contratti aziendali utilizzando l'AI, e li riconcilia continuamente con l'infrastruttura live su AWS, GitHub, Vercel e altre 15 piattaforme. Pensato per aziende B2B SaaS che devono dimostrare la conformità prima che lo facciano gli auditor."
        : "Extracts enforceable technical obligations from enterprise contracts using AI, then continuously reconciles them against live infrastructure across AWS, GitHub, Vercel, and 15 other platforms. Built for B2B SaaS companies that need to prove compliance before audits find it for them.",
      tags: it ? ["AI", "Compliance", "B2B SaaS"] : ["AI", "Compliance", "B2B SaaS"],
      links: { website: "https://clauseops.com" },
    },
    {
      title: "WindSite",
      role: it ? "Co-Fondatore & Sviluppatore" : "Co-Founder & Developer",
      period: it ? "Febbraio 2026" : "February 2026",
      description: it
        ? "Valutazione di fattibilità pre-permesso basata su AI per progetti di energia eolica offshore. Disegna zone, configura vincoli, esegui simulazioni e genera report, tutto in un'unica piattaforma. Sviluppato a HackEurope Dublin 2026."
        : "An AI-powered pre-permit feasibility assessment for offshore wind energy projects. Draw zones, configure constraints, run simulations, and generate reports, all in one platform. Developed at HackEurope Dublin 2026.",
      tags: ["Agentic AI", "ReactFlow.js", "RLMs"],
      links: {
        website: "https://windsite.cloud",
        github: "https://github.com/mfmatozza/WindSite",
        devpost: "https://devpost.com/software/windsite",
      },
      dofollow: true,
    },
    {
      title: "LinkeClean",
      role: it ? "Sviluppatore" : "Developer",
      period: it ? "Febbraio 2026" : "February 2026",
      description: it
        ? "Un'estensione Chrome che ti permette di filtrare tutto il rumore dal tuo feed LinkedIn così puoi concentrarti sui post che contano davvero."
        : "A Chrome extension that allows you to filter out all the noise from your LinkedIn feed so you can focus on posts that actually matter.",
      tags: it ? ["JavaScript", "HTML", "Estensione Chrome"] : ["JavaScript", "HTML", "Chrome Extension"],
      links: {
        website: "https://linkeclean.site",
        github: "https://github.com/mfmatozza/LinkeClean",
        chrome: "https://chromewebstore.google.com/detail/linkeclean-by-michele-mat/pbfcgonhbmpfjgbmpjfgbclcmngihadi",
      },
      dofollow: true,
    },
    {
      title: "Sideris",
      role: it ? "Co-Fondatore & Sviluppatore" : "Co-Founder & Developer",
      period: it ? "In Sviluppo" : "Work in Progress",
      description: it
        ? "Un marketplace tra brand e creator che mira ad abilitare un marketing digitale senza barriere. 3° posto in un hackathon lungo un semestre."
        : "A marketplace between brands and creators that aims to enable barrier-less digital marketing. 3rd place at a semester-long hackathon.",
      tags: it ? ["Marketplace", "Marketing Digitale", "Creator Economy"] : ["Marketplace", "Digital Marketing", "Creator Economy"],
      links: { website: "https://sideris.app" },
      collaborator: { name: "Riccardo Mazzarini", url: "https://heyimrick.com" },
      dofollow: true,
    },
    {
      title: "UniMarket",
      role: it ? "Co-Fondatore" : "Co-Founder",
      period: it ? "Feb 2025 - Presente" : "Feb 2025 - Present",
      description: it
        ? "Un marketplace interno costruito esclusivamente per gli studenti Bocconi. Compra, vendi e scambia qualsiasi cosa all'interno di una comunità universitaria di fiducia."
        : "An internal marketplace built exclusively for Bocconi students. Buy, sell, and trade anything within a trusted university community.",
      tags: it ? ["Marketplace", "E-commerce", "Piattaforma Studenti"] : ["Marketplace", "E-commerce", "Student Platform"],
      links: {
        website: "https://uni-market.it",
        linkedin: "https://www.linkedin.com/company/unimarket-it/",
      },
    },
    {
      title: it ? "Campionamento MCMC per un Modello di Ising 2D" : "MCMC Sampling for a 2D Ising Model",
      role: it ? "Sviluppatore" : "Developer",
      period: it ? "Novembre 2025" : "November 2025",
      description: it
        ? "Implementazione di un campionatore Markov Chain Monte Carlo per il modello di Ising 2D, con ottimizzazione dell'algoritmo di Metropolis, rilevamento di cluster tramite BFS e analisi delle transizioni di fase alla temperatura critica."
        : "Implementation of a Markov Chain Monte Carlo sampler for the 2D Ising model, featuring Metropolis algorithm optimization, cluster detection via BFS, and analysis of phase transitions at critical temperature.",
      tags: it ? ["Python", "MCMC", "Fisica Computazionale"] : ["Python", "MCMC", "Computational Physics"],
      links: { pdf: "/documents/mcmc-ising-model.pdf" },
      collaborator: { name: "Luca Pirini", url: "https://piriniluca.com", label: "HM" },
      dofollow: true,
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
      links: { pdf: "/documents/public-key-encryption.pdf" },
    },
  ];

  const labels = {
    website: it ? "Sito Web" : "Website",
    linkedin: "LinkedIn",
    pdf: it ? "Vedi PDF" : "View PDF",
    github: "GitHub",
    devpost: "DevPost",
    chrome: it ? "Chrome Store" : "Chrome Store",
    developedWith: it ? "Sviluppato con " : "Developed with ",
  };

  return (
    <section id="projects" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">{it ? "Progetti Cofondati / Sviluppati" : "Projects Cofounded / Developed"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold">{project.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{project.period}</span>
              </div>
              <p className="text-primary text-xs font-medium mb-2">{project.role}</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 bg-secondary rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              {"collaborator" in project && project.collaborator && (
                <p className="text-xs text-muted-foreground mb-3">
                  {project.collaborator.label ? `${project.collaborator.label}: ` : labels.developedWith}
                  <a
                    href={project.collaborator.url}
                    target="_blank"
                    rel={"dofollow" in project && project.dofollow ? "dofollow" : "noopener noreferrer"}
                    className="text-primary hover:underline"
                  >
                    {project.collaborator.name}
                  </a>
                </p>
              )}
              {project.links && (
                <div className="flex gap-3 pt-2 border-t border-border">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel={"dofollow" in project && project.dofollow ? "dofollow" : "noopener noreferrer"}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{labels.website}</span>
                    </a>
                  )}
                  {"linkedin" in project.links && project.links.linkedin && (
                    <a
                      href={project.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>{labels.linkedin}</span>
                    </a>
                  )}
                  {"pdf" in project.links && project.links.pdf && (
                    <a
                      href={project.links.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{labels.pdf}</span>
                    </a>
                  )}
                  {"github" in project.links && project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{labels.github}</span>
                    </a>
                  )}
                  {"devpost" in project.links && project.links.devpost && (
                    <a
                      href={project.links.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                      <span>{labels.devpost}</span>
                    </a>
                  )}
                  {"chrome" in project.links && project.links.chrome && (
                    <a
                      href={project.links.chrome}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Chrome className="w-3.5 h-3.5" />
                      <span>{labels.chrome}</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
