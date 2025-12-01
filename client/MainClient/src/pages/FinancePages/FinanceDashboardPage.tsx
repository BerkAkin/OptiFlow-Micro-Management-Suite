import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import Calendar from '../../components/FinanceComponents/Calendar/Calendar';
import BarChart from '../../components/FinanceComponents/Charts/BarChart';
import DoughChart from '../../components/FinanceComponents/Charts/DoughChart';
import VerticalChart from '../../components/FinanceComponents/Charts/VerticalChart';
import Transactions from '../../components/FinanceComponents/Transactions/Transactions';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement)

function FinanceDashboardPage() {
    return (
        <div className='container mx-auto mt-6'>
            <div className='grid grid-cols-10 gap-6'>
                <div className='col-span-3 bg-white shadow-custom rounded-lg border border-gray-200 '>
                    <BarChart />
                </div>
                <div className='col-span-2 bg-white shadow-custom  rounded-lg border border-gray-200'>
                    <DoughChart />
                </div>
                <div className='col-span-2 bg-white shadow-custom rounded-lg border border-gray-200'>

                    <VerticalChart />
                </div>
                <div className='col-span-3 bg-white shadow-custom rounded-lg border border-gray-200 overflow-y-auto'>
                    <Calendar />
                </div>
            </div>
            <div>
                <Transactions />
            </div>



        </div>
    )
}

export default FinanceDashboardPage
