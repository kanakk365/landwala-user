"use client";

import { Heart, Bed, Bath, Square, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyProps {
  image: string;
  priceRange: string;
  location: string;
  pricePerSqft: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
}

export default function PropertyResultCard({
  property,
}: {
  property: PropertyProps;
}) {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden transition-shadow duration-300 border border-gray-100">
      {/* Image Section */}
      <Link
        href="/search-result-detail"
        className="md:w-2/5 relative rounded-xl h-64 md:h-auto block"
      >
        <div className="relative rounded-xl w-full h-full overflow-hidden">
          <Image
            src={property.image}
            alt={property.location}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 md:w-3/5 flex flex-col justify-between relative">
        <button className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors">
          <Heart className="w-6 h-6" />
        </button>

        <div>
          <h3 className="text-[#2e3675] text-2xl font-bold mb-2">
            {property.priceRange}
          </h3>

          <div className="flex items-center text-gray-600 mb-2">
            <p className="text-base">{property.location}</p>
          </div>

          <p className="text-[#2e3675] text-sm font-medium mb-6">
            {property.pricePerSqft}
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-gray-400" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-gray-400" />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-5 h-5 text-gray-400" />
            <span>{property.area}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
