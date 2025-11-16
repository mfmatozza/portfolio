import { useState, useEffect } from "react";
import { Home, BookOpen, Briefcase, Trophy, Code, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "education", icon: BookOpen, label: "Education" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "extracurricular", icon: Trophy, label: "Extracurricular" },
  { id: "projects", icon: Code, label: "Projects" },
];

export const FloatingNav = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-navbar-active rounded-full" />
                )}
              </button>
            );
          })}
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
