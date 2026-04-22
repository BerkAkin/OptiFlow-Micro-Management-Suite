import { useMyComments } from "../../../hooks/MoodHooks/UseMood";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import Spinner from "../../Spinner/Spinner";

function MyComments() {
    const { data, isLoading, error } = useMyComments();

    if (isLoading) return <Spinner />
    if (error || !data) return <ErrorMessage />

    return (
        <div className="h-full flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden shadow-custom">

            <div className='px-6 py-5 border-b border-gray-50 flex justify-between items-center bg-white'>
                <h2 className='text-xl font-bold text-slate-700 tracking-tight font-rubik'>
                    My Comments
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="flex flex-col bg-white border border-gray-200 rounded-lg transition overflow-hidden"
                        >
                            <div className="p-5 flex-1">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl text-slate-300 leading-none select-none font-serif">“</span>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {item.comment}
                                    </p>
                                </div>
                            </div>

                            <div className="px-5 py-3 bg-slate-50 border-t border-gray-100 flex justify-end items-center">
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <span className="text-[10px] font-medium tracking-wide">
                                        {new Date(item.date).toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {data.length === 0 && (
                    <div className="h-40 flex flex-col items-center justify-center text-slate-400 italic">
                        <p className="text-sm">You have no comments.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyComments;