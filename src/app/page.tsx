import Header from "@/components/Header";
import Banners from "@/components/Banners";
import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import Categories from "@/components/Categories";
import PropertiesSection from "@/components/PropertiesSection";
import QuickActions from "@/components/QuickActions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <Banners />
      <Hero />
      <SearchSection />
      <Categories id="categories" />
      <PropertiesSection id="properties" title="Explore Nearby Properties" />
      <QuickActions id="quick-actions" />
      <PropertiesSection title="Featured Listings" isFeatured={true} />
      <Contact id="contact-us" />
      <Footer />
    </main>
  );
}
