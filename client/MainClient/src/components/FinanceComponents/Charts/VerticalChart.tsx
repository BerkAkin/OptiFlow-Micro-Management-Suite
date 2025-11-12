import { useState } from 'react'
import { Bar } from "react-chartjs-2";



function VerticalChart() {

    const ChartExample = [[65, 81], [36, 24]];

    const [chartData, setChartData] = useState<number[][]>(ChartExample);
    const Colors = ['#16a34a', '#ef4444']
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
            <div className='flex justify-center h-[10%]'>
                <p className={`text-2xl text-center w-64 border-b border-x text-indigo-400 border-indigo-400 bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Most</p>
            </div>
            <div className='h-[60%]'>
                <Bar data={ChartData} className='p- h-96' options={{ maintainAspectRatio: false, indexAxis: 'y' as const, responsive: true, plugins: { legend: { display: false, } }, scales: { x: { reverse: true }, y: { position: "right" } } }} />
            </div>
            <div className=' h-[10%]'>


            </div>
            <div className='h-[20%] flex justify-center items-center '>
                <button className={`h-[50px] bg-indigo-400 text-white text-4xl text-md  w-[80%] rounded-sm hover:bg-indigo-500`} onClick={handleNext}>⇄</button>
            </div>
        </div>
    )
}

export default VerticalChart
