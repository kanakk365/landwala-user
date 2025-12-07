"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import {
  UserCircle,
  FileText,
  Heart,
  ShieldCheck,
  Lock,
  AlertCircle,
  LogOut,
  Calendar,
  MapPin,
  Loader2,
} from "lucide-react";
import { landRegistrationApi, LandRegistrationEnquiry } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [enquiries, setEnquiries] = useState<LandRegistrationEnquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      if (activeTab === "My Requests" && isAuthenticated) {
        try {
          setLoadingEnquiries(true);
          const data = await landRegistrationApi.getEnquiries();
          setEnquiries(data.enquiries || []);
        } catch (err) {
          console.error("Failed to fetch enquiries", err);
        } finally {
          setLoadingEnquiries(false);
        }
      }
    };

    fetchEnquiries();
  }, [activeTab, isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    { icon: UserCircle, label: "Edit Profile" },
    { icon: FileText, label: "My Requests" },
    { icon: Heart, label: "Wishlist" },
    { icon: ShieldCheck, label: "Terms of Use" },
    { icon: Lock, label: "Privacy Policy" },
    { icon: AlertCircle, label: "Report a Bug" },
  ];

  if (!mounted || !isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-500">
            Get in Touch for Land Registration Assistance
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-64 border-r border-gray-100 flex flex-col">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                My profile
              </h2>
            </div>

            <nav className="flex-grow">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors relative ${
                    activeTab === item.label
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {activeTab === item.label && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1d2567]"></div>
                  )}
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-grow p-8 md:p-12">
            {activeTab === "Edit Profile" && (
              <div className="max-w-2xl">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-10">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-gray-400">
                        <UserCircle className="w-full h-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.fullName || user.name || "User"}
                    </h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                      Enter your name
                    </label>
                    <div className="w-full bg-[#f0f2f5] border border-[#1d2567] rounded-lg px-4 py-3 text-gray-900">
                      {user.fullName || user.name || "N/A"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                      Enter your Gender
                    </label>
                    <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3 text-gray-900">
                      Male
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                      Location
                    </label>
                    <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3 text-gray-900 flex justify-between items-center">
                      <span>{user.location || "N/A"}</span>
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                      Enter your Email Id
                    </label>
                    <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3 text-gray-900">
                      {user.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                      Enter your Birthday
                    </label>
                    <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3 text-gray-900 flex justify-between items-center">
                      <span>18/03/2001</span>
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 ml-1">
                      Enter your Phone number
                    </label>
                    <div className="w-full bg-[#f0f2f5] rounded-lg px-4 py-3 text-gray-900 flex items-center gap-3">
                      <div className="flex items-center gap-1 border-r border-gray-300 pr-3">
                        <span className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                          <div className="w-full h-1/3 bg-[#FF9933]"></div>
                          <div className="w-full h-1/3 bg-white"></div>
                          <div className="w-full h-1/3 bg-[#138808]"></div>
                        </span>
                        <span className="text-gray-500 text-sm">
                          {user.countryCode || "+91"}
                        </span>
                      </div>
                      <span>{user.phoneNumber || "N/A"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "My Requests" && (
              <div className="w-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  My Requests
                </h3>

                {loadingEnquiries ? (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#1d2567]" />
                  </div>
                ) : enquiries.length > 0 ? (
                  <div className="space-y-4">
                    {enquiries.map((enquiry) => (
                      <div
                        key={enquiry.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {enquiry.propertyTitle ||
                                `Property #${enquiry.propertyId}`}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              Submitted on{" "}
                              {new Date(enquiry.createdAt).toLocaleDateString()}
                            </p>
                            {enquiry.message && (
                              <p className="text-sm text-gray-600 mt-2">
                                {enquiry.message}
                              </p>
                            )}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold self-start ${
                              enquiry.status === "APPROVED"
                                ? "bg-green-100 text-green-700"
                                : enquiry.status === "REJECTED"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {enquiry.status || "PENDING"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <FileText className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg font-medium">No requests yet</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Your land registration enquiries will appear here
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab !== "Edit Profile" && activeTab !== "My Requests" && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <FileText className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">
                  {activeTab} section coming soon
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
