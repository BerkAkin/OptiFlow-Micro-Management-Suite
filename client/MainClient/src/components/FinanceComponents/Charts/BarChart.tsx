import { Chart } from "react-chartjs-2";
import { useMonthly } from '../../../hooks/FinanceHooks/useFinance';
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';

const StatCard = ({ label, value, color }: { label: string, value: string, color: string }) => (
    <div className={`flex flex-col items-center justify-center p-3 ${color} transition-all hover:scale-105`}>
        <span className="text-[10px] uppercase tracking-wider font-bold">{label}</span>
        <span className="text-sm font-bold font-rubik">{value}</span>
    </div>
);
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function BarChart() {

    const { data, isLoading, error } = useMonthly();

    if (isLoading) return <div className="h-[420px] flex items-center justify-center"><Spinner /></div>;
    if (error || !data) return <div className="h-[420px] flex items-center justify-center"><ErrorMessage /></div>;

    const { months, incomeData, expenseData } = data;

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: '#22c55e',
                borderRadius: 6,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
            },
            {
                label: 'Expense',
                data: expenseData,
                backgroundColor: '#ef4444',
                borderRadius: 6,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
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
                titleFont: { size: 14, weight: 'bold' as const },
                bodyFont: { size: 13 },
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { family: 'Rubik' } }
            },
            y: {
                border: { display: false, dash: [4, 4] },
                grid: { color: '#f1f5f9' },
                ticks: {
                    color: '#64748b',
                    callback: (value: any) => `${value}₺`
                }
            }
        }
    };

    return (
        <div className="h-[480px] bg-white rounded-xl shadow-custom border border-gray-200 hover:-translate-y-1 transition p-6 flex flex-col ">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 font-rubik">Monthly Analysis</h3>
                    <p className="text-sm text-slate-500">Income and Expenses</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        <span className="text-xs font-medium text-slate-600">Income</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="text-xs font-medium text-slate-600">Expense</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <Chart type="bar" data={chartData} options={options} />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-6">
                <StatCard label="Current" value="2.500₺" color="bg-blue-50 text-blue-600" />
                <StatCard label="Last Month" value="2.100₺" color="bg-slate-50 text-slate-600" />
                <StatCard label="Difference" value="+400₺" color="bg-emerald-50 text-emerald-600" />
            </div>
        </div>
    );
}


export default BarChart;