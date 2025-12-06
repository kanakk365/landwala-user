"use client";

import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
  MapPin,
  Heart,
  Share2,
  ArrowLeft,
  Layout,
  Home,
  Clock,
  CalendarCheck,
  Download,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PropertyDetailsPage() {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    "/hero.png", // Main image placeholder
    "https://placehold.co/800x600/e2e8f0/1e293b?text=Image+2",
    "https://placehold.co/800x600/e2e8f0/1e293b?text=Image+3",
    "https://placehold.co/800x600/e2e8f0/1e293b?text=Image+4",
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Top Navbar for Detail Page */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/explore-results"
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Detail</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Left Column: Image Gallery & Project Info (3/5 width) */}
          <div className="lg:col-span-3">
            {/* Gallery */}
            <div className="mb-8">
              {/* Main Image */}
              <div className="relative h-[400px] w-full mb-4 rounded-3xl overflow-hidden shadow-sm bg-gray-100">
                <Image
                  src={images[activeImage]}
                  alt="Property Main"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx + 1)}
                    className="relative h-28 rounded-2xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Details */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Family House 3A, Preston Avenue
              </h2>
              <div className="text-blue-500 font-medium text-lg mb-2">
                Land | ₹ 3.19 - 3.82 Cr
              </div>
              <div className="text-gray-600 mb-1">
                Marketed by FORTUNE BUTTERFLY CITY
              </div>
              <div className="text-gray-500">
                Srisailam Highway, South Hyderabad, Hyderabad
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#F7AE49] hover:bg-[#e6a03e] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                Download Brochure
                <Download className="w-5 h-5" />
              </button>
              <button className="flex-1 bg-[#2e3675] hover:bg-[#232958] text-white font-semibold py-4 rounded-xl transition-colors">
                Get more details
              </button>
            </div>
          </div>

          {/* Right Column: Layout & Pricing (2/5 width) */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50/50 rounded-3xl p-6 h-full border border-gray-100">
              <div className="mb-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  Land Layout and Pricing
                </h3>
                <span className="bg-[#F7AE49] text-white text-xs px-3 py-1.5 rounded-md font-medium">
                  Residential land
                </span>
              </div>

              {/* Layout Map Placeholder */}
              <div className="relative w-full aspect-[3/4] bg-white rounded-xl overflow-hidden border border-gray-200">
                {/* Placeholder Image for Map */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
                  <div className="text-center">
                    <Layout className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <span className="text-sm">Layout Map Image</span>
                  </div>
                </div>
                {/* Using a placeholder image if available, else just the div above */}
                <Image
                  src="https://placehold.co/600x800/f3f4f6/9ca3af?text=Layout+Map"
                  alt="Layout Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="bg-gray-100 rounded-3xl p-8 mb-8">
          <h3 className="text-gray-700 font-medium mb-8">
            FORTUNE BUTTERFLY CITY - Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            {/* Item 1 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shrink-0">
                <Layout className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Sizes</p>
                <p className="text-[#2e3675] font-medium">165 - 500 sq.yd.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shrink-0">
                <Layout className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Sizes</p>
                <p className="text-[#2e3675] font-medium">165 - 500 sq.yd.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shrink-0">
                <Home className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Type</p>
                <p className="text-[#2e3675] font-medium">Residential Plots</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shrink-0">
                <Clock className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Possession Status</p>
                <p className="text-[#2e3675] font-medium">Ready to Move</p>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shrink-0">
                <Home className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Avg Price</p>
                <p className="text-[#2e3675] font-medium">Residential Plots</p>
              </div>
            </div>

            {/* Item 6 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white rounded-xl shrink-0">
                <CalendarCheck className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completion Date</p>
                <p className="text-[#2e3675] font-medium">Ready to Move</p>
              </div>
            </div>
          </div>
        </section>

        {/* More About Section */}
        <section className="bg-gray-100 rounded-3xl p-8 mb-20">
          <h3 className="font-bold text-gray-800 mb-4">
            More about FORTUNE BUTTERFLY CITY
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            For those looking to buy a residential property, here comes one of
            the choicest offerings in Gurgaon, at Sector 59. Brought to you by
            Paras Buildtech, Paras Floret is among the newest addresses for home{" "}
            <span className="text-blue-500 font-medium cursor-pointer">
              ...more
            </span>
          </p>
        </section>
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
