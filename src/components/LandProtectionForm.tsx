"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { landProtectionApi, LandProtectionRequestData } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";

export default function LandProtectionForm() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    countryCode: "+91",
    landLocation: "",
    landArea: "",
    location: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.landLocation ||
      !formData.landArea ||
      !formData.location ||
      !formData.pincode
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const submitData: LandProtectionRequestData = {
        fullName: formData.fullName,
        phone: formData.phone,
        countryCode: formData.countryCode,
        landLocation: formData.landLocation,
        landArea: formData.landArea,
        location: formData.location,
        pincode: formData.pincode,
      };

      await landProtectionApi.requestQuote(submitData);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccess(false);
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto mb-20">
      {/* Header - Outside the box */}
      <div className="text-center mb-10">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Land Protection
        </h1>
        <p className="text-gray-500">Get in touch for Land Protection</p>
      </div>

      {/* Box Form */}
      <section className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
        {/* Form Content */}
        <div className="w-full">
          <div className="mb-8">
            <h2 className="text-lg text-center font-semibold text-gray-800 mb-1">
              Get Custom Quote
            </h2>
            <p className="text-gray-500 text-center text-sm mb-8">
              Enter your details here to register
            </p>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-5">
              {/* Full name */}
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Mobile Number with Country Code */}
              <div className="flex gap-2">
                <div className="relative w-24 flex-shrink-0">
                  <div className="w-full border border-gray-200 rounded-xl px-2 py-4 flex items-center justify-center gap-1 bg-white">
                    <div className="w-6 h-4 rounded-sm overflow-hidden relative flex flex-col">
                      <div className="bg-[#FF9933] h-1/3 w-full"></div>
                      <div className="bg-white h-1/3 w-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-blue-800 rounded-full"></div>
                      </div>
                      <div className="bg-[#138808] h-1/3 w-full"></div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  className="flex-1 border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
                />
              </div>

              {/* Land Location */}
              <input
                type="text"
                name="landLocation"
                value={formData.landLocation}
                onChange={handleChange}
                placeholder="Land Location"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Land Area */}
              <input
                type="text"
                name="landArea"
                value={formData.landArea}
                onChange={handleChange}
                placeholder="Land Area (sq. ft/acres)"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Location */}
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />

              {/* Pincode */}
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full border border-gray-200 rounded-xl px-5 py-4 text-gray-700 outline-none focus:border-[#2D336B] transition-colors bg-white font-normal"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#2D336B] hover:bg-[#1f2455] disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl shadow-lg transition-colors text-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Request Quote"
            )}
          </button>
        </div>
      </section>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleModalClose}
        title="Your Request has been Sent"
        message="We will notify you once the Admin accepts your request"
      />
    </div>
  );
}
