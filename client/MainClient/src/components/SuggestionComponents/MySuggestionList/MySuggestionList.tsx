import { useMySuggestions } from '../../../hooks/SuggestionHooks/useSuggestion';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import SuggestionCard from '../SuggestionCard/SuggestionCard';

function MySuggestionList() {

    const { data, isLoading, error } = useMySuggestions();
    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)

    return (
        <div className='h-[650px] bg-white rounded-lg shadow-custom border border-gray-200'>
            <div className='h-[10%] text-start flex justify-start border-b border-slate-100'>
                <p className={`text-xl font-semibold text-slate-800 font-rubik ps-6 py-4`}>My Suggestions</p>
            </div>

            <div className='h-[80%] overflow-y-auto grid gap-6 px-3 overflow-x-hidden grid-cols-12'>
                {data.map((item: any, index: number) => (
                    <div className='col-span-12 my-4' key={index}>
                        <SuggestionCard {...item} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MySuggestionList
