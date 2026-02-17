import { useRequestSupport } from '../../../hooks/SupportHooks/UseSupport'
import DynamicForm from '../../DynamicForm/DynamicForm'

function SupportRequestCard() {

    const mutation = useRequestSupport();

    const handleSubmit = (values: any) => {
        mutation.mutate(values)
    }
    const initialValues = {
        message: ""
    }

    const fields = [
        { name: "message", label: "Message", id: "message", placeholder: "Message...", type: "text" as const, as: "textarea" as const }
    ]

    return (
        <div className='absolute h-60 w-64 bg-white rounded-lg border border-gray-200 shadow-custom z-20 left-1/2 transform -translate-x-1/2 top-16'>
            <DynamicForm colorScheme='bg-lime-600' hoverScheme='hover:bg-lime-700' initialValues={initialValues} onSubmit={handleSubmit} title='Request Support' fields={fields} />
        </div>
    )
}

export default SupportRequestCard
