import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const FlagGB = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-5 rounded-sm" aria-hidden="true">
    <clipPath id="gb-c"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
    <clipPath id="gb-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
    <g clipPath="url(#gb-c)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const FlagIT = () => (
  <svg viewBox="0 0 3 2" className="w-5 h-5 rounded-sm" aria-hidden="true">
    <rect width="1" height="2" x="0" fill="#009246" />
    <rect width="1" height="2" x="1" fill="#fff" />
    <rect width="1" height="2" x="2" fill="#CE2B37" />
  </svg>
);

export const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setLang("en")}
        aria-label="English"
        className={cn(
          "p-1.5 rounded-full transition-all duration-300 hover:bg-muted/50",
          lang === "en" ? "opacity-100" : "opacity-50 hover:opacity-100"
        )}
      >
        <FlagGB />
      </button>
      <button
        onClick={() => setLang("it")}
        aria-label="Italiano"
        className={cn(
          "p-1.5 rounded-full transition-all duration-300 hover:bg-muted/50",
          lang === "it" ? "opacity-100" : "opacity-50 hover:opacity-100"
        )}
      >
        <FlagIT />
      </button>
    </div>
  );
};
