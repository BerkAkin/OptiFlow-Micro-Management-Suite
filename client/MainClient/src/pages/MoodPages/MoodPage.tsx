import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import MoodTable from '../../components/MoodComponents/MoodTable/MoodTable'
import RateOthers from '../../components/MoodComponents/RateOthers/RateOthers'

function MoodPage() {
    return (
        <div className='my-10 container mx-auto'>
            <div>
                <MoodRecorder />
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white h-[500px] col-span-4 shadow-custom border rounded-lg'>
                    <MoodTable />
                </div>
                <div className='bg-white h-[500px] col-span-4 shadow-custom border rounded-lg border'>
                    <PreviousMoods />
                </div>
                <div className='bg-white h-[300px] col-span-2 shadow-custom border rounded-lg border'>
                    <RateOthers />
                </div>
            </div>
        </div>
    )
}

export default MoodPage
