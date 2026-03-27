import SupportRequests from '../../components/SupportComponents/SupportRequests/SupportRequests'
import SupportBarChart from '../../components/SupportComponents/SupportCharts/SupportBarChart'
import SupportDoughChart from '../../components/SupportComponents/SupportCharts/SupportDoughChart'
import SupportLiveChatButton from '../../components/SupportComponents/SupportLiveChatButton/SupportLiveChatButton'
import RoleBasedGuard from '../../components/RoleBasedGuard/RoleBasedGuard'
import SupportDayOffs from '../../components/SupportComponents/SupportDayOffs/SupportDayOffs'

function SupportPage() {
    return (
        <div className='container my-10 mx-auto'>
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
                    <div className='bg-white h-[400px] col-span-3 shadow-custom border border-gray-200 rounded-lg'>
                        <SupportDoughChart />
                    </div>
                    <div className='bg-white h-[400px] col-span-4 shadow-custom border border-gray-200 rounded-lg '>
                        <SupportBarChart />
                    </div>
                    <div className='bg-white h-[400px] col-span-5 shadow-custom border border-gray-200 rounded-lg '>
                        <SupportDayOffs />
                    </div>
                </div>
            </RoleBasedGuard>

        </div>
    )
}

export default SupportPage
