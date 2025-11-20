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
        <div className='h-[200px] grid grid-cols-10 gap-5'>
            <div className='col-span-5  shadow-lg border rounded-lg bg-white'>
                <div className='w-full h-[10%] flex justify-center items-start'>
                    <p className={`text-center px-4 text-lg text-white bg-sky-400 rounded-b-sm font-roobert`}>Rate Others</p>
                </div>
                <div className='h-[90%]'>
                    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                        {({ isSubmitting, values, setFieldValue }) => (
                            <Form className='h-full'>
                                <div className='h-[75%] flex items-center grid grid-cols-10 '>
                                    <div className='h-[50%] col-span-4'>
                                        <div className='justify-end flex items-center'>
                                            <label className=' text-lg mx-1 text-gray-700' htmlFor='employee'>Employee: </label>
                                        </div>
                                        <div className='justify-end flex items-center'>
                                            <label className=' text-lg mx-1 text-gray-700' htmlFor='stars'>Rate: </label>
                                        </div>
                                    </div>
                                    <div className='h-[50%] col-span-6'>
                                        <div className='flex justify-start items-center'>
                                            <Field as="select" className='border-none focus:border-none focus:outline-none border-b w-[90%] text-lg text-gray-700' name="employee" id="employee">
                                                <option value="">select employee</option>
                                                <option value="berkAkin">Berk Akın</option>
                                            </Field>
                                        </div>
                                        <div className='flex justify-start items-center mt-1'>
                                            {
                                                Array.from({ length: 5 }).map((item, index) => {
                                                    const isActive = hoverIndex !== null ? index <= hoverIndex : index <= (selectedIndex ?? +1)
                                                    return (
                                                        <>
                                                            <p className={`${isActive ? "text-orange-400" : ""} cursor-pointer text-lg text-gray-700`}
                                                                onClick={() => { setSelectedIndex(index); setFieldValue("stars", index + 1) }} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>★</p>
                                                        </>
                                                    )

                                                })}

                                        </div>

                                    </div>
                                </div>
                                <div className='h-[25%] flex justify-center items-center pb-5'>
                                    <button type='submit' className='rounded-sm bg-sky-400 hover:bg-sky-500 text-white h-[40px] text-4xl w-36'>+</button>
                                </div>
                            </Form >
                        )}
                    </Formik >
                </div>
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
