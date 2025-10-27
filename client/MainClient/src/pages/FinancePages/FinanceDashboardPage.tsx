import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, plugins, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Chart } from "react-chartjs-2";

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement)

/* geçici datalar  */
/*  
buraya çekilecek datalar: 

en çok  harcama ve gelir olan 2şer kategori 
toplam harcama ve gelirler
harcama bütçesi, gelir beklentisi,
gelir türlerine göre o ayki miktarlar pastada göstermek üzere
aylara göre harcama ve gelir miktarları

*/
const Meandata = {
    labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
    datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#0ea5e9',
                '#bae6fd',
                '#0ea5e9',
                '#bae6fd',
                '#7dd3fc',
                '#0284c7',
            ],
        },
    ],
};


const outgoingData = {
    labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
    datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#fca5a5',
                '#f87171',
                '#ef4444',
                '#991b1b',
                '#fecaca',
                '#fee2e2',
            ],
        },
    ],
};


const incomeData = {
    labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
    datasets: [
        {
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                '#bbf7d0',
                '#4ade80',
                '#22c55e',
                '#166534',
                '#16a34a',
                '#65a30d',
            ],
        },
    ],
    label: "Acr"
};

const BarOne = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
        {
            type: 'line' as const,
            borderColor: 'rgba(97, 97, 97, 1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
        },
        {
            type: 'bar' as const,
            backgroundColor: '#ef4444',
            data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
        },
    ],
};


const BarTwo = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
        {
            type: 'line' as const,
            borderColor: 'rgba(97, 97, 97, 1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
        },
        {
            type: 'bar' as const,
            backgroundColor: '#16a34a',
            data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
        },
    ],
};

const verticalFirstData = {
    labels: ['Yiyecek', 'Tekstil'],
    datasets: [
        {
            data: [20, 17],
            backgroundColor: '#fbbf24',
        }
    ],
};

const verticalSecondData = {
    labels: ['Ulaşım', 'Temizlik'],
    datasets: [
        {
            data: [147, 113],
            backgroundColor: '#fbbf24',
        }
    ],
};




/* geçici datalar  */

