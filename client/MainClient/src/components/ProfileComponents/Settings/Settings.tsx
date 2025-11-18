import React from 'react'

function Settings() {
    return (
        <div className='h-[500px] grid grid-cols-9 '>

            <div className='col-span-8 bg-white rounded-lg shadow-lg border'>
                <div className='h-[10%] w-full text-center flex justify-center items-start'>
                    <p className={`text-2xl text-center px-2 text-white bg-orange-400 rounded-b-sm font-roobert`}>Settings</p>
                </div>
                <div className='mt-5'>
                    <p className='ps-5 font-roobert text-lg text-orange-400 font-bold'>Push Preferences</p>
                </div>
                <div className='my-1'>
                    <hr className='' />
                    <div className='my-5'>
                        <div className='ps-5 my-2'>
                            <input name='notifyFinancial' className='size-4' type='checkbox'></input>
                            <label htmlFor='notifyFinancial' className='px-2 text-lg text-gray-700'>Notify financial updates</label>

                        </div>
                        <div className='ps-5 my-2'>
                            <input name='notifySurvey' className='size-4 text-red-400' type='checkbox'></input>
                            <label htmlFor='notifySurvey' className='px-2 text-lg text-gray-700'>Notify survey news</label>

                        </div>
                        <div className='ps-5 my-2'>
                            <input name='notifySuggestions' className='size-4' type='checkbox'></input>
                            <label htmlFor='notifySuggestions' className='px-2 text-lg text-gray-700'>Notify about new suggestions</label>
                        </div>
                        <div className='ps-5 my-2'>
                            <input name='notifyDayOff' className='size-4' type='checkbox'></input>
                            <label htmlFor='notifyDayOff' className='px-2 text-lg text-gray-700'>Notify about new day off requests</label>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <p className='ps-5 font-roobert text-lg text-orange-400 font-bold'>E-mail Preferences</p>
                </div>
                <div className='my-1'>
                    <hr className='' />
                    <div className='my-5'>
                        <div className='ps-5 my-2'>
                            <input name='mailFinancial' className='size-4' type='checkbox'></input>
                            <label htmlFor='mailFinancial' className='px-2 text-lg text-gray-700'>Email financial updates</label>

                        </div>
                        <div className='ps-5 my-2'>
                            <input name='mailSurvey' className='size-4 text-red-400' type='checkbox'></input>
                            <label htmlFor='mailSurvey' className='px-2 text-lg text-gray-700'>Email survey news</label>

                        </div>
                        <div className='ps-5 my-2'>
                            <input name='mailSuggesttions' className='size-4' type='checkbox'></input>
                            <label htmlFor='mailSuggesttions' className='px-2 text-lg text-gray-700'>Email about new suggestions</label>
                        </div>
                        <div className='ps-5 my-2'>
                            <input name='mailDayOff' className='size-4' type='checkbox'></input>
                            <label htmlFor='mailDayOff' className='px-2 text-lg text-gray-700'>Email about new day off requests</label>
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Settings
