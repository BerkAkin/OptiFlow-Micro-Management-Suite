import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import Calendar from '../../components/FinanceComponents/Calendar/Calendar';
import BarChart from '../../components/FinanceComponents/Charts/BarChart';
import DoughChart from '../../components/FinanceComponents/Charts/DoughChart';
import VerticalChart from '../../components/FinanceComponents/Charts/VerticalChart';
import InstallmentPayments from '../../components/FinanceComponents/InstallmentPayments/InstallmentPayments';
import AddTransaction from '../../components/FinanceComponents/AddTransaction/AddTransaction';
import LatestTransactions from '../../components/FinanceComponents/LatestTransactions/LatestTransactions';
import RecurrentPayments from '../../components/FinanceComponents/RecurrentPayments/RecurrentPayments';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement)

function FinanceDashboardPage() {
    return (
        <div className='container mx-auto mt-6'>
            <div className='grid grid-cols-10 gap-6'>
                <div className='col-span-4 bg-white shadow-custom rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <BarChart />
                </div>
                <div className='col-span-2 bg-white shadow-custom  rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <DoughChart />
                </div>
                <div className='col-span-2 bg-white shadow-custom rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>

                    <VerticalChart />
                </div>
                <div className='col-span-2 bg-white shadow-custom rounded-lg border border-gray-200 overflow-y-auto transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <Calendar />
                </div>
            </div>
            <div className='grid grid-cols-10 gap-6 my-6'>
                <div className='col-span-8 bg-white shadow-custom rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <LatestTransactions />
                </div>
                <div className='col-span-2 bg-white shadow-custom  rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <AddTransaction />
                </div>
            </div>
            <div className='grid grid-cols-10 gap-6 mb-10'>
                <div className='col-span-5 bg-white shadow-custom rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <InstallmentPayments />
                </div>
                <div className='col-span-5 bg-white shadow-custom  rounded-lg border border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <RecurrentPayments />
                </div>
            </div>



        </div>
    )
}

export default FinanceDashboardPage
