import { Field, Form, Formik } from "formik";

interface filterFields {
    name: string,
    type: 'text' | 'select' | 'date',
    placeholder?: string,
    options?: { label: string, value: string }[]
}

interface TableProps {
    title: string,
    colorScheme: string,
    textScheme: string,
    data: Record<string, any>[],
    filterFields?: filterFields[],
    handleFilter?: (values: any) => void,
    children?: React.ReactNode
}





function DynamicTable({ title, colorScheme, textScheme, data, children, handleFilter, filterFields }: TableProps) {

    const columns = Object.keys(data[0]);
    const gridTemplate = columns.map(col => (col === 'description' ? '4fr' : '1fr')).join(' ')
    const filterInitials = filterFields ? Object.fromEntries(filterFields.map((item) => [item.name, ""])) : {}


    return (
        <div className='h-full'>
            <div className='h-[10%] w-full text-center flex justify-center items-start'>
                <p className={`text-2xl text-center text-white ${colorScheme} rounded-b-sm font-rubik px-6 `}>{title}</p>
            </div>

            <div className={`h-[10%] p-2 ${textScheme} font-bold border-b text-md grid `} style={{ gridTemplateColumns: gridTemplate }} >
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
                {handleFilter && filterFields && (

                    <Formik onSubmit={handleFilter} initialValues={filterInitials}>
                        <Form>
                            <div className='grid grid-cols-12 px-6'>
                                <div className="col-span-10 grid grid-cols-12">
                                    {filterFields.map((item) => (
                                        <div className='col-span-4'>

                                            {item.type === 'select' ? (
                                                <Field className="px-6 py-1.5 w-[90%] border text-gray-600" as={item.type} type={item.type} name={item.name} id={item.name} placeholder={item.placeholder} >
                                                    <option value="">Select</option>
                                                    {item.options?.map(opt => (
                                                        <option value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </Field>

                                            ) : (
                                                <Field className="w-[90%] px-6 py-1 border text-gray-600 focus:outline-none" type={item.type} name={item.name} id={item.name} placeholder={item.placeholder} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className='col-span-1 flex justify-start items-center'>
                                    <button type="submit" className='rounded-sm bg-gray-400 hover:bg-gray-500 text-3xl w-[50px] text-white w-full mx-2'>{"⌕"}</button>
                                </div>
                                <div className='flex col-span-1 items-center'>
                                    <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] ms-2'>{"🡸"}</button>
                                    <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] mx-2'>{"🡺"}</button>
                                </div>

                            </div>
                        </Form>
                    </Formik>


                )}

            </div>

        </div>
    )
}

export default DynamicTable
