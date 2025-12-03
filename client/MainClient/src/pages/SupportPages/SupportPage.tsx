import SupportChat from '../../components/SupportComponents/SupportChat/SupportChat'
import SupportBarChart from '../../components/SupportComponents/SupportCharts/SupportBarChart'
import SupportDoughChart from '../../components/SupportComponents/SupportCharts/SupportDoughChart'
import RateOthers from '../../components/RateComponents/RateOthers/RateOthers'

function SupportPage() {
    return (
        <div className='container my-10 mx-auto'>

            <div className='grid grid-cols-12 my-6 gap-6'>
                <div className='bg-white h-[400px] col-span-3 shadow-custom border border-gray-200 rounded-lg'>
                    <SupportDoughChart />
                </div>
                <div className='bg-white h-[400px] col-span-6 shadow-custom border border-gray-200 rounded-lg '>
                    <SupportBarChart />
                </div>
                <div className='col-span-3 '>
                    <RateOthers />
                </div>

            </div>
            <div className='h-[450px]'>
                <SupportChat />
            </div>
        </div>
    )
}

export default SupportPage
