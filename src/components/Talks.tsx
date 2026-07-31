import { Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Talks = () => {
  const { lang } = useLanguage();
  const it = lang === "it";

  const talks = [
    {
      title: it
        ? "Vibecoding applicato al marketing"
        : "Applying vibecoding tools to marketing",
      host: it
        ? "Università di Bologna — Master in Marketing, con il Prof. Marcello Mariani"
        : "University of Bologna — Master's in Marketing, with Prof. Marcello Mariani",
      period: it ? "Aprile 2026" : "April 2026",
      description: it
        ? "Sessione tenuta con Alessandro Bigelli sull'uso di strumenti di vibecoding, con focus su Lovable, all'interno di una lezione del Master in Marketing."
        : "Guest session co-led with Alessandro Bigelli on using vibecoding tools, with a focus on Lovable, inside a Master's in Marketing lecture.",
    },
    {
      title: it ? "Validazione delle idee e MVP" : "Idea Validation and MVPs",
      host: it
        ? "HackLab Bocconi Students — come Presidente"
        : "HackLab Bocconi Students — as President",
      period: it ? "Aprile 2026" : "April 2026",
      description: it
        ? "Intervento pratico su come trasformare le idee in soluzioni testabili, validare presto e costruire un MVP come primo passo concreto verso l'impatto. In collaborazione con Lovable."
        : "Practical talk on turning ideas into testable solutions, validating early, and building an MVP as the first real step toward impact. In collaboration with Lovable.",
    },
  ];

  return (
    <section id="talks" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">{it ? "Talk & Speaking" : "Talks & Speaking"}</h2>
        <div className="space-y-8">
          {talks.map((talk, index) => (
            <div
              key={index}
              className="relative pl-14 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border">
                <Mic className="w-4 h-4 text-primary" />
              </div>
              {index !== talks.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-border -mb-8" />
              )}
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold">{talk.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {talk.period}
                </span>
              </div>
              <p className="text-primary text-sm font-medium mb-2">{talk.host}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{talk.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
