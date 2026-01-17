import { useState, useEffect } from "react";
import { Mail, Linkedin } from "lucide-react";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Hi, I'm Michele";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <div className="mb-6 animate-fade-in">
          <span className="text-primary text-lg">~/portfolio $</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2">
            {displayText}
            <span className="animate-pulse text-primary">_</span>
          </h1>
        </div>
        <p
          className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          [Brief introduction about yourself, your skills, and what you do. This is a great place to showcase your
          personality and professional interests.]
        </p>
        <div className="flex gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <a
            href="mailto:mf.matozza@gmail.com"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
          <a
            href="https://linkedin.com/in/[yourusername]"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
};
