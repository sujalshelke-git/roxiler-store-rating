import axiosInstance from "./axios";

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  userRating?: number | null;
}

export const getStores = (
  page = 1,
  search = ""
) => {
  return axiosInstance.get("/stores", {
    params: {
      page,
      search,
    },
  });
};

export const submitRating = (
  storeId: string,
  rating: number
) => {
  return axiosInstance.post(
    `/stores/${storeId}/rating`,
    {
      rating,
    }
  );
};

export const updateRating = (
  storeId: string,
  rating: number
) => {
  return axiosInstance.put(
    `/stores/${storeId}/rating`,
    {
      rating,
    }
  );
};