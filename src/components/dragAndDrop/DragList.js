import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate, useLocation } from "react-router-dom";
import DraggableElement from "./DraggableElement";
import { restUrl } from "../../index";  


let record = null;
const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();


const DragDropContextContainer = styled.div`
  padding: 1rem;
  height: 100%;
  ${'' /* width:100%; */}
  ${'' /* border: 2px solid #000;
  border-radius: 6px; */}
`;

const ListGrid = styled.div`
  ${'' /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20rem 20rem;
  grid-gap: 3rem; */}

    display: grid;
    grid-template-columns:1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 10px;
    width: 100%;
    justify-items:center;
`;

const SerialNumberColumn = styled.div`
  padding: 10px;
  grid-area: 1 / 1 / 2 / 2;
  width:70%;
  height:250px;
  margin-left:55px;
  border-top: 2px solid #000;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  background: linear-gradient(180deg, #fff, #fff 21%, black 21%, black 22%, #fff 22%, #fff 40%, black 40%, black 41%, #fff 41%, #fff 60%, black 60%, black 61%, #fff 61%, #fff 79%, black 79%, black 80%, #fff 80%, #fff);
`;

const SerialNumber = styled.span`
  padding: 10px 0px;
  width: 70%;
  ${'' /* border-radius: 6px; */}
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  border: 1px solid #000;
  margin: 0 0 11px 6px;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubmitElementsButton = styled.input`
    background-color: ${props => props.elements.sink.length === 5 ? '#66e29a' : '#d4d4d4'};
    color: white;
    border: none;
    cursor: pointer;
    width: 80%;
    padding: 1rem;
    margin: 0.5rem;
    align-self: center;
    ${'' /* border-radius: 6px; */}
`;

// inital data generator
const getItems = (prefix) => {
    if (prefix === 'sink') {
        return []
    } else {
        return [
    {
      "id": "1",
        prefix,
      "content": "Knife 🗡️"
    },
    {
      "id": "2",
        prefix,
      "content": "Torch 🔦"
    },
    {
      "id": "3",
      prefix,
      "content": "Pistol 🔫"
    },
    {
      "id": "4",
      prefix,
      "content": "Water 💧"
    },
    {
      "id": "5",
      prefix,
      "content": "Coat 🧥"
    },
  ]
    }
 };
    
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

const lists = ["sink", "source"];

const generateLists = () =>
  lists.reduce(
    (acc, listKey) => ({ ...acc, [listKey]: getItems(listKey) }),
    {}
  );

function DragList({meetingId, netId, isGroup}) {
    const [elements, setElements] = React.useState(generateLists());
    
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
    };
    
    const submitElements = () => {
      try {
            const url = restUrl + 'submitChoices';
            if (elements.sink.length === 0) {
                alert("Submissions with empty spaces are not allowed!")
            } else {
                fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      'choices': elements,
                      'meetingId': meetingId,
                      'netId': netId,
                      'timestamp': new Date().toISOString(),
                    }),
                })
                  .then(response => {
                    if (isGroup) {
                      if(record == null){
                          record = client.record.getRecord(location.state.meetingId);
                      }
                      record.set('submitForGroup', 'true');  
                      navigate('/survey');
                    } else {
          
                      if (response.status === 200) {
                        
                        navigate(
                          '/waiting',
                          { 
                              state: {
                                netId: netId,
                                meetingId: meetingId
                              },
                          });
                        
                      }
                      else if (response.status === 300) {
                          alert('Failed to post to db.')
                      }
                      else {
                          throw new Error();
                        }
                    }
                })
            }
        }
        catch(error){
            console.log('error', error);
        }
    }

    const confirmSubmit = () => {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure this is the group\'s final answer?',
      buttons: [
        {
          label: 'Yes',
          onClick: submitElements
        },
        {
          label: 'No',
          onClick: () => console.log('Clicked No Taking Back')
        }
      ]
    });
    };
    

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          <SerialNumberColumn>
          
            {/* <ColumnHeader>Sr. No</ColumnHeader> */}
                <SerialNumber>1</SerialNumber>
                <SerialNumber>2</SerialNumber>
                <SerialNumber>3</SerialNumber>
                <SerialNumber>4</SerialNumber>
            <SerialNumber>5</SerialNumber>
          
        </SerialNumberColumn>
                  
        {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </ListGrid>
          </DragDropContext>

     <form>
        <SubmitElementsButton 
            type="button" 
            value="Submit" 
            onClick={confirmSubmit}
            elements={elements}
            />      
     </form>
    </DragDropContextContainer>
  );
}

export default DragList;
