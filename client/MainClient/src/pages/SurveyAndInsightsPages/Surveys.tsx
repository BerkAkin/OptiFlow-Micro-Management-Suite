import React from 'react'
import { Link, Outlet } from 'react-router-dom'

type Survey = {
    text: string,
    slug: string,
    date: string,
    status: string,
}
type Surveys = {
    surveys: Survey[]
}

function SurveyResults() {
    const initialTempSurvey: Surveys = {
        surveys: [
            { text: "Management Survey Chapter One", slug: "Management-Survey-Chapter-One", date: "05.11.2025 07.11.2025", status: "Active" },
            { text: "Management Survey Chapter Two", slug: "Management-Survey-Chapter-Two", date: "02.11.2025 04.11.2025", status: "Timeout" },
        ]


    }
    return (
        <div className='m-10 bg-white shadow-md h-[800px] border cursor-pointer'>
            <div className='w-[80%] mt-10 mx-auto'>
                {initialTempSurvey.surveys.map((item, index) => (
                    <div key={index} className='my-4 mx-auto shadow-sm border h-[100px]'>
                        <Link to={`/survey/surveys/${item.slug}`}>
                            <div className='w-full h-full grid grid-cols-[80%_10%_10%]'>
                                <div className='w-full  flex items-center'>
                                    <p className='text-2xl text-gray-700 mx-5'>{item.text}</p>
                                </div>
                                <div className=' flex items-center justify-center ps-3'>
                                    <p className={item.status === "Active" ? "text-green-700 p-2 text-lg" : "text-red-600 text-lg"}>{item.status}</p>
                                </div>
                                <div className='flex items-center justify-end'>
                                    <p className='text-gray-600'>{item.date}</p>
                                </div>

                            </div>
                        </Link>

                    </div>
                ))}
            </div>


        </div>
    )
}

export default SurveyResults
