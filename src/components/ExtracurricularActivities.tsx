export const ExtracurricularActivities = () => {
  const activities = [
    {
      icon: "🎯",
      activity: "[Activity/Club Name]",
      role: "[Your Role]",
      period: "[Start Date] - [End Date/Present]",
      description:
        "[Description of the activity, your contributions, and what you accomplished or learned]",
    },
    {
      icon: "🎯",
      activity: "[Another Activity Name]",
      role: "[Your Role]",
      period: "[Start Date] - [End Date]",
      description:
        "[Details about your involvement, impact, and key experiences from this activity]",
    },
  ];

  return (
    <section id="extracurricular" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-bold mb-16">Extracurricular Activities</h2>
        <div className="space-y-12">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative pl-20 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute left-0 top-0 w-14 h-14 bg-card rounded-full flex items-center justify-center text-2xl border border-border">
                {activity.icon}
              </div>
              {index !== activities.length - 1 && (
                <div className="absolute left-7 top-14 bottom-0 w-px bg-border -mb-12" />
              )}
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold">{activity.activity}</h3>
                <span className="text-muted-foreground whitespace-nowrap ml-4">
                  {activity.period}
                </span>
              </div>
              <p className="text-primary font-medium mb-3">{activity.role}</p>
              <p className="text-muted-foreground leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
