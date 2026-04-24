import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddNewEmployeeService } from "../../services/EmployeeServices/AddNewEmployeeService";
import { GetEmployeesService } from "../../services/EmployeeServices/GetEmployeesService";
import { GetEmployeeDetailsService } from "../../services/EmployeeServices/GetEmployeeDetailsService";
import { UpdateEmployeeDetailsService } from "../../services/EmployeeServices/UpdateEmployeeDetailsService";

export const useEmployeeList = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => GetEmployeesService(filters, page),
  });
};

export const useAddNewEmployee = () => {
  return useMutation({
    mutationFn: (payload: any) => AddNewEmployeeService(payload),
    onSuccess: () => {},
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useGetEmployeeDetails = (email: string) => {
  return useQuery({
    queryKey: ["employeeDetails"],
    queryFn: () => GetEmployeeDetailsService(email),
  });
};

export const useUpdateEmployeeDetails = () => {
  return useMutation({
    mutationFn: (payload: any) => UpdateEmployeeDetailsService(payload),
    onSuccess: () => {
      console.log("Employee updated succesfully");
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
