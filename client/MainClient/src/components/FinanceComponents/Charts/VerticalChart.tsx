import { useState } from 'react'
import { Bar } from "react-chartjs-2";



function VerticalChart() {

    const ChartExample = [[65, 81], [36, 24]];

    const [chartData, setChartData] = useState<number[][]>(ChartExample);
    const Colors = ['#22c55e', '#f87171']
    const [color, setColor] = useState<string[]>(Colors)

    const ChartData = {
        labels: ['Ulaşım', 'Temizlik'],
        datasets: [
            {
                data: chartData[0],
                backgroundColor: color[0],
            }
        ],
    };



    const handleNext = () => {
        const rotated = [...chartData!.slice(1), chartData![0]];
        setChartData(rotated);
        const rotatedColor = [...color!.slice(1), color![0]];
        setColor(rotatedColor);
    };


    return (
        <div className="h-[420px]">
            <div className='flex justify-center'>
                <p className={`text-xl text-center  px-6  rounded-b-sm text-white font-rubik`} style={{ backgroundColor: `${color[0]}` }}>
                    Most
                    <span>
                        <button className={`h-[20px] text-white text-2xl ps-1 cursor-pointer`} onClick={handleNext}> ⇄</button>
                    </span>
                </p>
            </div>
            <div className='h-[70%] pt-6'>
                <Bar data={ChartData} className='h-96' options={{ maintainAspectRatio: false, indexAxis: 'y' as const, responsive: true, plugins: { legend: { display: false, } }, scales: { x: { reverse: true }, y: { position: "right" } } }} />
            </div>
            <div className=' h-[10%]'>


            </div>

        </div>
    )
}

export default VerticalChart
