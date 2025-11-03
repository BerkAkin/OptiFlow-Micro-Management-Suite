import axiosInstance from "../../../infrastructure/axiosInstance";

export const incomeRepository ={
    addIncome: async(data:any)=>{
        const res= await axiosInstance.post("/incomes",data); 
        return res.data;
    },
};