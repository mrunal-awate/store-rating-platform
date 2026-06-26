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

export const addUser = async (userData) => {
  const response = await api.post("/admin/users", userData);
  return response.data;
};

export const addStore = async (storeData) => {
    const response = await api.post("/admin/stores", storeData);
    return response.data;
};

export const searchUsers = async (search) => {
  const response = await api.get(`/admin/users/search?search=${search}`);
  return response.data;
};

export const searchStores = async (search) => {
  const response = await api.get(`/admin/stores/search?search=${search}`);
  return response.data;
};

// export const updateUser = async (userId, userData) => {
//   const response = await api.put(`/admin/users/${userId}`, userData);
//   return response.data;
// };

// export const deleteUser = async (userId) => {
//   const response = await api.delete(`/admin/users/${userId}`);
//   return response.data;
// };