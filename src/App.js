import MainLayout from "./components/Layout/Layout";
import Routing from "./components/Layout/Routing";
import { BrowserRouter } from "react-router-dom";
import LoginRouting from "./components/Layout/LoginRouting";
import Loader from "./components/elements/Loader";
import { connect } from "react-redux";
import { getCompany } from "./redux/actions";
import { useEffect } from "react";

function App(props) {
    let { isLoading, isLoggedIn, getCompany } = props;

    useEffect(() => {
        getCompany();
    }, []);

    return (
        <div className="App">
            {isLoading ? <Loader /> : ""}
            <BrowserRouter>
                {isLoggedIn ? (
                    <MainLayout>
                        <Routing />
                    </MainLayout>
                ) : (
                    <LoginRouting isLoggedIn={isLoggedIn} />
                )}
            </BrowserRouter>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isLoading: state.isLoading,
    isLoggedIn: state.user.isLoggedIn,
    isRegistered: state.user.isRegistered,
});

export default connect(mapStateToProps, { getCompany })(App);
