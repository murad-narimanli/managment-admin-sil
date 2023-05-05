import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Input, Switch, Space, notification, Tooltip, Popconfirm, Table } from "antd";
import { UnorderedListOutlined, EditFilled, DeleteFilled } from "@ant-design/icons";
import { createUser } from "../../redux/actions";
import { connect } from "react-redux";
import axiosPlugin from "../../api/axiosPlugin";
import "../../assets/css/main.scss";

const Users = ({ companyData, createUser }) => {
    const [form] = Form.useForm();
    const [companies, setCompanies] = useState([]);
    const [editing, setEditing] = useState(null);

    const getData = async () => {
        if (!companyData.companyId) {
            console.warn("Invalid Id");
            return;
        }
        await axiosPlugin.get(`/companies?companyId=${companyData.companyId}`).then((res) => {
            setCompanies(
                res.data.map((company, index) => {
                    company.key = index;
                    return company;
                })
            );
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const isBad = (array, data) => {
        return array.some((user) => {
            if (user.username.toLowerCase() === data.username.toLowerCase()) {
                return true;
            }
            if (user.email.toLowerCase() === data.email.toLowerCase()) {
                return true;
            }
            return false;
        });
    };

    const onFinish = (data) => {
        let isCreated = isBad(companies, data);
        if (isCreated && editing) {
            axiosPlugin
                .put(`/companies/${editing}`, {
                    companyId: companyData.companyId,
                    companyname: companyData.companyname,
                    name: data.name,
                    surname: data.surname,
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    isCompany: false,
                    role: {
                        admin: false,
                        editTask: data.editTask,
                        deleteTask: data.deleteTask,
                        addTask: data.addTask,
                        changeStatus: data.changeStatus,
                        changeSettings: data.changeSettings,
                    },
                })
                .then((res) => {
                    notification.open({
                        message: "Successfully edited",
                        description: `User name: ${res.data.username}`,
                    });
                    getData();
                    cancelEdit();
                });
        } else if (!isCreated && !editing) {
            createUser({ ...data, companyId: companyData.companyId, companyName: companyData.companyname }).then((res) => {
                notification.open({
                    message: "Successfully added",
                    description: `User name: ${res.data.username}`,
                });
                getData();
                cancelEdit();
            });
        } else {
            notification.open({
                message: "Already registered",
            });
        }
    };

    const cancelEdit = () => {
        form.resetFields();
        setEditing(null);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "number",
            sorter: (a, b) => a.id - b.id,
            render: (index) => {
                return index;
            },
        },
        {
            sorter: (a, b) => a.id - b.id,
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            sorter: (a, b) => a.id - b.id,
            title: "Surname",
            dataIndex: "surname",
            key: "surname",
        },
        {
            title: "Actions",
            dataIndex: "id",
            key: "id",
            render(id) {
                return (
                    <div className="d-flex">
                        <Tooltip title="Edit">
                            <Button
                                onClick={() => {
                                    editData(id);
                                }}
                                type="primary"
                                className="me-2"
                                shape="circle"
                                icon={<EditFilled />}
                                style={{ background: "#3d584b" }}
                            />
                        </Tooltip>
                        <Popconfirm
                            placement="bottomLeft"
                            title={"Are you sure for delete?"}
                            onConfirm={() => {
                                deleteData(id);
                            }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Tooltip title="Delete">
                                <Button type="text" className="bg-danger text-white" shape="circle" icon={<DeleteFilled />} />
                            </Tooltip>
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];
    const editData = (id) => {
        let editedData = companies.find((s) => s.id === id);
        setEditing(id);
        form.setFieldsValue({
            name: editedData.name,
            surname: editedData.surname,
            username: editedData.username,
            email: editedData.email,
            password: editedData.password,
            editTask: editedData.role.editTask,
            deleteTask: editedData.role.deleteTask,
            addTask: editedData.role.addTask,
            changeStatus: editedData.role.changeStatus,
            changeSettings: editedData.role.changeSettings,
        });
    };

    const deleteData = async (id) => {
        await axiosPlugin
            .delete(`/companies/${id}`)
            .then((res) => {
                notification.open({
                    message: "User's profile successfully deleted",
                });
                getData();
            })
            .catch(() => {
                notification.open({
                    message: "Some error ocurred",
                });
            });
        setEditing(null);
        cancelEdit();
    };

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <div>
                    <div>
                        <UnorderedListOutlined className="pe-3 " />
                        <span>Users</span>
                    </div>
                </div>
            </Col>
            <Col xs={12}>
                <Table columns={columns} dataSource={companies.filter((user) => user.isCompany === false)} />
            </Col>
            <Col xs={12} className="bg-light border p-5 shadow">
                <Form form={form} autoComplete="off" onFinish={onFinish}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            { required: true, message: "Fill name field" },
                            {
                                type: "string",
                                min: 2,
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Surname"
                        name="surname"
                        rules={[
                            { required: true, message: "Fill surname field" },
                            {
                                type: "string",
                                min: 2,
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: "Fill username field" },
                            {
                                type: "string",
                                min: 2,
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Enter email" },
                            {
                                type: "email",
                                message: "Enter a valid email address",
                            },
                        ]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
                        <Input.Password size="large" />
                    </Form.Item>
                    <Row>
                        <Col xs={12}>
                            <Form.Item label="Edit task" valuePropName="checked" name="editTask" initialValue={false}>
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item label="Add Task" valuePropName="checked" name="addTask" initialValue={false}>
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item label="Delete Task" valuePropName="checked" name="deleteTask" initialValue={false}>
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item label="Change Settings" valuePropName="checked" name="changeSettings" initialValue={false}>
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col xs={12}>
                            <Form.Item label="Change Status" valuePropName="checked" name="changeStatus" initialValue={false}>
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item className="set-input-btns">
                        <Space>
                            <Button type="primary" htmlType="submit" className="save-btn">
                                Save
                            </Button>
                            <Button onClick={cancelEdit} className="cancel-btn">
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => ({
    companyData: state.user.companyData,
});
export default connect(mapStateToProps, { createUser })(Users);
