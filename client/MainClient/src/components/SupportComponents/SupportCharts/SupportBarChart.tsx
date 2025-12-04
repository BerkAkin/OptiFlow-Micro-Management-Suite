import { Chart } from "react-chartjs-2";
import { useMonthlySupport } from "../../../hooks/SupportHooks/UseSupport";

function SupportBarChart() {

    const { data, isLoading, error } = useMonthlySupport();
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    const ChartData = {
        labels: data.months,
        datasets: [
            {
                type: 'bar' as const,
                backgroundColor: "#65a30d",
                data: data.newData,
            },
        ],
    }

    return (
        <div className="h-full">
            <div className='flex justify-center'>
                <p className={`text-xl text-center px-6 rounded-b-sm text-white font-rubik bg-lime-600`}>Monthly Support Counts</p>
            </div>
            <div className="p-6 h-[90%]">
                <Chart type="bar" data={ChartData} options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} />
            </div>

        </div>
    )
}

export default SupportBarChart
