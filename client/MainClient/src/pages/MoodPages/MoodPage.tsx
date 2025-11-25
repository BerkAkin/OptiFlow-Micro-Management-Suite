import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import MoodTable from '../../components/MoodComponents/MoodTable/MoodTable'
import RateOthers from '../../components/MoodComponents/RateOthers/RateOthers'

function MoodPage() {
    return (
        <div className='container my-10 mx-auto'>
            <div>
                <MoodRecorder />
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white h-[500px] col-span-4 shadow-custom border border-gray-200 rounded-lg'>
                    <MoodTable />
                </div>
                <div className='bg-white h-[500px] col-span-4 shadow-custom border border-gray-200 rounded-lg '>
                    <PreviousMoods />
                </div>
                <div className='bg-white h-[300px] col-span-2 shadow-custom border border-gray-200 rounded-lg '>
                    <RateOthers />
                </div>
            </div>
        </div>
    )
}

export default MoodPage
