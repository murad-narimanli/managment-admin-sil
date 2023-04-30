import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Select, notification  } from "antd";
import { whiteSpace, noWhitespace } from "../../../utils/rules";
import { connect } from "react-redux";
import { getTasks,setVisibleAddModal } from "../../../redux/actions";
import moment from "moment";
import axiosPlugin from "../../../api/axiosPlugin";
const { Option } = Select;
const { TextArea } = Input;

const AddModal = (props) => {
    const { companyData } = props;
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    let { setVisibleAddModal, modalData, getTasks } = props;
    let { editing, editingData } = modalData;

    const randomRgbColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };

    useEffect(() => {
        getUsers();

        if (editing) {
            form.setFieldsValue({
                ...editingData,
                expireDate: moment(editingData.expireDate),
            });
        } else {
            form.resetFields();
        }
    }, [editing]);

    const getUsers = async () => {
        await axiosPlugin
            .get("/companies", { params: { companyId: companyData.companyId } })
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => {
                notification.open(err.response, false);
            });
    };

    const submitForm = (values) => {
        if (!editing) {
            let id = parseInt(Number(Math.random() * Date.now()));
            let objPost = {
                id,
                ...values,
                status: "todo",
                prefix: "todo",
                companyId: companyData.companyId,
                createdBy: companyData.id,
                color: `${randomRgbColor()}`,
            };
            axiosPlugin
                .post("tasks", objPost)
                .then(() => {
                    setVisibleAddModal(false);
                    form.resetFields();
                    notification.open("", true);
                    getTasks();
                })
                .catch((err) => {
                    notification.open(err.response, false);
                });
        } else {
            let objPut = {
                ...editingData,
                ...values,
                status: editingData.status,
                prefix: editingData.prefix,
            };
            axiosPlugin
                .put("tasks" + `/` + editing, objPut)
                .then(() => {
                    getTasks();
                    setVisibleAddModal(false);
                    form.resetFields();
                    notification.open("", true);
                })
                .catch((err) => {
                    notification.open(err.response, false);
                });
        }
    };

    return (
        <div className="w-100">
            <Form onFinish={submitForm} layout="vertical" form={form}>
                <div className="commontask">
                    <Row gutter={[16, 16]}>
                        <Col lg={24} md={24}>
                            <Form.Item label={"Title"} className="mb-5" validateTrigger="onChange" name={`title`} rules={[whiteSpace("inputError")]}>
                                <Input size="large" />
                            </Form.Item>
                        </Col>
                        <Col lg={24} md={24}>
                            <Form.Item
                                label={"Description"}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`description`}
                                rules={[whiteSpace("inputError")]}
                            >
                                <TextArea/>
                            </Form.Item>
                        </Col>

                        <Col lg={24} md={24}>
                            <Form.Item
                                className="mb-5"
                                label={"Assigned users"}
                                validateTrigger="onChange"
                                name={`assignedTo`}
                                rules={[noWhitespace("inputError")]}
                            >
                                <Select
                                    showSearch
                                    mode={"multiple"}
                                    maxTagCount={"responsive"}
                                    placeholder={"Select users"}
                                    className={"w-100"}
                                    notFoundContent={null}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
                                >
                                    {users?.map((user) => (
                                        <Option key={user.id} value={user.id}>
                                            {user.isCompany ? user.companyName + " / " + user.username : user.name + " " + user.surname}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col lg={24} md={24}>
                            <Form.Item
                                label={"DeadLine"}
                                className="mb-5"
                                validateTrigger="onChange"
                                name={`expireDate`}
                                rules={[noWhitespace("inputError")]}
                            >
                                <DatePicker
                                    disabledDate={(current) => {
                                        let customDate = moment().format("YYYY-MM-DD");
                                        return current && current < moment(customDate, "YYYY-MM-DD");
                                    }}
                                    className="w-100"
                                    size="large"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="modalButtons mt-20">
                        <Button type="primary" htmlType="submit">
                            {"save"}
                        </Button>
                        <Button
                            className="ml-10"
                            onClick={() => {
                                setVisibleAddModal(false);
                                form.resetFields();
                            }}
                        >
                            {"cancel"}
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

const mapStateToProps = ({ modalData, user }) => {
    return {
        companyData: user.companyData,
        modalData,
    };
};

export default connect(mapStateToProps, { setVisibleAddModal, getTasks })(AddModal);
