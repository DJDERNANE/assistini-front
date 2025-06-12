import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMe } from "../hooks/useAuthService";

const ProtectedRoute = ({ children }) => {
    const path = window.location.pathname;
    const paths = path.split("/");
    const endPath = paths[paths.length - 1];
    const startPath = paths[1];

    const navigate = useNavigate();

    const { mePrestateur, mePatient } = useMe(() =>
        navigate(endPath === "cabinet" ? "/cabinet" : "/")
    );

    console.log("####", startPath, paths, path);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (startPath === "prestateur") mePrestateur();
        else mePatient();
        // mePatient();
        if (isAuthenticated === true && endPath === "") {
            navigate("/prestateur/rdvs");
        }
    }, [endPath]);

    return children;
};

export default ProtectedRoute;
