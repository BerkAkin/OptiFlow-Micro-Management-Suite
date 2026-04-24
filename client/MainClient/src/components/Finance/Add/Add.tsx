import { useToatsContext } from '../../../context/ToastContext';
import { useAddTransaction } from '../../../hooks';
import { DynamicForm } from '../../Common';
import { addValidationScheme } from './AddValidations';

export function Add() {
    const mutation = useAddTransaction();
    const { showToast } = useToatsContext();

    const handleSubmit = (data: any) => {
        mutation.mutate(data, {
            onSuccess: () => {
                showToast("Transaction Added Succesfully!", "success");
            },
            onError: (e: any) => {
                console.error(e);
                showToast("An Error Has Occured!", "error");
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
        { name: "description", label: "Description", id: "description", type: "text" as const, as: "textarea" as const, placeholder: "Add operation details..." },
        { name: "category", label: "Category", id: "category", type: "text" as const, as: "select" as const, options: [{ label: "Transports", value: "transport" }, { label: "Food", value: "food" }], placeholder: "Select Category" },
        { name: "price", label: "Price", id: "partPrice", type: "number" as const, placeholder: "0.00" },
        { name: "quantity", label: "Amount", id: "quantity", type: "number" as const, placeholder: "1" },
        { name: "who", label: "To Who/Where", id: "Who", type: "text" as const, placeholder: "Name or Place" },
        { name: "exchange", label: "Exchange", id: "exchangeType", type: "text" as const, placeholder: "TRY, USD, EUR" },
        { name: "date", label: "Date", id: "date", type: "date" as const },
        { name: "parts", label: "Parts", id: "partCount", type: "number" as const, placeholder: "1" },
        { name: "invoice", label: "Add Invoice", id: "invoicePath", type: "file" as const },
        { name: "partly", label: "Is Partly?", id: "isPartly", type: "checkbox" as const },
        { name: "income", label: "Is Income?", id: "isIncome", type: "checkbox" as const },
    ]

    return (
        <div className="w-full bg-white rounded-xl shadow-custom border border-gray-200 overflow-hidden transition-all">

            <div className="p-3">
                <DynamicForm
                    validationScheme={addValidationScheme}
                    colorScheme="bg-blue-500"
                    hoverScheme="hover:bg-blue-600"
                    initialValues={initialValues}
                    title="Add New Transaction"
                    onSubmit={handleSubmit}
                    fields={fields}
                />
            </div>
        </div>
    )
}

