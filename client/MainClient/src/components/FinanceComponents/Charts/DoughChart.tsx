import { useState } from 'react'
import { Doughnut } from "react-chartjs-2";



//CHARTLART OPTİMİZE EDİELCEK. VERİLERİ VERİTABANINDAN GELİKTEN SONRA INDEX MANTIĞI İLE 
//VERİLER ARASINDA DÖNÜŞÜM YAPIALCAK KAROSEL İLE DEĞİL

function DoughChart() {

    const ChartExample = [[65, 81, 56, 55, 40], [36, 12, 85, 56, 24]];
    const color = [['#16a34a', '#4ade80', '#22c55e', '#166534', '#65a30d', '#bbf7d0',], ['#ef4444', '#f87171', '#fca5a5', '#dc2626', '#fb7185', '#991b1b']]

    const [chartData, setChartData] = useState<number[][]>(ChartExample);
    const [colors, setColors] = useState<string[][]>(color);


    const ChartData = {
        labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
        datasets: [
            {
                label: "İşlem Sayısı",
                data: chartData[0],
                backgroundColor: colors[0],
            },
        ],
    };


    const handleNext = () => {
        const rotated = [...chartData!.slice(1), chartData![0]];
        setChartData(rotated);
        const colorRotate = [...colors!.slice(1), colors![0]]
        setColors(colorRotate);
    };


    return (
        <div className="h-[420px]">
            <div className='flex justify-center h-[10%]'>
                <p className={`text-2xl text-center w-64 border-b border-x text-indigo-400 border-indigo-400 bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Categorical</p>
            </div>
            <div className=' h-[60%] pt-2'>
                <Doughnut
                    data={ChartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: { legend: { display: true, align: "center", position: "bottom" } }
                    }}
                />
            </div>
            <div className=' h-[10%]'>
                <div className={` bg-white rounded-sm  grid grid-cols-3`}>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1`} style={{ backgroundColor: `${colors[0][0]}`, fontFamily: "roobert" }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1`} style={{ backgroundColor: `${colors[0][0]}`, fontFamily: "roobert" }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1`} style={{ backgroundColor: `${colors[0][0]}`, fontFamily: "roobert" }}>
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

export default DoughChart
