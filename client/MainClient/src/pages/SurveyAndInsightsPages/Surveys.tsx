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
                                <div className={`${item.status === "Timeout" ? "bg-gray-100" : "hover:bg-indigo-50"} w-full h-full border-gray-200 border-e`}>
                                    <div className='h-[50%] flex items-center justify-center'>
                                        <p className='font-rubik text-center text-2xl text-gray-600 mx-4'>
                                            {item.text}
                                            <span className='text-sm'>
                                                {item.status === "Timeout" ?
                                                    (
                                                        <span className='h-[10%] flex justify-end text-sky-500'>
                                                            <Link to={`/survey/result/${item.slug}`}>Go to Result {">"}</Link>
                                                        </span>
                                                    ) :
                                                    ""}
                                            </span>
                                        </p>

                                    </div>
                                    <div className='h-[25%] flex items-end justify-center'>
                                        <p className={item.status === "Active" ? "font-rubik text-green-700 p-2 text-xl" : "font-rubik text-red-600 text-xl"}>{item.status}</p>
                                    </div>
                                    <div className='h-[25%] flex items-center justify-center'>
                                        <p className='text-gray-600 font-rubik '>{item.date}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='col-span-6 grid  h-full grid-cols-3'>
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

                            <div className='bg-orange-400 text-white '>
                                <div className='h-[50%]  flex items-center justify-center'><img src={happy} alt="" width={80} /></div>
                                <div className='h-[50%] flex items-center justify-center'><p className=' text-4xl'>{item.satisfactionCount} </p></div>
                            </div>
                            <div className='bg-sky-400 text-white rounded-e-sm '>
                                <div className='h-[50%] flex items-center justify-center'> <img src={sad} alt="" width={80} /></div>
                                <div className='h-[50%] flex items-center justify-center'><p className=' text-4xl'>{item.totalEmployee - item.satisfactionCount} </p></div>
                            </div>

                        </div>
                    </div>

                ))}
            </div>


        </div >
    )
}

export default SurveyResults
