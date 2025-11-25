import Navbar from '../components/Navbar/Navbar'
import LoginModal from '../components/LoginContainer/LoginContainer'
import { useAuthContext } from '../context/AuthContext'
import { Outlet } from 'react-router'
import { useState, useEffect } from 'react';
import EmergencyPopUp from '../components/EmergencyPopUp/EmergencyPopUp';

function MainPage() {

    const { isAuth } = useAuthContext();

    const [isSecretMenuOpen, setIsSecretMenuOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "h") {
                event.preventDefault();
                setIsSecretMenuOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => { window.removeEventListener("keydown", handleKeyDown); };
    }, []);

    if (!isAuth) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoginModal />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col ">
            <div className="z-40">
                <Navbar />
            </div>

            {isSecretMenuOpen && (
                <EmergencyPopUp />
            )}

            <div className="overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}

export default MainPage;
