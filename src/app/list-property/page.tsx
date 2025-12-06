"use client";

import Header from "@/components/Header";
import ListPropertyForm from "@/components/ListPropertyForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function ListPropertyPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <div className="py-12 px-4 bg-gray-50/30">
        <ListPropertyForm />
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
