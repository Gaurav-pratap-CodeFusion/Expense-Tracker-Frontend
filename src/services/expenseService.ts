import api from "./api";

export const getMyExpenses = async () => {
  const response = await api.get("/expenses/my-expenses");
  return response.data;
};

export const getExpenseById = async (id: string) => {
  const response = await api.get(`/expenses/${id}`);
  return response.data;
};

export const addExpense = async (data: any) => {
  const response = await api.post("/expenses", data);
  return response.data;
};

export const updateExpense = async (id: string, data: any) => {
  const response = await api.put(`/expenses/${id}`, data);
  return response.data;
};

export const deleteExpense = async (id: number) => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};