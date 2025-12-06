import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="LandWala Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-[#1d2567]">Land</span>
            <span className="text-[#f7ae49]">Wala</span>
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
            href="/services"
            className="text-lg font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors"
          >
            Services
          </Link>
          <Link
            href="/plots"
            className="text-lg font-medium text-[#1d2567] hover:text-[#f7ae49] transition-colors"
          >
            Plots
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
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
}
