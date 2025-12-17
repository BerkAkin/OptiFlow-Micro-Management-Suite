import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import TodaysMoods from '../../components/MoodComponents/TodaysMoods/TodaysMoods'

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
                <div className='bg-white h-[350px] col-span-3 shadow-custom border border-gray-200 rounded-lg '>
                    <PreviousMoods />
                </div>

            </div>

        </div>
    )
}

export default MoodPage
