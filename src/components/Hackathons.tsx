import { ExternalLink, ArrowUp } from "lucide-react";
import hacklabLogo from "@/assets/hacklab-logo.png";

export const Hackathons = () => {
  const hackathons = [
    {
      competition: "theHacklab Startup Competition",
      logo: hacklabLogo,
      editions: [
        {
          period: "November 2025",
          result: "3rd Place",
          project: "Sideris",
          projectUrl: "https://sideris.app",
        },
        {
          period: "May 2025",
          result: "1st Place",
          project: "UniMarket",
          projectUrl: "https://uni-market.it",
        },
      ],
    },
  ];

  return (
    <section id="hackathons" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">Recent Hackathons</h2>
        <div className="space-y-6">
          {hackathons.map((hackathon, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-5 animate-fade-in"
            >
              <div className="flex items-center gap-4 mb-5">
                <img
                  src={hackathon.logo}
                  alt={hackathon.competition}
                  className="w-12 h-12 rounded-lg object-contain bg-foreground/10 p-1"
                />
                <h3 className="text-base font-bold">{hackathon.competition}</h3>
              </div>
              <div className="space-y-4">
                {hackathon.editions.map((edition, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pl-4 border-l-2 border-primary/30"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span className={`font-bold ${edition.result === "1st Place" ? "text-yellow-500" : edition.result === "3rd Place" ? "text-amber-700" : "text-primary"}`}>{edition.result}</span>
                      <span className="text-muted-foreground">developing</span>
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
                        <span>see above</span>
                      </a>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {edition.period}
                    </span>
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
