import React from "react";
import { Button, Form, Input, Typography } from "antd";
import { registerAdmin } from "../../redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/css/registration.scss";

const Registration = (props) => {
    const onFinish = (...values) => {
        props.registerAdmin(...values);
    };

    return (
        <div className="appBg">
            <h2 id="register-tite">Manage Your Tasks</h2>
            <Form name="basic" onFinish={onFinish} className="loginForm">
                <Typography.Title className="title">Create Your Account</Typography.Title>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input placeholder="Please input your name!" className="input" />
                </Form.Item>
                <Form.Item
                    name="surname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your surname!",
                        },
                    ]}
                >
                    <Input placeholder="Please input your surname!" className="input" />
                </Form.Item>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input placeholder="Please input your username!" className="input" />
                </Form.Item>
                <Form.Item
                    name="companyname"
                    rules={[
                        {
                            required: true,
                            message: "Please input your company name!",
                        },
                    ]}
                >
                    <Input placeholder="Please input your company name!" className="input" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input placeholder="Please input your email!" className="input" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="Please input your company password!" className="input" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        block
                        htmlType="submit"
                        style={{
                            color: "white",
                            fontSize: "13px",
                            background: " rgb(9, 66, 9)",
                            border: "1px solid rgb(9, 66, 9)",
                            marginBottom: "10px",
                        }}
                    >
                        Register
                    </Button>
                    <Link to={"/"}>
                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            style={{
                                color: "white",
                                fontSize: "13px",
                                background: " rgb(9, 66, 9)",
                                border: "1px solid rgb(9, 66, 9)",
                                marginBottom: "10px",
                            }}
                        >
                            Login
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    isRegistered: state.user.isRegistered,
});

export default connect(mapStateToProps, { registerAdmin })(Registration);
