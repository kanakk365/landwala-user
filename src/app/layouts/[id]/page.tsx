"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SuccessModal from "@/components/SuccessModal";
import { layoutsApi, Layout, LayoutSlot, enquiriesApi } from "@/lib/api";
import {
    MapPin,
    Loader2,
    Grid3X3,
    Share2,
    Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LayoutDetailsPage() {
    const params = useParams();
    const layoutId = params.id as string;

    const [layout, setLayout] = useState<Layout | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<LayoutSlot | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [enquiryLoading, setEnquiryLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const fetchLayout = async () => {
            if (!layoutId) return;

            try {
                setLoading(true);
                const data = await layoutsApi.getLayoutById(layoutId);
                setLayout(data);
            } catch (err) {
                console.error("Error fetching layout:", err);
                setError("Failed to load layout details");
            } finally {
                setLoading(false);
            }
        };

        fetchLayout();
    }, [layoutId]);

    const handleEnquiry = async (slot: LayoutSlot) => {
        if (enquiryLoading || !layout) return;

        try {
            setEnquiryLoading(true);
            await enquiriesApi.submit({
                type: "PROPERTY",
                message: `I'm interested in Plot ${slot.plotNumber} (${slot.area}, ${slot.facing} facing) at ${layout.title}, ${layout.location}. Price: ${slot.priceFormatted}`,
            });
            setShowSuccessModal(true);
        } catch (err) {
            console.error("Error submitting enquiry:", err);
            alert("Failed to submit enquiry. Please try again.");
        } finally {
            setEnquiryLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "bg-green-500";
            case "sold":
                return "bg-red-500";
            case "not_available":
                return "bg-gray-500";
            default:
                return "bg-gray-400";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "available":
                return "Available";
            case "sold":
                return "Sold";
            case "not_available":
                return "Not Available";
            default:
                return status;
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-white font-sans text-gray-900">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-[#2e3675] mx-auto mb-4" />
                        <p className="text-gray-500">Loading layout details...</p>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    if (error || !layout) {
        return (
            <main className="min-h-screen bg-white font-sans text-gray-900">
                <Header />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <p className="text-gray-500 mb-4">{error || "Layout not found"}</p>
                        <Link
                            href="/layouts/explore"
                            className="px-6 py-2 bg-[#2e3675] text-white rounded-lg hover:bg-[#1d2567] transition-colors"
                        >
                            Back to Layouts
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white font-sans text-gray-900">
            <Header />

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-medium text-black">Layouts</h1>
                </div>

                {/* 1. Layout Summary Card */}
                <div className="bg-white border border-gray-100 rounded-3xl p-3 shadow-sm flex flex-col md:flex-row items-center gap-6 mb-12">
                    <div className="relative w-full md:w-[450px] h-[280px] rounded-2xl overflow-hidden shrink-0">
                        <Image
                            src={layout.imageUrl}
                            alt={layout.title}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="flex-1 w-full p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                    {layout.title}
                                </h2>
                                <p className="text-gray-500 text-lg mb-8">{layout.location}</p>
                                <p className="text-black font-bold text-xl">
                                    Land | {layout.priceRange}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Share2 className="w-6 h-6 text-gray-600" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Heart className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 2. Left Column: Map & Selector */}
                    <div className="lg:col-span-2">
                        {/* Visual Map */}
                        <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 mb-8 w-full">
                            <Image
                                src={layout.layoutImageUrl}
                                alt={`${layout.title} Map`}
                                width={1200}
                                height={800}
                                className="w-full h-auto object-contain"
                                unoptimized
                            />
                        </div>

                        {/* Plot Selection Grid */}
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">
                                Select a Plot
                            </h3>
                            <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-sm text-gray-600">Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="text-sm text-gray-600">Sold</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                    <span className="text-sm text-gray-600">Not Available</span>
                                </div>
                            </div>

                            {Object.entries(layout.slotsBySection).map(
                                ([section, slots]) => (
                                    <div key={section} className="mb-8 last:mb-0">
                                        <h4 className="text-md font-semibold text-gray-700 mb-4">
                                            {section}
                                        </h4>
                                        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                            {slots.map((slot) => (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot)}
                                                    disabled={slot.status !== "available"}
                                                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all ${selectedSlot?.id === slot.id
                                                            ? "bg-[#2e3675] text-white shadow-lg scale-110 z-10"
                                                            : slot.status === "available"
                                                                ? "bg-green-100 text-green-800 hover:bg-green-200 border border-green-200"
                                                                : slot.status === "sold"
                                                                    ? "bg-red-50 text-red-400 border border-red-100 cursor-not-allowed"
                                                                    : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                                                        }`}
                                                >
                                                    {slot.plotNumber}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    {/* 3. Right Column: Sticky Details */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            {selectedSlot ? (
                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase">
                                        PLOT NO : {selectedSlot.plotNumber}
                                    </h3>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start text-gray-700 font-medium">
                                            <span className="w-24 shrink-0 text-gray-900">
                                                Size :
                                            </span>
                                            <span>
                                                {selectedSlot.width &&
                                                    selectedSlot.height ? (
                                                    <>
                                                        {selectedSlot.width} X{" "}
                                                        {selectedSlot.height}
                                                    </>
                                                ) : null} ({selectedSlot.area})
                                            </span>
                                        </div>
                                        <div className="flex items-start text-gray-700 font-medium">
                                            <span className="w-24 shrink-0 text-gray-900">Facing :</span>
                                            <span>{selectedSlot.facing}</span>
                                        </div>
                                        <div className="flex items-start text-gray-700 font-medium">
                                            <span className="w-24 shrink-0 text-gray-900">
                                                Status :
                                            </span>
                                            <span
                                                className={`${selectedSlot.status === "available"
                                                        ? "text-green-600"
                                                        : "text-red-500"
                                                    }`}
                                            >
                                                {getStatusText(selectedSlot.status)}
                                            </span>
                                        </div>
                                        <div className="flex items-start text-gray-700 font-medium">
                                            <span className="w-24 shrink-0 text-gray-900">
                                                Price :
                                            </span>
                                            <span>{selectedSlot.priceFormatted}</span>
                                        </div>
                                    </div>

                                    {selectedSlot.status === "available" && (
                                        <button
                                            onClick={() => handleEnquiry(selectedSlot)}
                                            disabled={enquiryLoading}
                                            className="w-full bg-[#2e3675] hover:bg-[#232958] text-white font-medium py-3.5 rounded-lg transition-colors shadow-lg cursor-pointer disabled:opacity-70"
                                        >
                                            {enquiryLoading ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                "Request Details"
                                            )}
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
                                    <Grid3X3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        Select a Plot
                                    </h3>
                                    <p className="text-gray-500">
                                        Click on a plot number from the grid to view its details and pricing.
                                    </p>

                                    {/* Legend Reminder */}
                                    <div className="mt-8 pt-6 border-t border-gray-200 text-left">
                                        <p className="text-sm font-semibold mb-3">Statistics:</p>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Total Plots:</span>
                                                <span className="font-medium text-gray-900">{layout.totalSlots}</span>
                                            </div>
                                            <div className="flex justify-between text-green-700">
                                                <span>Available:</span>
                                                <span className="font-medium">{layout.availableSlots}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Contact />
            <Footer />

            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Your Enquiry has been Sent"
                message="We will notify you once the Admin responds to your enquiry"
            />
        </main>
    );
}
