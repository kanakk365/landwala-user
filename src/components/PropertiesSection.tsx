import { Heart } from "lucide-react";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  rating?: number;
}

const properties: Property[] = [
  {
    id: 1,
    title: "Pragati resorts - Phase II",
    location: "Hyderbad, Telangana",
    price: "₹ 3.19 - 3.82 Cr",
    image: "https://placehold.co/600x400/556655/FFFFFF?text=Property+1",
    rating: 4.6,
  },
  {
    id: 2,
    title: "Aliza Plot",
    location: "Hyderbad, Telangana",
    price: "₹ 3.19 - 3.82 Cr",
    image: "https://placehold.co/600x400/665555/FFFFFF?text=Property+2",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Rajeshwar Lands",
    location: "Hyderbad, Telangana",
    price: "₹ 3.19 - 3.82 Cr",
    image: "https://placehold.co/600x400/555566/FFFFFF?text=Property+3",
  },
];

export default function PropertiesSection({
  title = "Explore Nearby Properties",
  showViewAll = true,
}: {
  title?: string;
  showViewAll?: boolean;
}) {
  return (
    <section className="py-12 max-w-7xl mx-auto bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold text-black">{title}</h2>
          {showViewAll && (
            <a
              href="#"
              className="text-sm font-medium text-[#1d2567] hover:text-orange-500"
            >
              View all
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="group relative h-[300px] w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
            >
              {/* Image */}
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Rating Badge */}
              {prop.rating && (
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 border border-white/30">
                  <span className="text-yellow-400">★</span> {prop.rating}
                </div>
              )}

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-xl font-bold mb-1 tracking-wide">{prop.title}</h3>
                        <p className="text-sm text-gray-300 font-normal mb-2">{prop.location}</p>
                        <span className="font-bold text-sm tracking-wide">Land | {prop.price}</span>
                    </div>
                    
                    <button className="text-white hover:text-orange-500 transition-colors mb-1">
                        <svg width="24" height="24" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M32.755 15.1308C32.3985 13.9747 31.7599 12.8885 30.7806 11.9175C30.0095 11.1531 29.2093 10.6489 28.4064 10.3438M17.9276 7.14743C15.0422 5.31713 10.3824 3.58636 6.35826 7.69012C-3.19433 17.4317 13.1875 36.2035 20.6871 36.2035C28.1866 36.2035 44.5685 17.4317 35.0159 7.69012C30.9918 3.58641 26.332 5.31715 23.4467 7.14744C21.8163 8.18163 19.5579 8.18163 17.9276 7.14743Z" stroke="currentColor" strokeWidth="2.58597" strokeLinecap="round"/>
                        </svg>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
