
import { Doughnut } from "react-chartjs-2";
import { useCategoricalSupport } from "../../../hooks/SupportHooks/UseSupport";

function SupportDoughChart() {

    const { data, isLoading, error } = useCategoricalSupport();
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    const ChartData = {
        labels: data.labels,
        datasets: [
            {
                label: "İşlem Sayısı",
                data: data.values,
                backgroundColor: ["#65a30d", "#84cc16", "#4d7c0f", "#3f6212", "#365314", "#a3e635"],
            },
        ],
    };
    return (

        <div>
            <div className='flex justify-center'>
                <p className={`text-xl text-center px-6 rounded-b-sm text-white font-rubik bg-lime-600`}>Most Support Categories</p>
            </div>
            <div className='h-[350px] pt-6'>
                <Doughnut data={ChartData} options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: true, align: "center", position: "bottom" } } }} />
            </div>
        </div>
    )
}

export default SupportDoughChart
