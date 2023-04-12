import React from "react";
import { Button, Form, Input, message } from "antd";
import { registerAction } from "../../redux/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
    const { user, registerAction, registered, getData } = props;
    let navigate = useNavigate();

    const registerUser = async (...values) => {
        await props.registerAction(...values);
    };

    return (
        <div>
            <Form name="basic" onFinish={registerUser}>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="companyname"
                    label="Company Name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn,
    isRegistered: state.user.isRegistered,
});

export default connect(mapStateToProps, { registerAction })(Registration);
