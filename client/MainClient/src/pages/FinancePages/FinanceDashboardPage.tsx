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
        <div className='h-[1800px] container mx-auto my-10'>

            <div className='grid grid-cols-12 gap-6'>
                <div className={`col-span-6`}>
                    <BarChart />
                </div>
                <div className={`col-span-3 flex flex-col justify-between`}>
                    <DoughChart />
                    <VerticalChart />
                </div>
                <div className={`col-span-3 bg-white rounded-xl border border-gray-200 shadow-custom overflow-hidden`}>
                    <Calendar />
                </div>
            </div>

            <div className='grid grid-cols-12 gap-6 my-8'>
                <div className={`col-span-9`}>
                    <LatestTransactions />
                    <div className='grid grid-cols-12 my-10 gap-6'>
                        <div className={`col-span-6`}>
                            <InstallmentPayments />
                        </div>
                        <div className={`col-span-6`}>
                            <RecurrentPayments />
                        </div>
                    </div>
                </div>
                <div className={`col-span-3`}>
                    <AddTransaction />
                </div>
            </div>

        </div>
    )
}

export default FinanceDashboardPage