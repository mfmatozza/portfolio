import { GraduationCap, BookOpen } from "lucide-react";

export const Education = () => {
  const education = [
    {
      icon: GraduationCap,
      institution: "[University Name]",
      degree: "[Degree Name and Major]",
      period: "[Start Year] - [End Year]",
      details:
        "[Relevant coursework, achievements, GPA, honors, or notable activities during your time here]",
    },
    {
      icon: BookOpen,
      institution: "[High School/Previous Institution Name]",
      degree: "[Diploma/Degree Name]",
      period: "[Start Year] - [End Year]",
      details:
        "[Notable achievements, extracurricular activities, awards, or relevant experiences]",
    },
  ];

  return (
    <section id="education" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-bold mb-16">Education</h2>
        <div className="space-y-12">
          {education.map((edu, index) => (
            <div
              key={index}
              className="relative pl-20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 w-14 h-14 bg-card rounded-full flex items-center justify-center border border-border">
                <edu.icon className="w-6 h-6 text-primary" />
              </div>
              {index !== education.length - 1 && (
                <div className="absolute left-7 top-14 bottom-0 w-px bg-border -mb-12" />
              )}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold">{edu.institution}</h3>
                <span className="text-muted-foreground whitespace-nowrap ml-4">
                  {edu.period}
                </span>
              </div>
              <p className="text-primary font-medium mb-3">{edu.degree}</p>
              <p className="text-muted-foreground leading-relaxed">
                {edu.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
