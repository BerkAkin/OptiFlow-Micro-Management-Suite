import { useSuggestions } from '../../../hooks/SuggestionHooks/useSuggestion';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Spinner from '../../Spinner/Spinner';
import SuggestionCard from '../SuggestionCard/SuggestionCard';

function SuggestionList() {
    const { data, isLoading, error } = useSuggestions();

    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;

    return (
        <div className='h-[650px] bg-white rounded-xl shadow-custom border border-gray-200 flex flex-col'>

            <div className='h-[12%] flex items-center border-b border-gray-50 px-8'>
                <p className='text-xl font-bold text-gray-800 font-rubik'>Suggestions</p>
            </div>

            <div className='flex-1 overflow-y-auto p-6'>
                <div className='grid grid-cols-12 gap-6'>
                    {data.map((item: any, index: number) => (
                        <div className='col-span-4' key={index}>
                            <SuggestionCard {...item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuggestionList;