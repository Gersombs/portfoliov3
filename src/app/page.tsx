import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";

// Carga Diferida (Lazy Loading) para mejorar el TBT
const FeaturedProjects = dynamic(() => import("@/components/sections/FeaturedProjects"), {
  ssr: true,
});
const Services = dynamic(() => import("@/components/sections/Services"), {
  ssr: true,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/components/ui/Footer"), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* El Hero se carga de inmediato (LCP).*/}
      <section id="home">
        <Hero />
      </section>
      {/* El resto de secciones se cargan de forma diferida para optimizar TBT. */}
      <FeaturedProjects />
      
      <Services /> 
      
      <Contact />
      
      <Footer />
      
    </div>
  );
}