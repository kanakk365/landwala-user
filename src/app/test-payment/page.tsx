"use client";

import { useSubscriptionPayment } from "@/hooks/useSubscriptionPayment";
import { Loader2 } from "lucide-react";

export default function TestPaymentPage() {
  const { initiatePayment, loading } = useSubscriptionPayment();

  const handleTestPayment = () => {
    // Using the ID from the user request
    const planId = "35a43f3b-c547-4103-b583-bfb46b9866a9";
    initiatePayment(planId);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold text-[#1d2567] mb-4">
          Test Cashfree Payment
        </h1>
        <p className="text-gray-500 mb-6">
          Click below to start a test subscription payment with plan ID:
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
            35a43f3b-c547...
          </code>
        </p>

        <button
          onClick={handleTestPayment}
          disabled={loading}
          className="w-full bg-[#1d2567] text-white py-3 rounded-lg font-medium hover:bg-[#151b4d] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Pay Now"
          )}
        </button>
      </div>
    </div>
  );
}
