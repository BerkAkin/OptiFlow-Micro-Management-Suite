import { Field, Form, Formik } from 'formik'
import { useState } from 'react'


interface filterValues {
    month: string,
    year: string
}

interface TableProps {
    colorScheme: string,
    filterFn: (filters: filterValues) => any /* Promise<any[]> */
}



function IncomeExpenseTable({ colorScheme, filterFn }: TableProps) {


    const [data, setData] = useState<any>();

    const handleFilter = async (filters: filterValues) => {
        const result = await filterFn(filters);
        setData(result);
    }

    const filterInitialValues = {
        month: "",
        year: "",
    }


    return (

        <div className='h-[500px]'>

            <div className={`h-[8%] pt-2 text-${colorScheme}-600 font-bold border-b text-md grid grid-cols-[45%_10%_10%_10%_10%_10%_5%]`}>
                <div className=" text-start px-4">
                    Description
                </div>
                <div className=" text-center ">
                    Quantity
                </div>
                <div className="  text-center">
                    Price
                </div>
                <div className=" text-center">
                    Exchange
                </div>
                <div className="  text-center">
                    From
                </div>
                <div className=" text-center">
                    Date
                </div>
                <div className=" text-center">
                </div>
            </div>
            <div className="h-[82%] border-b overflow-scroll ">
                <div className="text-gray-700 bg-gray-50 hover:bg-gray-200 text-sm grid grid-cols-[45%_10%_10%_10%_10%_10%_5%]">
                    <div className="text-start px-4">
                        Son ay yapılan ödemelerin vergi iadesi
                    </div>
                    <div className="text-center ">
                        1
                    </div>
                    <div className=" text-center">
                        5000
                    </div>
                    <div className="text-center">
                        TL
                    </div>
                    <div className="text-center">
                        Devlet
                    </div>
                    <div className="text-center">
                        29.10.2025
                    </div>
                    <div className="text-center">
                        <button>🧾</button>
                    </div>
                </div>
            </div>

            <div className='h-[10%] grid grid-cols-[80%_20%]'>
                <Formik onSubmit={handleFilter} initialValues={filterInitialValues}>
                    <Form>
                        <div className='grid grid-cols-[40%_40%_20%]'>
                            <div className='ms-2'>
                                <Field className="text-gray-700 focus:outline-none w-full h-full bg-transparent focus:bg-transparent" placeholder="Month" name="month" ></Field>
                            </div>
                            <div>
                                <Field className="text-gray-700 focus:outline-none w-full h-full bg-transparent focus:bg-transparent" placeholder="Year" name="year" ></Field>
                            </div>
                            <div className='border-s mt-1'>
                                <button className='rounded-sm bg-indigo-400 hover:bg-indigo-500  text-white w-[100%] p-2'>Filter</button>

                            </div>
                        </div>


                    </Form>
                </Formik>
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
    )
}

export default IncomeExpenseTable
