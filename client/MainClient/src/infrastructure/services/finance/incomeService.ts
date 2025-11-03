import { incomeRepository } from "../../../domain/repositories/finance/incomeRepository";

export const incomeService = {
    addIncome: async(data:any)=>{
        //business logic eklenir veri formatlanır doğrulanır vesaire
        const formattedData = {...data, createdAt: new Date()};
        return await incomeRepository.addIncome(formattedData);
    }
}