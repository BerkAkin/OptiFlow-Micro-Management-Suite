import { useMutation, useQueryClient } from "@tanstack/react-query";
import {incomeService} from '../../infrastructure/services/finance/incomeService';

export const useAddIncome =()=>{
    //Income için yazılan apiyi tüketen kısım 
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn:(data:any)=> incomeService.addIncome(data),
        onSuccess:()=>{ queryClient.invalidateQueries({queryKey: ['incomes']});},
    })
    return mutation;
}

/* kullanılanacak yerde ise şu şekilde doğrudan kullanılabilir hooku. her bir endpoint için yazımı yapılırsa clean arch elde edilir.

import { useAddTable } from "../application/useAddTable";


const handleSubmit = (e: any) => {
    addTableMutation.mutate({ tableNumber, capacity: Number(capacity),});
  };

*/