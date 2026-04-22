import { Line } from 'react-chartjs-2'
import { usePreviousMoods } from '../../../hooks/MoodHooks/UseMood';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

function PreviousMoods() {
    const { data, isLoading, error } = usePreviousMoods();

    if (isLoading) return <div className="h-64 flex items-center justify-center"><Spinner /></div>
    if (error || !data) return <div className="h-64 flex items-center justify-center"><ErrorMessage /></div>

    const { days, values } = data;

    const moodLabels: any = {
        1: "Bad",
        2: "Medium",
        3: "Good",
        4: "Very Good",
        5: "Outstanding"
    };

    const chartData = {
        labels: days,
        datasets: [
            {
                label: "Ruh Hali",
                data: values,
                fill: true,
                backgroundColor: "#ffffff",
                borderColor: "#eab308",
                borderWidth: 3,
                pointBackgroundColor: "#ffffff",
                pointBorderColor: "#eab308",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.4,
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                displayColors: false,
                callbacks: {
                    label: function (context: any) {
                        return `Status: ${moodLabels[context.raw] || context.raw}`;
                    }
                }
            }
        },
        scales: {
            y: {
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 1,
                    font: { size: 11, weight: '500' },
                    callback: function (value: any) {
                        return moodLabels[value] || value;
                    },
                    padding: 10
                },
                grid: {
                    color: 'rgba(241, 245, 249, 1)',
                    drawBorder: false,
                },
                border: { display: false }
            },
            x: {
                ticks: {
                    font: { size: 11 },
                    padding: 10
                },
                grid: { display: false },
                border: { display: false }
            }
        }
    };

    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 shadow-custom p-6 flex flex-col">
            <div className='flex items-center justify-between mb-6 px-2'>
                <div>
                    <h2 className="text-xl font-bold text-slate-700 tracking-tight font-rubik">
                        Mood History
                    </h2>
                </div>

            </div>

            <div className='flex-1 w-full min-h-[250px]'>
                <Line data={chartData} options={options} />
            </div>
        </div>
    )
}

export default PreviousMoods;