import LatestTransactions from '../LatestTransactions/LatestTransactions'
import InstallmentPayments from '../InstallmentPayments/InstallmentPayments'
import AddTransaction from '../AddTransaction/AddTransaction'
import RecurrentPayments from '../RecurrentPayments/RecurrentPayments'



function Transactions() {


    return (
        <div className='my-6'>
            <div className='grid grid-cols-10 gap-6'>
                <div className='grid col-span-8 gap-6'>
                    <div className='border rounded-lg bg-white shadow-custom border-gray-200 h-[600px] transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                        <LatestTransactions />
                    </div>
                    <div className='grid grid-cols-10 gap-6 h-[500px]'>
                        <div className='col-span-5 border bg-white rounded-lg shadow-custom border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                            <InstallmentPayments />
                        </div>
                        <div className='col-span-5 border bg-white rounded-lg shadow-custom border-gray-200 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                            <RecurrentPayments />
                        </div>
                    </div>
                </div>
                <div className='col-span-2 h-[600px] bg-white shadow-custom border border-gray-200 rounded-lg transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <AddTransaction />
                </div>
            </div>


        </div>
    )
}

export default Transactions
