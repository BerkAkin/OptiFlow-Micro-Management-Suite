import { useState } from 'react'
import DynamicForm from '../../DynamicForm/DynamicForm'
import { useRateOthers } from '../../../hooks/SupportHooks/UseSupport'


interface FormValueTypes {
    employee: string,
    comment: string,
    stars: number
}
const initialValues: FormValueTypes = {
    employee: "",
    comment: "",
    stars: 0,
}




function RateOthers() {

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const mutation = useRateOthers();

    const handleSubmit = (values: FormValueTypes) => {
        mutation.mutate(values);
    }


    const fields = [
        { name: "employee", id: "employee", type: "text" as const, as: "select" as const, label: "Employee", options: [{ label: "Berk Akın", value: "berkAkin" }, { label: "Murat Eke", value: "muratEke" }] },
        { name: "comment", id: "comment", type: "text" as const, as: "textarea" as const, label: "Comment", placeholder: "Comment..." }
    ]

    return (
        <div className='bg-white border border-gray-200 rounded-lg h-full'>
            <DynamicForm onSubmit={handleSubmit} fields={fields} colorScheme='bg-lime-600' hoverScheme='hover:bg-lime-700' title='Rate Others' initialValues={initialValues} >
                {({ setFieldValue, values }) => {
                    return (
                        <div className='space-y-6'>

                            <div className='flex my-5'>
                                <label className='text-gray-700 ps-1' htmlFor='stars'>Rate</label>
                                {
                                    Array.from({ length: 5 }).map((item, index) => {
                                        const isActive = hoverIndex !== null ? index <= hoverIndex : index <= (selectedIndex ?? +1)
                                        return (
                                            <p className={`${isActive ? "text-orange-400" : ""} cursor-pointer text-lg text-gray-700 ps-2`}
                                                onClick={() => { setSelectedIndex(index); setFieldValue("stars", index + 1) }} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>★</p>
                                        )

                                    })}
                            </div>

                        </div>
                    )
                }}


            </DynamicForm>



        </div>
    )
}

export default RateOthers
