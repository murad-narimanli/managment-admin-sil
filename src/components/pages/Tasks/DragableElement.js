import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const ColumnHeader = styled.div`
    text-transform: uppercase;
    margin-bottom: 20px;
`;

const DroppableStyles = styled.div`
    padding: 10px;
    border-radius: 6px;
    background: #f0f2f5;
`;

const DraggableElement = ({ prefix, elements, companyData, allUsers }) => (
    <DroppableStyles>
        <ColumnHeader>{prefix}</ColumnHeader>
        <Droppable isDropDisabled={!companyData.role.changeStatus} droppableId={`${prefix}`}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                    {elements?.map((item, index) => (
                        <ListItem users={allUsers} key={item.id} item={item} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </DroppableStyles>
);

const mapStateToProps = ( state ) => {
    return {
        companyData: state.user.companyData,
        
    };
};

export default connect(mapStateToProps, {})(DraggableElement);
