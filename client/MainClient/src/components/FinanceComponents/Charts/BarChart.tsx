import { Chart } from "react-chartjs-2";
import { useMonthly } from '../../../hooks/FinanceHooks/useFinance';


function BarChart() {

    const { data, isLoading, error } = useMonthly();
    if (isLoading) return <p className="p-6">Loading...</p>;
    if (error || !data) return <p className="p-6">Error loading chart</p>;
    const { months, incomeData, expenseData } = data;

    const ChartData = {
        labels: months,
        datasets: [
            {
                type: 'bar' as const,
                data: incomeData,
                backgroundColor: '#22c55e',
            },
            {
                type: 'bar' as const,
                backgroundColor: '#ef4444',
                data: expenseData,
            },
        ],
    };

    return (
        <div className="h-[420px]">
            <div className='flex justify-center'>
                <p className={`text-xl text-center px-6 rounded-b-sm text-white font-rubik bg-green-500`} >
                    Monthly
                </p>
            </div>
            <div className='h-[80%] p-6'>
                <Chart
                    type="bar"
                    data={ChartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: { legend: { display: false } }
                    }}
                />
            </div>
            <div className='h-[10%] py-6 flex items-center justify-center'>
                <div className={`bg-white w-full px-6 grid grid-cols-3`}>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-rubik bg-green-500`} >
                        <p className='text-xs'>Current:</p>
                        <p className='text-xs'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-rubik bg-green-500`} >
                        <p className='text-xs'>Previous:</p>
                        <p className='text-xs'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-rubik bg-green-500`} >
                        <p className='text-xs'>Difference:</p>
                        <p className='text-xs'>2500</p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default BarChart
