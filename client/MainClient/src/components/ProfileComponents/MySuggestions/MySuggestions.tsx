import DynamicTable from '../../DynamicTable/DynamicTable'


function MySuggestions() {


    const tempData: any = [
        { "header": "Deneme Header", "description": "Denemeler", "votes": "10", "status": "approved", "date": "2025-02-12" },
    ]

    return (
        <div className='border w-full h-[500px] bg-white rounded-lg shadow-custom border'>
            <DynamicTable textScheme='text-indigo-400' colorScheme='bg-indigo-400' data={tempData} title='My Suggestions' />
        </div>
    )
}

export default MySuggestions
