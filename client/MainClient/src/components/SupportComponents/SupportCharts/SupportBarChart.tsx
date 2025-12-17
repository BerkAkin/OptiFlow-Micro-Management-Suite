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
                barPercentage: 0.7,
            },
        ],
    }

    return (
        <div className="h-full">
            <div className="p-6 h-[90%]">
                <p className={`text-xl px-1 pb-5 font-semibold font-rubik text-slate-800`} >
                    Monthly Support Counts
                </p>
                <Chart type="bar" data={ChartData} options={{ scales: { x: { grid: { display: false } }, y: { ticks: { stepSize: 100 }, border: { display: false } } }, maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} />
            </div>

        </div>
    )
}

export default SupportBarChart
