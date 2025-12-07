"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { ChevronDown, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import { Suspense } from "react";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isCompleting = searchParams.get("complete") === "true";

  const {
    login,
    isAuthenticated,
    setLoading,
    isLoading,
    user,
    tokens,
    updateUser,
  } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    countryCode: "+91",
    location: "",
    employment: "",
  });
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-fill name if user exists (completing registration after Google login)
  useEffect(() => {
    if (user?.name) {
      setFormData((prev) => ({ ...prev, fullName: user.name || "" }));
    }
  }, [user]);

  // Redirect if already authenticated and not completing registration and not a new user
  useEffect(() => {
    if (
      mounted &&
      isAuthenticated &&
      !isCompleting &&
      user &&
      !user.isNewUser
    ) {
      router.push("/");
    }
  }, [mounted, isAuthenticated, isCompleting, router, user]);

  // Redirect to login if trying to complete but not authenticated
  useEffect(() => {
    if (mounted && isCompleting && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isCompleting, isAuthenticated, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      setError("");

      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      // Send idToken to backend
      const response = await authApi.googleAuth(idToken);

      // Store user and tokens in Zustand store
      login(
        {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          profilePicture: response.user.profilePicture,
          isNewUser: response.user.isNewUser,
        },
        {
          accessToken: response.tokens.accessToken,
          refreshToken: response.tokens.refreshToken,
          expiresIn: response.tokens.expiresIn,
        }
      );

      // Check if user needs to complete registration
      if (response.user.isNewUser) {
        router.push("/signup?complete=true");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Google signup error:", err);
      setError("Failed to sign up with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.fullName ||
      !formData.phoneNumber ||
      !formData.location ||
      !formData.employment
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // If completing registration (already have token from Google login)
      if (isCompleting && tokens?.accessToken) {
        const response = await authApi.register({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          countryCode: formData.countryCode,
          location: formData.location,
          employment: formData.employment,
        });

        // Update user info in store (marks isNewUser as false)
        updateUser({
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          countryCode: formData.countryCode,
          location: formData.location,
          employment: formData.employment,
        });

        router.push("/");
      } else {
        // For new sign up, first need Google auth
        setError("Please continue with Google to create your account");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to complete registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 font-sans text-gray-900 flex flex-col relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#2D55FB]/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#2D55FB]/30 rounded-full blur-[100px] pointer-events-none" />

      <Header />

      <div className="flex-grow flex items-center justify-center p-4 py-12 relative z-10">
        <div className="bg-white rounded-[32px] shadow-xl w-full max-w-5xl p-8 md:p-16 border border-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            <span className="text-[#F7AE49]">
              {isCompleting ? "Complete Your Profile" : "Getting Started"}
            </span>{" "}
            <span className="text-[#1d2567]">
              {isCompleting ? "- Almost Done!" : "- Create an Account"}
            </span>
          </h1>

          {/* Show user info if completing */}
          {isCompleting && user && (
            <div className="mb-8 flex items-center justify-center gap-4 p-4 bg-blue-50 rounded-xl">
              {user.profilePicture && (
                <img
                  src={user.profilePicture}
                  alt={user.name || "Profile"}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-600 font-medium mb-2 text-sm">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-2 text-sm">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative w-24">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-lg px-3 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 appearance-none bg-white cursor-pointer"
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+234">+234</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1d2567] pointer-events-none" />
                    </div>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter Mobile number"
                      className="flex-1 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 font-medium mb-2 text-sm">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 appearance-none bg-white cursor-pointer"
                    >
                      <option value="" disabled>
                        Select your city
                      </option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1d2567]" />
                  </div>
                </div>
              </div>

              <div className="space-y-6 flex flex-col">
                <div>
                  <label className="block text-gray-600 font-medium mb-2 text-sm">
                    Employment <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="employment"
                      value={formData.employment}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#2D336B] transition-colors text-gray-700 appearance-none bg-white cursor-pointer"
                    >
                      <option value="" disabled>
                        Select your employment
                      </option>
                      <option value="Salaried">Salaried</option>
                      <option value="Self Employed">Self Employed</option>
                      <option value="Business">Business</option>
                      <option value="Student">Student</option>
                      <option value="Retired">Retired</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1d2567]" />
                  </div>
                </div>

                <div className="flex-grow"></div>

                <div className="space-y-4 pt-2">
                  {!isCompleting && (
                    <>
                      <button
                        type="button"
                        className="w-full bg-[#dbeafe] hover:bg-blue-100 text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 mb-0.5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35-1.04.86-2.17.59-2.93-.5-4.04-5.83-2.67-10.97 1.35-11.16 1.15-.05 1.95.59 2.58.59.61 0 1.57-.61 2.9-.53 2.14.12 3.19.98 3.63 2.22-.05.03-2.11 1.25-2.17 4.77.06 3.84 3.39 5.16 3.4 5.17-.03.09-.52 1.83-1.63 3.42-.51.74-1.04 1.47-1.74 1.47zM14.65 6.27c.64-1.12.98-2.31.84-3.53-1.2.14-2.33.81-3.07 1.67-.68.79-1.25 2.05-1.02 3.2 1.33.11 2.62-.64 3.25-1.34z" />
                        </svg>
                        Continue with Apple
                      </button>

                      <button
                        type="button"
                        onClick={handleGoogleSignUp}
                        disabled={isLoading}
                        className="w-full bg-[#dbeafe] hover:bg-blue-100 disabled:bg-gray-100 text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Continue with Google
                      </button>
                    </>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1d2567] hover:bg-[#151b4d] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {isCompleting ? "Completing..." : "Creating..."}
                      </>
                    ) : isCompleting ? (
                      "Complete Registration"
                    ) : (
                      "Create account"
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center mt-4">
                    <span className="text-gray-400 text-sm">
                      Already Have An Account ?{" "}
                    </span>
                    <Link
                      href="/login"
                      className="text-[#1d2567] font-semibold text-sm hover:underline"
                    >
                      Log In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#2D55FB]" />
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
}
