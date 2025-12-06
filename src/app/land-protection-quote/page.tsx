"use client";

import Header from "@/components/Header";
import LandProtectionForm from "@/components/LandProtectionForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function LandProtectionQuotePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <div className="py-12 px-4 bg-gray-50/30">
        <LandProtectionForm />
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
