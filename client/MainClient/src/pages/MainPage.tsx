import LoginContainer from '../components/LoginContainer/LoginContainer';
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router'
import { useAuthContext } from '../context/AuthContext';

function MainPage() {

    const { isAuth } = useAuthContext();

    if (!isAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoginContainer />
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

export default MainPage;
