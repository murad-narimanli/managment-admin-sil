import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableElement from "./DragableElement";
import {getTasks} from "../../../redux/actions";
import {connect} from "react-redux";
import {Spin} from "antd";
import axiosPlugin from "../../../api/axiosPlugin";

const DragDropContextContainer = styled.div`
  padding: 20px;
  background: white;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;


function DragList({user , tasks , getTasks }) {
    const [spin , setSpin] = useState(false)
    const [users, setUsers] = useState([]);
    const removeFromList = (list, index) => {
        const result = Array.from(list);
        const [removed] = result.splice(index, 1);
        return [removed, result];
    };

    const addToList = (list, index, element) => {
        const result = Array.from(list);
        result.splice(index, 0, element);
        return result;
    };

    const lists = ["todo", "inProgress", "done"];

    const [elements, setElements] = React.useState({});



    const generateLists = (tasks) =>{
        if(tasks?.data?.length >= 0){
            setSpin(true)
            let obj = {}
            lists.forEach(
                (currentValue) => {
                    console.log(currentValue)
                    obj[currentValue] = tasks?.data?.filter((s)=>{
                        return s['status'] === currentValue
                    }).map((d) => {
                        return {
                            ...d,
                            ids: `item-${d.id}`,
                            prefix: d.status
                        }
                    })
                },
                obj
            );
            setSpin(false)
            setElements(obj)
        }
    }

    useEffect(() => {
        generateLists(tasks)
    }, [tasks]);


     useEffect(() => {
         getTasks()
         getUsers()
     }, []);


    const onDragEnd = async (result) => {
       if(user.role.changeStatus){
           if (!result.destination) {
               return;
           }
           const listCopy = { ...elements };

           const sourceList = listCopy[result.source.droppableId];
           const [removedElement, newSourceList] = removeFromList(
               sourceList,
               result.source.index
           );

           if (removedElement) {
               setSpin(true)
               axiosPlugin.put(`tasks/${removedElement.id}` , {
                   ...removedElement,
                   status:result.destination.droppableId,
                   prefix:result.destination.droppableId
               }).then(() =>{
                   getTasks()
               })
           }
           listCopy[result.source.droppableId] = newSourceList;
           const destinationList = listCopy[result.destination.droppableId];
           listCopy[result.destination.droppableId] = addToList(
               destinationList,
               result.destination.index,
               removedElement
           );
           setElements(listCopy);
       }
    };

    const getUsers = async () => {
        await axiosPlugin.get('companies' , {params: {companyId:user.companyId}}).then((res)=>{
            setUsers(res.data);
        })
    }


    return (
        <DragDropContextContainer>
          <Spin spinning={spin}>
              <DragDropContext onDragEnd={onDragEnd}>
                  <ListGrid>
                      {lists.map((listKey) => (
                          <DraggableElement
                              elements={elements[listKey]}
                              key={listKey}
                              prefix={listKey}
                              allUsers={users}
                          />
                      ))}
                  </ListGrid>
              </DragDropContext>
          </Spin>
        </DragDropContextContainer>
    );
}


const mapStateToProps = ({ tasks, user}) => {
    console.log({user})
    return {
        user: user.data,
        tasks:tasks?.data,
    };
    
};


export default connect(mapStateToProps, {  getTasks })(DragList);


