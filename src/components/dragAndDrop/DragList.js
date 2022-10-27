import React, { useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useNavigate } from "react-router-dom";
import DraggableElement from "./DraggableElement";
import { restUrl } from "../../index";  




const DragDropContextContainer = styled.div`
  padding: 10px;
  height: 42rem;
  border: 4px solid indianred;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  ${'' /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 20rem 20rem;
  grid-gap: 3rem; */}

    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    width: 20rem;
`;

const ColumnHeader = styled.div`
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;
`;

const SerialNumberColumn = styled.div`
  padding: 10px;
  border-radius: 6px;
  background: #d4d4d4;
  width: 5rem;
  grid-area: 1 / 1 / 2 / 2;
`;

const SerialNumber = styled.span`
  padding: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: white;
  margin: 0 0 8px 0;
  display: grid;
  grid-gap: 20px;
  flex-direction: column;
  color:black;
`;

const SubmitElementsButton = styled.input`
    background-color: ${props => props.elements.sink.length === 5 ? '#66e29a' : '#d4d4d4'};
    color: white;
    border: none;
    cursor: pointer;
    width: 80%;
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 6px;
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

function DragList() {
    const [elements, setElements] = React.useState(generateLists());
    
  const navigate = useNavigate();
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

      console.log(elements,listCopy);
    setElements(listCopy);
    };
    
    const submitElements = () => {
        try{
            const url = restUrl + 'submitChoices';
            if (elements.sink.length === 0) {
                alert("Submission with empty spaces is not allowed!!!!")
            } else {
                console.log(`Submitting now to backend: ${JSON.stringify(elements)}`)
                fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'choices': elements,
                    }),
                })
                .then(response => {
                    if (response.status === 200) {
                      alert('Successfully submitted Choices.')
                      console.log(response)
                      console.log(response.body)
                      navigate('/waiting');  
                      
                      // navigate(
                        // '/draggable-list',
                        // {
                        //     
                        //     state: {
                        //         choices: choices,
                        //     },
                        // });
                    }
                    else if (response.status === 300) {
                        alert('Failed to post to db.')
                    }
                    else {
                        throw new Error();
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
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: submitElements
        },
        {
          label: 'No',
          onClick: () => alert('Clicked No Taking Back')
        }
      ]
    });
    };
    

  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
        <SerialNumberColumn>
            <ColumnHeader>Sr. No</ColumnHeader>
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
