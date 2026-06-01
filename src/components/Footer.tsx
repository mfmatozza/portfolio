import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { lang } = useLanguage();
  return (
    <footer id="contact" className="py-12 px-6 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-xs text-muted-foreground">
          {lang === "it"
            ? "© 2026 Michele F. Matozza. Tutti i diritti riservati."
            : "© 2026 Michele F. Matozza. All rights reserved."}
        </p>
      </div>
    </footer>
  );
};
