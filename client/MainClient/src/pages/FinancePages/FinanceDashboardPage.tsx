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
            <div>
                <Transactions />
            </div>



        </div>
    )
}

export default FinanceDashboardPage
