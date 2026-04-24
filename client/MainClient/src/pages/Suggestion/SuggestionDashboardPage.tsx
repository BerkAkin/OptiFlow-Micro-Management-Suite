import { Bests, List, Mines } from "../../components/Suggestion";


export function SuggestionDashboardPage() {
    return (
        <div className='container mx-auto py-8 px-4'>
            <div className='flex justify-between mb-6 mx-2 border-b border-gray-200 pb-2'>
                <div>
                    <h6 className='text-2xl font-bold text-slate-800 tracking-tight font-rubik'>
                        Tider
                        <span className='text-blue-600'> Feedback</span>
                        <span className='text-slate-400 text-sm ms-3 font-normal'>Share your thoughts to shape the flow</span>
                    </h6>
                </div>
            </div>
            <div className='grid grid-cols-10 flex justify-center gap-6'>
                <div className='col-span-10'>
                    <Bests />
                </div>
                <div className='col-span-8 '>
                    <List />
                </div>
                <div className='col-span-2'>
                    <Mines />
                </div>
            </div >
        </div >
    )
}

