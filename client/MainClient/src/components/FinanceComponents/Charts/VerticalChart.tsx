import { Bar } from "react-chartjs-2";
import { useMost } from "../../../hooks/FinanceHooks/useFinance";
import Spinner from "../../Spinner/Spinner";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";


function VerticalChart() {
    const { data, isLoading, error } = useMost();
    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)
    const { categories, values } = data

    const ChartData = {
        labels: categories,
        datasets: [
            {
                data: values,
                backgroundColor: ['#f87171', '#ef4444'],
            }
        ],
    };


    return (
        <div className="h-[420px]">
            <div className='h-[70%] pt-6 px-4'>
                <p className={`text-xl p-2 font-semibold font-rubik text-slate-800`}>
                    Most
                </p>
                <Bar
                    data={ChartData} className='h-96'
                    options={
                        {
                            maintainAspectRatio: false,
                            indexAxis: 'y' as const,
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false,

                                }
                            },
                            scales: {
                                x: {
                                    reverse: true,
                                    grid: {
                                        display: false
                                    }
                                },
                                y: {
                                    position: "right",
                                    border: { display: false }
                                }

                            }
                        }} />
            </div>

        </div>
    )
}

export default VerticalChart
