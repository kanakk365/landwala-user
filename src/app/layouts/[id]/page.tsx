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
    ArrowLeft,
    Heart,
    Share2,
    Grid3X3,
    ChevronRight,
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
                            href="/layouts"
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

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
                {/* Top Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/layouts"
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6 text-gray-700" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Layout Details</h1>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                            <Share2 className="w-6 h-6 text-gray-700" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                            <Heart className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Layout Header */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Layout Preview Image */}
                    <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
                        <Image
                            src={layout.imageUrl}
                            alt={layout.title}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>

                    {/* Layout Map */}
                    <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                        <Image
                            src={layout.layoutImageUrl}
                            alt={`${layout.title} Map`}
                            fill
                            className="object-contain p-4"
                            unoptimized
                        />
                    </div>
                </div>

                {/* Layout Info */}
                <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {layout.title}
                            </h2>
                            <div className="flex items-center text-gray-500">
                                <MapPin className="w-4 h-4 mr-1" />
                                {layout.location}
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-[#2e3675] font-bold text-2xl">
                                {layout.priceRange}
                            </p>
                            <p className="text-gray-500 text-sm">Price Range</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">
                                {layout.totalSlots}
                            </p>
                            <p className="text-sm text-gray-500">Total Plots</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">
                                {layout.availableSlots}
                            </p>
                            <p className="text-sm text-gray-500">Available</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-red-500">
                                {layout.notAvailableSlots}
                            </p>
                            <p className="text-sm text-gray-500">Sold/Reserved</p>
                        </div>
                    </div>
                </div>

                {/* Status Legend */}
                <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-sm text-gray-600">Sold</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                        <span className="text-sm text-gray-600">Not Available</span>
                    </div>
                </div>

                {/* Plots by Section */}
                {Object.entries(layout.slotsBySection).map(([section, slots]) => (
                    <div key={section} className="mb-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{section}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {slots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => setSelectedSlot(slot)}
                                    disabled={slot.status !== "available"}
                                    className={`p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${selectedSlot?.id === slot.id
                                            ? "border-[#2e3675] bg-[#2e3675]/5 shadow-lg"
                                            : slot.status === "available"
                                                ? "border-gray-200 bg-white hover:border-[#2e3675]/50 hover:shadow-md"
                                                : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-gray-900 text-lg">
                                            Plot {slot.plotNumber}
                                        </span>
                                        <div
                                            className={`w-3 h-3 rounded-full ${getStatusColor(slot.status)}`}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">{slot.area}</p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {slot.facing} Facing
                                    </p>
                                    <p className="text-[#2e3675] font-bold">
                                        {slot.priceFormatted}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Selected Slot Details Modal */}
                {selectedSlot && (
                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl p-6 z-40">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row md:items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            Plot {selectedSlot.plotNumber}
                                        </h3>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(
                                                selectedSlot.status
                                            )}`}
                                        >
                                            {getStatusText(selectedSlot.status)}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                        <span>
                                            <strong>Area:</strong> {selectedSlot.area}
                                        </span>
                                        <span>
                                            <strong>Facing:</strong> {selectedSlot.facing}
                                        </span>
                                        {selectedSlot.width && (
                                            <span>
                                                <strong>Width:</strong> {selectedSlot.width}
                                            </span>
                                        )}
                                        {selectedSlot.height && (
                                            <span>
                                                <strong>Height:</strong> {selectedSlot.height}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className="text-[#2e3675] font-bold text-2xl">
                                            {selectedSlot.priceFormatted}
                                        </p>
                                    </div>
                                    {selectedSlot.status === "available" && (
                                        <button
                                            onClick={() => handleEnquiry(selectedSlot)}
                                            disabled={enquiryLoading}
                                            className="bg-[#2e3675] hover:bg-[#232958] text-white font-semibold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70"
                                        >
                                            {enquiryLoading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Enquire Now
                                                    <ChevronRight className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setSelectedSlot(null)}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
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
