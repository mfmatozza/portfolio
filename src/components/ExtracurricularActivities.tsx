import { Rocket } from "lucide-react";
import lovableLogo from "@/assets/lovable-logo.png";

export const ExtracurricularActivities = () => {
  const organizations = [
    {
      icon: Rocket,
      name: "Astra Bocconi",
      period: "Oct 2024 - Present",
      roles: [
        {
          title: "Head of Technology",
          period: "Aug 2025 - Present",
          description:
            "Leading the technology division, overseeing technical projects and driving innovation within the organization.",
        },
        {
          title: "Board Member",
          period: "Oct 2024 - Aug 2025",
          description:
            "Contributed to strategic decisions and organizational growth as a founding board member.",
        },
      ],
    },
    {
      customIcon: lovableLogo,
      name: "Lovable",
      period: "Jan 2025 - Present",
      roles: [
        {
          title: "Lovable Campus Leader",
          period: "Jan 2025 - Present",
          description:
            "Chosen as one of the Lovable Ambassadors to represent Lovable through events and partnerships.",
        },
      ],
    },
  ];

  return (
    <section id="extracurricular" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">Extracurricular Activities</h2>
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
