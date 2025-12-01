import DynamicForm from '../../DynamicForm/DynamicForm';

function AddTransaction() {

    const handleSubmit = (data: any) => {
        console.log(data);
    }

    const initialValues = {
        quantity: 0,
        name: "",
        byWho: "",
        exchangeType: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
        type: "",
        isIncome: false,
        isPartly: false,
        partCount: 0,
        partPrice: 0,

    }

    const fields = [
        { name: "quantity", label: "Quantity", id: "quantity", type: "number" as const, placeholder: "Quantity..." },
        { name: "name", label: "Name", id: "name", type: "text" as const, placeholder: "Name..." },
        { name: "byWho", label: "By Who", id: "byWho", type: "text" as const, placeholder: "Who..." },
        { name: "exchangeType", label: "Exchange", id: "exchangeType", type: "text" as const, placeholder: "Exchange..." },
        { name: "date", label: "Date", id: "date", type: "date" as const, placeholder: "Date..." },
        { name: "description", label: "Description", id: "description", type: "text" as const, placeholder: "Description..." },
        { name: "type", label: "Type", id: "type", type: "text" as const, placeholder: "Type..." },
        { name: "isPartly", label: "Is Partly?", id: "isPartly", type: "checkbox" as const, placeholder: "" },
        { name: "partCount", label: "Part Count", id: "partCount", type: "number" as const, placeholder: "Part Count..." },
        { name: "partPrice", label: "Part Price", id: "partPrice", type: "number" as const, placeholder: "Part Price..." },
        { name: "isIncome", label: "Is Income?", id: "isIncome", type: "checkbox" as const, placeholder: "" },
        { name: "file-upload", label: "Select File ", id: "file-upload", type: "file" as const, placeholder: "" },
    ]

    return (
        <div>
            <DynamicForm colorScheme='bg-sky-400' hoverScheme='hover:bg-sky-500' initialValues={initialValues} title='Add Transaction' onSubmit={handleSubmit} fields={fields} />
        </div >
    )
}

export default AddTransaction
