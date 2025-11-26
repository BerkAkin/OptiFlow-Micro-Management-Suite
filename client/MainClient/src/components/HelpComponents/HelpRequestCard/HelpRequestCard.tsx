import DynamicForm from '../../DynamicForm/DynamicForm'

function HelpRequestCard() {
    const handleSubmit = (values: any) => { console.log(values) }
    const initialValues = {
        topic: "",
        description: ""
    }

    const fields = [
        { name: "topic", label: "Topic", id: "topic", placeholder: "Temp Topic", type: "text" as const },
        { name: "description", label: "Description", id: "description", placeholder: "Temp Description", type: "text" as const, as: "textarea" as const }
    ]

    return (
        <div className='absolute h-68 w-64 bg-white rounded-lg border border-gray-200 shadow-custom z-20 left-1/2 transform -translate-x-1/2 top-16'>
            <DynamicForm colorScheme='bg-lime-600' hoverScheme='hover:bg-lime-700' initialValues={initialValues} onSubmit={handleSubmit} title='Request Help' fields={fields} />
        </div>
    )
}

export default HelpRequestCard
