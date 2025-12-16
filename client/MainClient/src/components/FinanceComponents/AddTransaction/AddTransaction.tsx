import { useCreateTransaction } from '../../../hooks/FinanceHooks/useFinance';
import DynamicForm from '../../DynamicForm/DynamicForm';

function AddTransaction() {

    const mutation = useCreateTransaction();

    const handleSubmit = (data: any) => {
        mutation.mutate(data, {
            onSuccess: (data) => { console.log("Data Saved YAY", data) },
            onError: (error) => { console.log("Error Na!", error) }
        })
    }

    const initialValues = {
        quantity: "",
        name: "",
        byWho: "",
        exchangeType: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        type: "",
        isIncome: false,
        isPartly: false,
        partCount: "",
        partPrice: "",

    }

    const fields = [
        { name: "quantity", label: "Quantity", id: "quantity", type: "text" as const, placeholder: "Quantity" },
        { name: "who", label: "Who", id: "Who", type: "text" as const, placeholder: "Who" },
        { name: "exchangeType", label: "Exchange", id: "exchangeType", type: "text" as const, placeholder: "Exchange" },
        { name: "date", label: "Date", id: "date", type: "date" as const, placeholder: "Date..." },
        { name: "description", label: "Description", id: "description", type: "text" as const, placeholder: "Description" },
        { name: "isPartly", label: "Is Partly?", id: "isPartly", type: "checkbox" as const, placeholder: "" },
        { name: "partCount", label: "Part Count", id: "partCount", type: "text" as const, placeholder: "Part Count" },
        { name: "price", label: "Price", id: "partPrice", type: "text" as const, placeholder: "Price" },
        { name: "isIncome", label: "Is Income?", id: "isIncome", type: "checkbox" as const, placeholder: "" },
        { name: "invoicePath", label: "Select File", id: "invoicePath", type: "file" as const, placeholder: "" },
        { name: "category", label: "Category", id: "category", type: "text" as const, as: "select" as const, options: [{ label: "Transport", value: "transport" }, { label: "Food", value: "food" }], placeholder: "Category" },
    ]

    return (
        <div>
            <DynamicForm colorScheme='bg-blue-400' hoverScheme='hover:bg-blue-500' initialValues={initialValues} title='Add Transaction' onSubmit={handleSubmit} fields={fields} />
        </div >
    )
}

export default AddTransaction
