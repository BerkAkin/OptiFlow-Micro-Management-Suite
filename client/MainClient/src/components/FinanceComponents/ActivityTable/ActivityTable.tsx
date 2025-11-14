import { Field, Form, Formik } from 'formik'
import { useState } from 'react'


interface filterValues {
    month: string,
    year: string
}



function ActivityTable() {


    const [data, setData] = useState<any>();

    const handleFilter = async (filters: filterValues) => {

    }

    const filterInitialValues = {
        month: "",
        year: "",
    }


    return (

        <div className='h-[500px]'>

            <div className='w-full h-[10%] text-center flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 text-white bg-sky-400 rounded-b-sm font-roobert`}>Latest Activity</p>
            </div>

            <div className={`h-[10%] p-2 text-sky-400 font-bold border-b text-md grid grid-cols-[5%_35%_10%_10%_10%_15%_10%_5%]`}>
                <div className="text-center">
                    Type
                </div>
                <div className="text-start px-4">
                    Description
                </div>
                <div className="text-center ">
                    Quantity
                </div>
                <div className="text-center">
                    Price
                </div>
                <div className="text-center">
                    Exchange
                </div>
                <div className="text-center">
                    Activity By
                </div>
                <div className="text-center">
                    Date
                </div>
                <div className="text-center">
                    Invoice
                </div>
            </div>
            <div className="h-[70%] border-b overflow-y-auto ">
                <div className="text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid grid-cols-[5%_35%_10%_10%_10%_15%_10%_5%]">
                    <div className="text-center">
                        -/+
                    </div>
                    <div className="text-start px-4">
                        Son ay yapılan ödemelerin vergisi
                    </div>
                    <div className="text-center ">
                        1
                    </div>
                    <div className="text-center">
                        3200
                    </div>
                    <div className="text-center">
                        TL
                    </div>
                    <div className="text-center">
                        Berk
                    </div>
                    <div className="text-center">
                        29.10.2022
                    </div>
                    <div className="text-center">
                        <button>🧾</button>
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
                                    <option className='border-none' value={"expenses"}>Expenses</option>
                                    <option className='border-none' value={"incomes"}>Incomes</option>
                                </select>
                            </div>
                            <div className='mt-2 flex justify-end'>
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

export default ActivityTable
