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
        <div className='h-full'>
            <div className='p-6 h-[10%]'>
                <p className={`text-xl px-1 pb-5 font-semibold font-rubik text-slate-800 `} >
                    Day Off Requests
                </p>
            </div>
            <div className='p-6 mt-4 h-[80%] grid grid-cols-12 gap-4 overflow-y-auto'>
                {data.map((item: ItemDataShape, index: number) => (
                    <div className='col-span-6'>
                        <SupportDayOffCard item={item} />
                    </div>
                ))}
            </div>


        </div>
    )
}

export default SupportDayOffs
