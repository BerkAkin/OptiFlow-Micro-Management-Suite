import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import DynamicTable from '../../DynamicTable/DynamicTable';


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
    const tempData: any = [
        { "header": "Deneme Header", "description": "Denemeler", "votes": "10", "status": "approved", "date": "2025-02-12" },
    ]

    return (

        <div className='h-[675px] bg-white rounded-lg shadow-custom border'>
            <DynamicTable textScheme='text-indigo-400' colorScheme='bg-indigo-400' data={tempData} title='Suggestions' />






            {/* <div className='h-[10%] flex items-center pt-1'>
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
 */}

        </div>
    )

}

export default SuggestionList
