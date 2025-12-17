
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
            <div className='h-[350px] p-6'>
                <p className={`text-xl px-1 pb-5 font-semibold font-rubik text-slate-800`} >
                    Most Support Categories
                </p>
                <Doughnut data={ChartData} options={{ cutout: '60%', maintainAspectRatio: false, responsive: true, plugins: { legend: { display: true, align: "center", position: "bottom", labels: { usePointStyle: true } } } }} />
            </div>
        </div>
    )
}

export default SupportDoughChart
