import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, plugins, PointElement, LineElement } from 'chart.js';
import DashboardCharts from '../../components/FinanceComponents/DashboardCharts';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement)

/* geçici datalar  */
/*  
buraya çekilecek datalar: 

en çok  harcama ve gelir olan 2şer kategori 
toplam harcama ve gelirler
harcama bütçesi, gelir beklentisi,
gelir türlerine göre o ayki miktarlar pastada göstermek üzere
aylara göre harcama ve gelir miktarları
veritabanından sadece label ve data kısmı gelcek
*/
const DoughThree = {
    labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
    datasets: [
        {
            label: "İşlem Sayısı",
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


const DoughTwo = {
    labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
    datasets: [
        {
            label: "İşlem Sayısı",
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


const DoughOne = {
    labels: ['Yiyecek', 'Ulaşım', 'Tekstil', 'Ofis ve Kırtasiye', 'Temizlik', 'Eğlence Hizmetleri'],
    datasets: [
        {
            label: "İşlem Sayısı",
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
};



const ChartTwo = {
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


const ChartOne = {
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

const ChartThree = {
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
            backgroundColor: '#0ea5e9',
            data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
        },
    ],
};


const verticalFirstData = {
    labels: ['Yiyecek', 'Tekstil'],
    datasets: [
        {
            data: [20, 17],
            backgroundColor: '#16a34a',
        }
    ],
};

const verticalSecondData = {
    labels: ['Ulaşım', 'Temizlik'],
    datasets: [
        {
            data: [147, 113],
            backgroundColor: '#ef4444',
        }
    ],
};




/* geçici datalar  */

function FinanceDashboardPage() {
    return (
        <div className='container mx-auto'>
            <div className='h-[100px] container mx-auto mt-10 bg-white'>Bildirim olacak burada Zil ile birlikte en yakın ödeme tarihi ve tarihi geçen ödemelerle alakalı</div>

            <DashboardCharts DoughnutData={DoughOne} BarData={ChartOne} VerticalBarData={verticalFirstData} ColorScheme='green' TypeOfData='Incomes' />

            <DashboardCharts DoughnutData={DoughTwo} BarData={ChartTwo} VerticalBarData={verticalSecondData} ColorScheme='red' TypeOfData='Expenses' />

            <DashboardCharts DoughnutData={DoughThree} BarData={ChartThree} ColorScheme='sky' isAverages={true} AverageCounts={["230", "245"]} TypeOfData='Net Profit' />

        </div>
    )
}

export default FinanceDashboardPage
