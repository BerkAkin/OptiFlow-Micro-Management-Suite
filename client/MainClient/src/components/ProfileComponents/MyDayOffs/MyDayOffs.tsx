import { Field, Form, Formik } from 'formik'
import React from 'react'

function MyDayOffs() {

    const handleSubmit = () => {

    }
    const initialValues = {
        topic: "",
        description: "",
        days: 10,
        datesBetween: new Date()
    }

    return (
        <div className='grid grid-cols-9 gap-2 w-full h-[500px]'>

            <div className='col-span-7 border bg-white rounded-lg shadow-lg h-[500px] w-full'>
                <div className='justify-center flex '>
                    <p className={`text-2xl text-center rounded-b-sm px-2 text-white bg-sky-400 font-roobert`}>Days Off</p>
                </div>
                <div className={`h-[10%] p-2 text-sky-400 font-bold border-b text-md grid grid-cols-10`}>
                    <div className="col-span-2 text-start">
                        Topic
                    </div>
                    <div className="col-span-4 text-start px-4">
                        Description
                    </div>
                    <div className="col-span-1 text-center ">
                        Days
                    </div>
                    <div className="col-span-1 text-center">
                        Status
                    </div>
                    <div className="col-span-2 text-center">
                        Dates Between
                    </div>
                </div>
                <div className="h-[75%] border-b overflow-y-auto ">
                    <div className="text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid grid-cols-10">
                        <div className="col-span-2 text-start">
                            Deneme Topic
                        </div>
                        <div className="col-span-4 text-start px-4">
                            Deneme Description
                        </div>
                        <div className="col-span-1 text-center ">
                            10
                        </div>
                        <div className="col-span-1 text-center">
                            Approved
                        </div>
                        <div className="col-span-2 text-center">
                            12.02.2025 - 22.02.2025
                        </div>
                    </div>
                </div>
                <div className='h-[10%] flex items-center'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-3'>
                        </div>
                        <div className='col-span-3'>
                        </div>
                        <div className='col-span-3'>

                        </div>
                        <div className='col-span-2 flex justify-start'>
                        </div>
                        <div className='flex col-span-1 items-center'>
                            <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] ms-2'>{"🡸"}</button>
                            <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] mx-2'>{"🡺"}</button>
                        </div>
                    </div>



                </div>
            </div>
            <div className='col-span-2 border bg-white rounded-lg shadow-lg border h-[350px] '>
                <div>
                    <p className={`text-lg rounded-t-lg text-center rounded-b-sm px-2 text-white bg-sky-400 font-roobert`}>Take a Day Off</p>
                    <div className='mt-4'>
                        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className='grid grid-cols-10 '>
                                        <div className='col-span-4'>
                                            <div className='justify-end flex mt-5'><label className='text-lg mx-1 text-gray-700' htmlFor='topic'>Topic:</label></div>
                                            <div className='justify-end flex mt-5'><label className='text-lg mx-1 text-gray-700' htmlFor='description'>Description:</label></div>
                                            <div className='justify-end flex mt-12'><label className='text-lg mx-1 text-gray-700' htmlFor='description'>Days:</label></div>
                                            <div className='justify-end flex mt-5'><label className='pt-2 text-md mx-1  text-gray-700' htmlFor='description'>Dates Between:</label></div>
                                        </div>
                                        <div className='col-span-6'>
                                            <div className='mt-5'>
                                                <Field className="border-b text-lg focus:outline-none w-[90%] bg-transparent focus:bg-transparent" name="topic" placeholder="Temp Topic" />
                                            </div>
                                            <div className='mt-5'>
                                                <Field rows={2} as="textarea" className="border-b text-lg focus:outline-none w-[90%] bg-transparent focus:bg-transparent" name="description" placeholder="Temp Description" />
                                            </div>
                                            <div className='mt-3'>
                                                <Field className="border-b text-lg focus:outline-none w-[90%] bg-transparent focus:bg-transparent" name="days" placeholder="Temp Day Count" />
                                            </div>
                                            <div className='mt-5'>
                                                <Field type="date" className="border-b text-lg focus:outline-none w-[90%] bg-transparent focus:bg-transparent" name="datesBetween" placeholder="Temp Between" />
                                            </div>
                                        </div>


                                    </div>
                                    <div className='flex justify-center items-center '>
                                        <button type='submit' className='my-5 rounded-sm bg-green-500 hover:bg-green-600 text-white h-[40px] text-4xl w-[75%]'>+</button>
                                    </div>
                                </Form >
                            )}
                        </Formik >
                    </div>

                </div>
            </div>

        </div>
    )
}

export default MyDayOffs
