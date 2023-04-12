import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import NoPage from "../elements/NoPage";
import { useEffect } from "react";
import Registration from "../pages/Registration";

const LoginRouting = ({ isLoggedIn }) => {
    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
        } else navigate("/tasks");
    }, [isLoggedIn]);
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default LoginRouting;
