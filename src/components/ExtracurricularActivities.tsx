import { Cpu, Zap } from "lucide-react";

export const ExtracurricularActivities = () => {
  const activities = [
    {
      icon: Cpu,
      activity: "[Activity/Club Name]",
      role: "[Your Role]",
      period: "[Start Date] - [End Date/Present]",
      description:
        "[Description of the activity, your contributions, and what you accomplished or learned]",
    },
    {
      icon: Zap,
      activity: "[Another Activity Name]",
      role: "[Your Role]",
      period: "[Start Date] - [End Date]",
      description:
        "[Details about your involvement, impact, and key experiences from this activity]",
    },
  ];

  return (
    <section id="extracurricular" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">Extracurricular Activities</h2>
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative pl-14 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 w-10 h-10 bg-card rounded-full flex items-center justify-center border border-border">
                <activity.icon className="w-4 h-4 text-primary" />
              </div>
              {index !== activities.length - 1 && (
                <div className="absolute left-5 top-10 bottom-0 w-px bg-border -mb-8" />
              )}
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold">{activity.activity}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                  {activity.period}
                </span>
              </div>
              <p className="text-primary text-sm font-medium mb-2">{activity.role}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
