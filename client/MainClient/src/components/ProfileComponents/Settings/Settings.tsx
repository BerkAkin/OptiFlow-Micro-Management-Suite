import React from 'react'

function Settings() {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-12 bg-white rounded-lg shadow-custom border border-gray-200'>
                <div className='my-1'>
                    <div className='my-3'>
                        <div className='ps-3 my-2'>
                            <input name='mailFinancial' className='cursor-pointer size-4' type='checkbox'></input>
                            <label htmlFor='mailFinancial' className='px-2 text-md text-gray-700'>Notify me about updates</label>
                            {/* onchange ile güncelleme yapılacak burada toggle a çevrilip */}
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Settings
