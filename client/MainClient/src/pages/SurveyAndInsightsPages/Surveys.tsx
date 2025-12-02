import { Link } from 'react-router'
import { Doughnut, } from "react-chartjs-2";
import happy from '../../assets/happyWhite.svg'
import sad from '../../assets/sadWhite.svg'
import { useSurveys } from '../../hooks/SurveyHooks/useSurvey';



function SurveyResults() {
    const { data, isLoading, error } = useSurveys();

    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    return (
        <div className='container my-10 mx-auto'>
            <div className='mx-auto grid grid-cols-2 gap-6' >
                {data.data.map((item, index) => (
                    <div key={index} className={`bg-white shadow-custom h-[200px] grid grid-cols-10 border border-gray-200 rounded-lg`}>
                        <div className='col-span-4'>
                            <Link to={`${item.status === "Active" ? `/survey/details/${item.slug}` : ""} `} className={`${item.status === "Timeout" ? "cursor-default" : " cursor-pointer"}`}>
                                <div className={`${item.status === "Timeout" ? "bg-gray-50" : "hover:bg-indigo-50"} w-full h-full border-gray-200 border-e rounded-s-lg`}>
                                    <div className='h-[40%] flex items-center justify-center'>
                                        <p className='font-rubik text-center text-2xl text-gray-600 mx-2 relative '>
                                            {item.text}
                                            {item.status === "Timeout" ?
                                                (
                                                    <span className='h-[10%] absolute bottom-0 right-0 z-10 pt-2 text-sm text-sky-500'>
                                                        <Link to={`/survey/result/${item.slug}`}>Go to Result {">"}</Link>
                                                    </span>
                                                ) : ""
                                            }

                                        </p>

                                    </div>
                                    <div className='h-[20%]'>

                                    </div>
                                    <div className='h-[40%] grid grid-cols-3'>
                                        <div>
                                            <div className='flex items-end justify-center'><img className='bg-orange-400 rounded-full' src={happy} alt="" width={40} /></div>
                                            <div className='flex justify-center pt-2'><p className='text-gray-500 text-xl'>{item.satisfactionCount} </p></div>
                                        </div>
                                        <div className=''>
                                            <div className='flex justify-center'>
                                                <p className={item.status === "Active" ? "font-rubik text-green-600 text-xl " : "font-rubik text-red-500 text-xl"}>{item.status}</p>
                                            </div>
                                            <div className='flex justify-center'>
                                                <p className='text-gray-600 font-rubik text-md'>{item.date}</p>

                                            </div>
                                        </div>
                                        <div >
                                            <div className='flex items-end justify-center'> <img className='bg-sky-400 rounded-full' src={sad} alt="" width={40} /></div>
                                            <div className='flex justify-center pt-2'><p className='text-gray-500 text-xl'>{item.totalEmployee - item.satisfactionCount} </p></div>
                                        </div>


                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-6 grid h-full p-6'>

                            <Doughnut
                                data={{
                                    labels: ['Respondents', 'Non respondents'],
                                    datasets: [{
                                        data: [item.participationCount, item.totalEmployee - item.participationCount],
                                        backgroundColor: ['#34d399', '#22c55e',],
                                    }]
                                }}
                                options={{ plugins: { legend: { display: true, position: "right" } }, animation: true, maintainAspectRatio: false }} />




                        </div>
                    </div>

                ))}
            </div>


        </div >
    )
}

export default SurveyResults
