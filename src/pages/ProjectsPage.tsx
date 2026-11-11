import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const ProjectsPage = () => {
  const { lang } = useLanguage();
  useEffect(() => window.scrollTo(0, 0), []);
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>All Projects — Michele F. Matozza</title>
        <meta name="description" content="Every product, side project and hackathon build by Michele Francesco Matozza." />
        <link rel="canonical" href="https://michelematozza.com/projects" />
      </Helmet>
      <div className="max-w-3xl mx-auto px-6 pt-10 flex items-center justify-between">
        <Link to="/#products" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1.5">
          <ArrowLeft className="w-3.5 h-3.5" /> {lang === "it" ? "Torna alla home" : "Back home"}
        </Link>
        <LanguageToggle />
      </div>
      <main id="main-content">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
