import { Button, Checkbox, Form, Input, Row, Col, message } from "antd";
import { logInUser } from "../../redux/actions";
import { connect } from "react-redux";
import { useEffect } from "react";

const Login = (props) => {
    let { logInUser, notify, isLoggedIn } = props;
    const onFinish = async (values) => {
        let { username, password, remember } = values;
        await logInUser(username, password, remember);
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };



    useEffect(() => {
        if (props.message.trim().length !== 0) {
            message.warning(props.message);
        }
    }, [props.message, notify]);


    
    return (
        <div>
            <div className="p-5 mt-5 bg-white">
                <h3 className="text-center">Login</h3>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        marginTop: "100px",
                        maxWidth: 900,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
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
                        label="Password"
                        name="password"
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
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
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
        </div>
    );
};

const mapStateToProps = ({ user }) => ({
    loggedIn: user.isLoggedIn,
    message: user.message,
    notify: user.notify,
});

export default connect(mapStateToProps, { logInUser })(Login);
