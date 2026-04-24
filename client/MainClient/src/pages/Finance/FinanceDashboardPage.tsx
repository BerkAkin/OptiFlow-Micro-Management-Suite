import { Chart as ChartJS, ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { Add, Bar, Calendar, Dough, Installments, Recurrents, Transactions, Vertical } from '../../components/Finance';

ChartJS.register(ArcElement, CategoryScale, Tooltip, Legend, LinearScale, BarElement, PointElement, LineElement)

export function FinanceDashboardPage() {

    return (
        <div className='py-8 px-4 container mx-auto'>
            <div className='flex justify-between mb-6 mx-2 border-b border-gray-200 pb-2'>
                <div>
                    <h6 className='text-2xl font-bold text-slate-800 tracking-tight font-rubik'>
                        Cash
                        <span className='text-blue-500'> Flow</span>
                        <span className='text-slate-400 text-sm ms-3 font-normal'>Monitor the ebb and flow of your corporate capital</span>
                    </h6>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-6'>
                <div className={`col-span-6`}>
                    <Bar />
                </div>
                <div className={`col-span-3 flex flex-col justify-between`}>
                    <Dough />
                    <Vertical />
                </div>
                <div className={`col-span-3 bg-white rounded-xl border border-gray-200 shadow-custom overflow-hidden`}>
                    <Calendar />
                </div>
            </div>

            <div className='grid grid-cols-12 gap-6 my-8'>
                <div className={`col-span-9`}>
                    <Transactions />
                    <div className='grid grid-cols-12 my-10 gap-6'>
                        <div className={`col-span-6`}>
                            <Installments />
                        </div>
                        <div className={`col-span-6`}>
                            <Recurrents />
                        </div>
                    </div>
                </div>
                <div className={`col-span-3`}>
                    <Add />
                </div>
            </div>

        </div>
    )
}

