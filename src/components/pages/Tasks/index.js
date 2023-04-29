import React from "react";
import { Card, Button, Row, Col } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { setVisibleAddModal } from "../../../redux/actions";
import { connect } from "react-redux";
import DragList from "./DragList";
import Modal from "antd/es/modal/Modal";
import AddModal from "./AddModal";

const Tasks = (props) => {
    const { setVisibleAddModal } = props;

    const showModal = () => {
        setVisibleAddModal(true, null, {});
    };

    return (
        <div>
            <Row gutter={[10, 10]}>
                <Col xs={24}>
                    <div className="border flex flex-between animated fadeInDown p-2 mt-0 bg-white">
                        <div>
                            <UnorderedListOutlined className="f-20 mr5-15" />
                            <span className="f-20 bold">Tasks</span>
                        </div>
                        <div>
                            <Button onClick={showModal} type={"primary"}>
                                Add Task
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col lg={24} xs={24}>
                    <Card className={"animated fadeIn"}>
                        <DragList />
                    </Card>
                </Col>
            </Row>

            <Modal
                title={props.modalData.editing ? "Edit" : "Add" + " " + "task"}
                centered
                open={props.modalData.modalOpen}
                className="padModal"
                onOk={() => setVisibleAddModal(false)}
                onCancel={() => {
                    setVisibleAddModal(false);
                }}
                footer={null}
            >
                <AddModal />
            </Modal>
        </div>
    );
};

const mapStateToProps = ({ modalData }) => {
    return {
        modalData,
    };
};

export default connect(mapStateToProps, { setVisibleAddModal })(Tasks);
