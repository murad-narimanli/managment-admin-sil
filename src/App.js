import MainLayout from "./components/Layout/Layout";
import Routing from "./components/Layout/Routing";
import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/pages/Login";
import LoginRouting from "./components/Layout/LoginRouting";
import Loader from "./components/elements/Loader";
import { connect } from "react-redux";
import { getUserData } from "./redux/actions";

function App(props) {
    let { isLoading, isLoggedIn, getUserData } = props;

    useEffect(() => {
        getUserData();
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
});

export default connect(mapStateToProps, { getUserData })(App);
