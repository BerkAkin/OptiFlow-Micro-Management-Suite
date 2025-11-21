import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'


interface filterValues {
    month: string,
    year: string
}

function SuggestionList() {

    const [data, setData] = useState<any>();

    const handleFilter = async (filters: filterValues) => {

    }

    const filterInitialValues = {
        month: "",
        year: "",
    }


    return (

        <div className='h-[675px] bg-white rounded-lg shadow-custom border'>
            <div className='w-full h-[10%] text-center flex justify-center items-start'>
                <p className={`text-2xl text-center px-2 text-white bg-indigo-400 rounded-b-sm font-rubik`}>All Suggestions</p>
            </div>

            <div className={`p-2 h-[5%] flex items-end text-indigo-400 font-bold border-b text-md grid grid-cols-10`}>
                <div className="col-span-2 text-start">
                    Header
                </div>
                <div className="col-span-5 text-start px-4">
                    Description
                </div>
                <div className="col-span-1 text-center ">
                    Votes
                </div>
                <div className="col-span-1 text-center">
                    Status
                </div>
                <div className="col-span-1 text-center">
                    Date
                </div>
            </div>
            <div className="h-[75%] border-b overflow-y-auto ">
                <div className="text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid grid-cols-10">
                    <div className="col-span-2 text-start">
                        Deneme Header
                    </div>
                    <div className="col-span-5 text-start px-4">
                        Deneme Description
                    </div>
                    <div className="col-span-1 text-center ">
                        12
                    </div>
                    <div className="col-span-1 text-center">
                        Approved
                    </div>
                    <div className="col-span-1 text-center">
                        12.02.2025
                    </div>
                </div>
            </div>

            <div className='h-[10%] flex items-center pt-1'>
                <Formik onSubmit={handleFilter} initialValues={filterInitialValues}>
                    <Form>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-3'>
                                <Field className="text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent" placeholder="Month" name="month" ></Field>
                            </div>
                            <div className='col-span-3'>
                                <Field className="text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent" placeholder="Year" name="year" ></Field>
                            </div>
                            <div className='col-span-3'>
                                <select name='category' id='category' className='text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent'>
                                    <option className='border-none' selected>Select Filter</option>
                                    <option className='border-none' value={"expenses"}>Approved</option>
                                    <option className='border-none' value={"incomes"}>Refused</option>
                                </select>
                            </div>
                            <div className='col-span-2 flex justify-start'>
                                <button className='rounded-sm bg-gray-400 hover:bg-gray-500 text-3xl w-[50px] text-white w-full mx-2'>{"⌕"}</button>
                            </div>
                            <div className='flex col-span-1 items-center'>
                                <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] ms-2'>{"🡸"}</button>
                                <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] mx-2'>{"🡺"}</button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>


        </div>
    )

}

export default SuggestionList
