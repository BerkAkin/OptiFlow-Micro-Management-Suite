import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import Calendar from '../../components/FinanceComponents/Calendar/Calendar';
import BarChart from '../../components/FinanceComponents/Charts/BarChart';
import DoughChart from '../../components/FinanceComponents/Charts/DoughChart';
import VerticalChart from '../../components/FinanceComponents/Charts/VerticalChart';
import InstallmentPaymentsCard from '../../components/FinanceComponents/InstallmentPaymentsCard/InstallmentPaymentsCard';
import RemainingPaymentsCard from '../../components/FinanceComponents/RemainingPaymentsCard/RemainingPaymentsCard';
import AddActivityForm from '../../components/FinanceComponents/AddActivityForm/AddActivityForm';
import AddPaymentForm from '../../components/FinanceComponents/AddPaymentForm/AddPaymentForm';
import ActivityTable from '../../components/FinanceComponents/ActivityTable/ActivityTable';

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




function FinanceDashboardPage() {
    return (
        <div className='container mx-auto mt-10'>
            <div className='grid flex justify-center grid-cols-10 gap-5'>
                <div className='col-span-2 bg-white shadow-lg rounded-lg border '>
                    <BarChart />
                </div>
                <div className='col-span-2 bg-white shadow-lg rounded-lg border'>
                    <DoughChart />
                </div>
                <div className='col-span-2 bg-white shadow-lg rounded-lg border'>

                    <VerticalChart />
                </div>
                <div className='col-span-4 bg-white shadow-lg rounded-lg border overflow-y-auto'>
                    <Calendar />
                </div>
            </div>

            <div className='flex justify-center mx-auto grid grid-cols-10 gap-5 my-5'>
                <div className='col-span-8 bg-white shadow-lg border rounded-lg'>
                    <ActivityTable />
                </div>
                <div className='col-span-2 bg-white shadow-lg border rounded-lg'>
                    <AddActivityForm />
                </div>
            </div>

            <div className='flex justify-center grid grid-cols-10 gap-5 mb-10'>
                <div className='col-span-4 bg-white shadow-lg border rounded-lg'>
                    <InstallmentPaymentsCard /></div>
                <div className='col-span-4 bg-white shadow-lg border rounded-lg'>
                    <RemainingPaymentsCard />
                </div>
                <div className='col-span-2 bg-white shadow-lg border rounded-lg'>
                    <AddPaymentForm />
                </div>

            </div>
        </div>
    )
}

export default FinanceDashboardPage
