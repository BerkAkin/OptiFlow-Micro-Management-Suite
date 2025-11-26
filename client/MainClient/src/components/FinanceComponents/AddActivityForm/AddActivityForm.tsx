import DynamicForm from '../../DynamicForm/DynamicForm';

function AddActivityForm() {

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
        isExpense: false

    }

    const fields = [
        { name: "quantity", label: "Quantity", id: "quantity", type: "number" as const, placeholder: "Temp Quantity" },
        { name: "name", label: "Name", id: "name", type: "text" as const, placeholder: "Temp Name" },
        { name: "byWho", label: "By Who", id: "byWho", type: "text" as const, placeholder: "Temp Who" },
        { name: "exchangeType", label: "Exchange", id: "exchangeType", type: "text" as const, placeholder: "Temp Exchange" },
        { name: "date", label: "Date", id: "date", type: "date" as const, placeholder: "Temp Date" },
        { name: "description", label: "Description", id: "description", type: "text" as const, placeholder: "Temp Description" },
        { name: "type", label: "Type", id: "type", type: "text" as const, placeholder: "Temp Type" },
        { name: "isExpense", label: "Is Expense?", id: "isExpense", type: "checkbox" as const, placeholder: "" },
        { name: "file-upload", label: "Select File ", id: "file-upload", type: "file" as const, placeholder: "" },


    ]
    return (
        <div>
            <DynamicForm colorScheme='bg-sky-400' hoverScheme='hover:bg-sky-500' initialValues={initialValues} title='Add Activity' onSubmit={handleSubmit} fields={fields} />
        </div >
    )
}

export default AddActivityForm
