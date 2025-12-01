import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import MoodTable from '../../components/MoodComponents/MoodTable/MoodTable'
import UserMoodsTable from '../../components/MoodComponents/UserMoodsTable/UserMoodsTable'

function MoodPage() {
    return (
        <div className='container my-10 mx-auto'>
            <div>
                <MoodRecorder />
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white h-[350px] col-span-5 shadow-custom border border-gray-200 rounded-lg'>
                    <MoodTable />
                </div>
                <div className='bg-white h-[350px] col-span-5 shadow-custom border border-gray-200 rounded-lg '>
                    <PreviousMoods />
                </div>

            </div>
            <div className='grid my-6 gap-6'>
                <div className='bg-white h-[500px] shadow-custom border border-gray-200 rounded-lg'>
                    <UserMoodsTable />
                </div>


            </div>
        </div>
    )
}

export default MoodPage
