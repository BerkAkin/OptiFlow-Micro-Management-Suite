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
        <div className='py-8 px-4 container mx-auto'>
            <div className='flex justify-between mb-6 mx-2 border-b border-gray-200 pb-2'>
                <div>
                    <h6 className='text-2xl font-bold text-slate-800 tracking-tight font-rubik'>
                        Cash
                        <span className='text-blue-600'> Flow</span>
                        <span className='text-slate-400 text-sm ms-3 font-normal'>Monitor the ebb and flow of your corporate capital</span>
                    </h6>
                </div>
            </div>
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