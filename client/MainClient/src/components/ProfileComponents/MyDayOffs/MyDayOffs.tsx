import { Field, Form, Formik } from 'formik'
import React from 'react'
import DynamicForm from '../../DynamicForm/DynamicForm'

function MyDayOffs() {

    const handleSubmit = (values: any) => {
        console.log(values)
    }

    const initialValues = {
        topic: "",
        description: "",
        days: 10,
        datesBetween: new Date().toISOString().split("T")[0]
    }

    const fields = [
        { name: "datesBetween", id: "datesBetween", type: "date" as const, label: "Date", placeholder: "" },
        { name: "days", id: "days", type: "number" as const, label: "Days", placeholder: "" },
        { name: "description", as: "textarea" as const, id: "description", type: "text" as const, label: "Description", placeholder: "Temp Description" },
        { name: "topic", id: "topic", type: "text" as const, label: "Topic", placeholder: "Temp Topic" },
    ]

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
            <div className='col-span-2 border bg-white rounded-lg shadow-lg border h-[400px] '>
                <DynamicForm btnText='Take a day' colorScheme='bg-sky-400' hoverScheme='hover:bg-sky-400' fields={fields} initialValues={initialValues} onSubmit={handleSubmit} title='Take A Day Off' />
            </div>


        </div >
    )
}

export default MyDayOffs
