
import useAuth from "../../api/hooks/useAuth.ts";
import {Navigate, Outlet} from "react-router";

const ProtectedRoute = () => {
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated)
        return <Navigate to="/login" replace />;

    return <Outlet/>;
};

export default ProtectedRoute;
