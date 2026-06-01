import { useState, useEffect } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import profileImage from "@/assets/profile.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

export const Hero = () => {
  const { lang } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const fullText = lang === "it" ? "Ciao, sono Michele" : "Hi, I'm Michele";

  useEffect(() => {
    setDisplayText("");
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
  }, [fullText]);

  const intro =
    lang === "it"
      ? "Sono uno studente universitario di 20 anni con un forte interesse per la tecnologia, l'imprenditorialità e l'innovazione. Mi piace imparare velocemente, lavorare in team e trasformare le idee in soluzioni concrete. Oltre al percorso accademico, ricopro il ruolo di Rappresentante di Corso, contribuendo a migliorare l'esperienza universitaria."
      : "I am a 20-year-old university student with a strong interest in technology, entrepreneurship, and innovation. I enjoy learning quickly, working in teams, and turning ideas into practical solutions. Alongside my academic path, I serve as a University Course Representative, where I contribute to improving the university experience.";

  return (
    <section id="home" className="flex items-center justify-center px-6 pt-16 pb-4">
      <div className="max-w-3xl w-full">
        <div className="flex items-center justify-between gap-6">
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
              {intro}
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
                href="https://www.linkedin.com/in/michele-francesco-matozza-17964b266"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-xs"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/mfmatozza"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-xs"
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <div className="animate-fade-in flex-shrink-0" style={{ animationDelay: "0.1s" }}>
            <img
              src={profileImage}
              alt="Michele F. Matozza"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-border"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
