export const Projects = () => {
  const projects = [
    {
      title: "[Project Name 1]",
      description:
        "[Brief description of the project, its purpose, key features, and the problem it solves]",
      tags: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
    },
    {
      title: "[Project Name 2]",
      description:
        "[Description highlighting the project's unique aspects and your role in its development]",
      tags: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
    },
    {
      title: "[Project Name 3]",
      description:
        "[Overview of the project's goals, implementation, and impact or results achieved]",
      tags: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
    },
    {
      title: "[Project Name 4]",
      description:
        "[Summary of the project including technical challenges overcome and lessons learned]",
      tags: ["[Technology 1]", "[Technology 2]", "[Technology 3]"],
    },
  ];

  return (
    <section id="projects" className="flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold mb-10">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-base font-bold mb-2">{project.title}</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-secondary rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
