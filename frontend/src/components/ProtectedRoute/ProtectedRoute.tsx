
import useAuth from "../../api/hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router";

type Props={
    requiredRole?:string
}

const ProtectedRoute = ({requiredRole}:Props) => {
    const {isAuthenticated,role,loading} = useAuth();
    if(loading){
        return <div>Loading...</div>;
    }

    if (!isAuthenticated)
        return <Navigate to="/login" replace />;

    if(requiredRole && role!==requiredRole)
        return <Navigate to="/" replace />;

    return <Outlet/>;
};

export default ProtectedRoute;
