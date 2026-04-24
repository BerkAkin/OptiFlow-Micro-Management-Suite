import { useParams } from 'react-router'
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import { useGetEmployeeDetails, useUpdateEmployeeDetails } from '../../../hooks/EmployeeHooks/useEmployee';
import DynamicForm from '../../DynamicForm/DynamicForm';

function EditEmployee() {

    const { email } = useParams();
    const { error, isLoading, data } = useGetEmployeeDetails(email!);
    const mutation = useUpdateEmployeeDetails();

    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)

    const handleSubmit = (data: any) => {
        console.log(data);
        mutation.mutate(data)
    }
    const initialValues = {
        department: data.department,
        isActive: data.isActive,
        email: data.email,
    }

    const fields = [
        {
            name: "email", label: "Email", id: "email", type: "text" as const, placeholder: "", disabled: true,
            gridSpan: "4"
        },
        {
            name: "department", label: "Department", id: "department", type: "text" as const, as: "select" as const, placeholder: "Select Department",
            options: [
                { label: "Employee", value: "1" },
                { label: "Finance Accountant", value: "2" },
                { label: "HR", value: "3" },
                { label: "Manager", value: "4" },
            ], gridSpan: "4"
        },
        {
            name: "isActive", label: "Is Active", id: "isActive", type: "text" as const, as: "select" as const,
            options: [
                { label: "Inactive", value: 0 },
                { label: "Active", value: 1 }
            ], gridSpan: "4"
        },

    ]





    return (
        <div className='p-6 container border border-gray-200 shadow-custom h-[100%] w-full bg-white rounded-lg'>
            <DynamicForm colorScheme='bg-blue-600' fields={fields} hoverScheme='hover:bg-blue-700' initialValues={initialValues} onSubmit={handleSubmit} title='Edit Tider Details' isReinit={true} />
        </div>
    )
}

export default EditEmployee
