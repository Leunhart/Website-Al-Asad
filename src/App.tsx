import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Events } from "./components/Events";
import { Programs } from "./components/Programs";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const handleNavigate = (section: string) => {
    console.log("Navigate to:", section);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={handleNavigate} />
      <Hero />
      <About />
      <Events />
      <Programs />
      <Contact />
      <Footer />
      <Toaster />
    </div>
  );
}
