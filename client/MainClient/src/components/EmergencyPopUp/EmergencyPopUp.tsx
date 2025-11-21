import { Field, Form, Formik } from 'formik';
import React from 'react';

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

function EmergencyPopUp() {
    return (
        <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
            <div className="w-96 bg-white rounded-lg shadow-lg border">

                <div className="w-full py-2 bg-red-500 rounded-t-lg text-center">
                    <p className="text-2xl text-white font-rubik">Emergency</p>
                </div>

                <Formik initialValues={initialValues} onSubmit={handleReport}>
                    {({ isSubmitting }) => (
                        <Form className="p-4 space-y-4">

                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700" htmlFor="person">Person</label>
                                <Field
                                    as="select"
                                    name="person"
                                    id="person"
                                    className="border rounded px-2 py-1 focus:outline-none"
                                >
                                    <option value="">Select Person</option>
                                    <option value="BerkAkin">Berk AKIN</option>
                                </Field>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700" htmlFor="affectedPerson">Affected Person</label>
                                <Field
                                    as="select"
                                    name="affectedPerson"
                                    id="affectedPerson"
                                    className="border rounded px-2 py-1 focus:outline-none"
                                >
                                    <option value="">Select Person</option>
                                    <option value="BerkAkin">Berk AKIN</option>
                                </Field>
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700" htmlFor="date">Date</label>
                                <Field
                                    type="date"
                                    name="date"
                                    id="date"
                                    className="border rounded px-2 py-1 focus:outline-none"
                                />
                            </div>

                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-700" htmlFor="incident">Incident</label>
                                <Field
                                    as="textarea"
                                    rows={3}
                                    name="incident"
                                    id="incident"
                                    placeholder="Describe the incident..."
                                    className="border rounded px-2 py-1 resize-none focus:outline-none"
                                />
                            </div>

                            <div className="flex justify-center pt-2">
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white px-6 py-2 rounded-sm hover:bg-red-600 transition" >
                                    Report
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default EmergencyPopUp;
