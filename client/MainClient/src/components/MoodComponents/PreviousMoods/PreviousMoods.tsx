import { Line } from 'react-chartjs-2'
import { usePreviousMoods } from '../../../hooks/MoodHooks/UseMood';


function PreviousMoods() {

    const { data, isLoading, error } = usePreviousMoods(1);
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)
    const { days, values } = data;

    const chartData = {
        labels: days,
        datasets: [
            {
                label: "Mood",
                data: values
            },
        ],
    };

    const moodLabels: any = {
        1: "Kötü",
        2: "Orta",
        3: "İyi",
        4: "Çok İyi",
        5: "Mükemmel"
    };

    return (
        <div className=''>
            <div className='h-[20%] text-start flex justify-start '>
                <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4`}>Previous Moods</p>
            </div>
            <div className='h-[80%] text-start flex justify-start px-2'>
                <Line data={chartData} options={{

                    scales: {
                        y: {

                            ticks: {
                                stepSize: 1,
                                callback: function (value) {
                                    return moodLabels[value] || value;
                                }
                            },
                            border: { display: false },

                        },
                        x: {
                            grid: { display: false }
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    borderColor: "#a5b4fc",
                    plugins: { legend: { display: false } }
                }} />
            </div>

        </div>
    )
}

export default PreviousMoods
