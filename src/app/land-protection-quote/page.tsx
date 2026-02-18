"use client";

import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import LandProtectionForm from "@/components/LandProtectionForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { subscriptionPurchaseApi, SubscriptionPlan } from "@/lib/api";
import { useSubscriptionPayment } from "@/hooks/useSubscriptionPayment";
import { Loader2, Check } from "lucide-react";

function LandProtectionQuoteContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { initiatePayment, loading: paymentLoading } = useSubscriptionPayment();

  const [view, setView] = useState<"plans" | "verifying" | "form">("plans");
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await subscriptionPurchaseApi.getPlans();
        const fetchedPlans = Array.isArray(response)
          ? response
          : response.data || [];

        // Validate plans - if valid data is missing or amount is 0, use fallback
        const isValid =
          fetchedPlans.length > 0 &&
          fetchedPlans.some((p: SubscriptionPlan) => p.amount > 0 && p.name);

        if (isValid) {
          setPlans(fetchedPlans);
        } else {
          throw new Error("Invalid or empty plans from API");
        }
      } catch (error) {
        console.warn("Using fallback plans:", error);
        setPlans([
          {
            id: "35a43f3b-c547-4103-b583-bfb46b9866a9",
            name: "Basic",
            description: "Weekly Plan",
            amount: 499,
            currency: "INR",
            duration: 7,
            interval: "week",
            features: [
              "Regular site visit once a week",
              "Geo-tagged photo updates",
              "24x7 helpline support",
              "Email summary report",
            ],
          },
          {
            id: "35a43f3b-c547-4103-b583-bfb46b9866a9", // Using valid ID for testing
            name: "Pro",
            description: "Monthly Plan",
            amount: 899,
            currency: "INR",
            duration: 30,
            interval: "month",
            features: [
              "Regular site visit once a week",
              "Geo-tagged photo updates",
              "24x7 helpline support",
              "Email summary report",
            ],
          },
          {
            id: "35a43f3b-c547-4103-b583-bfb46b9866a9", // Using valid ID for testing
            name: "Premium",
            description: "Yearly Plan",
            amount: 1499,
            currency: "INR",
            duration: 365,
            interval: "year",
            features: [
              "Regular site visit once a week",
              "Geo-tagged photo updates",
              "24x7 helpline support",
              "Email summary report",
            ],
          },
        ]);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (orderId) {
      setView("verifying");
      const verify = async () => {
        try {
          const response = await subscriptionPurchaseApi.verifyOrder(orderId);
          if (
            response.status === "SUCCESS" ||
            response.status === "PAID" ||
            response.status === "ACTIVE"
          ) {
            setView("form");
          } else {
            setVerificationError(
              response.message || "Payment verification failed.",
            );
            setView("plans"); // Or show error state
          }
        } catch (error) {
          console.error("Verification failed", error);
          setVerificationError("Failed to verify payment.");
          setView("plans");
        }
      };
      verify();
    }
  }, [orderId]);

  const handleSelectPlan = async (planId: string) => {
    await initiatePayment(planId);
  };

  if (view === "verifying") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32">
        <Loader2 className="w-12 h-12 text-[#1d2567] animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Verifying your payment...</p>
      </div>
    );
  }

  if (view === "form") {
    return (
      <div className="pt-32 pb-12 px-4 bg-gray-50/30">
        <LandProtectionForm />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 px-4 max-w-7xl mx-auto font-sans">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-black mb-4">Land Protection</h1>
        <p className="text-gray-500 text-lg">Choose your Plan</p>
        {verificationError && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg inline-block">
            {verificationError}
          </div>
        )}
      </div>

      {loadingPlans ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 text-[#1d2567] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={`${plan.id}-${index}`}
              className={`relative rounded-2xl p-8 flex flex-col shadow-xl transition-transform hover:-translate-y-1 text-white border border-gray-800 ${
                plan.name === "Pro"
                  ? "bg-[#0d1b4e] ring-1 ring-blue-900/50"
                  : "bg-[#222222]"
              }`}
            >
              {plan.name === "Pro" && (
                <div className="absolute top-8 right-8 bg-[#323b6b] px-4 py-1.5 rounded-full text-xs font-medium border border-white/10 text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-3xl font-bold block mb-1">
                  ₹{(plan.amount || 0).toLocaleString()}
                  <span className="text-xl font-normal text-white">
                    /{plan.interval || "period"}
                  </span>
                </span>
              </div>

              <div className="space-y-5 grow mb-10">
                {plan.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 text-blue-400" />
                    <span className="text-sm text-gray-300 font-light">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={paymentLoading}
                className={`w-full py-3.5 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                  plan.name === "Pro"
                    ? "bg-[#4a5a9c] hover:bg-[#5b6bb0] text-white" /* Lighter blue for Pro button */
                    : "bg-[#5e5e5e] hover:bg-[#6e6e6e] text-white" /* Grey for others */
                }`}
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LandProtectionQuotePage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <Header />
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center">
            <Loader2 className="w-12 h-12 text-[#1d2567] animate-spin" />
          </div>
        }
      >
        <LandProtectionQuoteContent />
      </Suspense>
      <Contact />
      <Footer />
    </main>
  );
}
