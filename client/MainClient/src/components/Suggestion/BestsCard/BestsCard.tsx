import star from '../../../assets/star.svg'
import crown from '../../../assets/crown.svg'

interface suggestionShowcaseProps {
    isStar: boolean
    Description: string,
    VoteCount: number
}

export function BestsCard({ isStar, Description, VoteCount }: suggestionShowcaseProps) {
    return (
        <div className='bg-white rounded-xl h-[100px] border border-gray-200 shadow-custom flex items-center overflow-hidden'>

            <div className={`w-24 h-full flex items-center justify-center bg-amber-100/30 border-e border-gray-100`}>
                <img
                    src={isStar ? star : crown}
                    className={`${isStar ? 'w-10' : 'w-12'}`}
                    alt="icon"
                />
            </div>

            <div className='flex-1 px-5 flex flex-col justify-center '>
                <p className={`text-md font-bold font-rubik tracking-tight text-amber-600 mb-1`}>
                    {isStar ? "This Month's Best" : "All Time Best"}
                </p>
                <p className='text-slate-700 text-sm font-rubik'>
                    {Description}
                </p>
            </div>

            <div className='w-24 h-full flex flex-col items-center justify-center border-s border-gray-50 bg-white'>
                <span className='text-xs font-semibold text-gray-400 tracking-tight mb-1'>Votes</span>
                <span className='text-3xl font-black text-slate-800 tracking-tight'>
                    {VoteCount}
                </span>
            </div>
        </div>
    )
}

