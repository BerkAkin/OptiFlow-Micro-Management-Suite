import { Field, Form, Formik } from 'formik';
import DynamicForm from '../DynamicForm/DynamicForm';

interface EmergencyFormTypes {
    person: string;
    affectedPerson: string;
    incident: string;
    date: string;
}

const initialValues: EmergencyFormTypes = {
    person: "",
    affectedPerson: "",
    incident: "",
    date: new Date().toISOString().split("T")[0],
};

const handleReport = (values: EmergencyFormTypes) => {
    console.log(values);
};

interface Fields {
    label: string,
    name: string,
    id: string,
    type: "text" | "number" | "checkbox" | "date" | "file",
    as?: "textarea" | "select",
    placeholder: string
}
const fields = [
    { name: "person", label: "Person", id: "person", type: "text" as const, as: "select" as const, placeholder: "", options: [{ label: "Berk Akın", value: "berkakin" }] },
    { name: "affectedPerson", label: "Affected Person", id: "affectedPerson", type: "text" as const, as: "select" as const, placeholder: "", options: [{ label: "Berk Akın", value: "berkakin" }] },
    { name: "date", label: "Date", id: "date", type: "date" as const, placeholder: "" },
    { name: "incident", label: "Incident", id: "incident", type: "text" as const, as: "textarea" as const, placeholder: "Describe the incident..." },

]

function EmergencyPopUp() {
    return (
        <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
            <div className="w-96 bg-white rounded-lg shadow-lg border border-gray-200">

                <DynamicForm colorScheme='bg-red-500' hoverScheme='hover:bg-red-600' initialValues={initialValues} fields={fields} onSubmit={handleReport} title='Submit Mobbing' />

            </div>
        </div>
    );
}

export default EmergencyPopUp;
