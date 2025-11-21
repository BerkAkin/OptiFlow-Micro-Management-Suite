import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import DynamicForm from '../../DynamicForm/DynamicForm'


interface FormValueTypes {
    employee: string,
    stars: number
}
const initialValues: FormValueTypes = {
    employee: "",
    stars: 0,
}

const handleSubmit = (values: FormValueTypes) => {
    console.log(values)
}



function RateOthers() {

    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    return (
        <div>
            <DynamicForm onSubmit={handleSubmit} fields={null} btnText='Rate Others' colorScheme='bg-rose-400' hoverScheme='hover:bg-rose-500' title='Rate Others' initialValues={initialValues} >
                {({ setFieldValue, values }) => {
                    return (
                        <div>
                            <label className='text-gray-700' htmlFor='employee'>Employee</label>
                            <Field as="select" className="border resize-none text-gray-600 w-full rounded-sm px-2 py-1 focus:outline-none" name="employee" id="employee">
                                <option value="">Select Employee</option>
                                <option value="berkAkin">Berk Akın</option>
                            </Field>

                            <div className='flex my-5'>
                                <label className='text-gray-700' htmlFor='stars'>Rate</label>
                                {
                                    Array.from({ length: 5 }).map((item, index) => {
                                        const isActive = hoverIndex !== null ? index <= hoverIndex : index <= (selectedIndex ?? +1)
                                        return (
                                            <p className={`${isActive ? "text-orange-400" : ""} cursor-pointer text-lg text-gray-700 ps-1`}
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
