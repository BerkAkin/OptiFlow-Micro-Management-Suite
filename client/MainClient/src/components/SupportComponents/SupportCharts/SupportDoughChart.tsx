
import { Doughnut } from "react-chartjs-2";
import { useCategoricalSupport } from "../../../hooks/SupportHooks/UseSupport";
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

function SupportDoughChart() {

    const { data, isLoading, error } = useCategoricalSupport();
    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;

    const ChartData = {
        labels: data.categories,
        datasets: [
            {
                label: "İşlem Sayısı",
                data: data.values,
                backgroundColor: ["#0ea5e9", "#0891b2", "#38bdf8", "#06b6d4", "#7dd3fc", "#06b6d4"],
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
