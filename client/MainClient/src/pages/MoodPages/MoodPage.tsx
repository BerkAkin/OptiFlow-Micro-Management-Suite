import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import AllPreviousMoods from '../../components/MoodComponents/AllPreviousMoods/AllPreviousMoods'
import MyComments from '../../components/MoodComponents/MyComments/MyComments'
import CommentOnEmployees from '../../components/MoodComponents/CommentOnEmployees/CommentOnEmployees'

function MoodPage() {
    return (
        <div className='container my-10 mx-auto'>
            <div>
                <MoodRecorder />
            </div>
            <div className='grid grid-cols-10 my-6 gap-6'>
                <div className='bg-white h-[700px] col-span-7 shadow-custom border border-gray-200 rounded-lg'>
                    <AllPreviousMoods />
                </div>
                <div className='col-span-3 '>
                    <div className='bg-white shadow-custom border border-gray-200 rounded-lg '>
                        <PreviousMoods />
                    </div>
                    <div className='bg-white h-[250px] my-2 shadow-custom border border-gray-200 rounded-lg '>
                        <MyComments />
                    </div>
                    <div className='bg-white h-[500px] shadow-custom border border-gray-200 rounded-lg '>
                        <CommentOnEmployees />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MoodPage
