"use client";

import Header from "@/components/Header";
import ExploreHero from "@/components/ExploreHero";
import PropertyResultCard from "@/components/PropertyResultCard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Mock Data
const properties = Array(4)
  .fill({
    image: "/hero.png", // Using hero as placeholder, ideally use different images
    priceRange: "Rs 1.66Cr - 1.76 Cr",
    location: "Near Gayatri Mandir, 122001",
    pricePerSqft: "Rs 9768 /sqft",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,135 sqft",
  })
  .map((item, index) => ({ ...item, id: index })); // Add unique IDs

export default function ExploreResultsPage() {
  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      <ExploreHero />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Search results (12)
        </h2>

        <div className="flex flex-col gap-6">
          {properties.map((prop) => (
            <PropertyResultCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
