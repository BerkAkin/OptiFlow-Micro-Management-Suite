import { Bar } from "react-chartjs-2";
import { useMost } from "../../../hooks/FinanceHooks/useFinance";
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function VerticalChart() {
    const { data, isLoading, error } = useMost();

    if (isLoading) return <div className="h-[420px] flex items-center justify-center"><Spinner /></div>;
    if (error || !data) return <div className="h-[420px] flex items-center justify-center"><ErrorMessage /></div>;

    const { categories, values } = data;

    const chartData = {
        labels: categories,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    '#3b82f6',
                    '#60a5fa',
                    '#93c5fd',
                    '#bfdbfe',
                ],
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 20,
            }
        ],
    };

    const options = {
        indexAxis: 'y' as const,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleFont: {
                    size: 14,
                    family: 'Rubik',
                    weight: 'bold' as const
                },
                bodyFont: {
                    size: 13,
                    family: 'Rubik'
                },
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
            },
        },
        scales: {
            x: {
                reverse: true,
                display: false,
                grid: {
                    display: false,
                },
            },
            y: {
                position: 'right' as const,
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#475569',
                    font: {
                        family: 'Rubik',
                        size: 12,
                    },
                },
                border: {
                    display: false
                }
            },
        },
    };


    return (
        <div className="h-[230px] bg-white rounded-xl shadow-custom border border-gray-200 hover:-translate-y-1 transition p-6 flex flex-col ">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-800 font-rubik tracking-tight">
                    Most Expenses
                </h3>
                <p className="text-sm text-slate-500">Categorical</p>
            </div>

            <div className="flex-1 min-h-0">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}

export default VerticalChart;