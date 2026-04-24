import { DynamicForm } from '../../Common';
import { useToatsContext } from '../../../context/ToastContext';
import { useAddEmployee } from '../../../hooks';



export function Add() {
    const { showToast } = useToatsContext();
    const mutation = useAddEmployee();

    const handleSubmit = (data: any) => {
        mutation.mutate(data, {
            onSuccess: () => {
                showToast("Employee Added Succesfully!", "success");
            },
            onError: (e: any) => {
                console.error(e);
                showToast("An Error Has Occured!", "error");
            }
        });
    }


    const initialValues = {
        name: "",
        surname: "",
        email: "",
        birthDate: new Date().toISOString().split("T")[0],
        phoneNum: "",
        street: "",
        street2: "",
        apartmentNum: "",
        doorNumber: "",
        province: "",
        district: "",
        fullAddress: "",
        departmentId: 1
    }

    const fields = [
        { name: "name", label: "First Name", id: "name", type: "text" as const, placeholder: "Tider's First Name", gridSpan: "6" },
        { name: "surname", label: "Last Name", id: "surname", type: "text" as const, placeholder: "Tider's Last Name", gridSpan: "6" },
        { name: "email", label: "E-Mail", id: "email", type: "text" as const, placeholder: "Tider's Mail", gridSpan: "6" },
        { name: "phoneNum", label: "Phone Number", id: "phoneNum", type: "text" as const, placeholder: "Tider's Phone Number", gridSpan: "6" },
        { name: "birthDate", label: "Birth Date", id: "birthDate", type: "date" as const, gridSpan: "6" },
        {
            name: "departmentId", label: "Department", id: "departmentId", type: "text" as const, as: "select" as const, placeholder: "", gridSpan: "6",
            options: [
                { value: 1, label: "Employee" },
                { value: 2, label: "Finance Accountant" },
                { value: 3, label: "HR" },
                { value: 4, label: "Manager" },
            ]
        },
        { name: "street", label: "Street", id: "street", type: "text" as const, placeholder: "Street", gridSpan: "6" },
        { name: "street2", label: "Street 2", id: "street2", type: "text" as const, placeholder: "Street 2", gridSpan: "6" },
        { name: "apartmentNum", label: "Apartment Number", id: "apartmentNum", type: "text" as const, placeholder: "Apartment Number", gridSpan: "6" },
        { name: "doorNumber", label: "Door Number", id: "doorNumber", type: "text" as const, placeholder: "Door Number", gridSpan: "6" },
        { name: "province", label: "Province", id: "province", type: "text" as const, placeholder: "Province", gridSpan: "6" },
        { name: "district", label: "District", id: "district", type: "text" as const, placeholder: "District", gridSpan: "6" },
        { name: "fullAddress", label: "Address Details", id: "fullAddress", type: "text" as const, as: "textarea" as const, placeholder: "Address Details", gridSpan: "6" },
    ]
    return (
        <div className='w-full h-full bg-white rounded-lg border border-gray-200 shadow-custom'>

            <DynamicForm
                colorScheme="bg-blue-500"
                hoverScheme="hover:bg-blue-600"
                initialValues={initialValues}
                title="Launch New Tider"
                onSubmit={handleSubmit}
                fields={fields}
            />
        </div>
    )
}

