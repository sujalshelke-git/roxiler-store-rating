import axiosInstance from "./axios";

export interface OwnerDashboardResponse {
  store: {
    id: string;
    name: string;
    email: string;
    address: string;
  };

  averageRating: number;

  totalRatings: number;

  ratings: {
    id: string;
    rating: number;
    createdAt: string;

    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
}

export const getDashboard = () => {
  return axiosInstance.get("/owner/dashboard");
};