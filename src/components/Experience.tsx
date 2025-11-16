export const Experience = () => {
  const experience = [
    {
      icon: "💼",
      company: "theHackLab",
      position: "President",
      period: "Jun 2025 - Present",
      description:
        "Co-organized a semester-long hackathon for 70+ students and secured sponsorships from industry leaders like BCG X",
    },
  ];

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-bold mb-16">Experience</h2>
        <div className="space-y-12">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 w-14 h-14 bg-card rounded-full flex items-center justify-center text-2xl border border-border">
                {exp.icon}
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold">{exp.company}</h3>
                <span className="text-muted-foreground whitespace-nowrap ml-4">
                  {exp.period}
                </span>
              </div>
              <p className="text-primary font-medium mb-3">{exp.position}</p>
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
