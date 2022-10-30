import { Droppable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import React from "react";
import styled from "styled-components";

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;
`;

const DroppableStyles = styled.div`
  padding: 10px;
  border-radius: ${props => props.prefix ==='sink' ? '0px 6px 6px 0px' : '6px'};
  width:100%;
  background: ${props => props.prefix ==='sink' ? '#d4d4d4' : '#b6cabc'};
  grid-area: ${props => props.prefix ==='sink' ? '1 / 2 / 2 / 3' : '2 / 1 / 3 / 3'};
`;

const ListItemHolder = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
`;

const DraggableElement = ({ prefix, elements }) => (
  <DroppableStyles prefix={prefix} >
    {/* <ColumnHeader>{prefix}</ColumnHeader> */}
    <Droppable droppableId={`${prefix}`}>
      {(provided) => (
        <ListItemHolder {...provided.droppableProps} ref={provided.innerRef}>
          {elements.map((item, index) => (
            <ListItem key={item.id} item={item} index={index} />
          ))}
          {provided.placeholder}
        </ListItemHolder>
      )}
    </Droppable>
  </DroppableStyles>
);

export default DraggableElement;
