import DynamicForm from "../../DynamicForm/DynamicForm"


interface FormValueTypes {
    description: string
}

const initialValues: FormValueTypes = {
    description: ""
}

const handleSubmit = (values: FormValueTypes) => {
    console.log(values)
}
const fields = [{ placeholder: "Temp Description", name: "description", label: "Description", id: "description", type: "text" as const, as: "textarea" as const }]

function GetHelp() {
    return (
        <div className='h-[220px]'>
            <DynamicForm fields={fields} btnText="Get Help" colorScheme="bg-rose-400" hoverScheme="hover:bg-rose-500" initialValues={initialValues} onSubmit={handleSubmit} title="Ask for Help Anonymously" />
        </div>
    )
}

export default GetHelp
