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
  ${'' /* border-radius: ${props => props.prefix ==='sink' ? '0px 6px 6px 0px' : '6px'}; */}
  width:70%;
  height:250px;
  ${'' /* Previous Green Color: #fff */}
  background: ${props => props.prefix ==='sink' ? 'linear-gradient(180deg, #fff, #fff 21%, black 21%, black 22%, #fff 22%, #fff 40%, black 40%, black 41%, #fff 41%, #fff 60%, black 60%, black 61%, #fff 61%, #fff 79%, black 79%, black 80%, #fff 80%, #fff)' : 'linear-gradient(180deg, #fff, #fff 21%, black 21%, black 22%, #fff 22%, #fff 40%, black 40%, black 41%, #fff 41%, #fff 60%, black 60%, black 61%, #fff 61%, #fff 79%, black 79%, black 80%, #fff 80%, #fff)'};
  grid-area: ${props => props.prefix === 'sink' ? '1 / 1 / 3 / 3' : '2 / 1 / 3 / 3'};
  border: 2px solid #000;

`;

const ListItemHolder = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 100%;
    ${'' /* background: #f00; */}
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
