import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

// Create axios instance with base URL
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://apilandwala.landwalaa.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds auth token to requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = useAuthStore.getState().tokens;
    if (tokens?.accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handles 401 errors and logs out
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      const logout = useAuthStore.getState().logout;
      logout();

      // Redirect to login page (only in browser)
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Types for API responses
interface GoogleAuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    profilePicture: string;
    isNewUser: boolean;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface RegisterResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    fullName: string;
    phoneNumber: string;
    countryCode: string;
    location: string;
    employment: string;
  };
  message?: string;
}

// Auth API functions
export const authApi = {
  // Google sign-in - sends Firebase idToken to backend
  googleAuth: async (idToken: string): Promise<GoogleAuthResponse> => {
    const response = await api.post("/auth/google", { idToken });
    return response.data;
  },

  // Register user profile after authentication
  register: async (userData: {
    fullName: string;
    phoneNumber: string;
    countryCode: string;
    location: string;
    employment: string;
  }): Promise<RegisterResponse> => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};
