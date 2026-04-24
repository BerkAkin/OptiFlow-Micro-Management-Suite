import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../../context/AuthContext";

export const RoleBasedRoute = ({ allowedDepartments }: any) => {
    const { userInfo } = useAuthContext();
    if (!allowedDepartments.includes(userInfo.department)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

