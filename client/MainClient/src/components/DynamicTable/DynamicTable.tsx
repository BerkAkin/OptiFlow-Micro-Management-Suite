
interface TableProps {
    title: string,
    colorScheme: string,
    textScheme: string,
    data: Record<string, any>[],
}



function DynamicTable({ title, colorScheme, textScheme, data }: TableProps) {

    const columns = Object.keys(data[0]);
    const gridTemplate = columns.map(col => (col === 'description' ? '4fr' : '1fr')).join(' ')

    return (
        <div className='h-full '>

            <div className='h-[10%] w-full text-center flex justify-center items-start'>
                <p className={`text-2xl text-center text-white ${colorScheme} rounded-b-sm font-rubik px-6 `}>{title}</p>
            </div>

            <div className={`h-[8%] p-2 ${textScheme} font-bold border-b text-md grid `} style={{ gridTemplateColumns: gridTemplate }} >
                {columns.map((item) => (
                    <div className={`${item === "description" ? "text-start ps-2" : "text-center"}`}>
                        {item.toUpperCase()}
                    </div>
                ))}


            </div>
            <div className="h-[70%] overflow-y-auto border-b ">
                {data.map((row, index) => (
                    <div key={index} className={`text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid`} style={{ gridTemplateColumns: gridTemplate }} >
                        {columns.map((col) => (
                            <div key={col} className={`${col === "description" ? "text-start ps-2" : "text-center"}`}>
                                {row[col] as any}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className='h-[10%] flex items-center'>

                {/*    <Formik onSubmit={filterFunction} initialValues={filterValues}>
                    <Form>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-3'>
                                <Field className="text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent" placeholder="Month" name="month" ></Field>
                            </div>
                            <div className='col-span-3'>
                                <Field className="text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent" placeholder="Year" name="year" ></Field>
                            </div>
                            <div className='col-span-3'>
                                <select name='category' id='category' className='text-gray-700 focus:outline-none w-full px-3 h-full bg-transparent focus:bg-transparent'>
                                    <option className='border-none' selected>Select Filter</option>
                                    <option className='border-none' value={"expenses"}>Expenses</option>
                                    <option className='border-none' value={"incomes"}>Incomes</option>
                                </select>
                            </div>
                            <div className='col-span-2 flex justify-start'>
                                <button className='rounded-sm bg-gray-400 hover:bg-gray-500 text-3xl w-[50px] text-white w-full mx-2'>{"⌕"}</button>
                            </div>
                            <div className='flex col-span-1 items-center'>
                                <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] ms-2'>{"🡸"}</button>
                                <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] mx-2'>{"🡺"}</button>
                            </div>
                        </div>
                    </Form>
                </Formik> */}



            </div>

        </div>
    )
}

export default DynamicTable
