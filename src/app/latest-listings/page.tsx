"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PropertyResultCard from "@/components/PropertyResultCard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LatestListingsHero from "@/components/LatestListingsHero";
import { propertiesApi, Property, PropertiesMeta } from "@/lib/api";

export default function LatestListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [meta, setMeta] = useState<PropertiesMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await propertiesApi.getLatestListings({
          page,
          limit: 10,
        });
        setProperties(response.data);
        setMeta(response.meta);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page]);

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <LatestListingsHero />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-gray-700">
            Latest Listings {meta ? `(${meta.total})` : ""}
          </h2>
          {meta && (
            <p className="text-sm text-gray-500">
              Showing page {meta.page} of {meta.totalPages}
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[200px] w-full rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => setPage(1)}
              className="px-6 py-2 bg-[#2e3675] text-white rounded-lg hover:bg-[#1d2567] transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No listings found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8">
              {properties.map((property) => (
                <PropertyResultCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!meta.hasPrevPage}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    meta.hasPrevPage
                      ? "bg-[#2e3675] text-white hover:bg-[#1d2567]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {Array.from(
                    { length: Math.min(5, meta.totalPages) },
                    (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors cursor-pointer ${
                            page === pageNum
                              ? "bg-[#2e3675] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    },
                  )}
                </div>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!meta.hasNextPage}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    meta.hasNextPage
                      ? "bg-[#2e3675] text-white hover:bg-[#1d2567]"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Contact />
      <Footer />
    </main>
  );
}
