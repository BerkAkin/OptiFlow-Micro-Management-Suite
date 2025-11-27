import RateOthers from "../../components/RateComponents/RateOthers/RateOthers"
import RatingTable from "../../components/RateComponents/RatingTable/RatingTable"
import UserComments from "../../components/RateComponents/UserComments/UserComments"


function RatePage() {
    return (
        <div className='my-6 container mx-auto space-y-6'>
            <div className='grid grid-cols-12 gap-6 h-[380px]'>
                <div className='col-span-9 shadow-custom rounded-lg border border-gray-200'>
                    <RatingTable />
                </div>
                <div className='col-span-3 shadow-custom rounded-lg border border-gray-200'>
                    <RateOthers />
                </div>
            </div>
            <div className='h-[400px]'>
                <UserComments />
            </div>
        </div>
    )
}

export default RatePage
