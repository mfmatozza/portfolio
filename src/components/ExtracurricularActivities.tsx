import { Rocket, Code, ExternalLink } from "lucide-react";
import lovableLogo from "@/assets/lovable-logo.png";
import { useLanguage } from "@/contexts/LanguageContext";

export const ExtracurricularActivities = () => {
  const { lang } = useLanguage();
  const it = lang === "it";

  const organizations = [
    {
      icon: Rocket,
      name: "Astra Bocconi",
      period: it ? "Ott 2024 - Presente" : "Oct 2024 - Present",
      roles: [
        {
          title: it ? "Head of Technology" : "Head of Technology",
          period: it ? "Ago 2025 - Presente" : "Aug 2025 - Present",
          description: it
            ? "Guido la divisione tecnologica, supervisionando i progetti tecnici e promuovendo l'innovazione all'interno dell'organizzazione."
            : "Leading the technology division, overseeing technical projects and driving innovation within the organization.",
          links: [
            { label: "Free at B", url: "https://freeatb.it" },
            { label: it ? "Sito Web" : "Website", url: "https://astrabocconi.com" },
          ],
        },
        {
          title: it ? "Membro del Consiglio" : "Board Member",
          period: it ? "Ott 2024 - Ago 2025" : "Oct 2024 - Aug 2025",
          description: it
            ? "Ho contribuito alle decisioni strategiche e alla crescita organizzativa come membro attivo del consiglio."
            : "Contributed to strategic decisions and organizational growth as an active board member.",
        },
      ],
    },
    {
      customIcon: lovableLogo,
      name: "Lovable",
      period: it ? "Gen 2025 - Presente" : "Jan 2025 - Present",
      roles: [
        {
          title: "Lovable Campus Leader",
          period: "",
          description: it
            ? "Scelto come uno degli Ambassador Lovable per rappresentare Lovable attraverso eventi e partnership."
            : "Chosen as one of the Lovable Ambassadors to represent Lovable through events and partnerships.",
        },
      ],
    },
    {
      icon: Code,
      name: "Hacklab",
      period: it ? "Ott 2024 - Presente" : "Oct 2024 - Present",
      roles: [
        {
          title: it ? "Presidente" : "President",
          period: it ? "Gen 2025 - Presente" : "Jan 2025 - Present",
          description: it
            ? "Guido l'organizzazione e promuovo la cultura degli hackathon all'interno della comunità universitaria."
            : "Leading the organization and driving hackathon culture within the university community.",
        },
        {
          title: it ? "Partecipante a Hackathon" : "Hackathon Participant",
          period: it ? "Ott 2024 - Dic 2025" : "Oct 2024 - Dec 2025",
          description: it
            ? "3 volte partecipante a hackathon, 1 primo posto, 1 terzo posto."
            : "3x Hackathon participant, 1x first place, 1x third place.",
        },
      ],
    },
  ];

  return (
    <section id="extracurricular" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">{it ? "Attività Extracurricolari" : "Extracurricular Activities"}</h2>
        <div className="space-y-8">
          {organizations.map((org, index) => (
            <div
              key={index}
              className="relative pl-14 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border">
                {org.customIcon ? (
                  <img src={org.customIcon} alt={org.name} className="w-5 h-5 object-contain" />
                ) : (
                  org.icon && <org.icon className="w-4 h-4 text-primary" />
                )}
              </div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold">{org.name}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {org.period}
                </span>
              </div>
              <div className="mt-4 space-y-4 border-l border-border pl-4 ml-1">
                {org.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="relative">
                    <div className="absolute -left-[17px] top-1.5 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-primary text-sm font-medium">{role.title}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                        {role.period}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                    {role.links && role.links.length > 0 && (
                      <div className="flex gap-3 mt-2">
                        {role.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
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
