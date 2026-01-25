import { ExternalLink, Linkedin } from "lucide-react";

export const Projects = () => {
  const projects = [
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
      title: "Sideris",
      role: "Co-Founder & Developer",
      period: "Work in Progress",
      description:
        "A marketplace between brands and creators that aims to enable barrier-less digital marketing. 3rd place at a semester-long hackathon.",
      tags: ["Marketplace", "Digital Marketing", "Creator Economy"],
      links: {
        website: "https://sideris.app",
      },
    },
    {
      title: "[Project Name 3]",
      role: "[Your Role]",
      period: "[Date]",
      description:
        "[Overview of the project's goals, implementation, and impact or results achieved]",
      tags: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
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
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {project.period}
                </span>
              </div>
              <p className="text-primary text-xs font-medium mb-2">{project.role}</p>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-secondary rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.links && (
                <div className="flex gap-3 pt-2 border-t border-border">
                  {project.links.website && (
                    <a
                      href={project.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
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
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};