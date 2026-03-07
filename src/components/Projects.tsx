import { ExternalLink, Linkedin, FileText, Github, Trophy, Chrome } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "ClauseOps",
      role: "Solo founder & Developer",
      period: "March 2026",
      description:
        "Extracts enforceable technical obligations from enterprise contracts using AI, then continuously reconciles them against live infrastructure across AWS, GitHub, Vercel, and 15 other platforms. Built for B2B SaaS companies that need to prove compliance before audits find it for them.",
      tags: ["AI", "Compliance", "B2B SaaS"],
      links: {
        website: "https://clauseops.com",
      },
      dofollow: true,
    },
    {
      title: "WindSite",
      role: "Co-Founder & Developer",
      period: "February 2026",
      description:
        "An AI-powered pre-permit feasibility assessment for offshore wind energy projects. Draw zones, configure constraints, run simulations, and generate reports, all in one platform. Developed at HackEurope Dublin 2026.",
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
      role: "Developer",
      period: "February 2026",
      description:
        "A Chrome extension that allows you to filter out all the noise from your LinkedIn feed so you can focus on posts that actually matter.",
      tags: ["JavaScript", "HTML", "Chrome Extension"],
      links: {
        website: "https://linkeclean.site",
        github: "https://github.com/mfmatozza/LinkeClean",
        chrome: "https://chromewebstore.google.com/detail/linkeclean-by-michele-mat/pbfcgonhbmpfjgbmpjfgbclcmngihadi",
      },
      dofollow: true,
    },
    {
      title: "Sideris",
      role: "Co-Founder & Developer",
      period: "Work in Progress",
      description:
        "A marketplace between brands and creators that aims to enable barrier-less digital marketing. 3rd place at a semester-long hackathon.",
      tags: ["Marketplace", "Digital Marketing", "Creator Economy"],
      links: {
        website: "https://sideris.app",
      },
      collaborator: {
        name: "Riccardo Mazzarini",
        url: "https://heyimrick.com",
      },
      dofollow: true,
    },
    {
      title: "UniMarket",
      role: "Co-Founder",
      period: "Feb 2025 - Present",
      description:
        "An internal marketplace built exclusively for Bocconi students. Buy, sell, and trade anything within a trusted university community.",
      tags: ["Marketplace", "E-commerce", "Student Platform"],
      links: {
        website: "https://uni-market.it",
        linkedin: "https://www.linkedin.com/company/unimarket-it/",
      },
    },
    {
      title: "MCMC Sampling for a 2D Ising Model",
      role: "Developer",
      period: "November 2025",
      description:
        "Implementation of a Markov Chain Monte Carlo sampler for the 2D Ising model, featuring Metropolis algorithm optimization, cluster detection via BFS, and analysis of phase transitions at critical temperature.",
      tags: ["Python", "MCMC", "Computational Physics"],
      links: {
        pdf: "/documents/mcmc-ising-model.pdf",
      },
      collaborator: {
        name: "Luca Pirini",
        url: "https://piriniluca.com",
        label: "HM",
      },
      dofollow: true,
    },
    {
      title: "Brief Overview of Public-Key Encryption Systems",
      role: "Author",
      period: "June 2024",
      description:
        "Essay exploring RSA and Elliptic Curve Cryptography, analyzing their mathematical foundations, vulnerabilities including quantum computing threats, and comparative security advantages.",
      tags: ["Cryptography", "RSA", "ECC", "Mathematics"],
      links: {
        pdf: "/documents/public-key-encryption.pdf",
      },
    },
  ];

  return (
    <section id="projects" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">Projects Cofounded / Developed</h2>
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
                  {project.collaborator.label ? `${project.collaborator.label}: ` : "Developed with "}
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
                      <span>Website</span>
                    </a>
                  )}
                  {project.links.linkedin && (
                    <a
                      href={project.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {project.links.pdf && (
                    <a
                      href={project.links.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View PDF</span>
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
                      <span>GitHub</span>
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
                      <span>DevPost</span>
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
                      <span>Chrome Store</span>
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
