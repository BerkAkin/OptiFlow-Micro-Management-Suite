import { useState } from 'react'
import { Chart } from "react-chartjs-2";



function BarChart() {

    const ChartExample = [[65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40], [36, 12, 85, 56, 24, 76, 61, 17, 49, 90, 24, 76]]
    const Colors = ['#16a34a', '#ef4444']

    const [chartData, setChartData] = useState<number[][]>(ChartExample);
    const [color, setColor] = useState<string[]>(Colors)

    const ChartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                type: 'line' as const,
                borderWidth: 2,
                data: chartData[0],
            },
            {
                type: 'bar' as const,
                backgroundColor: color[0],
                data: chartData[0],
            },
        ],
    }


    const handleNext = () => {
        const rotated = [...chartData!.slice(1), chartData![0]];
        const rotatedColor = [...color!.slice(1), color![0]];
        setColor(rotatedColor);
        setChartData(rotated);
    };


    return (
        <div className="h-[420px]">
            <div className='flex justify-center h-[10%] '>
                <p className={`text-2xl text-center w-64 border-b border-x text-indigo-400 border-indigo-400 bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Monthly</p>
            </div>
            <div className='h-[60%]'>
                <Chart
                    type="bar"
                    data={ChartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: { legend: { display: false } }
                    }}
                />
            </div>
            <div className=' h-[10%]'>
                <div className={`bg-white rounded-sm  grid grid-cols-3`}>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1`} style={{ backgroundColor: `${color[0]}`, fontFamily: "roobert" }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1`} style={{ backgroundColor: `${color[0]}`, fontFamily: "roobert" }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1`} style={{ backgroundColor: `${color[0]}`, fontFamily: "roobert" }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>

                    </div>
                </div>

            </div>
            <div className='h-[20%] flex justify-center items-center '>
                <button className={`h-[50px] bg-indigo-400 text-white text-4xl text-md  w-[80%] rounded-sm hover:bg-indigo-500`} onClick={handleNext}>⇄</button>
            </div>
        </div>
    )
}

export default BarChart
