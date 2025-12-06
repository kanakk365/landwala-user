"use client";

import { CloudUpload, ChevronLeft, Trash2, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LegalVerificationForm() {
  const [documents, setDocuments] = useState({
    titleDeed: null as File | null,
    saleAgreement: null as File | null,
    taxReceipt: null as File | null,
    ec: null as File | null,
  });

  // Mock function to handle file "upload" simulation
  const handleFileChange = (field: keyof typeof documents) => {
    // Simulating a file object for display purposes
    const mockFile = { name: `${field}.pdf` } as File;
    setDocuments((prev) => ({ ...prev, [field]: mockFile }));
  };

  const handleRemoveFile = (field: keyof typeof documents) => {
    setDocuments((prev) => ({ ...prev, [field]: null }));
  };

  const renderUploadBox = (label: string, field: keyof typeof documents) => {
    const file = documents[field];

    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        {file ? (
          // File Selected State
          <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                {/* PDF Icon - simplified using div or image if available, using text for now or icon */}
                <FileText className="text-red-500 w-6 h-6" />
              </div>
              <span className="text-gray-900 font-medium text-sm md:text-base cursor-pointer hover:underline truncate max-w-[150px] sm:max-w-xs">
                {file.name}
              </span>
            </div>
            <button
              onClick={() => handleRemoveFile(field)}
              className="w-10 h-10 bg-[#1d2567] rounded-full flex items-center justify-center hover:bg-[#151b4d] transition-colors"
            >
              <Trash2 className="text-white w-5 h-5" />
            </button>
          </div>
        ) : (
          // Empty Upload State
          <div
            className="border-2 border-dashed border-[#2D336B]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
            onClick={() => handleFileChange(field)}
          >
            <CloudUpload className="w-8 h-8 text-[#2D336B] mb-3 group-hover:scale-110 transition-transform" />
            <p className="text-gray-500 text-sm mb-1 text-center">
              Accepted formats: PDF, JPG, PNG.
            </p>
            <span className="text-[#2D336B] font-bold text-sm">
              Browse Files
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-xl mx-auto mb-20">
      {/* Header with Back Button - Inside component or page lebel? 
          Design shows arrow inside a header context "Upload Documents". 
          We'll keep main header outside as per other forms, but this specific title is "Upload Documents" 
      */}

      {/* Box Form */}
      <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-gray-100">
        {/* Inner Header matching mobile design */}
        <div className="flex items-center mb-6">
          <Link href="/" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Upload Documents</h1>
        </div>

        <p className="text-gray-500 text-sm mb-8">
          Accepted formats: PDF, JPG, PNG.
        </p>

        {/* Form Content */}
        <div className="w-full">
          {renderUploadBox("Title Deed", "titleDeed")}
          {renderUploadBox("Sale Agreement", "saleAgreement")}
          {renderUploadBox("Tax Receipt", "taxReceipt")}
          {renderUploadBox("Encumbrance Certificate (EC)", "ec")}

          {/* Submit Button */}
          <button className="w-full bg-[#1d2567] text-white font-semibold py-4 rounded-full shadow-lg hover:bg-[#151b4d] transition-colors text-base mt-4">
            Submit for Verification
          </button>
        </div>
      </section>
    </div>
  );
}
