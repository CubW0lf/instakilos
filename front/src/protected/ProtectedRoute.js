import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import userContext from "../contexts/userContext";

export const ProtectedRoute = () => {
    const { authenticated } = useContext(userContext);

    return authenticated ? <Outlet /> : <Navigate to="/" />;
};
