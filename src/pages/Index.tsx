import { Helmet } from "react-helmet-async";
import { FloatingNav } from "@/components/FloatingNav";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { ExtracurricularActivities } from "@/components/ExtracurricularActivities";
import { Projects } from "@/components/Projects";
import { Hackathons } from "@/components/Hackathons";
import { Talks } from "@/components/Talks";
import { Footer } from "@/components/Footer";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Michele Francesco Matozza",
  alternateName: "Michele F. Matozza",
  jobTitle: "Software Engineer Intern",
  url: "https://michelematozza.com/",
  email: "mailto:mf.matozza@gmail.com",
  worksFor: { "@type": "Organization", name: "VivaTicket" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bocconi University" },
  knowsLanguage: ["en", "it", "fr", "zh"],
  knowsAbout: [
    "Software Engineering",
    "TypeScript",
    "Artificial Intelligence",
    "Entrepreneurship",
    "Hackathons",
  ],
  sameAs: [
    "https://www.linkedin.com/in/michele-francesco-matozza-17964b266",
    "https://github.com/mfmatozza",
  ],
};


const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Michele F. Matozza — Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Michele Francesco Matozza — projects, hackathons, education, and experience in tech, AI, and entrepreneurship."
        />
        <link rel="canonical" href="https://michelematozza.com/" />
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </Helmet>
      <FloatingNav />
      <main id="main-content">
        <Hero />
        <Education />
        <Experience />
        <ExtracurricularActivities />
        <Projects />
        <Hackathons />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
