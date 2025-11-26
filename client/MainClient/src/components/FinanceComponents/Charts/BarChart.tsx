import { useState } from 'react'
import { Chart } from "react-chartjs-2";
import swap from '../../../assets/swap.svg'


function BarChart() {

    const ChartExample = [[65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40], [36, 12, 85, 56, 24, 76, 61, 17, 49, 90, 24, 76]]
    const Colors = ['#22c55e', '#f87171']

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
            <div className='flex justify-center'>
                <p className={`text-xl text-center px-6 rounded-b-sm text-white font-rubik`} style={{ backgroundColor: `${color[0]}` }}>
                    Monthly
                    <span>
                        <button className={`h-[20px] text-white text-2xl ps-1 cursor-pointer`} onClick={handleNext}>
                            <img src={swap} width={25} alt='' />
                        </button>
                    </span>
                </p>
            </div>
            <div className='h-[70%] p-6'>
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
            <div className='py-6 flex items-center justify-center'>
                <div className={`bg-white rounded-sm  grid grid-cols-3`}>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-rubik`} style={{ backgroundColor: `${color[0]}` }}>
                        <p className='text-xs'>Curr:</p>
                        <p className='text-xs'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-rubik`} style={{ backgroundColor: `${color[0]}` }}>
                        <p className='text-xs'>Prev:</p>
                        <p className='text-xs'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-rubik`} style={{ backgroundColor: `${color[0]}` }}>
                        <p className='text-xs'>Diff:</p>
                        <p className='text-xs'>2500</p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default BarChart
