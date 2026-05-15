import { api } from "../lib/api";

export const fetchEmployees = async (filters: any, page: any) => {
  const res = await api.get("/employees", {
    params: { ...filters, page },
  });
  return res.data;
};

export const addNewEmployee = async (payload: any) => {
  const res = await api.post("/employees", payload);
  return res.data;
};

export const getEmployeeDetails = async (email: string) => {
  const res = await api.get(`/employees/${email}`);
  return res.data;
};

export const updateEmployeeDetails = async (payload: any) => {
  const res = await api.patch("/employees", payload);
  return res.data;
};
