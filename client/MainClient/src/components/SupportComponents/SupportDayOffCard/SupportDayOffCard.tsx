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

    const getStatusStyles = (status: number) => {
        switch (status) {
            case 1: return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case 2: return "bg-rose-50 text-rose-600 border-rose-100";
            default: return "bg-amber-50 text-amber-600 border-amber-100";
        }
    }

    return (
        <div className='hover:-translate-y-1 bg-white border border-gray-200 rounded-xl p-6  transition flex flex-col justify-between h-full'>
            <div>
                <div className='flex justify-between items-center mb-5'>
                    <div className='flex items-center gap-3'>
                        <span className='font-bold text-slate-700 tracking-tight'>{item.username}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${getStatusStyles(item.status)}`}>
                        {item.status === 0 ? "Pending" : item.status === 1 ? "Approved" : "Rejected"}
                    </span>
                </div>

                <div className='mb-6'>
                    <h3 className='text-md font-bold text-slate-700 mb-2 leading-snug'>{item.topic}</h3>
                    <p className='text-sm text-slate-500 leading-relaxed line-clamp-2 '>
                        {item.description}
                    </p>
                </div>

                <div className='flex items-center gap-3 mb-6'>
                    <div className='flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg'>
                        <span className='text-blue-600 font-bold text-sm'>{item.days}</span>
                        <span className='text-blue-600 text-xs font-medium'>Days</span>
                    </div>
                    <div className='text-slate-400 font-medium text-xs flex items-center gap-1.5'>
                        <span className="opacity-50">Date:</span>
                        <span>{new Date(item.startingDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                </div>
            </div>

            {item.status === 0 && (
                <div className='flex gap-3 pt-4 border-t border-slate-50'>
                    <button
                        onClick={() => handleApproveOrReject(2)}
                        className='cursor-pointer flex-1 py-2.5 rounded-xl text-slate-500 text-sm font-bold hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all border border-slate-100 active:scale-95'
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => handleApproveOrReject(1)}
                        className='cursor-pointer flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95'
                    >
                        Approve
                    </button>
                </div>
            )}
        </div>
    )
}

export default SupportDayOffCard