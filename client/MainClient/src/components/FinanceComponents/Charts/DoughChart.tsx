import { Doughnut } from "react-chartjs-2";
import { useCategorical } from '../../../hooks/FinanceHooks/useFinance';


function DoughChart() {

    const { data, isLoading, error } = useCategorical();
    if (isLoading) return <p className="p-6">Loading...</p>;
    if (error || !data) return <p className="p-6">Error loading chart</p>;
    const { categories, values } = data;

    const ChartData = {
        labels: categories,
        datasets: [
            {
                label: "İşlem Sayısı",
                data: values,
                backgroundColor: ['#f87171', '#ef4444', '#dc2626', '#be123c', '#f43f5e', '#fb7185'],
            },
        ],
    };


    return (
        <div className="h-[420px]">
            <div className='h-[90%] p-6'>
                <p className={`text-xl p-2 font-semibold font-rubik text-slate-800`}>
                    Categorical
                </p>
                <Doughnut
                    data={ChartData}
                    options={{
                        cutout: '60%',
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle',

                                },
                                align: "center",
                                position: "bottom"
                            }
                        },


                    }}
                />
            </div>


        </div>
    )
}

export default DoughChart
