import Hero from "@/components/sections/Hero";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/*
        Hero
        - The `#home` ID is applied here to allow the CommandBar active state
          indicator to detect when the user is at the top of the page.
      */}
      <section id="home">
        <Hero />
      </section>

      {/* Featured projects (component contains its own `id="projects"`) */}
      <FeaturedProjects />

      {/* Services (component contains its own `id="services"`) */}
      <Services /> 

      {/* Contact (component contains its own `id="contact"`) */}
      <Contact />

      {/* Footer (end of document) */}
      <Footer />

    </div>
  );
}