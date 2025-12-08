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

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const logout = useAuthStore.getState().logout;
      logout();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

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

export interface LoanApplicationData {
  fullName: string;
  monthlyIncome: string;
  employmentType: string;
  loanPurpose: string;
  desiredAmount: string;
  loanTenureYears: string;
  documents: File[];
}

export interface LoanDocument {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

export interface LoanApplicationResponse {
  id: string;
  fullName: string;
  monthlyIncome: number;
  employmentType: string;
  loanPurpose: string;
  desiredAmount: number;
  loanTenureYears: number;
  status: string;
  remarks?: string | null;
  documents: LoanDocument[];
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface LoanApplicationsListResponse {
  applications: LoanApplicationResponse[];
  total: number;
  page: number;
  limit: number;
}

export const authApi = {
  googleAuth: async (idToken: string): Promise<GoogleAuthResponse> => {
    const response = await api.post("/auth/google", { idToken });
    return response.data;
  },

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

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

export const loanApi = {
  apply: async (
    data: LoanApplicationData
  ): Promise<LoanApplicationResponse> => {
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("monthlyIncome", data.monthlyIncome.toString());
    formData.append("employmentType", data.employmentType);
    formData.append("loanPurpose", data.loanPurpose);
    formData.append("desiredAmount", data.desiredAmount.toString());
    formData.append("loanTenureYears", data.loanTenureYears.toString());

    if (data.documents && data.documents.length > 0) {
      data.documents.forEach((file) => {
        formData.append("documents", file);
      });
    }

    const response = await api.post("/loan/apply", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getApplications: async (): Promise<LoanApplicationsListResponse> => {
    const response = await api.get("/loan/applications");
    return response.data;
  },

  getApplicationById: async (id: string): Promise<LoanApplicationResponse> => {
    const response = await api.get(`/loan/applications/${id}`);
    return response.data;
  },
};

export interface LegalVerificationData {
  titleDeed: File | null;
  saleAgreement: File | null;
  taxReceipt: File | null;
  encumbranceCertificate: File | null;
}

export interface LegalVerificationDocument {
  id: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

export interface LegalVerificationResponse {
  id: string;
  status: string;
  remarks?: string | null;
  titleDeed?: LegalVerificationDocument | null;
  saleAgreement?: LegalVerificationDocument | null;
  taxReceipt?: LegalVerificationDocument | null;
  encumbranceCertificate?: LegalVerificationDocument | null;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface LegalVerificationListResponse {
  applications: LegalVerificationResponse[];
  total: number;
  page: number;
  limit: number;
}

export const legalVerificationApi = {
  apply: async (
    data: LegalVerificationData
  ): Promise<LegalVerificationResponse> => {
    const formData = new FormData();

    if (data.titleDeed) {
      formData.append("titleDeed", data.titleDeed);
    }
    if (data.saleAgreement) {
      formData.append("saleAgreement", data.saleAgreement);
    }
    if (data.taxReceipt) {
      formData.append("taxReceipt", data.taxReceipt);
    }
    if (data.encumbranceCertificate) {
      formData.append("encumbranceCertificate", data.encumbranceCertificate);
    }

    const response = await api.post("/legal-verification/apply", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  getApplications: async (): Promise<LegalVerificationListResponse> => {
    const response = await api.get("/legal-verification/applications");
    return response.data;
  },

  getApplicationById: async (
    id: string
  ): Promise<LegalVerificationResponse> => {
    const response = await api.get(`/legal-verification/applications/${id}`);
    return response.data;
  },
};

export interface LandRegistrationEnquiry {
  id: string;
  propertyId: string;
  propertyTitle?: string;
  status: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandRegistrationEnquiriesResponse {
  enquiries: LandRegistrationEnquiry[];
  total: number;
  page: number;
  limit: number;
}

export interface LandRegistrationSubmitData {
  name: string;
  phone: string;
  countryCode: string;
  email: string;
  location: string;
  plotType: string;
  message?: string;
}

export const landRegistrationApi = {
  submit: async (
    data: LandRegistrationSubmitData
  ): Promise<LandRegistrationEnquiry> => {
    const response = await api.post("/land-registration/submit", data);
    return response.data;
  },

  getEnquiries: async (): Promise<LandRegistrationEnquiriesResponse> => {
    const response = await api.get("/land-registration/enquiries");
    return response.data;
  },
};

// Land Protection API Types
export interface LandProtectionRequestData {
  fullName: string;
  phone: string;
  countryCode: string;
  landLocation: string;
  landArea: string;
  location: string;
  pincode: string;
}

export interface LandProtectionRequest {
  id: string;
  fullName: string;
  phone: string;
  countryCode: string;
  landLocation: string;
  landArea: string;
  location: string;
  pincode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandProtectionRequestsResponse {
  requests: LandProtectionRequest[];
  total: number;
  page: number;
  limit: number;
}

export const landProtectionApi = {
  requestQuote: async (
    data: LandProtectionRequestData
  ): Promise<LandProtectionRequest> => {
    const response = await api.post("/land-protection/request-quote", data);
    return response.data;
  },

  getRequests: async (): Promise<LandProtectionRequestsResponse> => {
    const response = await api.get("/land-protection/requests");
    return response.data;
  },
};

// Properties API Types
export interface PropertyOverviewField {
  id: string;
  label: string;
  value: string;
  icon: string | null;
  displayOrder: number;
}

export interface Property {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  priceUnit: string;
  priceRange: string;
  locationAddress: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  images: string[];
  brochureUrl: string;
  landLayoutTitle: string;
  landLayoutImageUrl: string;
  descriptionTitle: string;
  descriptionContent: string;
  overviewFields: PropertyOverviewField[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PropertiesMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PropertiesResponse {
  data: Property[];
  meta: PropertiesMeta;
}

export const propertiesApi = {
  getProperties: async (params?: {
    page?: number;
    limit?: number;
    city?: string;
    state?: string;
    isFeatured?: boolean;
  }): Promise<PropertiesResponse> => {
    const response = await api.get("/properties", { params });
    return response.data;
  },

  getPropertyById: async (id: string): Promise<Property> => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },
};

// Enquiries API Types
export interface EnquiryData {
  type: "PROPERTY" | "GENERAL";
  propertyId?: string;
  message: string;
}

export interface EnquiryResponse {
  id: string;
  type: string;
  propertyId?: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const enquiriesApi = {
  submit: async (data: EnquiryData): Promise<EnquiryResponse> => {
    const response = await api.post("/enquiries", data);
    return response.data;
  },
};
