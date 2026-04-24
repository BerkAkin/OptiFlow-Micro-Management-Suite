import { Add, List } from '../../components/Employee'

export function AddNewEmployeePage() {
    return (
        <div className='py-8 px-4 container mx-auto mb-8'>
            <div className='flex justify-between mb-6 mx-2 border-b border-gray-200 pb-2'>
                <div>
                    <h6 className='text-2xl font-bold text-slate-800 tracking-tight font-rubik'>
                        Tider
                        <span className='text-blue-500'> Launch</span>
                        <span className='text-slate-400 text-sm ms-3 font-normal'>Set the sails for new members and start their journey</span>
                    </h6>
                </div>
            </div>
            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-9 h-[750px]'>
                    <List />
                </div>
                <div className='col-span-3'>
                    <Add />
                </div>
            </div>

        </div>
    )
}

