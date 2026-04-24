import { Link } from 'react-router'
import { Doughnut } from "react-chartjs-2";
import happy from '../../assets/happyWhite.svg'
import sad from '../../assets/sadWhite.svg'
import { useSurveys } from '../../hooks/SurveyHooks/useSurvey';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../components/Spinner/Spinner';
import RoleBasedGuard from '../../components/RoleBasedGuard/RoleBasedGuard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function SurveyResults() {
    const { data, isLoading, error } = useSurveys();

    if (isLoading) return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
    if (error || !data) return <div className="p-10"><ErrorMessage /></div>;

    return (
        <div className='container py-8 mx-auto px-4'>

            <div className='flex justify-between mb-6 mx-2 border-b border-gray-200 pb-2'>
                <div>
                    <h6 className='text-2xl font-bold text-slate-800 tracking-tight font-rubik'>
                        Tider
                        <span className='text-blue-600'> Insights</span>
                        <span className='text-slate-400 text-sm ms-3 font-normal'>Collect valuable feedback to direct your future flow</span>
                    </h6>
                </div>
            </div>

            <div className='grid grid-cols-3 gap-8'>
                {data.map((item: any, index: number) => {
                    const totalRespondents = item.satisfactionCount + item.dissatisfactionCount;
                    const isActive = item.status === 1;

                    return (
                        <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-custom transition-all hover:-translate-y-1 overflow-hidden flex h-[240px]">

                            <div className={`flex-1 p-6 flex flex-col justify-between border-e border-gray-100 ${!isActive ? 'bg-slate-100/70' : 'bg-white'}`}>
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-tight ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-200 text-red-500'}`}>
                                            {isActive ? "Active" : "Timeout"}
                                        </span>
                                        <span className='text-xs font-medium text-slate-400'>
                                            {item.date.split("T")[0].split("-").reverse().join(".")}
                                        </span>
                                    </div>
                                    <h3 className='text-lg font-bold text-slate-800 font-rubik leading-tight'>
                                        {item.title}
                                    </h3>
                                </div>

                                <div className='flex items-center gap-6 mt-4'>
                                    <div className="text-center">
                                        <div className='w-10 h-10 bg-orange-400 rounded-xl flex items-center justify-center mb-1'>
                                            <img src={happy} alt="Dissatisfied" width={24} />
                                        </div>
                                        <p className='text-sm font-bold text-slate-600'>{item.dissatisfactionCount}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className='w-10 h-10 bg-sky-400 rounded-xl flex items-center justify-center mb-1'>
                                            <img src={sad} alt="Satisfied" width={24} />
                                        </div>
                                        <p className='text-sm font-bold text-slate-600'>{item.satisfactionCount}</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <Link
                                        to={isActive ? `/survey/details/${item.id}` : "#"}
                                        className={`text-sm font-semibold transition-colors ${isActive ? 'text-blue-600 hover:text-blue-800' : 'text-slate-400 cursor-not-allowed'}`}
                                    >
                                        Details →
                                    </Link>

                                    {!isActive && (
                                        <RoleBasedGuard allowedDepartments={["HR", 'Manager']}>
                                            <Link to={`/survey/result/${item.id}`} className='text-[11px] font-bold text-blue-500 bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 transition-colors'>
                                                RESULTS
                                            </Link>
                                        </RoleBasedGuard>
                                    )}
                                </div>
                            </div>

                            <div className='w-[40%] p-6 flex flex-col items-center justify-center relative'>
                                <div className="h-full w-full">
                                    <Doughnut
                                        data={{
                                            labels: ['Participant'],
                                            datasets: [{
                                                data: [totalRespondents, 100 - totalRespondents],
                                                backgroundColor: [isActive ? '#2563eb' : '#94a3b8', '#f1f5f9'],
                                                borderWidth: 0,
                                            }],
                                        }}
                                        options={{
                                            plugins: { legend: { display: false } },
                                            maintainAspectRatio: false,
                                            events: []
                                        }}
                                    />
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-xl font-bold text-slate-700">{totalRespondents}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">People</span>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default SurveyResults