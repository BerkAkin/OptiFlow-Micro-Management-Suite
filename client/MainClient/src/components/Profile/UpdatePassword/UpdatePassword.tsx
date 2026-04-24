import { DynamicForm } from '../../Common';
import { useChangePassword } from '../../../hooks';



const fields = [
    { name: "currentPassword", id: "currentPassword", placeholder: "Enter your current password...", type: "password" as const, label: "Current Password" },
    { name: "newPassword", id: "newPassword", placeholder: "Enter your new password...", type: "password" as const, label: "New Password" },
    { name: "newPasswordAgain", id: "newPasswordAgain", placeholder: "Enter your new password again...", type: "password" as const, label: "New Password Again" },
]

const initialValues = {
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: ""
}

interface PasswordChangeProps {
    handleChange: () => void;
}


export function UpdatePassword({ handleChange }: PasswordChangeProps) {

    const { mutate: changePassword, isPending: isPendingPassword } = useChangePassword();
    const onSubmit = (data: any) => {
        changePassword(data);
    }

    return (
        <div className='fixed inset-0 z-100 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4'>
            <div className="border border-gray-100 shadow-custom rounded-lg bg-white w-full max-w-md overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Change Password</h1>
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
                    <div className='mt-6 flex justify-center border-t border-gray-50 pt-4'>
                        <button
                            onClick={handleChange}
                            type="button"
                            className="hover:cursor-pointer hover:bg-indigo-500 hover:text-white transition border-indigo-500 text-indigo-500 border rounded-sm h-8 px-2"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

