import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import AllPreviousMoods from '../../components/MoodComponents/AllPreviousMoods/AllPreviousMoods'
import MyComments from '../../components/MoodComponents/MyComments/MyComments'
import CommentOnEmployees from '../../components/MoodComponents/CommentOnEmployees/CommentOnEmployees'
import RoleBasedGuard from '../../components/RoleBasedGuard/RoleBasedGuard'

function MoodPage() {
    return (
        <div className='container my-10 mx-auto '>
            <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                <div>
                    <MoodRecorder />
                </div>
            </RoleBasedGuard>
            <div className='grid grid-cols-10 my-6 gap-6 '>
                <div className='bg-white h-[700px] col-span-7 shadow-custom border border-gray-200 rounded-lg transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                    <AllPreviousMoods />
                </div>
                <div className='col-span-3 '>
                    <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                        <div className='bg-white mb-2 shadow-custom border border-gray-200 rounded-lg transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                            <PreviousMoods />
                        </div>
                    </RoleBasedGuard>
                    <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                        <div className='bg-white h-[250px] shadow-custom border border-gray-200 rounded-lg transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                            <MyComments />
                        </div>
                    </RoleBasedGuard>
                    <RoleBasedGuard allowedDepartments={["HR"]}>
                        <div className='bg-white h-[480px] shadow-custom border border-gray-200 rounded-lg transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
                            <CommentOnEmployees />
                        </div>
                    </RoleBasedGuard>
                </div>

            </div>

        </div>
    )
}

export default MoodPage
