import { useMineSuggestions } from '../../../hooks';
import { Spinner, ErrorMessage } from '../../Common';
import { ListCard } from '../ListCard/ListCard';

export function Mines() {
    const { data, isLoading, error } = useMineSuggestions();

    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;

    return (
        <div className='h-[650px] bg-white rounded-xl shadow-custom border border-gray-200 flex flex-col'>

            <div className='h-[12%] flex items-center border-b border-gray-100 px-8'>
                <p className='text-lg font-bold text-gray-800 font-rubik tracking-tight'>My Suggestions</p>
            </div>

            <div className='flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-100'>
                <div className='grid grid-cols-12 gap-y-2'>
                    {data.map((item: any, index: number) => (
                        <div className='col-span-12 mb-4' key={index}>
                            <ListCard {...item} />
                        </div>
                    ))}
                </div>

                {data.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                        <p className="text-sm">You haven't made any suggestions yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

