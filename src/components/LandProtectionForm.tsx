"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandProtectionForm() {
  return (
    <div className="max-w-xl mx-auto mb-20">
      {/* Header - Outside the box */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Land Protection
        </h1>
        <p className="text-gray-500">Get in touch for Land Protection</p>
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

              {/* Location (User) */}
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Mobile Number with Country Code */}
              <div className="flex gap-2">
                <div className="relative w-24 flex-shrink-0">
                  <div className="w-full border border-gray-200 rounded-xl px-2 py-4 flex items-center justify-center gap-1 bg-white cursor-pointer hover:border-[#2D336B] transition-colors">
                    {/* Placeholder generic flag or just circle */}
                    <div className="w-6 h-6 rounded-full overflow-hidden relative border border-gray-200">
                      {/* Assuming Indian flag as per common context or generic */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 480"
                        className="w-full h-full object-cover"
                      >
                        <g fillRule="evenodd">
                          <path fill="#f93" d="M0 0h640v160H0z" />
                          <path fill="#fff" d="M0 160h640v160H0z" />
                          <path fill="#128807" d="M0 320h640v160H0z" />
                          <g transform="translate(320 240) scale(6.4)">
                            <circle r="12" fill="#008" />
                            <circle r="10" fill="#fff" />
                            <circle r="2" fill="#008" />
                            <g id="d">
                              <g id="c">
                                <g id="b">
                                  <g id="a">
                                    <circle
                                      r="1"
                                      transform="rotate(7.5 -8.76 47.906)"
                                      fill="#008"
                                    />
                                    <path
                                      fill="#008"
                                      d="M0-12v12h.5z"
                                      transform="rotate(15 0 -12)"
                                    />
                                  </g>
                                  <use href="#a" transform="rotate(30)" />
                                </g>
                                <use href="#b" transform="rotate(60)" />
                              </g>
                              <use href="#c" transform="rotate(120)" />
                            </g>
                            <use href="#d" transform="rotate(180)" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Enter your mobile number"
                  className="flex-1 border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
                />
              </div>

              {/* Land Location */}
              <input
                type="text"
                placeholder="Land Location"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Land Area */}
              <input
                type="text"
                placeholder="Land Area (sq. ft/acres)"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Pincode (or Location as per screenshot bottom fields) */}
              <input
                type="text"
                placeholder="Location"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              <input
                type="text"
                placeholder="Pincode"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Link href="/quote-success" className="w-full">
            <button className="w-full bg-[#2D336B] text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-[#1f2455] transition-colors text-lg">
              Request Quote
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
