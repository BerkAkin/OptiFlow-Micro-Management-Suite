import { useState } from 'react'
import { Doughnut } from "react-chartjs-2";



//CHARTLART OPTİMİZE EDİELCEK. VERİLERİ VERİTABANINDAN GELİKTEN SONRA INDEX MANTIĞI İLE 
//VERİLER ARASINDA DÖNÜŞÜM YAPIALCAK KAROSEL İLE DEĞİL

function DoughChart() {

    const ChartExample = [[65, 81, 56, 55, 40], [36, 12, 85, 56, 24]];
    const Colors = [['#22c55e', '#4ade80', '#16a34a', '#166534', '#65a30d', '#bbf7d0',], ['#f87171', '#ef4444', '#fca5a5', '#dc2626', '#fb7185', '#991b1b']]

    const [chartData, setChartData] = useState<number[][]>(ChartExample);
    const [color, setColors] = useState<string[][]>(Colors);


    const ChartData = {
        labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
        datasets: [
            {
                label: "İşlem Sayısı",
                data: chartData[0],
                backgroundColor: color[0],
            },
        ],
    };


    const handleNext = () => {
        const rotated = [...chartData!.slice(1), chartData![0]];
        setChartData(rotated);
        const colorRotate = [...color!.slice(1), color![0]]
        setColors(colorRotate);
    };


    return (
        <div className="h-[420px]">
            <div className='flex justify-center'>
                <p className={`text-xl text-center px-2 rounded-b-sm text-white font-roobert`} style={{ backgroundColor: `${color[0][0]}` }}>
                    Categorical
                    <span>
                        <button className={`h-[20px] text-white text-2xl ps-1`} onClick={handleNext}> ⇄</button>
                    </span>

                </p>
            </div>
            <div className='h-[70%] pt-5'>
                <Doughnut
                    data={ChartData}
                    options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: { legend: { display: true, align: "center", position: "bottom" } }
                    }}
                />
            </div>
            <div className=' h-[20%] pt-5 flex items-center justify-center'>
                <div className={` bg-white rounded-sm grid grid-cols-3`}>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-roobert`} style={{ backgroundColor: `${color[0][0]}` }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-roobert`} style={{ backgroundColor: `${color[0][0]}` }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>
                    </div>
                    <div className={`flex items-center justify-evenly text-white p-2 m-1 font-roobert`} style={{ backgroundColor: `${color[0][0]}` }}>
                        <p className='text-sm'>Bütçe:</p>
                        <p className='text-sm'>2500</p>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default DoughChart
