"use client";

import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Image from "next/image";

import Link from "next/link";

export default function LoanEligibilityPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Header />

      <div className="flex-grow flex flex-col items-center py-20 ">
        <h1 className="text-2xl font-semibold text-black mb-20 text-center">
          Check Loan Eligibility
        </h1>

        <div className="flex flex-col items-center text-center max-w-xl">
          {/* Illustration */}
          <div className="relative w-72 h-64 mb-8">
            <Image
              src="/eligibility.svg"
              alt="Loan Eligibility Illustration"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold text-black mb-3">
            No Loan Applications Yet
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Check your eligibility and apply for property loans with trusted
            Landwala partners.
          </p>
          <Link href="/check-loan-eligibility">
            <button className="bg-[#1d2567] text-white px-12 py-4 rounded-full font-semibold shadow-xl hover:opacity-90 transition-opacity">
              Check Eligibility
            </button>
          </Link>
        </div>
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
