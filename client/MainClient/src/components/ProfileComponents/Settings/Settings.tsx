import React from 'react'
import { useChangeEmailPreference, useEmailPreference } from '../../../hooks/ProfileHooks/UseProfile';

function Settings() {
    const { data: isEnabled, isLoading } = useEmailPreference();
    const mutation = useChangeEmailPreference();

    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-12 bg-white rounded-lg shadow-custom border border-gray-200 p-4'>
                <div>
                    <div className='flex items-center'>
                        <input
                            id="mailFinancial"
                            type="checkbox"
                            className='w-4 h-4 cursor-pointer disabled:opacity-50'
                            checked={!!isEnabled}
                            onChange={() => mutation.mutate()}
                            disabled={isLoading || mutation.isPending}
                        />
                        <label
                            htmlFor='mailFinancial'
                            className='px-2 text-sm text-gray-700 cursor-pointer select-none'
                        >
                            {mutation.isPending ? 'Updating Status...' : 'Email Notifications'}
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings