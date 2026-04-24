import { Doughnut } from "react-chartjs-2";
import { useCategoricalFinance } from "../../../hooks";
import { Spinner, ErrorMessage } from "../../Common";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dough() {
    const { data, isLoading, error } = useCategoricalFinance();

    if (isLoading) return <div className="h-[420px] flex items-center justify-center"><Spinner /></div>;
    if (error || !data) return <div className="h-[420px] flex items-center justify-center"><ErrorMessage /></div>;

    const { categories, values } = data;
    const totalTransactions = values.reduce((a: number, b: number) => a + b, 0);

    const chartData = {
        labels: categories,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    '#6366f1',
                    '#8b5cf6',
                    '#ec4899',
                    '#f43f5e',
                    '#f59e0b',
                    '#10b981',
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 15,
                cutout: '75%',
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                cornerRadius: 8,
            }
        },

    };

    return (
        <div className="h-[230px] bg-white rounded-xl shadow-custom border border-gray-200 hover:-translate-y-1 transition p-6 flex flex-col ">
            <div className="mb-2">
                <h3 className="text-lg font-bold text-slate-800 font-rubik">
                    Categorical
                </h3>
            </div>

            <div className="flex-1 min-h-0 relative mt-4">
                <Doughnut data={chartData} options={options} />

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none ">
                    <span className="text-3xl font-bold text-slate-800">
                        {totalTransactions}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                        Total
                    </span>
                </div>
            </div>
        </div>
    );
}

