import React from 'react'
import DynamicTable from '../../DynamicTable/DynamicTable'

function MoodTable() {


    const tempData: any = [
        { "mood": "Happy", "tags": "Work, Friends, Food, Weather", "date": "25.12.2025", },
    ]


    return (
        <div className=' w-full h-full '>
            <DynamicTable textScheme='text-rose-400' colorScheme='bg-rose-400' data={tempData} title='Previous Moods' />
        </div>
    )
}

export default MoodTable
