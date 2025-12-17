import { useSuggestions } from '../../../hooks/SuggestionHooks/useSuggestion';
import SuggestionCard from '../SuggestionCard/SuggestionCard';


function SuggestionList() {

    const { data, isLoading, error } = useSuggestions();
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    return (

        <div className='h-[650px] bg-white rounded-lg shadow-custom border border-gray-200'>
            <div className='h-[10%] text-start flex justify-start'>
                <p className={`text-xl font-semibold text-slate-800 font-rubik ps-6 py-4`}>Suggestions</p>
            </div>

            <div className='h-[90%] overflow-y-auto my-6 grid gap-6 px-6 grid-cols-12'>
                {data.suggestions.map((item, index) => (
                    <div className='col-span-3' key={index}>
                        <SuggestionCard {...item} />
                    </div>
                ))}
            </div>

        </div>
    )

}

export default SuggestionList
