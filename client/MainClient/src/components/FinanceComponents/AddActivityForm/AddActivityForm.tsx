import { Field, Formik, Form } from 'formik';
import React, { useState } from 'react'




interface valuesTypes { }

function AddActivityForm() {
    const [Values, setValues] = useState<valuesTypes | null>(null);





    const handleSubmit = (data: any) => {
        alert(data.class)
    }

    const initialValues = {
        class: "",
        isExpense: false
    }


    return (
        <div>
            <div className='w-full h-[50px] flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 text-white bg-sky-400 rounded-b-sm `} style={{ fontFamily: "roobert" }}>Add Activity</p>
            </div>
            <div>
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='grid grid-cols-[40%_60%]'>
                                <div>
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='quantity'>Quantity:</label></div>
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='name'>Name:</label></div>
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='byWho'>By Who:</label></div >
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='exchangeType'>Exchange:</label></div>
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='date'>Date:</label></div>
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700' htmlFor='description'>Description:</label></div>
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700 cursor-pointer' htmlFor="isExpense" >Expense?</label></div>
                                    <div className='h-[10%] flex items-center justify-end'><label className='my-3 text-lg text-gray-700 cursor-pointer' htmlFor="file-upload">📁 PDF: </label></div>
                                </div >
                                <div>
                                    <div className='h-[10%] flex items-center'>
                                        <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" type="number" name="quantity" placeholder="5" />
                                    </div>
                                    <div className='h-[10%] flex items-center'>
                                        <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" type="text" name="name" placeholder="Temp" />
                                    </div>
                                    <div className='h-[10%] flex items-center'>
                                        <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" type="text" name="byWho" placeholder="Berk" />
                                    </div>
                                    <div className='h-[10%] flex items-center'>
                                        <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" type="text" name="exchangeType" placeholder="TL/EUR" />
                                    </div>
                                    <div className='h-[10%] flex items-center'>
                                        <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" type="text" name="date" placeholder="25.10.2025" />
                                    </div >
                                    <div className='h-[10%] flex items-center'>
                                        <Field className="border-b mx-2 my-3 text-md focus:outline-none w-[80%] bg-transparent focus:bg-transparent" type="text" name="description" placeholder="Temp Desc" />
                                    </div>
                                    <div className='h-[10%] flex items-center'>
                                        <Field type="checkbox" className="mx-2 text-gray-700 text-center border  focus:outline-none p-1 w-25 bg-transparent focus:bg-transparent" id="isExpense" name="isExpense" />
                                    </div>
                                    <div className='h-[10%] flex items-center '>
                                        <input id="file-upload" type="file" name="file" className="hidden" onChange={(event) => { const file = event.currentTarget.files?.[0] || null; }} />
                                        <p className="text-gray-400 italic ps-3">Selected File</p></div>
                                    <div className='h-[20%] flex items-end'>
                                        <button type='submit' className='text-center mt-4 rounded-sm bg-sky-400 hover:bg-sky-500 text-4xl text-white h-[40px] w-[50%]'>+</button>
                                    </div>
                                </div>
                            </div >


                        </Form >
                    )
                    }
                </Formik >
            </div >
        </div >
    )
}

export default AddActivityForm
