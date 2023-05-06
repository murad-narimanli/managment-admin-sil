import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Form, Input, List, notification } from "antd";
import { UnorderedListOutlined, EditOutlined } from "@ant-design/icons";
import { whiteSpace } from "../../utils/rules";
import { connect } from "react-redux";
import axiosPlugin from "../../api/axiosPlugin";

const UserSettings = (props) => {
    const { companyData } = props;
    const [data, setData] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [form] = Form.useForm();

    const setEditingObject = () => {
        form.setFieldsValue(data);
    };

    const cancelEditing = () => {
        form.resetFields();
    };

    const getAllUsers = async () => {
        await axiosPlugin.get(`/companies`).then((res) => {
            setAllUsers(
                res?.data.map((p, index) => ({
                    ...p,
                    key: index + 1,
                    index: index + 1,
                }))
            );
        });
    };

    const savePosition = (values) => {
        let updatedUser = {
            ...companyData,
            ...values,
        };
        console.log({ values });
        console.log({ companyData });
        axiosPlugin
            .put(`/companies/${companyData.id}`, updatedUser)
            .then((res) => {
                notification.open({
                    type: "success",
                    message: "Congratulations,your settings has been successfully updated",
                });
                getData();
                cancelEditing();
            })
            .catch((err) => {
                notification.open(err.response, false);
            });
    };

    const camelCaseSplit = (inputString) => {
        const f = (str) => str.replace(/(?<=[a-z\d])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])/g, " ");
        return f(inputString).toUpperCase();
    };

    const getData = () => {
        axiosPlugin
            .get(`/companies`, {
                params: {
                    id: props.companyData.id,
                },
            })
            .then((res) => setData(res?.data[0]));
    };

    useEffect(() => {
        getData();
        getAllUsers();
    }, []);

    return (
        <Row gutter={[10, 10]}>
            <Col xs={24}>
                <div className="border animated fadeInDown p-2 mt-0 bg-white">
                    <UnorderedListOutlined className="f-20 mr5-15" />
                    <span className="f-20 bold ms-3">User info</span>
                </div>
            </Col>
            <Col lg={12} xs={24}>
                {companyData.role.changeSettings && (
                    <Card>
                        <div>
                            <List
                                header={false}
                                footer={false}
                                bordered
                                dataSource={Object.entries(data)}
                                renderItem={(user) => {
                                    if (user[0] !== "id" && typeof user[1] !== "boolean" && typeof user[1] !== "object") {
                                        return (
                                            <List.Item>
                                                <div className="flex w-100 flex-between">
                                                    <div>
                                                        <b>{camelCaseSplit(user[0])}</b>
                                                    </div>
                                                    <div>{user[1]}</div>
                                                </div>
                                            </List.Item>
                                        );
                                    }
                                }}
                            />
                            <div>
                                {companyData.role.changeSettings && (
                                    <Button onClick={setEditingObject} type="primary" size="large" className="mt-4 w-100 edit-btn">
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                )}
            </Col>
            {!companyData.role.changeSettings && (
                <Col lg={24} xs={24}>
                    <Card>
                        <div>
                            <List
                                header={false}
                                footer={false}
                                bordered
                                dataSource={Object.entries(data)}
                                renderItem={(user) => {
                                    if (user[0] !== "id" && typeof user[1] !== "boolean" && typeof user[1] !== "object") {
                                        return (
                                            <List.Item>
                                                <div className="flex w-100 flex-between">
                                                    <div>
                                                        <b>{camelCaseSplit(user[0])}</b>
                                                    </div>
                                                    <div>{user[1]}</div>
                                                </div>
                                            </List.Item>
                                        );
                                    }
                                }}
                            />
                            <div>
                                {companyData.role.changeSettings && (
                                    <Button onClick={setEditingObject} type="primary" size="large" className="mt-4 w-100 edit-btn">
                                        <EditOutlined className="ml-10" />
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                </Col>
            )}
            {companyData.role.changeSettings && (
                <Col lg={12} xs={24}>
                    <Card title={false} className={"animated fadeInRight"}>
                        <Form
                            form={form}
                            name="basic"
                            layout="vertical"
                            labelCol={{
                                span: 16,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            onFinish={savePosition}
                        >
                            <Form.Item label="Name" name="name" validateTrigger="onChange" rules={[whiteSpace("Please input your name!")]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Surname" name="surname" validateTrigger="onChange" rules={[whiteSpace("Please input your surname!")]}>
                                <Input />
                            </Form.Item>
                            {companyData.role.admin && (
                                <Form.Item
                                    label="Company Name"
                                    name="companyname"
                                    validateTrigger="onChange"
                                    rules={[whiteSpace("Please input your company name!")]}
                                >
                                    <Input />
                                </Form.Item>
                            )}

                            <Form.Item
                                label="User Name"
                                name="username"
                                validateTrigger="onChange"
                                rules={[whiteSpace("Please input your username!")]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                validateTrigger="onChange"
                                rules={[
                                    whiteSpace("Please input your email!"),
                                    {
                                        type: "email",
                                        message: "The input is not valid E-mail!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                validateTrigger="onChange"
                                rules={[whiteSpace("Please input your password!")]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <div className="set-input-btns">
                                <Form.Item>
                                    <Button size="large" type="primary" className="mr-10 save-btn" htmlType="submit">
                                        Save
                                    </Button>
                                </Form.Item>
                                <Button onClick={cancelEditing} size="large" className="cancel-btn">
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Card>
                </Col>
            )}
        </Row>
    );
};

const mapStateToProps = (state) => ({
    companyData: state.user.companyData,
});

export default connect(mapStateToProps)(UserSettings);
