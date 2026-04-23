import { useMakeSuggestion } from '../../../hooks/SuggestionHooks/useSuggestion';
import DynamicForm from '../../DynamicForm/DynamicForm';

function MakeSuggestionCard() {
    const mutation = useMakeSuggestion();

    const handleSubmit = (values: any) => {
        mutation.mutate(values)
    }

    const initialValues = {
        topic: "",
        description: ""
    }

    const fields = [
        { name: "topic", label: "Topic", id: "topic", placeholder: "Example: climate management", type: "text" as const },
        {
            name: "description",
            label: "Description",
            id: "description",
            placeholder: "Detailed suggestion...",
            type: "text" as const,
            as: "textarea" as const
        }
    ]

    return (
        <div className='absolute w-80 h-auto bg-white border border-gray-200 rounded-xl shadow-custom z-90 left-1/2 transform -translate-x-1/2 top-20 overflow-hidden'>

            <div className='p-1'>
                <DynamicForm
                    colorScheme='bg-yellow-400'
                    hoverScheme='hover:bg-yellow-500 text-white'
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    title='Send Suggestion'
                    fields={fields}
                />
            </div>
        </div>
    )
}

export default MakeSuggestionCard