import axiosInstance from "./axios";

export const login = (data: {
  email: string;
  password: string;
}) => {
  return axiosInstance.post("/auth/login", data);
};

export const logout = () => {
  return axiosInstance.post("/auth/logout");
};

export const getCurrentUser = () => {
  return axiosInstance.get("/auth/me");
};

export const changePassword = (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  return axiosInstance.put(
    "/auth/change-password",
    data
  );
};