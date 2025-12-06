"use client";

import { ChevronDown, CloudUpload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function LoanEligibilityForm() {
  const [tenure, setTenure] = useState(25);

  return (
    <div className="max-w-xl mx-auto mb-20">
      {/* Header - Outside the box */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Check Loan Eligibility
        </h1>
        <p className="text-gray-500">
          Find out how much property loan you qualify for.
        </p>
      </div>

      {/* Box Form */}
      <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
        {/* Form Content */}
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-1">
              Get Custom Quote
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter your details here to register
            </p>

            <div className="space-y-5">
              {/* Full name */}
              <input
                type="text"
                placeholder="Full name"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Monthly Income */}
              <input
                type="text"
                placeholder="Monthly Income (₹ input)"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Employment Type */}
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white appearance-none cursor-pointer">
                  <option value="" disabled selected>
                    Employment Type
                  </option>
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self Employed</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Loan Purpose */}
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white appearance-none cursor-pointer">
                  <option value="" disabled selected>
                    Loan Purpose
                  </option>
                  <option value="home-loan">Home Loan</option>
                  <option value="land-loan">Land Loan</option>
                  <option value="commercial-loan">Commercial Loan</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Desired Amount */}
              <input
                type="text"
                placeholder="Desired Amount"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Pincode */}
              <input
                type="text"
                placeholder="Pincode"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />
            </div>
          </div>

          {/* Upload Documents */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Documents
            </label>
            <div className="border-2 border-dashed border-[#2D336B]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
              <CloudUpload className="w-8 h-8 text-[#2D336B] mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-900 font-medium mb-1 text-center">
                PAN, Aadhar, Income Proof
              </p>
              <span className="text-[#2D336B] font-bold text-sm">
                Browse Files
              </span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="mb-10">
            <label className="block text-gray-700 font-medium mb-4">
              Loan Tenure
            </label>
            <div className="relative bg-gray-200 rounded-xl px-4 py-8">
              {/* Range Slider Track & Thumb visual - Simplified using standard input for functionality ideally but styling to match image */}
              <div className="w-full relative">
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    background: #1d2567;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    cursor: pointer;
                    margin-top: -8px; 
                  }
                  input[type="range"]::-moz-range-thumb {
                    background: #1d2567;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                  }
                  input[type="range"]::-webkit-slider-runnable-track {
                    background: transparent;
                  }
                `}</style>
                <div className="flex justify-between text-sm font-bold text-black mb-4 w-full px-1">
                  <span>0 years</span>
                  <span>50 years</span>
                </div>
                {/* Range Input */}
                <div className="relative w-full h-1 bg-gray-300 rounded-full">
                  {/* Track Background logic */}
                  <div
                    className="absolute top-0 left-0 h-1 bg-[#1d2567] rounded-full"
                    style={{ width: `${(tenure / 50) * 100}%` }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="absolute top-0 left-0 w-full h-1 opacity-100 cursor-pointer z-10"
                    style={{
                      background: "transparent",
                      WebkitAppearance: "none",
                    }}
                  />
                </div>
                <div className="text-center mt-4 font-semibold text-[#1d2567] text-lg">
                  {tenure} Years
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#2D336B] text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-[#1f2455] transition-colors text-lg">
            Check Eligibility
          </button>
        </div>
      </section>
    </div>
  );
}
