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
        <div className='m-10 bg-white shadow-md h-[800px]'>
            <div className='w-[95%] mt-10 mx-auto grid grid-cols-2 gap-4' >
                {initialTempSurvey.surveys.map((item, index) => (
                    <div key={index} className={`my-4 shadow-sm h-[400px] grid grid-cols-[40%_60%] border`}>
                        <div>
                            <Link to={`${item.status === "Active" ? `/survey/surveys/${item.slug}` : ""} `} className={`${item.status === "Timeout" ? "cursor-default" : " cursor-pointer"}`}>
                                <div className={`${item.status === "Timeout" ? "bg-gray-100" : "hover:bg-indigo-50"} w-full h-full border-e`}>
                                    <div className='h-[33%] flex items-end justify-center'>
                                        <p style={{ fontFamily: "roobert" }} className='text-center text-3xl  text-gray-600 mx-4'>{item.text}</p>
                                    </div>
                                    <div className='h-[33%] flex items-end justify-center'>
                                        <p style={{ fontFamily: "roobert" }} className={item.status === "Active" ? "text-green-700 p-2 text-xl" : "text-red-600 text-xl"}>{item.status}</p>
                                    </div>
                                    <div className='h-[33%] flex items-center justify-center'>
                                        <p style={{ fontFamily: "roobert" }} className='text-gray-600 '>{item.date}</p>

                                    </div>

                                </div>
                            </Link>
                        </div>
                        <div>

                            <div className='h-[60%] flex w-[100%] p-10 justify-center items-center'>
                                <Doughnut
                                    data={{
                                        labels: ['Participators', 'Nonparticipators'],
                                        datasets: [{
                                            data: [item.participationCount, item.totalEmployee - item.participationCount],
                                            backgroundColor: ['#34d399', '#22c55e',],
                                        }]
                                    }}
                                    options={{ maintainAspectRatio: false, plugins: { legend: { display: true, position: "right" } } }}
                                />
                            </div>

                            <div className='h-[40%]  grid grid-cols-2'>
                                <div>
                                    <div className='w-[70%] bg-orange-400 rounded-sm mx-auto h-full'>
                                        <div className='h-[50%] flex items-center justify-center'> <p className='text-white text-8xl'>☺</p></div>
                                        <div className='h-[50%] flex items-center justify-center'><p className='text-white text-4xl'>{item.satisfactionCount} </p></div>
                                    </div>
                                </div>
                                <div>
                                    <div className='w-[70%] bg-sky-400 rounded-sm mx-auto  h-full'>
                                        <div className='h-[50%] flex items-center justify-center'> <p className='text-white text-6xl pt-5'>☹</p></div>
                                        <div className='h-[50%] flex items-center justify-center'><p className='text-white text-4xl'>{item.totalEmployee - item.satisfactionCount} </p></div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>

                ))}
            </div>


        </div>
    )
}

export default SurveyResults
