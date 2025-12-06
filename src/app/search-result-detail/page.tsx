"use client";

import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import {
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

export default function SearchResultDetailPage() {
  const [activeImage, setActiveImage] = useState(0);

  // Using placeholder images for the detail view
  const images = [
    "https://placehold.co/800x600/e2e8f0/1e293b?text=Main+Property",
    "https://placehold.co/800x600/e2e8f0/1e293b?text=Angle+2",
    "https://placehold.co/800x600/e2e8f0/1e293b?text=Angle+3",
    "https://placehold.co/800x600/e2e8f0/1e293b?text=Angle+4",
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 transition-all duration-300">
        {/* Top Navbar for Detail Page */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/latest-listings"
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
              <div className="relative h-[400px] w-full mb-4 rounded-3xl overflow-hidden shadow-sm bg-gray-100 group">
                <Image
                  src={images[activeImage]}
                  alt="Property Main"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx + 1)}
                    className={`relative h-28 rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 ${
                      activeImage === idx + 1
                        ? "ring-2 ring-[#2e3675] opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
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
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Family House 3A, Preston Avenue
              </h2>
              <div className="text-blue-600 font-semibold text-xl mb-3">
                Land | ₹ 3.19 - 3.82 Cr
              </div>
              <div className="text-gray-700 mb-1 font-medium">
                Marketed by FORTUNE BUTTERFLY CITY
              </div>
              <div className="text-gray-500">
                Srisailam Highway, South Hyderabad, Hyderabad
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="flex-1 bg-[#F7AE49] hover:bg-[#e6a03e] text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md">
                Download Brochure
                <Download className="w-5 h-5" />
              </button>
              <button className="flex-1 bg-[#2e3675] hover:bg-[#232958] text-white font-semibold py-4 rounded-xl transition-transform active:scale-95 shadow-md">
                Get more details
              </button>
            </div>
          </div>

          {/* Right Column: Layout & Pricing (2/5 width) */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-3xl p-6 h-full border border-gray-100 shadow-sm sticky top-24">
              <div className="mb-6 flex justify-between items-start">
                <h3 className="font-bold text-gray-900 text-lg">
                  Land Layout and Pricing
                </h3>
                <span className="bg-[#F7AE49] text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                  Residential land
                </span>
              </div>

              {/* Layout Map Placeholder */}
              <div className="relative w-full aspect-[3/5] bg-white rounded-2xl overflow-hidden border border-gray-200 group cursor-zoom-in shadow-inner">
                {/* Visual placeholder for complex map */}
                <Image
                  src="https://placehold.co/600x1000/f8fafc/cbd5e1?text=Map+Layout"
                  alt="Layout Map"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Hint */}
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                  <span className="bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    View Full Layout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <section className="bg-gray-100 rounded-3xl p-8 mb-8">
          <h3 className="text-gray-800 font-semibold mb-8 border-b border-gray-200 pb-4 inline-block">
            FORTUNE BUTTERFLY CITY - Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
            {/* Reusable Info Item */}
            <InfoItem
              icon={<Layout />}
              label="Sizes"
              value="165 - 500 sq.yd."
              subValue="165 - 500 sq.yd."
            />
            <InfoItem icon={<Home />} label="Type" value="Residential Plots" />
            <InfoItem
              icon={<Clock />}
              label="Possession Status"
              value="Ready to Move"
            />
            <InfoItem
              icon={<Home />}
              label="Avg Price"
              value="Residential Plots"
            />{" "}
            {/* Note: Label/Value match image but might be data error in source image, replicating as is */}
            <InfoItem
              icon={<CalendarCheck />}
              label="Completion Date"
              value="Ready to Move"
            />
            {/* Duplicate size item from image structure if needed, or remove */}
            <InfoItem
              icon={<Layout />}
              label="Sizes"
              value="165 - 500 sq.yd."
            />
          </div>
        </section>

        {/* More About Section */}
        <section className="bg-gray-100 rounded-3xl p-8 mb-20">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">
            More about FORTUNE BUTTERFLY CITY
          </h3>
          <p className="text-gray-600 text-base leading-relaxed">
            For those looking to buy a residential property, here comes one of
            the choicest offerings in Gurgaon, at Sector 59. Brought to you by
            Paras Buildtech, Paras Floret is among the newest addresses for home{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
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

function InfoItem({
  icon,
  label,
  value,
  subValue,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <div className="flex items-start gap-4 hover:bg-white/50 p-2 rounded-xl transition-colors">
      <div className="p-3 bg-white rounded-xl shrink-0 shadow-sm text-gray-400">
        {/* Clone element to modify size/color if needed, typically icon is passed as ready component */}
        <div className="w-6 h-6">{icon}</div>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-0.5">{label}</p>
        <p className="text-[#2e3675] font-semibold">{value}</p>
        {subValue && <p className="text-[#2e3675] font-semibold">{subValue}</p>}
      </div>
    </div>
  );
}
