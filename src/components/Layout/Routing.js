import {Routes, Route} from "react-router-dom";
import NoPage from "../elements/NoPage";
import Tasks from "../pages/Tasks";
import Users from './../pages/Users';
import UserSettings from './../pages/UserSettings';

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userssettings" element={<UserSettings />} />
        </Routes>
    );
};

export default Routing;
