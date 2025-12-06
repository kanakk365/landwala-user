"use client";

import Header from "@/components/Header";
import PropertyResultCard from "@/components/PropertyResultCard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LatestListingsHero from "@/components/LatestListingsHero";

export default function LatestListingsPage() {
  const properties = [
    {
      id: 1,
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Property+1",
      priceRange: "Rs 1.66Cr - 1.76 Cr",
      location: "Near Gayatri Mandir, 122001",
      pricePerSqft: "Rs 9768 /sqft",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,135 sqft",
    },
    {
      id: 2,
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Property+2",
      priceRange: "Rs 1.66Cr - 1.76 Cr",
      location: "Near Gayatri Mandir, 122001",
      pricePerSqft: "Rs 9768 /sqft",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,135 sqft",
    },
    {
      id: 3,
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Property+3",
      priceRange: "Rs 1.66Cr - 1.76 Cr",
      location: "Near Gayatri Mandir, 122001",
      pricePerSqft: "Rs 9768 /sqft",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,135 sqft",
    },
    {
      id: 4,
      image: "https://placehold.co/600x400/e2e8f0/1e293b?text=Property+4",
      priceRange: "Rs 1.66Cr - 1.76 Cr",
      location: "Near Gayatri Mandir, 122001",
      pricePerSqft: "Rs 9768 /sqft",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,135 sqft",
    },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <LatestListingsHero />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <h2 className="text-xl font-medium text-gray-700 mb-8">
          Search results (12)
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {properties.map((property) => (
            <PropertyResultCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
