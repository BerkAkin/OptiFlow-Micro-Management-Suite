import { useToatsContext } from '../../../context/ToastContext';
import { useCreateTransaction } from '../../../hooks/FinanceHooks/useFinance';
import DynamicForm from '../../DynamicForm/DynamicForm';
import { addTransactionValidationScheme } from './AddTransactionValidations';

function AddTransaction() {

    const mutation = useCreateTransaction();
    const { showToast } = useToatsContext();

    const handleSubmit = (data: any) => {
        mutation.mutate(data, {
            onSuccess: () => {
                showToast("Transaction başarıyla eklendi!");
            },
            onError: (e: any) => {
                console.log(e);
                showToast("Bir hata oluştu!", "error");
            }
        });
    }

    const initialValues = {
        quantity: 1,
        who: "",
        exchange: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        income: false,
        partly: false,
        parts: 1,
        price: 1,
        category: "",
        invoice: "",

    }

    const fields = [
        { name: "description", label: "Description", id: "description", type: "text" as const, as: "textarea" as const, placeholder: "Description" },
        { name: "quantity", label: "Quantity", id: "quantity", type: "number" as const, placeholder: "Quantity" },
        { name: "parts", label: "Part Count", id: "partCount", type: "number" as const, placeholder: "Part Count" },
        { name: "price", label: "Price", id: "partPrice", type: "number" as const, placeholder: "Price" },
        { name: "who", label: "Who", id: "Who", type: "text" as const, placeholder: "Who" },
        { name: "exchange", label: "Exchange", id: "exchangeType", type: "text" as const, placeholder: "Exchange" },
        { name: "category", label: "Category", id: "category", type: "text" as const, as: "select" as const, options: [{ label: "Transport", value: "transport" }, { label: "Food", value: "food" }], placeholder: "Category" },
        { name: "date", label: "Date", id: "date", type: "date" as const, placeholder: "Date..." },
        { name: "invoice", label: "Select File", id: "invoicePath", type: "file" as const, placeholder: "Dosya:" },
        { name: "partly", label: "Installment?", id: "isPartly", type: "checkbox" as const, placeholder: "" },
        { name: "income", label: "Is Income?", id: "isIncome", type: "checkbox" as const, placeholder: "" },
    ]

    return (
        <div className='h-full'>
            <DynamicForm validationScheme={addTransactionValidationScheme} colorScheme='bg-blue-400' hoverScheme='hover:bg-blue-500' initialValues={initialValues} title='Add Transaction' onSubmit={handleSubmit} fields={fields} />
        </div >
    )
}

export default AddTransaction
