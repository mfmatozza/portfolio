import { GraduationCap, BookOpen } from "lucide-react";

export const Education = () => {
  const education = [
    {
      icon: GraduationCap,
      institution: "Bocconi University",
      location: "Milan, Italy",
      degree: "Bachelor in Economics, Management and Computer Science",
      highlight: "Computer Science",
      period: "2024 - 2027",
      details: "[Relevant coursework, achievements, GPA, honors, or notable activities during your time here]",
    },
    {
      icon: BookOpen,
      institution: "Institut International de Lancy",
      location: "Geneva, Switzerland",
      degree: "International Baccalaureat",
      period: "2022 - 2024",
      details: "Physics, Mathematics, Business Management, Chemistry, Italian Literature, English Literature",
    },
  ];

  return (
    <section id="education" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div key={index} className="relative pl-14 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="absolute left-0 top-0 w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border">
                <edu.icon className="w-4 h-4 text-primary" />
              </div>
              {index !== education.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-border -mb-8" />
              )}
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold">{edu.institution}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{edu.period}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1">{edu.location}</p>
              <p className="text-primary text-sm font-medium mb-2">
                {edu.degree.split(edu.highlight || '___NOHIGHLIGHT___')[0]}
                {edu.highlight && <span className="font-bold">{edu.highlight}</span>}
                {edu.degree.split(edu.highlight || '___NOHIGHLIGHT___')[1]}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">{edu.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
