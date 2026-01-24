"use client";

import { useState, useEffect } from "react";
import { propertiesApi, Property } from "@/lib/api";
import Link from "next/link";

export default function PropertiesSection({
  title = "Explore Nearby Properties",
  showViewAll = true,
  isFeatured = false,
}: {
  title?: string;
  showViewAll?: boolean;
  isFeatured?: boolean;
}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertiesApi.getProperties({
          limit: 3,
          isFeatured: isFeatured || undefined,
        });
        setProperties(response.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [isFeatured]);

  if (loading) {
    return (
      <section className="py-12 max-w-7xl mx-auto bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-black">{title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[300px] w-full rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 max-w-7xl mx-auto bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-black">{title}</h2>
          </div>
          <div className="text-center py-12 text-gray-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 max-w-7xl mx-auto bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-black">{title}</h2>
          {showViewAll && (
            <Link
              href="/latest-listings"
              className="text-sm font-medium text-[#1d2567] hover:text-orange-500"
            >
              View all
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No properties found
            </div>
          ) : (
            properties.map((prop) => (
              <Link
                href={`/property-details/${prop.id}`}
                key={prop.id}
                className="group relative h-[300px] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
              >
                {/* Image */}
                <img
                  src={
                    prop.images?.[0] ||
                    "https://placehold.co/600x400/556655/FFFFFF?text=Property"
                  }
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Featured Badge */}
                {prop.isFeatured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1 rounded-full text-xs font-semibold text-white">
                    Featured
                  </div>
                )}

                {/* Rating Badge - using overview fields if available */}
                {prop.overviewFields?.length > 0 && (
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 border border-white/30">
                    <span className="text-yellow-400">★</span> 4.8
                  </div>
                )}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-bold mb-1 tracking-wide line-clamp-1">
                        {prop.title}
                      </h3>
                      <p className="text-sm text-gray-300 font-normal mb-2 line-clamp-1">
                        {prop.locationAddress || `${prop.city}, ${prop.state}`}
                      </p>
                      <span className="font-bold text-sm tracking-wide">
                        Land | {prop.priceRange}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="text-white hover:text-orange-500 transition-colors mb-1"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.755 15.1308C32.3985 13.9747 31.7599 12.8885 30.7806 11.9175C30.0095 11.1531 29.2093 10.6489 28.4064 10.3438M17.9276 7.14743C15.0422 5.31713 10.3824 3.58636 6.35826 7.69012C-3.19433 17.4317 13.1875 36.2035 20.6871 36.2035C28.1866 36.2035 44.5685 17.4317 35.0159 7.69012C30.9918 3.58641 26.332 5.31715 23.4467 7.14744C21.8163 8.18163 19.5579 8.18163 17.9276 7.14743Z"
                          stroke="currentColor"
                          strokeWidth="2.58597"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
