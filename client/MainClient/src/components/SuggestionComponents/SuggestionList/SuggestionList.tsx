import { useSuggestions } from '../../../hooks/SuggestionHooks/useSuggestion';
import SuggestionCard from '../SuggestionCard/SuggestionCard';


function SuggestionList() {

    const { data, isLoading, error } = useSuggestions();
    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)

    return (

        <div className='h-[650px] bg-white rounded-lg shadow-custom border border-gray-200'>

            <div className='w-full text-center flex justify-center items-start'>
                <p className={`text-xl text-center px-6 text-white bg-indigo-400 rounded-b-sm font-rubik`}>Suggestions</p>
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
