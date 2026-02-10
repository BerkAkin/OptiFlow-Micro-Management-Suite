import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import icon from '../../assets/icon.png'
import { useLogin } from "../../hooks/AuthHooks/useAuth";



function LoginModal() {

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { setIsAuth } = useAuthContext();
    const loginMutation = useLogin();


    return (
        <div>

            <div className="border border-gray-200 shadow-custom my-2 rounded-lg bg-white w-96">
                <p className="my-10 text-gray-700 text-4xl text-center">Optiflow Management Suite <img className="inline" width={50} src={icon}></img></p>
            </div>
            <div className='w-96 h-[500px] flex justify-center items-center pe-2 bg-white border border-gray-200 rounded-lg shadow-custom'>
                <Formik initialValues={{ email: "", password: "" }} onSubmit={(values) => {
                    loginMutation.mutate(values, {
                        onSuccess: () => {
                            setIsAuth(true);
                        },
                    });
                }}>
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
                                    <button disabled={loginMutation.isPending} className='hover:cursor-pointer bg-black text-white w-48 h-10' type="submit">Login</button>

                                </div>
                            </div>


                        </Form>
                    )}
                </Formik>
            </div>



        </div >
    )
}

export default LoginModal
