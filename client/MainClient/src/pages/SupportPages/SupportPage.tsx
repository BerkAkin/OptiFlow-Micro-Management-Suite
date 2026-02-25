import SupportRequests from '../../components/SupportComponents/SupportRequests/SupportRequests'
import SupportBarChart from '../../components/SupportComponents/SupportCharts/SupportBarChart'
import SupportDoughChart from '../../components/SupportComponents/SupportCharts/SupportDoughChart'
import RateEmployees from '../../components/MoodComponents/RateEmployees/RateEmployees'

function SupportPage() {
    return (
        <div className='container my-10 mx-auto'>

            <div className='grid grid-cols-12 my-6 gap-6'>
                <div className='bg-white h-[400px] col-span-3 shadow-custom border border-gray-200 rounded-lg'>
                    <SupportDoughChart />
                </div>
                <div className='bg-white h-[400px] col-span-9 shadow-custom border border-gray-200 rounded-lg '>
                    <SupportBarChart />
                </div>
            </div>
            <div className='grid grid-cols-12 my-6 gap-6'>
                <div className='col-span-12 h-[600px]'>
                    <SupportRequests />
                </div>
            </div>


        </div>
    )
}

export default SupportPage
