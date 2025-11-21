import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import GetHelp from '../../components/MoodComponents/GetHelp/GetHelp'
import MoodTable from '../../components/MoodComponents/MoodTable/MoodTable'
import RateOthers from '../../components/MoodComponents/RateOthers/RateOthers'

function MoodPage() {
    return (
        <div className='my-10 container mx-auto'>
            <div>
                <MoodRecorder />
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white col-span-4 shadow-custom border rounded-lg'>
                    <MoodTable />
                </div>
                <div className='bg-white h-[300px] col-span-6 shadow-custom border rounded-lg border'>
                    <PreviousMoods />
                </div>
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white col-span-3 shadow-custom border rounded-lg'>
                    <GetHelp />
                </div>
                <div className=' col-span-7'>
                    <RateOthers />
                </div>
            </div>
        </div>
    )
}

export default MoodPage
