"use client";

import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { searchApi, SearchResult } from "@/lib/api";
import PropertyResultCard from "./PropertyResultCard";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const response = await searchApi.search(query);
          setResults(response.data);
          setHasSearched(true);
        } catch (error) {
          console.error("Search failed", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <section className="py-8 bg-white border-b border-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search by location, property name, or keywords..."
              className="w-full px-6 py-4 pl-14 rounded-full bg-white border border-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#f7ae49] focus:border-transparent text-lg text-gray-700 transition-shadow"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            {loading && (
              <Loader2 className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#1d2567] w-6 h-6 animate-spin" />
            )}
          </div>

          {hasSearched && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {results.length > 0 ? (
                results.map((item, index) => {
                  if (item.type === "property" && item.property) {
                    return (
                      <PropertyResultCard
                        key={item.property.id || index}
                        property={item.property}
                      />
                    );
                  }
                  return null;
                })
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500 text-lg">
                    No properties found matching &quot;{query}&quot;
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
