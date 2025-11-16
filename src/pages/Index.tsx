import { FloatingNav } from "@/components/FloatingNav";
import { Hero } from "@/components/Hero";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNav />
      <Hero />
      <Education />
      <Experience />
      <Projects />
      <Footer />
    </div>
  );
};

export default Index;
