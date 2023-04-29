import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import {Avatar, Button,  Popconfirm, Tooltip,notification} from "antd";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {connect} from "react-redux";
import {getTasks,setVisibleAddModal} from "../../../redux/actions";
import moment from "moment";
import axiosPlugin from "../../../api/axiosPlugin";


const CardHeader = styled.div`
  font-weight: 500;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;
const CardFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DragItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  word-break: break-all;
  flex-wrap: wrap;
  white-space: pre-line;
  flex-direction: column;
`;


const ListItem = ({ item, index , setVisibleAddModal , getTasks , users  , user}) => {
    const { t } = useTranslation();


    const deleteTask = (id) => {
        axiosPlugin.delete(`tasks/${id}`).then(() => {
            notification.open('Deleted' , true)
            getTasks()
        })
    }

    const editTask = (item) => {
        setVisibleAddModal(true , item.id , item)
    }


    return (
        <Draggable className={'test'} draggableId={item.ids} index={index}>
            {(provided, snapshot) => {
                return (
                    <DragItem
                        ref={provided.innerRef}
                        snapshot={snapshot}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <CardHeader> <div><b>Title</b></div> {item.title}</CardHeader>
                        <span><div><b>Description</b></div>  {item.description}</span>
                        <span> <b className={'mr-10'}>DeadLine</b> {moment(item.expireDate).format('DD.MM.YYYY')}</span>
                        <CardFooter>
                            <span><b>Task id</b> - {item.id}</span>
                            <Author>
                                <div className="flex flex-end">
                                        <Tooltip className="ml-5" title={t("edit")} placement="topRight">
                                            <Button onClick={() =>{ editTask(item)  }}  className="border-none" type="text" shape="circle">
                                                <EditFilled />
                                            </Button>
                                        </Tooltip>
                                        <Popconfirm
                                            placement="bottomRight"
                                            title={t("areYouSure")}
                                            onConfirm={() => deleteTask(item.id)}
                                            okText={'Yes'}
                                            cancelText={'No'}
                                        >
                                            <Tooltip  className="ml-5" title={'Delete'}>
                                                <Button className="border-none" type="text" shape="circle">
                                                    <DeleteFilled />
                                                </Button>
                                            </Tooltip>
                                        </Popconfirm>
                                </div>
                             </Author>
                        </CardFooter>

                        <div className="flex flex-align-center flex-between">
                            <div>
                                <b>Assigned users</b>
                            </div>
                            <Avatar.Group>
                                {users.map((us, i) =>{
                                    if (item.assignedTo.includes(us.id)){
                                        return (
                                            <Tooltip
                                                key={i}
                                                title={us.isCompany ? us.username + ' / ' + us.companyName : us.username + ' / ' + us.name + ' '+ us.surname}
                                                placement="bottom"
                                            >
                                                <Avatar
                                                    style={{
                                                        backgroundColor:`${item?.color}`,
                                                    }}
                                                >
                                                    {us.username[0].toUpperCase()}
                                                </Avatar>
                                            </Tooltip>

                                        )
                                    }
                                })}
                            </Avatar.Group>
                        </div>

                    </DragItem>
                );
            }}
        </Draggable>
    );
};



const mapStateToProps = ({ modalData , user }) => {
    return {
        modalData,
        user:user.data
    };
};

export default connect(mapStateToProps, {setVisibleAddModal , getTasks })(ListItem);

