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

            <div className='h-[10%] w-full text-center flex justify-center items-start'>
                <p className={`text-2xl text-center text-white bg-sky-400 rounded-b-sm font-roobert px-2 `}>Latest Activity</p>
            </div>

            <div className={`h-[10%] p-2 text-sky-400 font-bold border-b text-md grid grid-cols-10`}>
                <div className="col-span-1 text-center">
                    Type
                </div>
                <div className="col-span-3 text-start px-4">
                    Description
                </div>
                <div className="col-span-1 text-center ">
                    Quantity
                </div>
                <div className="col-span-1 text-center">
                    Price
                </div>
                <div className="col-span-1 text-center">
                    Exchange
                </div>
                <div className="col-span-1 text-center">
                    Activity By
                </div>
                <div className="col-span-1 text-center">
                    Date
                </div>
                <div className="col-span-1 text-center">
                    Invoice
                </div>
            </div>
            <div className="h-[70%] overflow-y-auto border-b ">
                <div className="text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid grid-cols-10">
                    <div className="text-center">
                        -/+
                    </div>
                    <div className="col-span-3 text-start px-4">
                        Son ay yapılan ödemelerin vergisi
                        Son ay yapılan ödemelerin vergisi
                        Son ay yapılan ödemelerin vergisi
                        Son ay yapılan ödemelerin vergisi
                        Son ay yapılan ödemelerin vergisi
                    </div>
                    <div className="col-span-1 text-center ">
                        1
                    </div>
                    <div className="col-span-1 text-center">
                        3200
                    </div>
                    <div className="col-span-1 text-center">
                        TL
                    </div>
                    <div className="col-span-1 text-center">
                        Berk
                    </div>
                    <div className="col-span-1 text-center">
                        29.10.2022
                    </div>
                    <div className="col-span-1 text-center">
                        <button>🧾</button>
                    </div>
                </div>
            </div>

            <div className='h-[10%] flex items-center'>

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
                                    <option className='border-none' value={"expenses"}>Expenses</option>
                                    <option className='border-none' value={"incomes"}>Incomes</option>
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

export default ActivityTable
