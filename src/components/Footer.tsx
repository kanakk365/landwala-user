import { Icon } from "@iconify/react";
import Link from "next/link";

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
            <h4 className="font-bold text-gray-900 text-lg">Quick Links</h4>
            <div className="flex flex-col gap-4 text-gray-600 text-base font-medium">
              <Link href="/" className="hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link
                href="/#properties"
                className="hover:text-gray-900 transition-colors"
              >
                Properties
              </Link>
              <Link
                href="/#categories"
                className="hover:text-gray-900 transition-colors"
                scroll={true}
              >
                Our Categories
              </Link>
              <Link
                href="/#quick-actions"
                className="hover:text-gray-900 transition-colors"
                scroll={true}
              >
                Quick Actions
              </Link>
              <Link
                href="/#contact-us"
                className="hover:text-gray-900 transition-colors"
                scroll={true}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Follow Us Column */}
          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-gray-900 text-lg">Follow us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Icon icon="skill-icons:instagram" width="30" height="30" />
              </a>
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Icon icon="logos:facebook" width="30" height="30" />
              </a>
              <a
                href="#"
                className="hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <Icon icon="devicon:linkedin" width="30" height="30" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
