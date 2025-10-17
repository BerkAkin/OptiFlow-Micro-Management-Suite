import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";


type loginDefaults = {
    email: string,
    password: string,
}


function LoginModal() {

    const { setIsModal } = useContext(ModalContext);


    const [showPassword, setShowPassword] = useState<boolean>(false);

    const loginMutation = useMutation({
        mutationFn: async (values: loginDefaults) => {
            const res = await fetch("http://localhost:7000/ProjectMicro/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            return res.json();
        },
        onSuccess: (data) => {
            console.log("Giriş Yapıldı: ", data);
            localStorage.setItem("lgkey", data.token);
            window.location.reload();
        },
        onError: (error) => {
            console.error("Login error:", error);
        },
    });



    return (
        <>

            <div className='size-96 h-[500px] flex justify-center items-center pe-2 bg-white border-white/15 border rounded-sm'>
                <Formik initialValues={{ email: "", password: "" }} onSubmit={(values) => loginMutation.mutate(values)}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-9">
                                <h1 className="text-3xl text-center text-gray-700 text-semibold">Login</h1>
                            </div>
                            <div className="grid grid-cols-1 h-48">
                                <div className="mb-1">
                                    <Field type="text" name="email" placeholder="E-Mail" className="text-gray-700 border-b focus:outline-none p-2 mt-1 w-full bg-transparent focus:bg-transparent" />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <Field type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="text-gray-700 border-b focus:outline-none p-2 mt-1 w-full bg-transparent" />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <label className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                                    <Field type="checkbox" checked={showPassword} onChange={(e: any) => setShowPassword(e.target.checked)} className="accent-blue-500" />
                                    Show Password
                                </label>
                            </div>
                            <div className="grid grid-cols-1 mt-8">
                                <div className='flex justify-between'>
                                    <button className='bg-black text-white w-36 h-10' type="submit">Login</button>
                                    <button onClick={() => setIsModal(false)} className='bg-red-800 w-20 mx-2 text-white' >Cancel</button>
                                </div>
                            </div>
                            <label className=" flex justify-center items-center gap-2 mt-6 text-sm text-gray-700">
                                Still haven't bought it? <button>Review Packs</button>
                            </label>

                        </Form>
                    )}
                </Formik>
            </div>

        </>
    )
}

export default LoginModal
