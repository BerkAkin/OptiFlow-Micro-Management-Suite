import { Field, Formik, Form } from 'formik';
import React, { useState } from 'react'




interface valuesTypes { }

function AddIncomeOrExpenseForm() {
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
                <p className={`text-2xl text-center w-64 border-b border-x text-indigo-400 border-indigo-400 bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Add Income/Expense</p>
            </div>
            <div>
                <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='flex justify-center'>
                                <Field className="text-gray-700 text-center p-2  border focus:outline-none w-25 bg-transparent focus:bg-transparent" type="number" name="quantity" placeholder="Quantity" />
                            </div>
                            <div className='flex justify-center my-1'>
                                <Field className="text-gray-700 text-center  p-2  border  focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="name" placeholder="Name" />
                            </div>
                            <div className='flex justify-center my-1'>
                                <Field className="text-gray-700 text-center  p-2  border text- focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="byWho" placeholder="By Who" />
                            </div>
                            <div className='flex justify-center my-1'>
                                <Field className="text-gray-700 text-center  p-2  border focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="exchangeType" placeholder="Exchange Type" />
                            </div>
                            <div className='flex justify-center my-1'>
                                < Field className="text-gray-700 text-center  p-2  border  focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="date" placeholder="Date" />
                            </div >
                            <div className='flex justify-center my-1'>
                                <Field className="text-gray-700 text-center  p-2  border  focus:outline-none p-1 w-25 bg-transparent focus:bg-transparent" type="text" name="description" placeholder="Description" />
                            </div>
                            <div className='flex justify-center my-1'>
                                <input id="file-upload" type="file" name="file" className="hidden" onChange={(event) => { const file = event.currentTarget.files?.[0] || null; }} />
                                <label htmlFor="file-upload" className="cursor-pointer border text-gray-400  p-4">📁 PDF</label>
                                <p className="text-gray-400 italic pt-4 ps-3">Selected File?</p>
                            </div>
                            <div className='flex justify-center my-1'>
                                <label htmlFor="isExpense" className="cursor-pointer text-gray-400">Expense</label>
                                <Field type="checkbox" className="mx-2 text-gray-700 text-center  p-2  border  focus:outline-none p-1 w-25 bg-transparent focus:bg-transparent" id="isExpense" name="isExpense" />
                            </div>
                            <div className='flex justify-center mb-5'>
                                <button type='submit' className='text-center mt-4 rounded-sm bg-indigo-400 hover:bg-indigo-500  text-white h-[40px] w-[50%]'>Add</button>
                            </div>
                        </Form >
                    )
                    }
                </Formik >
            </div >
        </div>
    )
}

export default AddIncomeOrExpenseForm
