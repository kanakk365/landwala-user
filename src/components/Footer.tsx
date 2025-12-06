import { Instagram, Facebook, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-16 border-t border-gray-100 relative max-w-7xl mx-auto">
      {/* Decorative Plus Icon */}
      <div className="absolute top-12 right-6 text-orange-400 text-xl font-light">
        +
      </div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-20 md:gap-32 items-start">
          {/* Company Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-gray-900 text-lg">Company</h4>
            <div className="flex flex-col gap-4 text-gray-600 text-base font-medium">
              <a href="#" className="hover:text-gray-900 transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Careers
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                FAQs
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Teams
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Follow Us Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-gray-900 text-lg">Follow us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-[#E1306C] hover:opacity-80 transition-opacity"
              >
                <Instagram size={28} strokeWidth={2.5} />
              </a>
              <a
                href="#"
                className="text-[#4267B2] hover:opacity-80 transition-opacity"
              >
                <Facebook size={28} strokeWidth={0} fill="currentColor" />
              </a>
              <a
                href="#"
                className="text-black hover:opacity-80 transition-opacity"
              >
                <Github size={28} strokeWidth={0} fill="currentColor" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
