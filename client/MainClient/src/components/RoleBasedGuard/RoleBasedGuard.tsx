import { useAuthContext } from '../../context/AuthContext'

interface RoleBasedGuardTypes {
    children: any,
    allowedDepartments: string[],
}

function RoleBasedGuard({ children, allowedDepartments }: RoleBasedGuardTypes) {
    const { userInfo } = useAuthContext();

    const hasPermission = allowedDepartments.includes(userInfo?.department);

    if (!hasPermission) {
        return null;
    }

    return <> {children} </>

}

export default RoleBasedGuard;
