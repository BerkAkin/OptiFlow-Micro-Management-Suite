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

        <div className='h-[680px] bg-white rounded-lg shadow-lg border'>
            <div className='w-full h-[10%] text-center flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 text-white bg-indigo-400 rounded-b-sm font-roobert`}>All Suggestions</p>
            </div>

            <div className={`h-[5%] p-2 text-indigo-400 font-bold border-b text-md grid grid-cols-[10%_60%_10%_10%_10%]`}>
                <div className="text-start">
                    Header
                </div>
                <div className="text-start px-4">
                    Description
                </div>
                <div className="text-center ">
                    Votes
                </div>
                <div className="text-center">
                    Status
                </div>
                <div className="text-center">
                    Date
                </div>
            </div>
            <div className="h-[75%] border-b overflow-y-auto ">
                <div className="text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid grid-cols-[10%_60%_10%_10%_10%]">
                    <div className="text-center">
                        Deneme Header
                    </div>
                    <div className="text-start px-4">
                        Deneme Description
                    </div>
                    <div className="text-center ">
                        12
                    </div>
                    <div className="text-center">
                        Approved
                    </div>
                    <div className="text-center">
                        12.02.2025
                    </div>
                </div>
            </div>

            <div className='h-[10%] grid grid-cols-[80%_20%]'>
                <Formik onSubmit={handleFilter} initialValues={filterInitialValues}>
                    <Form>
                        <div className='grid grid-cols-[25%_25%_25%_25%]'>
                            <div className='ms-2'>
                                <Field className="text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent" placeholder="Month" name="month" ></Field>
                            </div>
                            <div>
                                <Field className="text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent" placeholder="Year" name="year" ></Field>
                            </div>
                            <div>
                                <select name='category' id='category' className='text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent'>
                                    <option className='border-none' selected>Select Filter</option>
                                    <option className='border-none' value={"expenses"}>Approved</option>
                                    <option className='border-none' value={"incomes"}>Refused</option>
                                </select>
                            </div>
                            <div className='mt-4 flex justify-end'>
                                <button className='rounded-sm bg-gray-400 hover:bg-gray-500 text-3xl text-white w-[50%]'>{"⌕"}</button>
                            </div>
                        </div>


                    </Form>
                </Formik>
                <div className='grid grid-cols-2'>
                    <div className='flex items-center justify-end'>
                        <button className='rounded-sm bg-gray-400 hover:bg-gray-500  text-white w-[50%] p-2'>{"🡸"}</button>
                    </div>
                    <div className='flex items-center justify-start'>
                        <button className='rounded-sm bg-gray-400 hover:bg-gray-500  text-white w-[50%] mx-2 p-2'>{"🡺"}</button>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default SuggestionList
