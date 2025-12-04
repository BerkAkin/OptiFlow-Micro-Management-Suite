import { useRequestSupport } from '../../../hooks/SupportHooks/UseSupport'
import DynamicForm from '../../DynamicForm/DynamicForm'

function SupportRequestCard() {

    const mutation = useRequestSupport();

    const handleSubmit = (values: any) => {
        mutation.mutate(values)
    }
    const initialValues = {
        category: "",
        description: ""
    }

    const fields = [
        {
            name: "category", label: "Category", id: "category", placeholder: "", type: "text" as const, as: "select" as const, options: [
                { value: "workEnvironment", label: "Work Environment" },
                { value: "ergonomy", label: "Ergonomy" },
                { value: "colleagues", label: "Colleagues" },
            ]
        },
        { name: "description", label: "Description", id: "description", placeholder: "Description...", type: "text" as const, as: "textarea" as const }
    ]

    return (
        <div className='absolute h-68 w-64 bg-white rounded-lg border border-gray-200 shadow-custom z-20 left-1/2 transform -translate-x-1/2 top-16'>
            <DynamicForm colorScheme='bg-lime-600' hoverScheme='hover:bg-lime-700' initialValues={initialValues} onSubmit={handleSubmit} title='Request Support' fields={fields} />
        </div>
    )
}

export default SupportRequestCard
