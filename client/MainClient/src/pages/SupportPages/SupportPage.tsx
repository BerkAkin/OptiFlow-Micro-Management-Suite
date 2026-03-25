import SupportRequests from '../../components/SupportComponents/SupportRequests/SupportRequests'
import SupportBarChart from '../../components/SupportComponents/SupportCharts/SupportBarChart'
import SupportDoughChart from '../../components/SupportComponents/SupportCharts/SupportDoughChart'
import SupportLiveChatButton from '../../components/SupportComponents/SupportLiveChatButton/SupportLiveChatButton'
import RoleBasedGuard from '../../components/RoleBasedGuard/RoleBasedGuard'

function SupportPage() {
    return (
        <div className='container my-10 mx-auto'>
            <RoleBasedGuard allowedDepartments={["HR", 'Manager']}>
                <div className='grid grid-cols-12 my-6 gap-6'>
                    <div className='bg-white h-[400px] col-span-3 shadow-custom border border-gray-200 rounded-lg'>
                        <SupportDoughChart />
                    </div>
                    <div className='bg-white h-[400px] col-span-9 shadow-custom border border-gray-200 rounded-lg '>
                        <SupportBarChart />
                    </div>
                </div>
            </RoleBasedGuard>
            <div className='grid grid-cols-12 my-6 gap-6'>
                <div className='col-span-12 h-[600px]'>
                    <SupportRequests />

                </div>
                <div className='absolute right-50 bottom-10'>
                    <SupportLiveChatButton />
                </div>
            </div>

        </div>
    )
}

export default SupportPage
