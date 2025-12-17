import React from 'react'

function Settings() {
    return (
        <div className='h-[500px] grid grid-cols-9 '>

            <div className='col-span-8 bg-white rounded-lg shadow-custom border border-gray-200'>
                <div className='text-start flex justify-start '>
                    <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 pt-4`}>Settings</p>
                </div>
                <div className='mt-6'>
                    <p className='ps-5 font-rubik text-lg text-slate-600 font-bold'>Push Preferences</p>
                </div>
                <div className='my-1'>
                    <hr className='border-gray-200' />
                    <div className='my-6'>
                        <div className='ps-6 my-2'>
                            <input name='notifyFinancial' className='cursor-pointer size-4' type='checkbox'></input>
                            <label htmlFor='notifyFinancial' className='px-2 text-lg text-gray-700'>Notify financial updates</label>

                        </div>
                        <div className='ps-6 my-2'>
                            <input name='notifySurvey' className='cursor-pointer size-4 text-red-400' type='checkbox'></input>
                            <label htmlFor='notifySurvey' className='px-2 text-lg text-gray-700'>Notify survey news</label>

                        </div>
                        <div className='ps-6 my-2'>
                            <input name='notifySuggestions' className='cursor-pointer size-4' type='checkbox'></input>
                            <label htmlFor='notifySuggestions' className='px-2 text-lg text-gray-700'>Notify about new suggestions</label>
                        </div>
                        <div className='ps-6 my-2'>
                            <input name='notifyDayOff' className='cursor-pointer size-4' type='checkbox'></input>
                            <label htmlFor='notifyDayOff' className='px-2 text-lg text-gray-700'>Notify about new day off requests</label>
                        </div>
                    </div>
                </div>
                <div className='mt-6'>
                    <p className='ps-5 font-rubik text-lg text-slate-600 font-bold'>E-mail Preferences</p>
                </div>
                <div className='my-1'>
                    <hr className='border-gray-200' />
                    <div className='my-6'>
                        <div className='ps-6 my-2'>
                            <input name='mailFinancial' className='cursor-pointer size-4' type='checkbox'></input>
                            <label htmlFor='mailFinancial' className='px-2 text-lg text-gray-700'>Email financial updates</label>

                        </div>
                        <div className='ps-6 my-2'>
                            <input name='mailSurvey' className='cursor-pointer size-4 text-red-400' type='checkbox'></input>
                            <label htmlFor='mailSurvey' className='px-2 text-lg text-gray-700'>Email survey news</label>

                        </div>
                        <div className='ps-6 my-2'>
                            <input name='mailSuggesttions' className='cursor-pointer size-4' type='checkbox'></input>
                            <label htmlFor='mailSuggesttions' className='px-2 text-lg text-gray-700'>Email about new suggestions</label>
                        </div>
                        <div className='ps-6 my-2'>
                            <input name='mailDayOff' className='cursor-pointer size-4' type='checkbox'></input>
                            <label htmlFor='mailDayOff' className='px-2 text-lg text-gray-700'>Email about new day off requests</label>
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Settings
