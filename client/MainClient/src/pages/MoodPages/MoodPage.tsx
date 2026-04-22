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
                <div className='h-[700px] col-span-7'>
                    <AllPreviousMoods />
                </div>
                <div className='col-span-3 '>
                    <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                        <div className=' mb-2'>
                            <PreviousMoods />
                        </div>
                    </RoleBasedGuard>
                    <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                        <div className='h-[250px]'>
                            <MyComments />
                        </div>
                    </RoleBasedGuard>
                    <RoleBasedGuard allowedDepartments={["HR"]}>
                        <div className='h-[480px]'>
                            <CommentOnEmployees />
                        </div>
                    </RoleBasedGuard>
                </div>

            </div>

        </div>
    )
}

export default MoodPage
