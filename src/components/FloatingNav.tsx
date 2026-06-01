import { useState, useEffect } from "react";
import { Home, BookOpen, Briefcase, Code, Sun, Moon, Swords } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage, tr } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";

const ExtracurricularIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z" clipRule="evenodd" />
  </svg>
);

const navItems = [
  { id: "home", icon: Home, label: { en: "Home", it: "Home" } },
  { id: "education", icon: BookOpen, label: { en: "Education", it: "Istruzione" } },
  { id: "experience", icon: Briefcase, label: { en: "Experience", it: "Esperienza" } },
  { id: "extracurricular", icon: ExtracurricularIcon, label: { en: "Extracurricular", it: "Attività Extra" } },
  { id: "projects", icon: Code, label: { en: "Projects", it: "Progetti" } },
  { id: "hackathons", icon: Swords, label: { en: "Hackathons", it: "Hackathon" } },
];

export const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const { lang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light");
  };

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-navbar backdrop-blur-md rounded-full px-6 py-3 shadow-2xl border border-border/50">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "relative p-3 rounded-full transition-all duration-300",
                  "hover:bg-muted/50",
                  isActive && "text-navbar-active"
                )}
                aria-label={item.label[lang]}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-navbar-active rounded-full" />
                )}
              </button>
            );
          })}
          <div className="w-px h-6 bg-border mx-1" />
          <LanguageToggle />
          <div className="w-px h-6 bg-border mx-1" />
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full transition-all duration-300 hover:bg-muted/50"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
