import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

const DragItem = styled.div`
  padding: 10px 0px;
  width: 100%;
  ${'' /* border-radius: 6px; */}
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  border: 1px solid #000;
  margin: 0 0 11.5px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
  ${'' /* justify-content: center; */}
  ${'' /* align-items: center; */}
`;

const ItemContent = styled.span`
    width: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
`;


const ListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <DragItem
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
             <ItemContent>{item.content}</ItemContent>
            {/* <CardFooter>
              <span>{item.content}</span>
              <Author>
                {item.id}
                <Avatar
                  src={`data:image/svg+xml;utf8,${generateFromString(item.id)}`}
                />
              </Author>
            </CardFooter> */}
          </DragItem>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
