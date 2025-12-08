import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import PropertiesSection from "@/components/PropertiesSection";
import QuickActions from "@/components/QuickActions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <Hero />
      <Categories />
      <PropertiesSection title="Explore Nearby Properties" />
      <QuickActions />
      <PropertiesSection title="Featured Listings" isFeatured={true} />
      <Contact />
      <Footer />
    </main>
  );
}
