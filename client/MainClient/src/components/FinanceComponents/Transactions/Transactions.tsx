import ActivityTable from '../ActivityTable/ActivityTable'
import InstallmentPaymentsCard from '../InstallmentPaymentsCard/InstallmentPaymentsCard'
import AddActivityForm from '../AddActivityForm/AddActivityForm'
import RemainingPayments from '../RemainingPaymentsCard/RemainingPaymentsCard'



function Transactions() {


    return (
        <div className='my-6'>
            <div className='grid grid-cols-10 gap-6'>
                <div className='grid col-span-8 gap-6'>
                    <div className='border rounded-lg shadow-custom border-gray-200 h-[500px]'>
                        <ActivityTable />
                    </div>
                    <div className='grid grid-cols-10 gap-6 h-[500px]'>
                        <div className='col-span-5 border rounded-lg shadow-custom border-gray-200'>
                            <InstallmentPaymentsCard />
                        </div>
                        <div className='col-span-5 border rounded-lg shadow-custom border-gray-200'>
                            <RemainingPayments />
                        </div>
                    </div>
                </div>
                <div className='col-span-2 h-[850px] bg-white shadow-custom border border-gray-200 rounded-lg'>
                    <AddActivityForm />
                </div>
            </div>


        </div>
    )
}

export default Transactions
