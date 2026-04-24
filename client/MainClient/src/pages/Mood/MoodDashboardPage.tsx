import { RoleBasedGuard } from "../../components/Common";
import { AddComment, Comments, Latest, List, Recorder } from "../../components/Mood";


export function MoodDashboardPage() {
    return (
        <div className='container py-8 mx-auto px-4'>
            <div className='flex justify-between mb-6 mx-2 border-b border-gray-200 pb-2'>
                <div>
                    <h6 className='text-2xl font-bold text-slate-800 tracking-tight font-rubik'>
                        Tider
                        <span className='text-blue-600'> Spirit</span>
                        <span className='text-slate-400 text-sm ms-3 font-normal'>Reflect on your inner stream and energy flow</span>
                    </h6>
                </div>
            </div>
            <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                <div>
                    <Recorder />
                </div>
            </RoleBasedGuard>

            <div className='grid grid-cols-12 my-6 gap-6'>
                <div className='col-span-8'>
                    <div className='h-[600px]'>
                        <List />
                    </div>
                </div>

                <div className='col-span-4 '>
                    <RoleBasedGuard allowedDepartments={['Employee', 'Finance Accountant', 'Manager']}>
                        <div className='mb-6'>
                            <Latest />
                        </div>
                        <div className='h-[275px]'>
                            <Comments />
                        </div>
                    </RoleBasedGuard>
                </div>

                <div className='col-span-12'>
                    <RoleBasedGuard allowedDepartments={["HR", "Manager"]}>
                        <div>
                            <AddComment />
                        </div>
                    </RoleBasedGuard>
                </div>

            </div>

        </div>
    )
}

