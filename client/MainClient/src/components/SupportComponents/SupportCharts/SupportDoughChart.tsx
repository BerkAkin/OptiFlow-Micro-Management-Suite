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
                backgroundColor: [
                    "#0ea5e9",
                    "#6366f1",
                    "#f43f5e",
                    "#eab308",
                    "#22c55e",
                    "#a855f7",
                ],
                borderColor: "#ffffff",
                borderWidth: 3,
                hoverOffset: 15,
            },
        ],
    };

    return (
        <div className="h-full bg-white rounded-xl border border-gray-200 shadow-custom  overflow-hidden">
            <div className='h-[350px] p-6 flex flex-col'>
                <div className="mb-2">
                    <p className="text-lg font-bold font-rubik text-slate-800 tracking-tight px-1">
                        Most Support Categories
                    </p>
                    <p className="text-sm text-slate-500 px-1">Categorical distribution</p>
                </div>

                <div className="flex-grow pt-2">
                    <Doughnut
                        data={ChartData}
                        options={{
                            cutout: '60%',
                            maintainAspectRatio: false,
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true,
                                    align: "center",
                                    position: "bottom",
                                    labels: {
                                        usePointStyle: true,
                                        padding: 15,
                                        font: {
                                            family: 'Rubik',
                                            size: 11,
                                        },
                                        color: '#64748b'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SupportDoughChart;