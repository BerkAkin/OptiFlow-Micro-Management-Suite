import { api } from "../lib/api";

export const fetchEmployees = async (filters: any, page: any) => {
  const res = await api.get("/auth/AllUsers", {
    params: { ...filters, page },
  });
  return res.data;
};

export const addNewEmployee = async (payload: any) => {
  const res = await api.post("/auth/AddNewUser", payload);
  return res.data;
};

export const getEmployeeDetails = async (email: string) => {
  const res = await api.get("/auth/GetEmployeeDetails", {
    params: {
      email,
    },
  });
  return res.data;
};

export const updateEmployeeDetails = async (payload: any) => {
  const res = await api.put("/auth/UpdateEmployeeDetails", payload);
  return res.data;
};
