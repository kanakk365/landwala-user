"use client";

import { ChevronDown, Flag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function LandRegistrationForm() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-xl mx-auto mb-20">
      {/* Header - Outside the box */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Land Registration
        </h1>
        <p className="text-gray-500">
          Get in Touch for Land Registration Assistance
        </p>
      </div>

      {/* Box Form */}
      <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 min-h-[600px] flex flex-col">
        {/* Form Content */}
        <div className="w-full flex-grow">
          <div className="mb-8 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Basic Details
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Enter your details here to register
            </p>

            {/* Progress Bar */}
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="flex flex-col items-center">
                <div
                  className={`h-1.5 w-24 rounded-full mb-2 ${
                    step >= 1 ? "bg-[#1d2567]" : "bg-gray-200"
                  }`}
                ></div>
                <span
                  className={`text-[10px] font-bold ${
                    step >= 1 ? "text-[#1d2567]" : "text-gray-400"
                  }`}
                >
                  Basic Information
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`h-1.5 w-24 rounded-full mb-2 ${
                    step >= 2 ? "bg-[#1d2567]" : "bg-gray-200"
                  }`}
                ></div>
                <span
                  className={`text-[10px] font-bold ${
                    step >= 2 ? "text-[#1d2567]" : "text-gray-400"
                  }`}
                >
                  Plot Information
                </span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Full Name */}
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Mobile Number */}
              <div className="flex w-full border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#2D336B] transition-colors bg-white">
                <div className="flex items-center px-4 border-r border-gray-200 gap-2 bg-gray-50/10">
                  {/* Simplified Flag Icon Placeholder */}
                  <div className="w-6 h-4 relative rounded-sm overflow-hidden bg-gray-100 flex flex-col">
                    <div className="bg-[#FF9933] h-1/3 w-full"></div>
                    <div className="bg-white h-1/3 w-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-blue-800 rounded-full"></div>
                    </div>
                    <div className="bg-[#138808] h-1/3 w-full"></div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  className="flex-1 px-5 py-4 text-gray-700 outline-none font-normal"
                />
              </div>

              {/* Email Id */}
              <input
                type="email"
                placeholder="E mail Id"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#2D336B] text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-[#1f2455] transition-colors text-lg mt-8"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Location */}
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Area of the Land */}
              <input
                type="text"
                placeholder="Area of the Land"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Type of Plot */}
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white appearance-none cursor-pointer">
                  <option value="" disabled selected>
                    Type of Plot
                  </option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Email Id (as per image, likely redundant or meant to be Pincode, keeping as Email to match design strictness) or maybe user made specific requirement */}
              <input
                type="email" // Keeping type email to match label
                placeholder="E mail Id"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              <Link href="/quote-success" className="block w-full mt-8">
                <button className="w-full bg-[#2D336B] text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-[#1f2455] transition-colors text-lg">
                  Submit Enquiry
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
