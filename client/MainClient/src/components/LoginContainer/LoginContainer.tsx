import { useMutation } from "@tanstack/react-query";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";


type loginDefaults = {
    email: string,
    password: string,
}


function LoginModal() {



    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { setIsAuth } = useAuthContext();

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
        <div>
            <div>
                <div className="border border-gray-200 shadow-custom my-2 rounded-lg bg-white w-96">
                    <p className="my-10 text-gray-700 text-3xl  text-center">Optiflow Management Suite </p>
                </div>
                <div className='w-96 h-[500px] flex justify-center items-center pe-2 bg-white border border-gray-200 rounded-lg shadow-custom'>
                    <Formik initialValues={{ email: "", password: "" }} onSubmit={(values) => loginMutation.mutate(values)}>
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-9">
                                    <h1 className="text-3xl text-center text-gray-700 text-semibold">Login</h1>
                                </div>
                                <div className="grid grid-cols-1 h-48">
                                    <div className="mb-1">
                                        <Field type="text" name="email" placeholder="E-Mail" className="text-gray-700 border border-gray-200 focus:outline-none p-2 mt-1 w-full bg-transparent focus:bg-transparent" />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <Field type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="text-gray-700 border border-gray-200 focus:outline-none p-2 mt-1 w-full bg-transparent" />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <label className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                                        <Field type="checkbox" checked={showPassword} onChange={(e: any) => setShowPassword(e.target.checked)} className="accent-black" />
                                        Show Password
                                    </label>
                                </div>
                                <div className="grid grid-cols-1 mt-5">
                                    <div className='flex justify-center'>
                                        <button onClick={() => setIsAuth(true)} className='bg-black text-white w-48 h-10' type="submit">Login</button>

                                    </div>
                                </div>


                            </Form>
                        )}
                    </Formik>
                </div>

            </div>

        </div>
    )
}

export default LoginModal
