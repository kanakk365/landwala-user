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
import {
  landRegistrationApi,
  LandRegistrationEnquiry,
  landProtectionApi,
  LandProtectionRequest,
  loanApi,
  LoanApplicationResponse,
} from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("Edit Profile");
  const [subTab, setSubTab] = useState("Land protection");

  // Data states
  const [enquiries, setEnquiries] = useState<LandRegistrationEnquiry[]>([]);
  const [protectionRequests, setProtectionRequests] = useState<
    LandProtectionRequest[]
  >([]);
  const [loanApplications, setLoanApplications] = useState<
    LoanApplicationResponse[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "My Requests" && isAuthenticated) {
        setLoading(true);
        try {
          // Fetch based on subTab
          if (subTab === "Land protection") {
            const data = await landProtectionApi.getRequests();
            setProtectionRequests(data.requests || []);
          } else if (subTab === "Land Registration") {
            const data = await landRegistrationApi.getEnquiries();
            setEnquiries(data.enquiries || []);
          } else if (subTab === "Loan Eligibility") {
            const data = await loanApi.getApplications();
            setLoanApplications(data.applications || []);
          }
          // Add other fetches here as needed
        } catch (err) {
          console.error(`Failed to fetch data for ${subTab}`, err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [activeTab, subTab, isAuthenticated]);

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

  const requestTabs = [
    "Land protection",
    "Layouts",
    "Land Registration",
    "Loan Eligibility",
    "Plot Enquiry",
    "My Documents",
  ];

  if (!mounted || !isAuthenticated || !user) {
    return null;
  }

  const renderRequestCard = (
    title: string,
    subtitle: string,
    footerText: string,
    id: string
  ) => (
    <div
      key={id}
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow mb-4"
    >
      <div className="mb-4">
        <h4 className="text-base font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      </div>

      <div className="border-t border-gray-100 my-4"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <span className="text-sm text-gray-600 font-medium">{footerText}</span>
        <button className="bg-[#1d2567] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#151b4d] transition-colors w-full sm:w-auto">
          View Detail
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#1d2567]" />
        </div>
      );
    }

    switch (subTab) {
      case "Land protection":
        return protectionRequests.length > 0 ? (
          protectionRequests.map((req) =>
            renderRequestCard(
              req.landLocation || "Land Protection Request",
              `${req.landArea || "N/A"} . ${req.id.substring(0, 8)}`,
              `Submitted On ${new Date(req.createdAt).toLocaleDateString()}`,
              req.id
            )
          )
        ) : (
          <EmptyState message="No land protection requests found" />
        );

      case "Land Registration":
        return enquiries.length > 0 ? (
          enquiries.map((enq) =>
            renderRequestCard(
              enq.propertyTitle || "Land Registration Enquiry",
              `Ref: ${enq.id.substring(0, 8)}`,
              `Submitted On ${new Date(enq.createdAt).toLocaleDateString()}`,
              enq.id
            )
          )
        ) : (
          <EmptyState message="No land registration enquiries found" />
        );

      case "Loan Eligibility":
        return loanApplications.length > 0 ? (
          loanApplications.map((app) =>
            renderRequestCard(
              `${app.loanPurpose} Loan Application`,
              `Amount: ₹${app.desiredAmount?.toLocaleString()} . ${app.loanTenureYears
              } Years`,
              `Status: ${app.status}`,
              app.id
            )
          )
        ) : (
          <EmptyState message="No loan applications found" />
        );

      default:
        return <EmptyState message={`${subTab} requests coming soon`} />;
    }
  };

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <FileText className="w-16 h-16 mb-4 opacity-50" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">

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
                  className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === item.label
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
                {/* Sub-tabs Navigation */}
                <div className="flex overflow-x-auto border-b border-gray-200 mb-6 no-scrollbar">
                  {requestTabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSubTab(tab)}
                      className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative ${subTab === tab
                          ? "text-[#1d2567]"
                          : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {tab}
                      {subTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1d2567]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="space-y-4">{renderContent()}</div>
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
