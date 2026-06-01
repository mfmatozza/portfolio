import { FloatingNav } from "@/components/FloatingNav";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { ExtracurricularActivities } from "@/components/ExtracurricularActivities";
import { Projects } from "@/components/Projects";
import { Hackathons } from "@/components/Hackathons";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
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
