import { useState } from 'react'
import DynamicForm from '../../DynamicForm/DynamicForm'
import { useRateOthers } from '../../../hooks/SupportHooks/UseSupport'


interface FormValueTypes {
    employee: string,
    comment: string,
}
const initialValues: FormValueTypes = {
    employee: "",
    comment: "",
}


function RateEmployees() {

    const mutation = useRateOthers();

    const handleSubmit = (values: FormValueTypes) => {
        mutation.mutate(values);
    }

    const fields = [
        { name: "employee", id: "employee", type: "text" as const, as: "select" as const, label: "Employee", options: [{ label: "Berk Akın", value: "berkAkin" }, { label: "Murat Eke", value: "muratEke" }] },
        { name: "comment", id: "comment", type: "text" as const, as: "textarea" as const, label: "Comment", placeholder: "Comment..." }
    ]

    return (
        <div className='bg-white border border-gray-200 rounded-lg h-[300px]'>
            <DynamicForm onSubmit={handleSubmit} fields={fields} colorScheme='bg-lime-600' hoverScheme='hover:bg-lime-700' title='Rate Employees' initialValues={initialValues} />
        </div>
    )
}

export default RateEmployees
