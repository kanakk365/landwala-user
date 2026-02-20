import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xs border border-gray-100 p-8 md:p-14 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-[#EF9E41] to-[#111a61]"></div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-500 mb-12 font-medium">
          Last Updated: December 04, 2025
        </p>

        <div className="space-y-10 text-gray-700 leading-relaxed md:text-lg">
          <section>
            <h2 className="text-2xl font-bold text-[#111a61] mb-4 bg-blue-50/50 p-3 rounded-xl border-l-4 border-[#111a61]">
              Introduction
            </h2>
            <p>
              Welcome to LANDWALAA PRIVATE LIMITED (&quot;we&quot;,
              &quot;our&quot;, &quot;us&quot;). We are committed to protecting
              your privacy. This Privacy Policy explains how we handle
              information when you interact with our products, services, or
              website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111a61] mb-4 bg-blue-50/50 p-3 rounded-xl border-l-4 border-[#111a61]">
              Information We Do Not Collect
            </h2>
            <p className="mb-4">
              We do not collect any personal data from users. This means:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600 marker:text-[#EF9E41]">
              <li>
                We do not collect names, email addresses, phone numbers, or any
                other personal information.
              </li>
              <li>We do not track browsing activities.</li>
              <li>We do not use cookies or analytics tools.</li>
              <li>We do not collect device or location information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111a61] mb-4 bg-blue-50/50 p-3 rounded-xl border-l-4 border-[#111a61]">
              No Data Storage
            </h2>
            <p>
              Since we do not collect any information, we also do not store any
              form of data on our servers or systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111a61] mb-4 bg-blue-50/50 p-3 rounded-xl border-l-4 border-[#111a61]">
              No Data Sharing or Selling
            </h2>
            <p>
              We do not share, sell, rent, or trade any personal or non-personal
              information with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111a61] mb-4 bg-blue-50/50 p-3 rounded-xl border-l-4 border-[#111a61]">
              Third‑Party Services
            </h2>
            <p>
              Our services do not integrate with or rely on external third‑party
              data collection or tracking services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111a61] mb-4 bg-blue-50/50 p-3 rounded-xl border-l-4 border-[#111a61]">
              Children’s Privacy
            </h2>
            <p>
              Because we do not collect or store any information, we do not
              knowingly collect data from children under any age. Our services
              are safe for all users.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#111a61] mb-4 bg-blue-50/50 p-3 rounded-xl border-l-4 border-[#111a61]">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes
              will be reflected by updating the &quot;Last Updated&quot; date at
              the top of this page.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mt-12">
            <h2 className="text-2xl font-bold text-[#111a61] mb-4">
              Contact Us
            </h2>
            <p className="mb-6">
              If you have any questions about this Privacy Policy, you may
              contact us:
            </p>
            <address className="not-italic text-gray-800 space-y-2">
              <strong className="block text-[#EF9E41]">
                LANDWALAA PRIVATE LIMITED
              </strong>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-gray-600">Email:</span>
                <a
                  href="mailto:info@landwala.in"
                  className="text-[#111a61] hover:underline"
                >
                  info@landwala.in
                </a>
              </div>
              <div className="flex gap-2 items-start mt-2">
                <span className="font-semibold text-gray-600 mt-0.5">
                  Address:
                </span>
                <p>
                  H.NO: 1-70, New Vasavi Residency,
                  <br />
                  Chaitanyapuri Colony, Saroornagar,
                  <br />
                  K.V Rangareddy - 500060, Telangana
                </p>
              </div>
            </address>
          </section>

          <div className="pt-10 mt-10 border-t border-gray-100 flex justify-center">
            <p className="font-semibold text-center text-[#EF9E41] bg-orange-50 px-6 py-3 rounded-full">
              Thank you for trusting LANDWALAA PRIVATE LIMITED.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
