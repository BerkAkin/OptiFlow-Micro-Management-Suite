import { Field, Form, Formik } from 'formik'
import { useState } from 'react'


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
        <div className='grid grid-cols-10 gap-5'>
            <div className='col-span-5 shadow-lg border rounded-lg bg-white'>
                <div className='w-full'>
                    <p className={`text-center px-4 text-lg text-white bg-sky-400 font-roobert rounded-t-lg`}>Rate Others</p>
                </div>
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    {({ setFieldValue }) => (
                        <Form className="p-4 space-y-1">
                            <div className='flex flex-col space-y-1'>

                                <label className='text-gray-700' htmlFor='employee'>Employee</label>
                                <Field as="select" className="border resize-none w-full rounded-sm px-2 py-1 focus:outline-none" name="employee" id="employee">
                                    <option value="">select employee</option>
                                    <option value="berkAkin">Berk Akın</option>
                                </Field>

                                <label className='text-gray-700' htmlFor='stars'>Rate</label>
                                <div className='flex'>
                                    {
                                        Array.from({ length: 5 }).map((item, index) => {
                                            const isActive = hoverIndex !== null ? index <= hoverIndex : index <= (selectedIndex ?? +1)
                                            return (
                                                <>
                                                    <p className={`${isActive ? "text-orange-400" : ""} cursor-pointer text-lg text-gray-700 ps-1`}
                                                        onClick={() => { setSelectedIndex(index); setFieldValue("stars", index + 1) }} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>★</p>
                                                </>
                                            )

                                        })}

                                </div>
                            </div>



                            <div className="flex justify-center pt-2">
                                <button type='submit' className=' text-white px-6 py-2 rounded-sm bg-sky-400 hover:bg-sky-500  transition'>Rate Others</button>
                            </div>
                        </Form >
                    )}
                </Formik >
            </div>
            <div className='col-span-2 shadow-lg border rounded-lg bg-white'>
                <div className='w-full h-[15%] flex justify-center items-start'>
                    <p className={`text-center px-4 text-lg text-white bg-orange-400 rounded-b-sm font-roobert`}>My Score</p>
                </div>
                <div className='h-[50%] flex justify-center items-center'>
                    <p className={`text-7xl pt-4 text-amber-500`}>★</p>
                </div>
                <div className='h-[25%] flex justify-center items-start'>
                    <p className={`text-4xl text-amber-500`}>4.7</p>
                </div>
            </div>
        </div>
    )
}

export default RateOthers
