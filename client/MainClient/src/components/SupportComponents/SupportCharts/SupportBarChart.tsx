import { Chart } from "react-chartjs-2";
import { useMonthlySupport } from "../../../hooks/SupportHooks/UseSupport";
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

function SupportBarChart() {
    const { data, isLoading, error } = useMonthlySupport();

    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;

    const ChartData = {
        labels: data.months,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Support Counts',
                backgroundColor: "rgba(14, 165, 233, 0.85)",
                hoverBackgroundColor: "rgba(14, 165, 233, 1)",
                data: data.newData,
                barPercentage: 0.6,
                borderRadius: 6,
                borderSkipped: false,
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
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { family: 'Rubik', size: 12 } }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 100,
                    color: '#94a3b8',
                    font: { size: 11 }
                },
                grid: {
                    color: 'rgba(226, 232, 240, 0.6)',
                    drawBorder: false,
                },
                border: { display: false }
            }
        }
    };

    return (
        <div className="h-full w-full bg-white rounded-xl border border-gray-200 shadow-custom">
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold font-rubik text-slate-800 tracking-tight">
                            Monthly Support Counts
                        </h3>
                        <p className="text-sm text-slate-500">Performance overview</p>
                    </div>
                </div>

                <div className="flex-grow min-h-[250px]">
                    <Chart type="bar" data={ChartData} options={options as any} />
                </div>
            </div>
        </div>
    );
}

export default SupportBarChart;