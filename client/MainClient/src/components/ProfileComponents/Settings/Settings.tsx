import React from 'react'
import { useChangeEmailPreference, useEmailPreference } from '../../../hooks/ProfileHooks/UseProfile';

function Settings() {
    const { data: isEnabled, isLoading } = useEmailPreference();
    const mutation = useChangeEmailPreference();

    const isProcessing = isLoading || mutation.isPending;

    return (
        <div className='mx-auto'>
            <div className='bg-white rounded-xl shadow-custom border border-gray-200 overflow-hidden'>
                <div className='px-6 py-4 border-b border-gray-50 bg-gray-50/30'>
                    <h2 className='text-lg font-bold text-slate-800 tracking-tight'>Preferences</h2>
                    <p className='text-xs text-slate-400'>You can manage application notifications and email settings here.</p>
                </div>

                <div className='p-6'>
                    <div className='flex items-center justify-between group'>
                        <div className='flex items-center gap-4'>
                            <div>
                                <label
                                    htmlFor='mailFinancial'
                                    className='text-sm font-bold text-slate-700 cursor-pointer block'
                                >
                                    Email Notifications
                                </label>
                                <p className='text-xs text-slate-400 mt-0.5'>Receive emails about financial reports and important updates.</p>
                            </div>
                        </div>

                        <div className='relative flex items-center'>
                            <input
                                id="mailFinancial"
                                type="checkbox"
                                className='sr-only peer'
                                checked={!!isEnabled}
                                onChange={() => mutation.mutate()}
                                disabled={isProcessing}
                            />
                            <div
                                onClick={() => !isProcessing && mutation.mutate()}
                                className={`
                                    w-12 h-6 rounded-full cursor-pointer transition-all duration-300 relative
                                    ${isEnabled ? 'bg-blue-500 shadow-inner' : 'bg-gray-200'}
                                    ${isProcessing ? 'opacity-40 cursor-not-allowed' : 'hover:ring-4 hover:ring-blue-500/10'}
                                `}
                            >
                                <div className={`
                                    absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
                                    ${isEnabled ? 'translate-x-6' : 'translate-x-0'}
                                `}>
                                    {mutation.isPending && (
                                        <div className="w-2 h-2 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='px-6 py-4 bg-slate-50/50 border-t border-gray-50'>
                    <p className='text-[10px] text-gray-400'>
                        * Settings are saved automatically. It may take a few minutes for changes to take effect.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Settings;