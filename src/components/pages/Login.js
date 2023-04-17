import { Button, Checkbox, Form, Input, message, Typography, Divider } from "antd";
import { logIn, getCompany } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect } from "react";
import "../../assets/css/login.scss";
import { GoogleOutlined, TwitterOutlined, FacebookFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import history from "../../const/history";

const Login = (props) => {
    const { logIn, notify, isLoggedIn, getCompany } = props;

    const onFinish = async (values) => {
        let { username, password, remember } = values;
        await logIn(username, password, remember);
        if (isLoggedIn) {
            message.success("Login Successful!");
            history.push("/tasks");
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    const login = () => {
        message.success("Login Successful!");
    };

    useEffect(() => {
        if (props.message && props.message.trim().length !== 0) {
            message.warning(props.message);
        }
    }, [props.message, notify]);

    return (
        <div className=" appBg">
            <Form
                className="loginForm"
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Typography.Title className="title">Login to your Account</Typography.Title>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Enter your username!",
                        },
                    ]}
                >
                    <Input placeholder="Enter your username" className="input" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Enter your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Enter your password" className="input" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="btn"
                        style={{
                            color: "white",
                            fontSize: "13px",
                            background: " rgb(9, 66, 9)",
                            border: "1px solid rgb(9, 66, 9)",
                            marginBottom: "10px",
                        }}
                    >
                        Log In
                    </Button>
                    <Link to={"/register"}>
                        <Button
                            type="primary"
                            htmlType="button"
                            block
                            style={{ color: "white", fontSize: "13px", background: " rgb(9, 66, 9)", border: "1px solid rgb(9, 66, 9)" }}
                        >
                            Register
                        </Button>
                    </Link>

                    <Divider style={{ borderColor: "black" }}>or Login with</Divider>
                </Form.Item>
                <div className="sociaLogins">
                    <GoogleOutlined className="socialIcon" onClick={login} />
                    <FacebookFilled className="socialIcon" onClick={login} />
                    <TwitterOutlined className="socialIcon" onClick={login} />
                </div>
            </Form>
        </div>
    );
};

const mapStateToProps = ({ user }) => ({
    loggedIn: user.isLoggedIn,
    message: user.message,
    notify: user.notify,
});

export default connect(mapStateToProps, { logIn, getCompany })(Login);
