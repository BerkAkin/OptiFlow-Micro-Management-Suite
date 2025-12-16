import { Field, Form, Formik } from "formik";
import left from '../../assets/left.svg'
import right from '../../assets/right.svg'
import magnify from '../../assets/magnify.svg'

interface filterFields {
    name: string,
    type: 'text' | 'select' | 'date',
    placeholder?: string,
    options?: { label: string, value: string | number }[]
}

interface TableProps {
    title: string,
    colorScheme: string,
    textScheme: string,
    data: Record<string, any>[],
    filterFields?: filterFields[],
    handleFilter?: (values: any) => void,
    children?: React.ReactNode,
    onNext?: () => void
    onPrev?: () => void
}





function DynamicTable({ title, colorScheme, textScheme, data, children, handleFilter, filterFields, onNext, onPrev }: TableProps) {


    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const gridTemplate = columns.map(col => (col === 'description' ? '4fr' : '1fr')).join(' ')
    const filterInitials = filterFields ? Object.fromEntries(filterFields.map((item) => [item.name, ""])) : {}
    console.log(data);

    return (
        <div className='h-full'>
            <div className='h-[10%] text-start flex justify-start '>
                <p className={`text-xl font-semibold text-slate-800 font-rubik ps-4 py-4`}>{title}</p>
            </div>

            <div className={`h-[8%]  p-2 text-slate-600 tracking-wide font-semibold border-b border-gray-200 text-md grid `} style={{ gridTemplateColumns: gridTemplate }} >
                {columns.map((item, index) => (
                    <div key={index} className={`${item === "description" ? "text-start ps-2" : "text-center ps-3  "} text-sm uppercase `}>
                        {item === "exchangeType" ? "Exchange" : item}
                    </div>
                ))}


            </div>
            <div className="h-[72%] overflow-y-auto border-b border-gray-200">
                {data?.map((row, index) => (
                    <div key={index} className={`text-slate-500 font-normal p-2 bg-gray-50 hover:bg-slate-100 text-md grid`} style={{ gridTemplateColumns: gridTemplate }} >
                        {columns.map((col) => (
                            <div key={col} className={`${col === "description" ? "text-start ps-2" : "text-center ps-3 "} text-sm`}>

                                {col === "date" && row[col] ? row[col].split("T")[0] : row[col]}

                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='h-[10%] flex items-center'>
                {handleFilter && filterFields && (

                    <Formik onSubmit={handleFilter} initialValues={filterInitials}>
                        <Form>
                            <div className='grid grid-cols-12 pe-10 ps-2 flex items-center'>
                                <div className=" col-span-10 grid grid-cols-12">
                                    {filterFields.map((item, index) => (
                                        <div key={index} className='col-span-4'>

                                            {item.type === 'select' ? (
                                                <Field className="rounded-sm cursor-pointer px-6 py-1 w-[90%] border border-gray-200 text-gray-600 focus:outline-none" as={item.type} type={item.type} name={item.name} id={item.name} placeholder={item.placeholder} >
                                                    <option value="">Select</option>
                                                    {item.options?.map((opt, index) => (
                                                        <option key={index} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </Field>

                                            ) : (
                                                <Field className="rounded-sm cursor-pointer w-[90%] px-6 py-1 border border-gray-200 text-gray-600 focus:outline-none" type={item.type} name={item.name} id={item.name} placeholder={item.placeholder} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className=' col-span-1 flex justify-start items-center'>
                                    <button type="submit" className='cursor-pointer'>
                                        <img src={magnify} alt="" width={25} />

                                    </button>
                                </div>
                                <div className=' flex col-span-1 min-w-[80px] items-center'>
                                    <button type="button" onClick={onPrev} className="cursor-pointer w-full h-full p-2">
                                        <img src={left} alt="" width={35} />
                                    </button>
                                    <button type="button" onClick={onNext} className="cursor-pointer w-full h-full p-2">
                                        <img src={right} alt="" width={35} />
                                    </button>
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
