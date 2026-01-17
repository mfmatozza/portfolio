import { Terminal, Code, Globe, Atom, Ship, Briefcase, Users } from "lucide-react";

export const Experience = () => {
  const experience = [
    {
      icon: Globe,
      company: "Ville de Genève",
      position: "Intern at Service des Relations Extérieures",
      location: "Geneva, Switzerland",
      period: "July 2025 - August 2025",
      bullets: [
        "Assisted with daily tasks and contributed to organizing the Swiss National Day (1st August)",
        "Collaborated in a diverse team environment",
        "Utilized Microsoft Excel and PowerPoint to support projects and presentations",
      ],
    },
    {
      icon: Atom,
      company: "CERN",
      position: "Shadow Program",
      location: "Geneva, Switzerland",
      period: "July 2023 - July 2023",
      bullets: [
        "Exploration of how scientific discoveries are made, via the application of the scientific method and collaborative research",
        "Application of scientific method in simple Physics experiments and data analysis with Discrete Fourier Transforms",
        "Data Analysis in Excel",
      ],
    },
    {
      icon: Ship,
      company: "Mediterranean Shipping Company (MSC)",
      position: "Intern",
      location: "Geneva, Switzerland",
      period: "June 2023 - June 2023",
      bullets: [
        "Working in the IT department of a global corporation using SCRUM methodology",
        "Introduction to Git and C#",
        "Application of programming principles in developing backend solutions for internal systems",
      ],
    },
    {
      icon: Briefcase,
      company: "Procter & Gamble",
      position: "Shadow Program",
      location: "Geneva, Switzerland",
      period: "June 2022 - June 2022",
      bullets: [
        "Working alongside a senior brand manager",
        "Assigned a research project to develop branding solution to win amongst point of market entry consumers",
        "Understood the importance of marketing and branding in developing a solution",
      ],
    },
    {
      icon: Users,
      company: "Institut International de Lancy",
      position: "Basketball Coach",
      location: "Geneva, Switzerland",
      period: "September 2022 - April 2024",
      bullets: [
        "Worked with children aged 8-16",
        "Developed adaptive communication skills",
      ],
    },
  ];

  return (
    <section id="experience" className="flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-bold mb-16">Experience</h2>
        <div className="space-y-12">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 w-14 h-14 bg-card rounded-full flex items-center justify-center border border-border">
                <exp.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold">{exp.company}</h3>
                <span className="text-muted-foreground whitespace-nowrap ml-4">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{exp.location}</p>
              <p className="text-primary font-medium mb-3">{exp.position}</p>
              <ul className="text-muted-foreground leading-relaxed space-y-1">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-primary">▸</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
