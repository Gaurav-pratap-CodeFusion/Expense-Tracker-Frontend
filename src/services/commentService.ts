import api from "./api";

export const getComments = async (
  expenseId: string
) => {

  const response =
    await api.get(
      `/expenses/${expenseId}/comments`
    );

  return response.data;
};

export const addComment = async (
  expenseId: string,
  message: string
) => {

  const response =
    await api.post(
      `/expenses/${expenseId}/comments`,
      {
        message,
      }
    );

  return response.data;
};