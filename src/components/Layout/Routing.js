import {Routes, Route} from "react-router-dom";
import Home from "../pages/Admin/Home";
import NoPage from "../elements/NoPage";

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/results/:id" element={<Detail />} /> */}
            <Route path="*" element={<NoPage />} />
        </Routes>
    );
};

export default Routing;
