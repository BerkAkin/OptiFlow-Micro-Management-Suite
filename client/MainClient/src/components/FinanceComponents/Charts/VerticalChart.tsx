import { Bar } from "react-chartjs-2";
import { useMost } from "../../../hooks/FinanceHooks/useFinance";


function VerticalChart() {
    const { data, isLoading, error } = useMost();
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)
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
            <div className='flex justify-center'>
                <p className={`text-xl text-center  px-6  rounded-b-sm text-white font-rubik bg-red-400`}>
                    Most
                </p>
            </div>
            <div className='h-[70%] pt-6'>
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
                                    reverse: true
                                },
                                y: {
                                    position: "right"
                                }
                            }
                        }} />
            </div>

        </div>
    )
}

export default VerticalChart
