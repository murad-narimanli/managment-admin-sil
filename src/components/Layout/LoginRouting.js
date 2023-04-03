import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "../pages/Login";
import NoPage from "../elements/NoPage";
import { useEffect } from 'react';

const LoginRouting = ({isLoggedIn}) => {

    let navigate = useNavigate()

    useEffect(()=> {
        if(!isLoggedIn) {
            navigate('/')
        }
    },[isLoggedIn])
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/results/:id" element={<Detail />} /> */}
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default LoginRouting;
