import React from 'react'
import SupportDayOffCard from '../SupportDayOffCard/SupportDayOffCard'
import { useDayOffs } from '../../../hooks/SupportHooks/UseSupport'
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

interface ItemDataShape {
    id: number,
    topic: string,
    description: string,
    days: string,
    startingDate: string,
    username: string,
    status: number,
}

function SupportDayOffs() {
    const { data, isLoading, error } = useDayOffs();

    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;

    return (
        <div className='h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-custom transition-all'>
            <div className='px-8 py-6 border-b border-slate-100'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-lg font-bold font-rubik text-slate-800 tracking-tight'>
                            Day Off Requests
                        </h2>
                        <p className='text-sm text-slate-500 mt-1'>
                            Manage and review employee absence applications
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex-grow overflow-y-auto p-8'>
                <div className='grid grid-cols-12 gap-6'>
                    {data.length > 0 ? (
                        data.map((item: ItemDataShape) => (
                            <div key={item.id} className='col-span-6'>
                                <SupportDayOffCard item={item} />
                            </div>
                        ))
                    ) : (
                        <div className='col-span-12 flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200'>
                            <p className='text-slate-400 font-medium'>No requests found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SupportDayOffs