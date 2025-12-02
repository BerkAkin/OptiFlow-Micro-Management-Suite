import LatestTransactions from '../LatestTransactions/LatestTransactions'
import InstallmentPayments from '../InstallmentPayments/InstallmentPayments'
import AddTransaction from '../AddTransaction/AddTransaction'
import RecurrentPayments from '../RecurrentPayments/RecurrentPayments'



function Transactions() {


    return (
        <div className='my-6'>
            <div className='grid grid-cols-10 gap-6'>
                <div className='grid col-span-8 gap-6'>
                    <div className='border rounded-lg bg-white shadow-custom border-gray-200 h-[500px]'>
                        <LatestTransactions />
                    </div>
                    <div className='grid grid-cols-10 gap-6 h-[500px]'>
                        <div className='col-span-5 border bg-white rounded-lg shadow-custom border-gray-200'>
                            <InstallmentPayments />
                        </div>
                        <div className='col-span-5 border bg-white rounded-lg shadow-custom border-gray-200'>
                            <RecurrentPayments />
                        </div>
                    </div>
                </div>
                <div className='col-span-2 h-[850px] bg-white shadow-custom border border-gray-200 rounded-lg'>
                    <AddTransaction />
                </div>
            </div>


        </div>
    )
}

export default Transactions
