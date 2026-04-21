import { useResetPasswordRequest } from '../../hooks/AuthHooks/useAuth';
import DynamicForm from '../DynamicForm/DynamicForm'

const fields = [{
    name: "email",
    id: "email",
    placeholder: "Enter your email address...",
    type: "text" as const,
    label: "Email Address"
}]

const initialValues = {
    email: ""
}

interface PasswordRefreshProps {
    handleForget: () => void;
}

function PasswordRefresh({ handleForget }: PasswordRefreshProps) {
    const mutation = useResetPasswordRequest();

    const onSubmit = (data: any) => {
        mutation.mutate(data);
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4'>
            <div className="border border-gray-100 shadow-custom rounded-lg bg-white w-full max-w-md overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Forgot Password?</h1>
                </div>

                <div className='px-8 py-6'>
                    <DynamicForm
                        title=''
                        fields={fields}
                        onSubmit={onSubmit}
                        colorScheme='bg-indigo-500'
                        hoverScheme='hover:bg-indigo-600'
                        initialValues={initialValues}
                    />

                    <div className='px-8'>
                        <p className='text-xs text-center text-gray-400 leading-relaxed'>
                            If an account is associated with the entered email, you will receive a password reset link shortly.
                        </p>
                    </div>

                    <div className='mt-6 flex justify-center border-t border-gray-50 pt-4'>
                        <button
                            type="button"
                            className="hover:cursor-pointer hover:bg-indigo-500 hover:text-white transition border-indigo-500 text-indigo-500 border rounded-sm h-8 px-2"
                            onClick={handleForget}>
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordRefresh