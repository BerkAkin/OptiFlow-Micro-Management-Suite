import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addNewEmployeeService,
  employeeDetailsService,
  employeesService,
  updateEmployeeDetailsService,
} from "../services/Employee";

export const useListEmployee = (filters: any, page: number) => {
  return useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => employeesService(filters, page),
  });
};

export const useAddEmployee = () => {
  return useMutation({
    mutationFn: (payload: any) => addNewEmployeeService(payload),
    onSuccess: () => {},
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};

export const useDetails = (email: string) => {
  return useQuery({
    queryKey: ["employeeDetails", email],
    queryFn: () => employeeDetailsService(email),
  });
};

export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: any) => updateEmployeeDetailsService(payload),
    onSuccess: () => {
      console.log("Employee updated succesfully");
      queryClient.invalidateQueries({ queryKey: ["allEmployees"] });
    },
    onError: (error: any) => {
      console.log("Error", error);
    },
  });
};
