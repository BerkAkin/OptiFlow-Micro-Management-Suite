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
        { name: "topic", label: "Topic", id: "topic", placeholder: "Topic...", type: "text" as const },
        { name: "description", label: "Description", id: "description", placeholder: "Description...", type: "text" as const, as: "textarea" as const }
    ]

    return (
        <div className='absolute h-60 w-64 bg-white rounded-lg border border-gray-200 shadow-custom z-20 left-1/2 transform -translate-x-1/2 top-16'>
            <DynamicForm colorScheme='bg-indigo-400' hoverScheme='hover:bg-indigo-500' initialValues={initialValues} onSubmit={handleSubmit} title='Make Suggestion' fields={fields} />
        </div>
    )
}

export default MakeSuggestionCard
