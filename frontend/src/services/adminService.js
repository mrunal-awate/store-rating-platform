import api from "./api";

export const getDashboardData = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getStores = async () => {
  const response = await api.get("/admin/stores");
  return response.data;
};