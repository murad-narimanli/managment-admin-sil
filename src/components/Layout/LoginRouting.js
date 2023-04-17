import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import NoPage from "../elements/NoPage";
import Registration from "../pages/Registration";

const LoginRouting = ({ isLoggedIn }) => {
    return (
        <Routes>
            <Route exact path="/" element={<Login isLoggedIn={isLoggedIn} />} />
            <Route path="/register" element={<Registration />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default LoginRouting;
