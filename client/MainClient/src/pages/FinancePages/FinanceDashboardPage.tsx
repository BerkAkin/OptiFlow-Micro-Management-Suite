import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import Calendar from '../../components/FinanceComponents/Calendar/Calendar';
import BarChart from '../../components/FinanceComponents/Charts/BarChart';
import DoughChart from '../../components/FinanceComponents/Charts/DoughChart';
import VerticalChart from '../../components/FinanceComponents/Charts/VerticalChart';
import InstallmentPaymentsCard from '../../components/FinanceComponents/InstallmentPaymentsCard/InstallmentPaymentsCard';
import RemainingPaymentsCard from '../../components/FinanceComponents/RemainingPaymentsCard/RemainingPaymentsCard';
import AddIncomeOrExpenseForm from '../../components/FinanceComponents/AddIncomeOrExpenseForm/AddIncomeOrExpenseForm';
import IncomeExpenseTable from '../../components/FinanceComponents/IncomeExpenseTable/IncomeExpenseTable';
import AddPaymentForm from '../../components/FinanceComponents/AddPaymentForm/AddPaymentForm';

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
            <div className='grid grid-cols-[20%_20%_20%_40%] gap-2'>
                <div className='bg-white shadow-md border '>
                    <BarChart />
                </div>
                <div className='bg-white shadow-md border'>
                    <DoughChart />
                </div>
                <div className='bg-white shadow-md border'>

                    <VerticalChart />
                </div>
                <div className='bg-white shadow-md border'>
                    <Calendar />
                </div>
            </div>

            <div className='grid grid-cols-[40%_40%_20%] gap-2 my-5'>

                <div className='bg-white shadow-md border '>
                    <IncomeExpenseTable colorScheme='green' filterFn={() => { }} />
                </div>
                <div className='bg-white shadow-md border '>
                    <IncomeExpenseTable colorScheme='red' filterFn={() => { }} />
                </div>

                <div className='bg-white shadow-md border'>
                    <AddIncomeOrExpenseForm />
                </div>
            </div>

            <div className='grid grid-cols-[40%_40%_20%] gap-2'>
                <div className='bg-white shadow-md border'>
                    <InstallmentPaymentsCard /></div>
                <div className='bg-white shadow-sm border'>
                    <RemainingPaymentsCard />
                </div>
                <div className='bg-white shadow-md border'>
                    <AddPaymentForm />
                </div>

            </div>
        </div>
    )
}

export default FinanceDashboardPage
