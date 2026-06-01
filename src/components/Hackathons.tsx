import { ArrowUp } from "lucide-react";
import hacklabLogo from "@/assets/hacklab-logo.png";
import hfarmLogo from "@/assets/hfarm-logo.png";
import hackeuropeLogo from "@/assets/hackeurope-logo.png";
import promptStartupLogo from "@/assets/prompt-a-startup-logo.png";
import hostingerHorizonsLogo from "@/assets/hostinger-horizons-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hackathons = () => {
  const { lang } = useLanguage();
  const it = lang === "it";

  const participant = it ? "Partecipante" : "Participant";
  const first = it ? "1° Posto" : "1st Place";
  const second = it ? "2° Posto" : "2nd Place";
  const third = it ? "3° Posto" : "3rd Place";
  const developing = it ? "sviluppando" : "developing";
  const seeAbove = it ? "vedi sopra" : "see above";

  const hackathons = [
    {
      competition: "Prompt-a-Startup Stockholm",
      location: it ? "Stoccolma, Svezia" : "Stockholm, Sweden",
      logo: promptStartupLogo,
      editions: [
        {
          period: it ? "Marzo 2026" : "March 2026",
          result: participant,
          project: "ClauseOps",
          projectUrl: "https://clauseops.com",
          description: it
            ? "Invitato tra le 40 migliori idee per sviluppare una startup usando Lovable e integrando Polar"
            : "Invited among the 40 best ideas to develop a startup using Lovable and integrating Polar",
        },
      ],
    },
    {
      competition: "HackEurope Dublin",
      location: it ? "Dublino, Irlanda" : "Dublin, Ireland",
      logo: hackeuropeLogo,
      editions: [
        {
          period: it ? "Febbraio 2026" : "February 2026",
          result: participant,
          project: "WindSite",
          projectUrl: "https://windsite.cloud",
          description: it
            ? "Sviluppato una valutazione AI per parchi eolici offshore utilizzando ReactFlow.js, RLMs e tanta Monster"
            : "Developed an AI-powered offshore windfarm assessment using ReactFlow.js, RLMs, and a lot of Monster",
        },
      ],
    },
    {
      competition: "theHacklab Startup Competition",
      location: it ? "Milano, Italia" : "Milan, Italy",
      logo: hacklabLogo,
      editions: [
        { period: it ? "Novembre 2025" : "November 2025", result: third, project: "Sideris", projectUrl: "https://sideris.app" },
        { period: it ? "Maggio 2025" : "May 2025", result: first, project: "UniMarket", projectUrl: "https://uni-market.it" },
      ],
    },
    {
      competition: "H-Farm Hackathon",
      location: it ? "Milano, Italia" : "Milan, Italy",
      logo: hfarmLogo,
      editions: [
        {
          period: it ? "Ottobre 2024" : "October 2024",
          result: first,
          description: it
            ? "Ideazione di un algoritmo ML per prevedere gli errori commessi dagli studenti negli esami di ammissione"
            : "Ideating a ML algorithm to predict mistakes done by students in entrance exams",
        },
      ],
    },
  ];

  return (
    <section id="hackathons" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">{it ? "Hackathon Recenti" : "Recent Hackathons"}</h2>
        <div className="space-y-6">
          {hackathons.map((hackathon, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-5 animate-fade-in">
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={hackathon.logo}
                  alt={hackathon.competition}
                  className="w-12 h-12 rounded-lg object-contain object-center bg-foreground/10 p-1"
                />
                <div>
                  <h3 className="text-base font-bold">{hackathon.competition}</h3>
                  <p className="text-xs text-muted-foreground">{hackathon.location}</p>
                </div>
              </div>
              <div className="space-y-4">
                {hackathon.editions.map((edition, i) => (
                  <div key={i} className="flex flex-col gap-1 pl-4 border-l-2 border-primary/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                        <span
                          className={`font-bold ${edition.result === first ? "text-yellow-500" : edition.result === third ? "text-amber-700" : "text-primary"}`}
                        >
                          {edition.result}
                        </span>
                        {"project" in edition && edition.project ? (
                          <>
                            <span className="text-muted-foreground">{developing}</span>
                            <a
                              href={edition.projectUrl}
                              target="_blank"
                              rel="dofollow"
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {edition.project}
                            </a>
                            <a
                              href="#projects"
                              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ArrowUp className="w-3 h-3" />
                              <span>{seeAbove}</span>
                            </a>
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            {"description" in edition && edition.description}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{edition.period}</span>
                    </div>
                    {"description" in edition && edition.description && "project" in edition && edition.project && (
                      <p className="text-xs text-muted-foreground mt-1">{edition.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
