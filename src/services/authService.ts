import api from "./api";

export const loginUser = async (username: string, password: string) => {
  const response = await api.post("/auth/login", { username, password });
  return response.data;
};

export const registerUser = async (data: any) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};