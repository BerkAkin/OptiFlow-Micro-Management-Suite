import { Chart } from "react-chartjs-2";

function HelpBarChart() {

    const ChartExample = [[65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40]]

    const ChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                type: 'bar' as const,
                backgroundColor: "#65a30d",
                data: ChartExample[0],
            },
        ],
    }

    return (
        <div className="h-full">
            <div className='flex justify-center'>
                <p className={`text-xl text-center px-6 rounded-b-sm text-white font-rubik bg-lime-600`}>Monthly Request Counts</p>
            </div>
            <div className="p-6 h-[90%]">
                <Chart type="bar" data={ChartData} options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} />
            </div>

        </div>
    )
}

export default HelpBarChart
