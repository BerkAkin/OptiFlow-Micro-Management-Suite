import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

interface valuesTypes { }
interface filterValues {
    month: string,
    year: string
}


function FinanceIncomePage() {

    const [Values, setValues] = useState<valuesTypes | null>(null);
    const [filterValues, setFilterValues] = useState<filterValues | null>(null);

    const handleSubmit = (data: any) => {
        alert(data.class)
    }
    const handleFilter = (data: any) => {
        alert(data.month + data.year)
    }
    const initialValues = {
        class: ""
    }
    const filterInitialValues = {
        month: "",
        year: "",
    }

    return (

        <div className='h-[800px] container grid grid-cols-[25%_75%] mx-auto mt-10 bg-white shadow-md justify-between flex flex-col'>



            <div className='h-[100%] container mx-auto'>
                <div className='h-[25%] justify-center flex items-center'>
                    <p className='text-3xl text-gray-600' style={{ fontFamily: "roobert" }}>ADD NEW INCOME</p>
                </div>
                <div>
                    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                        {({ isSubmitting }) => (
                            <Form>
                                <div className='flex justify-center'>
                                    <Field className="text-gray-700 text-center p-4 border-b focus:outline-none w-25 bg-transparent focus:bg-transparent" type="number" name="quantity" placeholder="Quantity" />
                                </div>
                                <div className='flex justify-center my-3'>
                                    <Field className="text-gray-700 text-center  p-4 border-b  focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="name" placeholder="Name" />
                                </div>
                                <div className='flex justify-center my-3'>
                                    <Field className="text-gray-700 text-center  p-4 border-b text- focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="byWho" placeholder="By Who" />
                                </div>
                                <div className='flex justify-center my-3'>
                                    <Field className="text-gray-700 text-center  p-4 border-b focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="exchangeType" placeholder="Exchange Type" />
                                </div>
                                <div className='flex justify-center my-3'>
                                    < Field className="text-gray-700 text-center  p-4 border-b  focus:outline-none  w-25 bg-transparent focus:bg-transparent" type="text" name="date" placeholder="Date" />
                                </div >
                                <div className='flex justify-center my-3'>
                                    <Field className="text-gray-700 text-center  p-4 border-b  focus:outline-none p-1 w-25 bg-transparent focus:bg-transparent" type="text" name="description" placeholder="Description" />
                                </div>
                                <div className='flex justify-center my-3'>
                                    <input id="file-upload" type="file" name="file" className="hidden" onChange={(event) => { const file = event.currentTarget.files?.[0] || null; }} />
                                    <label htmlFor="file-upload" className="cursor-pointer border-b text-gray-400  p-4">📁 PDF</label>
                                    <p className="text-gray-400 italic pt-4 ps-3">Selected File?</p>
                                </div>
                                <div className='flex justify-center my-3'>
                                    <button type='submit' className='text-center mt-4 rounded-sm bg-indigo-400 hover:bg-indigo-500  text-white h-[40px] w-[50%]'>Add</button>
                                </div>
                            </Form >
                        )
                        }
                    </Formik >
                </div >
            </div >



            <div className="h-[100%] container mx-auto">
                <table className="w-full h-[90%] text-md text-left text-gray-500">
                    <thead className="text-white uppercase h-[10%] bg-green-600">
                        <tr>
                            <th scope="col" className="px-6 ">
                                Name
                            </th>
                            <th scope="col" className="px-6 ">
                                Description
                            </th>
                            <th scope="col" className="px-6 ">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 ">
                                Price
                            </th>
                            <th scope="col" className="px-6 ">
                                Exchange Type
                            </th>
                            <th scope="col" className="px-6 ">
                                From
                            </th>
                            <th scope="col" className="px-6 ">
                                Date
                            </th>

                        </tr>
                    </thead>
                    <tbody className='border-s border-b'>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <tr className="bg-white border-b hover:bg-gray-100">
                                <th scope="row" className="px-6 font-medium text-gray-700">
                                    Vergi İadesi
                                </th>
                                <td className="px-6 py-2 text-xs">
                                    Son ay yapılan ödemelerin vergi iadesi
                                    Son ay yapılan ödemelerin vergi iadesi
                                    Son ay yapılan ödemelerin vergi iadesi
                                    Son ay yapılan ödemelerin vergi iadesi
                                    Son ay yapılan ödemelerin vergi iadesi
                                    Son ay yapılan ödemelerin vergi iadesi
                                </td>
                                <td className="px-6 text-center">
                                    1
                                </td>
                                <td className="px-6 text-center">
                                    5000
                                </td>
                                <td className="px-6 text-center">
                                    Türk Lirası
                                </td>
                                <td className="px-6 text-center text-sm">
                                    Devlet
                                </td>
                                <td className="px-6 text-center">
                                    29.10.2025
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='h-[10%] grid grid-cols-[80%_20%]'>
                    <div>
                        <Formik onSubmit={handleFilter} initialValues={filterInitialValues}>
                            <Form>
                                <div className='container mx-auto grid grid-cols-[40%_40%_20%] gap-1'>
                                    <div className='border-x'>
                                        <Field className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent" placeholder="Month" name="month" ></Field>

                                    </div>
                                    <div>
                                        <Field className="text-gray-700 focus:outline-none p-5 w-full h-full bg-transparent focus:bg-transparent" placeholder="Year" name="year" ></Field>
                                    </div>
                                    <div className='border-e p-5 border-s'>
                                        <button className='rounded-sm bg-indigo-400 hover:bg-indigo-500  text-white w-[100%] p-2'>Filter</button>

                                    </div>
                                </div>


                            </Form>
                        </Formik>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className='flex items-center justify-end'>
                            <button className='rounded-sm bg-indigo-400 hover:bg-indigo-500  text-white w-[50%] p-2'>{"🡸"}</button>
                        </div>
                        <div className='flex items-center justify-start'>
                            <button className='rounded-sm bg-indigo-400 hover:bg-indigo-500  text-white w-[50%] mx-2 p-2'>{"🡺"}</button>
                        </div>
                    </div>

                </div>

            </div>

        </div >
    )
}

export default FinanceIncomePage
