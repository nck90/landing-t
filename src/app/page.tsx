import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceIntro from "@/components/ServiceIntro";
import DeliveringHappiness from "@/components/DeliveringHappiness";
import NewsSection from "@/components/NewsSection";
import PartnersSection from "@/components/PartnersSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServiceIntro />
      <DeliveringHappiness />
      <NewsSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
