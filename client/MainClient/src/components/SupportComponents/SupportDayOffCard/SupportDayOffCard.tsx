import React from 'react'
import { useApproveOrRejectDayOff } from '../../../hooks/SupportHooks/UseSupport';

interface CardDataShape {
    id: number,
    topic: string,
    description: string,
    days: number | string,
    startingDate: string,
    username: string,
    status: number,
}

interface SupportDayOffCardProps {
    item: CardDataShape;
}

function SupportDayOffCard({ item }: SupportDayOffCardProps) {

    const mutation = useApproveOrRejectDayOff();
    const handleApproveOrReject = (status: number) => {
        const payload = {
            status: status,
            requestId: item.id,
        }
        mutation.mutate({ payload: payload });
    }


    return (
        <div className='bg-white border border-gray-200 rounded-md p-5'>
            <div className='flex justify-between items-start mb-4'>
                <div className='flex items-center gap-2'>
                    <span className='font-semibold text-slate-700'>{item.username}</span>
                </div>
                <span className={`px-2.5 py-0.5 text-sm`}>
                    {item.status == 0 ? "Progressing" : item.status == 1 ? "Accepted" : "Rejected"}
                </span>
            </div>

            <div className='space-y-2 mb-6'>
                <h3 className='text-md font-bold text-slate-800'>{item.topic}</h3>
                <p className='text-sm text-slate-500'>{item.description}</p>
                <div className='flex items-center gap-4 pt-2 text-xs text-slate-600'>
                    <div className='flex items-center gap-1'>
                        <span className='font-bold text-sky-600'>{item.days} Gün</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span>{new Date(item.startingDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                </div>
            </div>

            {item.status != 0 ? <></> :

                <div className='flex gap-2'>
                    <button onClick={() => handleApproveOrReject(1)} className='cursor-pointer flex-1 rounded-lg bg-slate-50 text-slate-600 text-sm font-semibold hover:bg-red-50 hover:text-red-600 transition-colors border border-slate-200'>
                        Reject
                    </button>
                    <button onClick={() => handleApproveOrReject(2)} className='cursor-pointer flex-1 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 shadow-sm transition-colors'>
                        Approve
                    </button>
                </div>
            }
        </div>
    )
}

export default SupportDayOffCard