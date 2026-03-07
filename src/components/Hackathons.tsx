import { ExternalLink, ArrowUp } from "lucide-react";
import hacklabLogo from "@/assets/hacklab-logo.png";
import hfarmLogo from "@/assets/hfarm-logo.png";
import hackeuropeLogo from "@/assets/hackeurope-logo.png";
import promptStartupLogo from "@/assets/prompt-a-startup-logo.png";

export const Hackathons = () => {
  const hackathons = [
    {
      competition: "Prompt-a-Startup Stockholm",
      location: "Stockholm, Sweden",
      logo: promptStartupLogo,
      editions: [
        {
          period: "March 2026",
          result: "Participant",
          project: "Sideris",
          projectUrl: "https://sideris.app",
          description: "Invited among the 40 best ideas to develop a startup using Lovable and integrating Polar",
        },
      ],
    },
    {
      competition: "HackEurope Dublin",
      location: "Dublin, Ireland",
      logo: hackeuropeLogo,
      editions: [
        {
          period: "February 2026",
          result: "Participant",
          project: "WindSite",
          projectUrl: "https://windsite.cloud",
          description: "Developed an AI-powered offshore windfarm assessment using ReactFlow.js, RLMs, and a lot of Monster",
        },
      ],
    },
    {
      competition: "theHacklab Startup Competition",
      location: "Milan, Italy",
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
    {
      competition: "H-Farm Hackathon",
      location: "Milan, Italy",
      logo: hfarmLogo,
      editions: [
        {
          period: "October 2024",
          result: "1st Place",
          description: "Ideating a ML algorithm to predict mistakes done by students in entrance exams",
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
                  className="w-12 h-12 rounded-lg object-contain object-center bg-foreground/10 p-1"
                />
                <div>
                  <h3 className="text-base font-bold">{hackathon.competition}</h3>
                  <p className="text-xs text-muted-foreground">{hackathon.location}</p>
                </div>
              </div>
              <div className="space-y-4">
                {hackathon.editions.map((edition, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pl-4 border-l-2 border-primary/30"
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                      <span className={`font-bold ${edition.result === "1st Place" ? "text-yellow-500" : edition.result === "3rd Place" ? "text-amber-700" : "text-primary"}`}>{edition.result}</span>
                      {"project" in edition && edition.project ? (
                        <>
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
                        </>
                      ) : (
                        <span className="text-muted-foreground">{"description" in edition && edition.description}</span>
                      )}
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
