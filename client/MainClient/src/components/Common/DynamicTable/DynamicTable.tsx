import { Field, Form, Formik } from "formik";
import { right, left, magnify } from '../../../assets/icons';
import icon from '../../../assets/images/icon.png';
import { Link, useLocation } from "react-router";

interface filterFields {
    name: string,
    type: 'text' | 'select' | 'date',
    placeholder?: string,
    options?: { label: string, value: string | number }[]
}

interface TableProps {
    title: string,
    data: Record<string, any>[],
    filterFields?: filterFields[],
    children?: React.ReactNode,
    handleFilter?: (values: any) => void,
    onNext?: () => void
    onPrev?: () => void,
    onRefresh?: () => void,
    isRefreshing?: any,
    isEditable?: boolean,
    EditorParam?: string,
}

export function DynamicTable({ title, data, handleFilter, filterFields, onNext, onPrev, onRefresh, isRefreshing, isEditable, EditorParam }: TableProps) {
    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const gridTemplate = columns.map(col => (col === 'description' ? '3fr' : '1fr')).join(' ')
    const filterInitials = filterFields ? Object.fromEntries(filterFields.map((item) => [item.name, ""])) : {}

    const location = useLocation();
    const currentPath = `/${location.pathname.split('/')[1]}`;

    return (
        <div className="flex flex-col h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-custom">
            <div className="h-[12%] flex justify-between items-center px-5 border-b border-gray-100 bg-white">
                <p className="text-lg font-bold text-slate-800 tracking-tight font-rubik">{title}</p>
                <button onClick={onRefresh} type="button" className="p-2 hover:bg-gray-50 rounded-full transition-all">
                    <img src={icon} className={`w-6 h-6 cursor-pointer ${isRefreshing ? 'animate-spin' : ''}`} alt="refresh" />
                </button>
            </div>

            <div className="h-[10%] grid items-center bg-slate-50 border-b border-gray-200 px-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest" style={{ gridTemplateColumns: gridTemplate }}>
                {columns.map((item, index) => (
                    <div key={index} className={item === "description" ? "text-start" : "text-center"}>
                        {item}
                    </div>
                ))}
            </div>

            <div className="h-[63%] overflow-y-auto">
                {data.map((row, index) => {

                    const rowContent =
                        (<div key={index} className="grid items-center px-4 py-3 border-b border-gray-50 hover:bg-gray-100 transition-colors text-slate-600 text-sm" style={{ gridTemplateColumns: gridTemplate }}>
                            {columns.map((col) => (
                                <div key={col} className={col === "description" ? "text-start" : "text-center break-all px-1"}>
                                    {row[col]}
                                </div>
                            ))}
                        </div>);

                    return isEditable ?
                        (<Link key={index} to={`${currentPath}/${row[EditorParam ? EditorParam : ""]}/edit`}>{rowContent}</Link>)
                        : (<div key={index} style={{ display: 'contents' }}>{rowContent}</div>);
                })}
            </div>

            <div className="h-[15%] border-t border-gray-200 bg-gray-50 px-4 flex items-center">
                {handleFilter && filterFields && (
                    <Formik onSubmit={handleFilter} initialValues={filterInitials}>
                        <Form className="w-full grid grid-cols-12 gap-3 items-center">
                            <div className="col-span-9 grid grid-cols-3 gap-2">
                                {filterFields.map((item, index) => (
                                    <div key={index}>
                                        {item.type === 'select' ? (
                                            <Field
                                                as="select"
                                                name={item.name}
                                                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-xs outline-none"
                                            >
                                                <option value="">{item.placeholder || 'Seç'}</option>
                                                {item.options?.map((opt, i) => (
                                                    <option key={i} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </Field>
                                        ) : (
                                            <Field
                                                type={item.type}
                                                name={item.name}
                                                placeholder={item.placeholder}
                                                className="w-full bg-white border border-gray-300 rounded-md py-1.5 px-3 text-xs outline-none"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="col-span-3 flex justify-end items-center gap-2">
                                <button type="submit" className="cursor-pointer p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                    <img src={magnify} width={20} alt="search" />
                                </button>
                                <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>
                                <button type="button" onClick={onPrev} className="cursor-pointer hover:scale-110 transition-transform">
                                    <img src={left} width={28} alt="prev" />
                                </button>
                                <button type="button" onClick={onNext} className="cursor-pointer hover:scale-110 transition-transform">
                                    <img src={right} width={28} alt="next" />
                                </button>
                            </div>
                        </Form>
                    </Formik>
                )}
            </div>
        </div >
    )
}

