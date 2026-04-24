import SupportRequests from '../../components/SupportComponents/SupportRequests/SupportRequests'
import SupportBarChart from '../../components/SupportComponents/SupportCharts/SupportBarChart'
import SupportDoughChart from '../../components/SupportComponents/SupportCharts/SupportDoughChart'
import SupportLiveChatButton from '../../components/SupportComponents/SupportLiveChatButton/SupportLiveChatButton'
import RoleBasedGuard from '../../components/RoleBasedGuard/RoleBasedGuard'
import SupportDayOffs from '../../components/SupportComponents/SupportDayOffs/SupportDayOffs'

function SupportPage() {
    return (
        <div className='container py-8 px-4 mx-auto'>

            <div className='flex justify-between mb-6 mx-2 border-b border-gray-200 pb-2'>
                <div>
                    <h6 className='text-2xl font-bold text-slate-800 tracking-tight font-rubik'>
                        Beacon
                        <span className='text-blue-600'> Light</span>
                        <span className='text-slate-400 text-sm ms-3 font-normal'>Connect with the flow and get the assistance you need</span>
                    </h6>
                </div>
            </div>

            <div className='grid grid-cols-12'>
                <div className='col-span-12'>
                    <SupportRequests />
                </div>
                <div className='absolute right-30 bottom-10'>
                    <SupportLiveChatButton />
                </div>
            </div>
            <RoleBasedGuard allowedDepartments={["HR", 'Manager']}>
                <div className='grid grid-cols-12 my-6 gap-6'>
                    <div className=' col-span-3 h-[400px]'>
                        <SupportDoughChart />
                    </div>
                    <div className=' col-span-4 h-[400px]'>
                        <SupportBarChart />
                    </div>
                    <div className='col-span-5 h-[400px]'>
                        <SupportDayOffs />
                    </div>
                </div>
            </RoleBasedGuard>

        </div>
    )
}

export default SupportPage
