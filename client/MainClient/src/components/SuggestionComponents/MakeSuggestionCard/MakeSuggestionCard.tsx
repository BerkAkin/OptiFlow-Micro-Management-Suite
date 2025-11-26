import { Field, Formik, Form } from 'formik';
import DynamicForm from '../../DynamicForm/DynamicForm';



function MakeSuggestionCard() {

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
        <div className='absolute h-72 w-64 bg-white rounded-lg border border-gray-200 shadow-custom z-20 left-1/2 transform -translate-x-1/2 top-16'>
            <DynamicForm colorScheme='bg-indigo-400' hoverScheme='hover:bg-indigo-500' initialValues={initialValues} onSubmit={handleSubmit} title='Make Suggestion' fields={fields} />
        </div>
    )
}

export default MakeSuggestionCard
