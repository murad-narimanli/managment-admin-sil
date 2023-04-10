import {Routes, Route} from "react-router-dom";
import NoPage from "../elements/NoPage";
import Tasks from "../pages/Tasks";
import Users from './../pages/Users';
import UserSettings from './../pages/UserSettings';

const Routing = () => {
    return (
        <Routes>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userssettings" element={<UserSettings />} />
            {/* <Route path="/results/:id" element={<Detail />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
    );
};

export default Routing;
