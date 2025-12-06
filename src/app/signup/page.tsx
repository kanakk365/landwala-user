"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-sans text-gray-900 flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#2D55FB]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2D55FB]/30 rounded-full blur-[100px] pointer-events-none" />

      <Header />

      <div className="flex-grow flex items-center justify-center p-4 py-12 relative z-10">
        <div className="bg-white rounded-[32px] shadow-xl w-full max-w-5xl p-8 md:p-16 border border-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            <span className="text-[#F7AE49]">Getting Started</span>{" "}
            <span className="text-[#1d2567]">- Create an Account</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-600 font-medium mb-2 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="balamia@gmail.com" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2 text-sm">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Mobile number"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-2 text-sm">
                  Location
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 appearance-none bg-white cursor-pointer placeholder:text-gray-400">
                    <option value="" disabled selected>
                      Select your city
                    </option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="mumbai">Mumbai</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1d2567]" />
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col">
              <div>
                <label className="block text-gray-600 font-medium mb-2 text-sm">
                  Employment
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 appearance-none bg-white cursor-pointer">
                    <option value="" disabled selected>
                      Select your employement
                    </option>
                    <option value="salaried">Salaried</option>
                    <option value="self-employed">Self Employed</option>
                    <option value="business">Business</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1d2567]" />
                </div>
              </div>

              <div className="flex-grow"></div>

              <div className="space-y-4 pt-2">
                <button className="w-full bg-[#dbeafe] hover:bg-blue-100 text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <svg
                    className="w-5 h-5 mb-0.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.04.86-2.17.59-2.93-.5-4.04-5.83-2.67-10.97 1.35-11.16 1.15-.05 1.95.59 2.58.59.61 0 1.57-.61 2.9-.53 2.14.12 3.19.98 3.63 2.22-.05.03-2.11 1.25-2.17 4.77.06 3.84 3.39 5.16 3.4 5.17-.03.09-.52 1.83-1.63 3.42-.51.74-1.04 1.47-1.74 1.47zM14.65 6.27c.64-1.12.98-2.31.84-3.53-1.2.14-2.33.81-3.07 1.67-.68.79-1.25 2.05-1.02 3.2 1.33.11 2.62-.64 3.25-1.34z" />
                  </svg>
                  Continue with Apple
                </button>

                <button className="w-full bg-[#dbeafe] hover:bg-blue-100 text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </button>

                {/* Create Account Button */}
                <button className="w-full bg-[#1d2567] hover:bg-[#151b4d] text-white font-semibold py-3 rounded-lg shadow-md transition-colors">
                  Create account
                </button>

                {/* Login Link */}
                <div className="text-center mt-4">
                  <span className="text-gray-400 text-sm">
                    Already Have An Account ?{" "}
                  </span>
                  <Link
                    href="/login"
                    className="text-[#1d2567] font-semibold text-sm hover:underline"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
