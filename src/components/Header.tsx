"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { Bell, UserCircle, Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { isAuthenticated, user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="LandWalaa Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#1d2567]">Land</span>
            <span className="text-[#f7ae49]">Walaa</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors border-b-2 border-transparent hover:border-[#f7ae49]"
          >
            Home
          </Link>
          <Link
            href="/properties"
            className="text-lg font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors"
          >
            Properties
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors"
          >
            About us
          </Link>
          <Link
            href="/team"
            className="text-lg font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors"
          >
            Team
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors"
          >
            Contact us
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          {mounted && isAuthenticated ? (
            <>
              <Link
                href="/wishlist"
                className="text-[#1d2567] hover:text-[#f7ae49] transition-colors"
              >
                <Heart className="w-7 h-7" />
              </Link>
              <button className="text-[#1d2567] hover:text-[#f7ae49] transition-colors relative">
                <Bell className="w-7 h-7" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <Link
                href="/profile"
                className="text-[#1d2567] hover:text-[#f7ae49] transition-colors"
              >
                <UserCircle className="w-8 h-8" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-BASE font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-5 py-1 text-BASE font-medium text-[#1d2567] border-2 border-[#1d2567] rounded-lg hover:bg-[#1d2567] hover:text-white transition-colors"
              >
                Sign Up Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
