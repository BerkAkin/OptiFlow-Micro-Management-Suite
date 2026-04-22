import { Link, Outlet, useParams } from 'react-router'
import { useMarkAsClosed, useSupportRequests } from '../../../hooks/SupportHooks/UseSupport';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { useState } from 'react';
import { useToatsContext } from '../../../context/ToastContext';
import RoleBasedGuard from '../../RoleBasedGuard/RoleBasedGuard';

function SupportRequests() {
    const { data, isLoading, error } = useSupportRequests();
    const [outletContext, setOutletContext] = useState<{ id: number, isClosed: boolean } | null>(null);
    const { showToast } = useToatsContext();
    const params = useParams();

    const mutation = useMarkAsClosed();
    const handleMarkAsClosed = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        mutation.mutate(id, {
            onSuccess: () => showToast("Request closed succesfully"),
            onError: () => showToast("An error has occured")
        });
    }

    if (isLoading) return <Spinner />
    if (error || !data) return <ErrorMessage />

    return (
        <div className='grid grid-cols-12 gap-6 h-[calc(50vh-50px)]'>
            <div className='col-span-3 border border-gray-200 bg-white rounded-xl shadow-custom flex flex-col overflow-hidden'>
                <div className='p-5 border-b border-slate-50'>
                    <h2 className='text-xl font-bold text-slate-800 font-rubik tracking-tight'>Support Requests</h2>
                    <p className='text-xs text-slate-500 font-medium mt-1'>Manage your tickets</p>
                </div>

                <div className='overflow-y-auto flex-grow p-3 space-y-3 bg-slate-50/30'>
                    {data.map((item: any) => {
                        const isActive = params.id === item.id.toString();
                        return (
                            <Link onClick={() => setOutletContext({ id: item.id, isClosed: item.isClosed })} key={item.id} to={`request/${item.id}/messages`}>
                                <div className={`relative p-4 rounded-lg border transition hover:-translate-y-1 ${isActive ? 'bg-white border-gray-200 shadow-sm'
                                    : 'bg-white border-gray-200'}`}>
                                    <div className='flex justify-between items-start mb-3'>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.isClosed
                                            ? 'bg-slate-100 text-slate-500 border-slate-200'
                                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                            }`}>
                                            {item.isClosed ? "Closed" : "Open"}
                                        </span>

                                        {!item.isClosed && (
                                            <RoleBasedGuard allowedDepartments={["HR"]}>
                                                <button
                                                    onClick={(e) => handleMarkAsClosed(e, item.id)}
                                                    className='opacity-0 group-hover:opacity-100 transition-opacity bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-1 rounded hover:bg-rose-600 hover:text-white border border-rose-100'
                                                >
                                                    Close Ticket
                                                </button>
                                            </RoleBasedGuard>
                                        )}
                                    </div>

                                    <div className='space-y-1'>
                                        <p className='text-sm font-bold text-slate-700 leading-tight'>Category:<span className='text-xs text-slate-400 font-medium'> {item.category}</span></p>
                                    </div>

                                    <div className='mt-4 flex items-center justify-between border-t border-slate-50 pt-3'>
                                        <div className='flex items-center gap-2'>
                                            <p className='text-xs font-semibold text-slate-600'>{item.userName}</p>
                                        </div>
                                        <p className='text-[10px] text-slate-400 font-medium'>{item.createdAt}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <div className='col-span-9 border border-gray-200 bg-white rounded-xl shadow-custom overflow-hidden flex flex-col'>
                {outletContext || params.id ? (
                    <Outlet context={{ isClosed: outletContext?.isClosed }} />
                ) : (
                    <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 p-10 text-center">

                        <h3 className="text-slate-700 font-bold text-lg">Select a Ticket</h3>
                        <p className="text-slate-500 text-sm max-w-xs mx-auto">Choose a support request from the list to view conversations and details.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SupportRequests;