import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import TodaysMoods from '../../components/MoodComponents/TodaysMoods/TodaysMoods'
import UserComments from '../../components/MoodComponents/UserComments/UserComments'

function MoodPage() {
    return (
        <div className='container my-10 mx-auto'>
            <div>
                <MoodRecorder />
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white h-[500px] col-span-7 shadow-custom border border-gray-200 rounded-lg'>
                    <TodaysMoods />
                </div>
                <div className='col-span-3'>
                    <div className='bg-white h-[244px] shadow-custom border border-gray-200 rounded-lg '>
                        <PreviousMoods />
                    </div>
                    <div className='bg-white h-[244px] my-2 shadow-custom border border-gray-200 rounded-lg '>
                        <UserComments />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MoodPage
