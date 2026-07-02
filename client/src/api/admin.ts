import axiosInstance from "./axios";

/* ==========================
   Dashboard
========================== */

export const getDashboard = () => {
  return axiosInstance.get("/admin/dashboard");
};

/* ==========================
   Users
========================== */

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "ADMIN" | "USER" | "OWNER";
  createdAt: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  totalPages: number;
}

export const getUsers = (
  page = 1,
  search = "",
  limit = 10
) => {
  return axiosInstance.get("/admin/users", {
    params: {
      page,
      limit,
      search,
      sortBy: "createdAt",
      order: "desc",
    },
  });
};

export const getUserDetails = (id: string) => {
  return axiosInstance.get(`/admin/users/${id}`);
};

export const createUser = (data: {
  name: string;
  email: string;
  address: string;
  password: string;
  role: "ADMIN" | "OWNER" | "USER";
}) => {
  return axiosInstance.post("/admin/users", data);
};

/* ==========================
   Stores
========================== */

export interface Store {
  id: string;
  name: string;
  email: string;
  address: string;
  owner: {
    name: string;
    email: string;
  };
  averageRating: number;
  createdAt: string;
}

export interface StoresResponse {
  stores: Store[];
  total: number;
  page: number;
  totalPages: number;
}

export const getStores = (
  page = 1,
  search = "",
  limit = 10
) => {
  return axiosInstance.get("/admin/stores", {
    params: {
      page,
      limit,
      search,
      sortBy: "createdAt",
      order: "desc",
    },
  });
};

export const createStore = (data: {
  name: string;
  email: string;
  address: string;
  ownerId: string;
}) => {
  return axiosInstance.post("/admin/stores", data);
};

export const getStoreDetails = (
  id: string
) => {
  return axiosInstance.get(
    `/admin/stores/${id}`
  );
};