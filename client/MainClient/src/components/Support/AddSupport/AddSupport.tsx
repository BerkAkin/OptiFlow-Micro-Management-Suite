
import { useAddSupportRequest } from '../../../hooks';
import { DynamicForm } from '../../Common';

export function AddSupport() {
    const mutation = useAddSupportRequest();

    const handleSubmit = (values: any) => {
        const newValues = {
            ...values,
            category: Number(values.category)
        }
        mutation.mutate(newValues)
    }

    const initialValues = {
        message: "",
        category: 6
    }

    const fields = [
        {
            name: "category", label: "Category", id: "category", placeholder: "Select category...", type: "text" as const, as: "select" as const,
            options: [
                { label: "Environment", value: 1 },
                { label: "Colleagues", value: 2 },
                { label: "Workload", value: 3 },
                { label: "Mood", value: 4 },
                { label: "System", value: 5 },
                { label: "General", value: 6 },
            ],
        },
        {
            name: "message",
            label: "Your Message",
            id: "message",
            placeholder: "Describe your situation...",
            type: "text" as const,
            as: "textarea" as const
        },
    ]

    return (

        <div className='absolute w-80 h-auto bg-white border border-gray-200 rounded-xl shadow-custom z-90 left-1/2 transform -translate-x-1/2 top-20 overflow-hidden'>
            <div className='p-1'>
                <DynamicForm
                    colorScheme='bg-blue-600'
                    hoverScheme='hover:bg-blue-700'
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    title='New Support Request'
                    fields={fields}
                />
            </div>

            <div className='bg-slate-50 px-6 py-3 border-t border-slate-100'>
                <p className='text-sm text-slate-500 text-center'>
                    Your request will be handled by the HR department.
                </p>
            </div>
        </div>
    )
}

