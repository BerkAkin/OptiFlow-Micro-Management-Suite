import DynamicForm from '../../components/DynamicForm/DynamicForm'
import icon from '../../assets/icon.png'
import { useParams } from 'react-router';
import { useResetPassword } from '../../hooks/AuthHooks/useAuth';



const formInitials = {
    newPassword: "",
    newPasswordAgain: "",
}

const formFields = [
    { label: "New Password", name: "Password", id: "Password", type: "password" as const, placeholder: "New Password.." },
    { label: "New Password Repeat", name: "PasswordAgain", id: "PasswordAgain", type: "password" as const, placeholder: "Repeat New Password..." },
]




function ResetPassword() {
    const { token, email } = useParams();
    const mutation = useResetPassword();


    const handleResetPassword = async (data: any) => {
        if (data.newPassword !== data.newPasswordAgain) {
            alert("Passwords Doesn't Match!");
            return;
        }
        const requestData = {
            Password: data.newPassword,
            PasswordAgain: data.newPasswordAgain,
            resetToken: token,
            email: email,
        };
        console.log(requestData)
        mutation.mutate(requestData);
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div>
                <div className="border border-gray-200 shadow-custom my-2 rounded-lg bg-white w-96">
                    <p className="my-10 text-gray-700 text-4xl text-center">TideFlow Management Suite <img className="inline" width={50} src={icon}></img></p>
                </div>
                <div className='w-96 h-[250px] bg-white border border-gray-200 rounded-lg shadow-custom'>
                    <p className="mt-4 text-gray-700 text-2xl text-center">Password Reset</p>
                    <div className='w-full'>
                        <DynamicForm colorScheme='bg-indigo-500' hoverScheme='hover:bg-indigo-600' fields={formFields} initialValues={formInitials} onSubmit={handleResetPassword} title='' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ResetPassword;
