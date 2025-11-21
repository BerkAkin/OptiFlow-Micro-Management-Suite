import DynamicTable from '../../DynamicTable/DynamicTable';


interface filterValues {
    month: string,
    year: string
}



function ActivityTable() {




    const tempData: any = [
        { "type": "+", "name": "Happy", "description": "Denemeler", "By": "Work", "Date": "2025-02-12", "Exchange": "$", "quantity": "3", "price": "5000", "invoice": "" },
        { "type": "+", "name": "Happy", "description": "Denemeler", "By": "Work", "Date": "2025-02-12", "Exchange": "$", "quantity": "3", "price": "5000", "invoice": "" },
        { "type": "+", "name": "Happy", "description": "Denemeler", "By": "Work", "Date": "2025-02-12", "Exchange": "$", "quantity": "3", "price": "5000", "invoice": "" },
        { "type": "+", "name": "Happy", "description": "Denemeler", "By": "Work", "Date": "2025-02-12", "Exchange": "$", "quantity": "3", "price": "5000", "invoice": "" },
        { "type": "+", "name": "Happy", "description": "Denemeler", "By": "Work", "Date": "2025-02-12", "Exchange": "$", "quantity": "3", "price": "5000", "invoice": "" },
        { "type": "+", "name": "Happy", "description": "Denemeler", "By": "Work", "Date": "2025-02-12", "Exchange": "$", "quantity": "3", "price": "5000", "invoice": "" },
    ]


    return (

        <div className='h-full'>
            <DynamicTable textScheme='text-sky-400' colorScheme='bg-sky-400' data={tempData} title='Latest Activity' />
        </div>
    )
}

export default ActivityTable
