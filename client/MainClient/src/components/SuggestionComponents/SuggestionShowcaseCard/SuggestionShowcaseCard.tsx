import star from '../../../assets/star.svg'
import crown from '../../../assets/crown.svg'

interface suggestionShowcaseProps {
    isStar: boolean
    Description: string,
    VoteCount: number
}

function SuggestionShowcaseCard({ isStar, Description, VoteCount }: suggestionShowcaseProps) {
    return (
        <div className='bg-white rounded-lg h-[100px] shadow-custom border border-gray-200 grid grid-cols-10 transition-all duration-200 ease-out hover:scale-101 hover:-translate-y-1'>
            <div className='col-span-2 flex items-center justify-center border-e border-amber-200'>
                <p className={`${isStar == true ? "text-6xl" : "text-7xl pb-2"} text-amber-500`}>{isStar == true ? <img src={star} width={60} /> : <img src={crown} width={60} />}</p>
            </div>
            <div className='col-span-7'>
                <div className='h-[40px] flex items-center justify-start'>
                    <p className='ps-4 w-full '>{isStar ? "This Month's Best" : "All Time Best"}</p>
                </div>
                <div className='h-[60px] flex justify-start items-start'>
                    <p className='text-gray-700 text-sm py-2 px-4'>{Description}</p>
                </div>
            </div>
            <div className='col-span-1'>
                <div className='h-[40px] flex items-center justify-start'>
                    <p className='ps-4 w-full '>Votes</p>
                </div>
                <div className='h-[60px] flex justify-center items-start'>
                    <p className='text-3xl text-gray-600'>{VoteCount}</p>
                </div>

            </div>
        </div>
    )
}

export default SuggestionShowcaseCard