function FinanceDashboardPage() {
    return (
        <div className='p-1 container mx-auto'>

            <div className='grid grid-cols-3 gap-2 mt-10'>
                <div className='border border-amber-400 bg-amber-50'>
                    <div className='text-center'>
                        <p className='text-xl text-gray-600' style={{ fontFamily: "roobert" }}>Most Income Category</p>
                    </div>
                    <Bar options={{ indexAxis: 'y' as const, responsive: true, plugins: { legend: { display: false } } }} data={verticalFirstData} />
                </div>


                <div className='border border-amber-400 bg-amber-50'>
                    <div className='text-center'>
                        <p className='text-xl text-gray-600' style={{ fontFamily: "roobert" }}>Most Outgoing Category</p>
                    </div>
                    <Bar options={{ indexAxis: 'y' as const, responsive: true, plugins: { legend: { display: false } } }} data={verticalSecondData} />
                </div>


                <div className='grid grid-cols-2 gap-4'>
                    <div className='border border-orange-300 w-[100%]'>
                        <div className=' h-[30%] flex items-center justify-center bg-orange-400'>
                            <p className='text-2xl text-white' style={{ fontFamily: "roobert" }}>Total Outgoings</p>
                        </div>
                        <div className=' h-[70%] flex items-center justify-center '>
                            <p className='text-5xl text-gray-600'>230</p>
                        </div>
                    </div>
                    <div className='border border-orange-300 w-[100%]'>
                        <div className=' h-[30%] flex items-center justify-center bg-orange-400'>
                            <p className='text-2xl text-white' style={{ fontFamily: "roobert" }}>Total Incomes</p>

                        </div>
                        <div className=' h-[70%]  flex items-center justify-center '>
                            <p className='text-5xl text-gray-600'>20</p>

                        </div>
                    </div>
                </div>
            </div>

            <div className='grid my-10 grid-cols-[35%_30%_30%_] gap-9'>
                <div className='border rounded-sm grid grid-cols-2 border-sky-300 bg-sky-50'>
                    <div className='flex items-center ps-3'>
                        <Doughnut data={Meandata} options={{ plugins: { legend: { display: false } } }} />
                    </div>
                    <div>
                        <div className='h-20 flex items-center justify-center'>
                            <p className='text-lg text-sky-600 border-b border-sky-700 ' style={{ fontFamily: "roobert" }}>Average of Totals</p>
                        </div>
                        <div className='h-12 flex items-center '>
                            <p className='text-md p-4'>Actual Mean: </p>
                        </div>
                        <div className='h-12 flex items-center '>
                            <p className='text-md p-4'>Current Month: </p>
                        </div>
                        <div className='h-12 flex items-center '>
                            <p className='text-md p-4'>Previous Month: </p>
                        </div>
                        <div className='h-12 flex items-center '>
                            <p className='text-md p-4'>Difference: </p>
                        </div>
                    </div>
                </div>



                <div className='border rounded-sm border-red-300  bg-red-50'>
                    <div className='grid grid-cols-2'>
                        <div className='flex items-center ps-3'>
                            <Doughnut data={outgoingData} options={{ plugins: { legend: { display: false } } }} /></div>
                        <div>
                            <div className='h-20 flex items-center justify-center'>
                                <p className='text-xl text-red-700 border-b border-red-700' style={{ fontFamily: "roobert" }}>Outgoings</p>
                            </div>
                            <div>
                                <p className='text-md p-4'>Outgoing Budget: </p>
                            </div>
                            <div>
                                <p className='text-md p-4'>Actual Outgoings: </p>
                            </div>
                            <div>
                                <p className='text-md p-4'>Difference: </p>
                            </div>
                        </div>

                    </div>
                    <div className='grid grid-cols-2 h-24 border-t'>
                        <div className='flex items-center'>
                            <p className='text-md p-4'>Previous Month: </p>
                        </div>
                        <div className='flex items-center'>
                            <p className='text-md p-4'>Current Month: </p>
                        </div>

                    </div>
                </div>



                <div className='border border-green-600 rounded-sm  bg-green-50'>
                    <div className='grid grid-cols-2'>
                        <div className='flex items-center ps-3'>
                            <Doughnut data={incomeData} options={{ plugins: { legend: { display: false } } }} />
                        </div>
                        <div>
                            <div className='h-20 flex items-center justify-center'>
                                <p className='text-xl text-green-700 border-b border-green-700 ' style={{ fontFamily: "roobert" }}>Incomes</p>
                            </div>
                            <div>
                                <p className='text-md p-4'>Income Exception: </p>
                            </div>
                            <div>
                                <p className='text-md p-4'>Actual Income: </p>
                            </div>
                            <div>
                                <p className='text-md p-4'>Difference: </p>
                            </div>

                        </div>
                    </div>
                    <div className='grid grid-cols-2 h-24 border-t'>
                        <div className='flex items-center'>
                            <p className='text-md p-4'>Previous Month: </p>
                        </div>
                        <div className='flex items-center'>
                            <p className='text-md p-4'>Current Month: </p>
                        </div>

                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-5 '>
                <div className='border-red-300 border h-82 bg-red-50'>
                    <div className='text-center'>
                        <p className='text-xl text-red-700' style={{ fontFamily: "roobert" }}>Outgoings</p>
                    </div>
                    <Chart type='bar' data={BarOne} options={{ plugins: { legend: { display: false } } }} />
                </div>
                <div className='border-green-600 border h-82 bg-green-50'>
                    <div className='text-center'>
                        <p className='text-xl text-green-700' style={{ fontFamily: "roobert" }}>Incomes</p>
                    </div>
                    <Chart type='bar' data={BarTwo} options={{ plugins: { legend: { display: false } } }} />
                </div>
            </div>



        </div>
    )
}

export default FinanceDashboardPage
