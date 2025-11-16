export const Projects = () => {
  const projects = [
    {
      title: "Project Alpha",
      description:
        "A modern web application built with cutting-edge technologies, focusing on user experience and performance optimization.",
      tags: ["React", "TypeScript", "Tailwind"],
    },
    {
      title: "Design System",
      description:
        "Comprehensive component library and design guidelines for building consistent, accessible interfaces at scale.",
      tags: ["UI/UX", "Components", "Documentation"],
    },
    {
      title: "Creative Experiments",
      description:
        "Collection of interactive prototypes and visual experiments exploring the boundaries of web technologies.",
      tags: ["WebGL", "Animation", "Interactive"],
    },
    {
      title: "Open Source Tool",
      description:
        "Developer tool that simplifies complex workflows and improves productivity for modern development teams.",
      tags: ["CLI", "Node.js", "Open Source"],
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h2 className="text-5xl font-bold mb-16">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-4 py-1.5 bg-secondary rounded-full text-sm"
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
