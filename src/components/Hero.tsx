import { useState, useEffect } from "react";
import { Mail, Linkedin } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

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
    <section id="home" className="flex items-center justify-center px-6 pt-16 pb-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 max-w-md">
            <div className="mb-4 animate-fade-in">
              <span className="text-primary text-xs">~/portfolio $</span>
              <h1 className="text-3xl md:text-4xl font-bold mt-1">
                {displayText}
                <span className="animate-pulse text-primary">_</span>
              </h1>
            </div>
            <p
              className="text-sm text-muted-foreground mb-6 max-w-md leading-relaxed animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              [Brief introduction about yourself, your skills, and what you do. This is a great place to showcase your
              personality and professional interests.]
            </p>
            <div className="flex gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <a
                href="mailto:mf.matozza@gmail.com"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-xs"
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <a
                href="https://linkedin.com/in/[yourusername]"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="animate-fade-in flex-shrink-0" style={{ animationDelay: "0.1s" }}>
            <img
              src={profileImage}
              alt="Michele F. Matozza"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
