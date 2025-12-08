"use client";

import { useState, useRef } from "react";
import { CloudUpload, ChevronDown, Loader2, X } from "lucide-react";
import { propertySubmissionApi } from "@/lib/api";
import SuccessModal from "@/components/SuccessModal";

export default function ListPropertyForm() {
  const [formData, setFormData] = useState({
    title: "", // Location maps to title in this context based on user request? 
    // Wait, the user request has 'title=Alixa Plot', 'size', 'facing', 'description'. 
    // The previous form had 'Location' input inside. 
    // Should I replace 'Location' with Title? Or treat 'Location' as title?
    // The previous form labels were: Location, Size, Facing, Description.
    // The cURL has: title, size, facing, description.
    // I will rename the first input to "Title / Location" or just "Title" to match the API.
    // Actually typically title is like "Alixa Plot", location is a separate field usually, but the cURL only has title.
    // I will add a 'Location' field but map it to description or maybe just stick to the requested fields.
    // The requested fields are explicitly: title, size, facing, description.
    // I will change the form to have "Title" as the first input.
    size: "",
    facing: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);
  const [layoutImages, setLayoutImages] = useState<File[]>([]);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const layoutImageInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "layout") => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      if (type === "image") {
        setImages((prev) => [...prev, ...newFiles]);
      } else {
        setLayoutImages((prev) => [...prev, ...newFiles]);
      }
    }
  };

  const removeFile = (index: number, type: "image" | "layout") => {
    if (type === "image") {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setLayoutImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.title || !formData.size || !formData.facing || !formData.description) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await propertySubmissionApi.submit({
        title: formData.title,
        size: formData.size,
        facing: formData.facing,
        description: formData.description,
        image: images,
        layoutImage: layoutImages,
      });

      setShowSuccess(true);
      // Reset form
      setFormData({
        title: "",
        size: "",
        facing: "",
        description: "",
      });
      setImages([]);
      setLayoutImages([]);
    } catch (err) {
      console.error("Submission failed", err);
      setError("Failed to submit property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-20">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Property Listed Successfully!"
        message="Your property details have been submitted for review."
      />

      {/* Header - Outside the box */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          List Your Property
        </h1>
        <p className="text-gray-500">Add details here to list your property</p>
      </div>

      {/* Box Form */}
      <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-8">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-1">
              Basic Details
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter your details here to list your Plot
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Title / Project Name */}
              <input
                type="text"
                name="title" // Changed from Location to Title as per API requirement
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Property Title / Project Name"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
                required
              />

              {/* Size */}
              <div className="relative">
                {/* Changed to input for flexibility as per previous request to have text inputs if needed, 
                    but sticking to text input for size allowing e.g. "20 acres" */}
                {/* Or keeping it as select if user wants strictly select? 
                    The cURL says 'size=20 acres'. It's simpler to make it a text input to allow '20 acres'.
                    But I'll check if existing select had specific values. It had 1200/2400 sqft.
                    I will change to input to be flexible like the cURL example "20 acres".
                */}
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="Size (e.g. 1200 sqft, 20 acres)"
                  className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
                  required
                />
              </div>

              {/* Facing */}
              <div className="relative">
                <select
                  name="facing"
                  value={formData.facing}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Facing
                  </option>
                  <option value="East">East</option>
                  <option value="West">West</option>
                  <option value="North">North</option>
                  <option value="South">South</option>
                  <option value="North-East">North-East</option>
                  <option value="North-West">North-West</option>
                  <option value="South-East">South-East</option>
                  <option value="South-West">South-West</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>

              {/* Description */}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal resize-none"
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Property Images
            </label>
            <input
              type="file"
              ref={imageInputRef}
              onChange={(e) => handleFileChange(e, "image")}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => imageInputRef.current?.click()}
              className="border-2 border-dashed border-[#2D336B]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <CloudUpload className="w-8 h-8 text-[#2D336B] mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-900 font-medium mb-1">
                {images.length > 0
                  ? `${images.length} file(s) selected`
                  : "Upload Property Images"}
              </p>
              <span className="text-[#2D336B] font-bold text-sm">
                Browse Files
              </span>
            </div>
            {/* File List */}
            {images.length > 0 && (
              <div className="mt-4 space-y-2">
                {images.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg text-sm border border-gray-100"
                  >
                    <span className="text-gray-600 truncate max-w-[80%]">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index, "image")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Layout Image Upload */}
          <div className="mb-10">
            <label className="block text-gray-700 font-medium mb-2">
              Layout Images (optional)
            </label>
            <input
              type="file"
              ref={layoutImageInputRef}
              onChange={(e) => handleFileChange(e, "layout")}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={() => layoutImageInputRef.current?.click()}
              className="border-2 border-dashed border-[#2D336B]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <CloudUpload className="w-8 h-8 text-[#2D336B] mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-900 font-medium mb-1">
                {layoutImages.length > 0
                  ? `${layoutImages.length} file(s) selected`
                  : "Upload Layout Images"}
              </p>
              <span className="text-[#2D336B] font-bold text-sm">
                Browse Files
              </span>
            </div>
            {/* File List */}
            {layoutImages.length > 0 && (
              <div className="mt-4 space-y-2">
                {layoutImages.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg text-sm border border-gray-100"
                  >
                    <span className="text-gray-600 truncate max-w-[80%]">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(index, "layout")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2D336B] text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-[#1f2455] transition-colors text-lg disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Add Property"
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
