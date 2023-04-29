import {Routes, Route} from "react-router-dom";
import Tasks from "../pages/Tasks/index"
import Users from './../pages/Users';
import UserSettings from './../pages/UserSettings';
import NoPage from "../elements/NoPage";

const Routing = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Tasks />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/usersettings" element={<UserSettings />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default Routing;