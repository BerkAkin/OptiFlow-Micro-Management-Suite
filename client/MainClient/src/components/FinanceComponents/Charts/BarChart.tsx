import { Chart } from "react-chartjs-2";
import { useMonthly } from '../../../hooks/FinanceHooks/useFinance';
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";


function BarChart() {

    const { data, isLoading, error } = useMonthly();
    if (isLoading) return (<Spinner />);
    if (error || !data) return (<ErrorMessage />);
    const { months, incomeData, expenseData } = data;

    const ChartData = {
        labels: months,
        datasets: [
            {
                type: 'bar' as const,
                data: incomeData,
                backgroundColor: '#22c55e',
                barPercentage: 0.7,
            },
            {
                type: 'bar' as const,
                backgroundColor: '#ef4444',
                data: expenseData,
                barPercentage: 0.7
            },
        ],
    };

    return (
        <div className="h-[420px] ">
            <div className='h-[80%] p-6'>
                <p className={`text-xl px-1 font-semibold font-rubik text-slate-800`} >
                    Monthly
                </p>
                <Chart
                    type="bar"
                    data={ChartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: { legend: { display: false } },
                        scales: { x: { grid: { display: false } }, y: { ticks: { stepSize: 100 }, border: { display: false } } }
                    }}
                />
            </div>
            <div className='h-[20%] flex items-center justify-center'>
                <div className={`bg-white w-full px-6 grid grid-cols-3`}>
                    <div className={`flex items-center rounded justify-evenly text-white p-2 m-1 font-rubik bg-green-500`} >
                        <p>Current:</p>
                        <p>2500</p>
                    </div>
                    <div className={`flex items-center rounded justify-evenly text-white p-2 m-1 font-rubik bg-green-500`} >
                        <p>Previous:</p>
                        <p>2500</p>
                    </div>
                    <div className={`flex items-center rounded justify-evenly text-white p-2 m-1 font-rubik bg-green-500`} >
                        <p>Difference:</p>
                        <p>2500</p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default BarChart
