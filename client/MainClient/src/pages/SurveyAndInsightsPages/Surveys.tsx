import { Link } from 'react-router-dom'

import { Doughnut, } from "react-chartjs-2";

type Survey = {
    text: string,
    slug: string,
    date: string,
    status: string,
    participationCount: number,
    satisfactionCount: number,
    totalEmployee: number
}
type Surveys = {
    surveys: Survey[]
}





function SurveyResults() {
    const initialTempSurvey: Surveys = {
        surveys: [
            { text: "Management Survey Chapter One", slug: "Management-Survey-Chapter-One", date: "05.11.2025 07.11.2025", status: "Active", participationCount: 87, satisfactionCount: 56, totalEmployee: 100 },
            { text: "Management Survey Chapter Two", slug: "Management-Survey-Chapter-Two", date: "02.11.2025 04.11.2025", status: "Timeout", participationCount: 94, satisfactionCount: 82, totalEmployee: 100 },
        ]
    }

    return (
        <div className='m-10'>
            <div className='w-[95%] mt-10 mx-auto grid grid-cols-2 gap-4' >
                {initialTempSurvey.surveys.map((item, index) => (
                    <div key={index} className={`my-4 bg-white shadow-md h-[200px] grid grid-cols-[40%_60%] border rounded-lg`}>
                        <div>
                            <Link to={`${item.status === "Active" ? `/survey/surveys/${item.slug}` : ""} `} className={`${item.status === "Timeout" ? "cursor-default" : " cursor-pointer"}`}>
                                <div className={`${item.status === "Timeout" ? "bg-gray-100" : "hover:bg-indigo-50"} w-full h-full border-e`}>
                                    <div className='h-[50%] flex items-center justify-center'>
                                        <p style={{ fontFamily: "roobert" }} className='text-center text-3xl text-gray-600 mx-4'>
                                            {item.text}
                                            <span className='text-sm'>
                                                {item.status === "Timeout" ?
                                                    (
                                                        <span className='h-[10%] flex justify-end text-sky-500'>
                                                            <Link className='pe-2' to={`${item.slug}/result`}>Go to Result {">"}</Link>
                                                        </span>
                                                    ) :
                                                    ""}
                                            </span>
                                        </p>

                                    </div>
                                    <div className='h-[25%] flex items-end justify-center'>
                                        <p style={{ fontFamily: "roobert" }} className={item.status === "Active" ? "text-green-700 p-2 text-xl" : "text-red-600 text-xl"}>{item.status}</p>
                                    </div>
                                    <div className='h-[25%] flex items-center justify-center'>
                                        <p style={{ fontFamily: "roobert" }} className='text-gray-600 '>{item.date}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div>

                            <div className='grid  h-full grid-cols-3'>
                                <div className='my-auto'>
                                    <Doughnut
                                        data={{
                                            labels: ['Participators', 'Nonparticipators'],
                                            datasets: [{
                                                data: [item.participationCount, item.totalEmployee - item.participationCount],
                                                backgroundColor: ['#34d399', '#22c55e',],
                                            }]
                                        }}
                                        options={{ plugins: { legend: { display: true, position: "bottom" } } }} />
                                </div>

                                <div className='bg-orange-400 text-white rounded-sm '>
                                    <div className='h-[50%] flex items-center justify-center'> <p className=' text-8xl'>☺</p></div>
                                    <div className='h-[50%] flex items-center justify-center'><p className=' text-4xl'>{item.satisfactionCount} </p></div>
                                </div>
                                <div className='bg-sky-400 text-white rounded-sm '>
                                    <div className='h-[50%] flex items-center justify-center'> <p className=' text-6xl pt-5'>☹</p></div>
                                    <div className='h-[50%] flex items-center justify-center'><p className=' text-4xl'>{item.totalEmployee - item.satisfactionCount} </p></div>
                                </div>

                            </div>

                        </div>

                    </div>

                ))}
            </div>


        </div >
    )
}

export default SurveyResults
