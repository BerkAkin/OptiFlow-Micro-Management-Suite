import MoodRecorder from '../../components/MoodComponents/MoodRecorder/MoodRecorder'
import PreviousMoods from '../../components/MoodComponents/PreviousMoods/PreviousMoods'
import AllPreviousMoods from '../../components/MoodComponents/AllPreviousMoods/AllPreviousMoods'
import MyComments from '../../components/MoodComponents/MyComments/MyComments'
import CommentOnEmployees from '../../components/MoodComponents/CommentOnEmployees/CommentOnEmployees'
import RoleBasedGuard from '../../components/RoleBasedGuard/RoleBasedGuard'

function MoodPage() {
    return (
        <div className='container my-10 mx-auto'>
            <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                <div>
                    <MoodRecorder />
                </div>
            </RoleBasedGuard>

            <div className='grid grid-cols-12 my-6 gap-6'>
                <div className='col-span-8'>
                    <div className='h-[600px]'>
                        <AllPreviousMoods />
                    </div>
                </div>

                <div className='col-span-4 '>
                    <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                        <div className='mb-6'>
                            <PreviousMoods />
                        </div>
                        <div className='h-[275px]'>
                            <MyComments />
                        </div>
                    </RoleBasedGuard>
                </div>

                <div className='col-span-12'>
                    <RoleBasedGuard allowedDepartments={["HR", "Manager"]}>
                        <div>
                            <CommentOnEmployees />
                        </div>
                    </RoleBasedGuard>
                </div>

            </div>

        </div>
    )
}

export default MoodPage
