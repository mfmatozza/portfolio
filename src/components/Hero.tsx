import { Mail, Twitter, Github, Linkedin } from "lucide-react";

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
          Your Name
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Designer and developer passionate about creating beautiful, functional digital
          experiences. Currently exploring the intersection of design and technology.
        </p>
        <div className="flex gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <a
            href="mailto:your.email@example.com"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
            <span>Email</span>
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};
