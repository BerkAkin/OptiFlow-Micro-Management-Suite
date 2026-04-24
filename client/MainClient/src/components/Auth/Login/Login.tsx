import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import icon from '../../../assets/images/icon.png'
import { useAuthContext } from "../../../context/AuthContext";
import { useLogin } from "../../../hooks";
import { PasswordRefresh } from "../PasswordRefresh/PasswordRefresh";

export function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isForget, setIsForget] = useState<boolean>(false);
    const { handleLoginState } = useAuthContext();
    const loginMutation = useLogin();

    const handleForget = () => {
        setIsForget(prev => (!prev));
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="border border-gray-200 shadow-custom mb-6 rounded-lg bg-white w-full max-w-md overflow-hidden">
                <div className="px-8 py-10 flex items-center justify-center gap-3">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-center">
                        TideFlow Management Suite
                    </h1>
                    <img className="inline-block" width={40} src={icon} alt="icon" />
                </div>
            </div>

            <div className="border border-gray-200 shadow-custom rounded-lg bg-white w-full max-w-md overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Login</h1>
                </div>

                <div className="px-8 py-8">
                    <Formik initialValues={{ email: "", password: "" }} onSubmit={(values) => {
                        loginMutation.mutate(values, {
                            onSuccess: (token: any) => {
                                handleLoginState(token);
                            },
                        });
                    }}
                    >
                        {() => (
                            <Form className="space-y-5">
                                <div>
                                    <Field
                                        type="text"
                                        name="email"
                                        placeholder="E-Mail"
                                        className="w-full px-4 py-2 text-gray-700 border border-gray-200 rounded-sm focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 px-1" />
                                </div>

                                <div>
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-2 text-gray-700 border border-gray-200 rounded-sm focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 px-1" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <Field
                                            type="checkbox"
                                            checked={showPassword}
                                            onChange={(e: any) => setShowPassword(e.target.checked)}
                                            className="accent-blue-600 h-4 w-4"
                                        />
                                        <span>Show Password</span>
                                    </label>

                                    <button
                                        type="button"
                                        className="hover:cursor-pointer hover:bg-blue-500 hover:text-white transition border-blue-500 text-blue-500 border rounded-sm h-8 px-2"
                                        onClick={handleForget}>
                                        Forgot Password?
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex justify-center">
                                    <button
                                        disabled={loginMutation.isPending}
                                        className="cursor-pointer w-full max-w-xs h-11 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-sm transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                                        type="submit"
                                    >
                                        {loginMutation.isPending ? 'Logging in...' : 'Login'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            {isForget && <PasswordRefresh handleForget={handleForget} />}
        </div>
    )
}

