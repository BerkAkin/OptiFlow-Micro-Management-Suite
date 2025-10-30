import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, plugins, PointElement, LineElement } from 'chart.js';
import { Doughnut, Bar, Chart } from "react-chartjs-2";
import DashboardInfoBox from './DashboardInfoBox';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement)


interface DashBoardCharsProps {
    DoughnutData: { labels: string[], datasets: { label: string, data: number[], backgroundColor: string[] }[] },
    BarData: { labels: string[], datasets: { type: 'line' | 'bar', borderColor?: string, backgroundColor?: string, borderWidth?: number, data: number[] }[] },
    VerticalBarData?: { labels: string[], datasets: { data: number[], backgroundColor: string }[] },
    ColorScheme: string,
    isAverages?: boolean,
    AverageCounts?: string[],
    TypeOfData: string,
}


function DashboardCharts({ BarData, DoughnutData, VerticalBarData, ColorScheme, isAverages, AverageCounts, TypeOfData }: DashBoardCharsProps) {
    return (
        <div className='mt-5 bg-white shadow-md bg-white rounded-sm'>

            <div className='h-16 grid grid-cols-3'>
                <div className='h-8 flex justify-center'>
                    <p className={`text-2xl text-center w-64 text-${ColorScheme}-600 border-${ColorScheme}-600 border-b border-s border-e bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Monthly</p>
                </div>
                <div className={`h-14 flex items-center justify-center  text-${ColorScheme}-600 border-${ColorScheme}-600 border-b border-s border-e bg-white rounded-b-md  font-semibold`}>
                    <p className='text-4xl' style={{ fontFamily: "roobert" }}>{TypeOfData}</p>
                </div>
                <div className='h-8 flex justify-center'>
                    <p className={`text-2xl text-center w-64  text-${ColorScheme}-600 border-${ColorScheme}-600 border-b border-s border-e bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Most</p>

                </div>

            </div>

            <div className='grid grid-cols-[33%_33%_33%] gap-2'>


                <div className='rounded-sm bg-white h-96 ms-2 border shadow-sm'>
                    <Chart type='bar' data={BarData} options={{ maintainAspectRatio: false, responsive: true, plugins: { legend: { display: false } } }} className='m-5' />
                </div>

                <div className='flex items-center justify-center h-96 p-5 bg-white border shadow-sm'>
                    <Doughnut data={DoughnutData} options={{ plugins: { legend: { display: true, position: "bottom" } } }} />
                </div>

                <div className='rounded-sm bg-white h-96 me-2   justify-center  border shadow-sm'>
                    {isAverages &&
                        <>
                            <div className='border w-[100%]  bg-white rounded-sm shadow-sm'>
                                <div className='flex items-center justify-center bg-orange-400'>
                                    <p className='text-2xl text-white' style={{ fontFamily: "roobert" }}>Expense Transactions</p>
                                </div>
                                <div className=' h-[70%] flex items-center justify-center '>
                                    <p className='text-5xl text-gray-600'>{AverageCounts![0]}</p>
                                </div>
                            </div>
                            <div className='border w-[100%] my-5 bg-white rounded-sm shadow-sm'>
                                <div className='flex items-center justify-center bg-orange-400'>
                                    <p className='text-2xl text-white' style={{ fontFamily: "roobert" }}>Income Transactions</p>
                                </div>
                                <div className=' h-[70%]  flex items-center justify-center '>
                                    <p className='text-5xl text-gray-600'>{AverageCounts![1]}</p>

                                </div>
                            </div>
                        </>
                    }

                    {VerticalBarData &&
                        <>
                            <Bar data={VerticalBarData} className='p-2 h-96' options={{ maintainAspectRatio: false, indexAxis: 'y' as const, responsive: true, plugins: { legend: { display: false, } }, scales: { x: { reverse: true }, y: { position: "right" } } }} />

                        </>
                    }

                </div>


            </div>


            <div className='grid grid-cols-[33%_33%_33%] gap-2'>
                <div className='grid grid-cols-2 my-2 ms-2'>
                    <DashboardInfoBox Color={ColorScheme} Header='Previous Month' Text='6800' />
                    <DashboardInfoBox Color={ColorScheme} Header='Current Month' Text='6800' />

                </div>
                <div className='grid grid-cols-3 my-2 ms-2 gap-1'>
                    {isAverages ?
                        (<>

                        </>)
                        :
                        (<>
                            <DashboardInfoBox Color={ColorScheme} Header={TypeOfData == "Expenses" ? "Budget" : "Expection"} Text='6800' />
                            <DashboardInfoBox Color={ColorScheme} Header='Actual' Text='6800' />
                            <DashboardInfoBox Color={ColorScheme} Header='Difference' Text='6800' />
                        </>)}

                </div>
                <div className='grid grid-cols-2'>

                </div>


            </div>




        </div>

    )
}

export default DashboardCharts
