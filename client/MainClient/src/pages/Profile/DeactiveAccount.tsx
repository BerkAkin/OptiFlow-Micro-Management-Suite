import { DynamicForm } from "../../components/Common";
import { useDeactivateAccount } from "../../hooks";

interface DeactiveAccountProps {
    handleDeactivate: () => void;
}

const formInitials = {
    password: "",
    email: "",
}


const formFields = [
    { label: "Email", name: "email", id: "email", type: "text" as const, placeholder: "Email" },
    { label: "Password", name: "password", id: "password", type: "password" as const, placeholder: "Password" },
]

function DeactiveAccount({ handleDeactivate }: DeactiveAccountProps) {

    const mutation = useDeactivateAccount();

    const handleDeactivateAccount = async (data: any) => {
        mutation.mutate(data);
    }

    return (
        <div className='fixed inset-0 z-100 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4'>
            <div className="border border-gray-100 shadow-custom rounded-lg bg-white w-full max-w-md overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Deactivate My Account</h1>
                </div>

                <div className='px-8 py-6'>
                    <DynamicForm
                        title=''
                        fields={formFields}
                        onSubmit={handleDeactivateAccount}
                        colorScheme='bg-blue-500'
                        hoverScheme='hover:bg-blue-600'
                        initialValues={formInitials}
                    />
                    <div className='mt-6 flex justify-center border-t border-gray-50 pt-4'>
                        <button
                            onClick={handleDeactivate}
                            type="button"
                            className="hover:cursor-pointer hover:bg-blue-500 hover:text-white transition border-blue-500 text-blue-500 border rounded-sm h-8 px-2"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeactiveAccount
