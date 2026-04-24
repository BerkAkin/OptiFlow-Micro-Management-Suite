import { Outlet } from 'react-router'
import { Login } from '../../components/Auth';
import { Navbar } from '../../components/Common';
import { useAuthContext } from '../../context/AuthContext';

export function MainPage() {

    const { isAuth } = useAuthContext();

    if (!isAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Login />
            </div>
        );
    }
    return (
        <div className="h-screen flex flex-col bg-pale-600">
            <div>
                <Navbar />
            </div>

            <div className="overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}

