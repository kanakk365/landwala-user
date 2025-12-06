"use client";

import { CloudUpload, ChevronDown } from "lucide-react";

export default function ListPropertyForm() {
  return (
    <div className="max-w-2xl mx-auto mb-20">
      {/* Header - Outside the box */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          List Your Property
        </h1>
        <p className="text-gray-500">Add details here to list your property</p>
      </div>

      {/* Box Form */}
      <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
        {/* Form Content */}
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-1">
              Basic Details
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter your details here to list your Plot
            </p>

            <div className="space-y-5">
              {/* Location */}
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Size */}
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white appearance-none coursor-pointer">
                  <option value="" disabled selected>
                    Size
                  </option>
                  <option value="1200">1200 sqft</option>
                  <option value="2400">2400 sqft</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Facing */}
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white appearance-none coursor-pointer">
                  <option value="" disabled selected>
                    Facing
                  </option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Description */}
              <input
                type="text"
                placeholder="Description"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Image
            </label>
            <div className="border-2 border-dashed border-[#2D336B]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
              <CloudUpload className="w-8 h-8 text-[#2D336B] mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-900 font-medium mb-1">Upload the Image</p>
              <span className="text-[#2D336B] font-bold text-sm">
                Browse Files
              </span>
            </div>
          </div>

          {/* Layout Image Upload */}
          <div className="mb-10">
            <label className="block text-gray-700 font-medium mb-2">
              Layout Image (optional)
            </label>
            <div className="border-2 border-dashed border-[#2D336B]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
              <CloudUpload className="w-8 h-8 text-[#2D336B] mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-900 font-medium mb-1">Upload the Image</p>
              <span className="text-[#2D336B] font-bold text-sm">
                Browse Files
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#2D336B] text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-[#1f2455] transition-colors text-lg">
            Add Plot
          </button>
        </div>
      </section>
    </div>
  );
}
