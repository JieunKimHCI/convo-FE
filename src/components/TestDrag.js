import { useHistory } from "react-router-dom";
import { useState } from "react";
import React, { Component } from "react";
import { Draggable } from "react-drag-reorder";
import { restUrl } from "..";    

export const TestDrag = () => {

  const history = useHistory();
  const [choices, setChoices] = useState(["1","2","3","4","5","6","7","8","9","10"])
  
  const itemList = {
      borderWidth: '1px',
      margin: '0.4rem',
      height: '2rem',
      width: '7rem',
      display:'inline-block',
      color:'#444',
      border: '1px solid #CCC',
      borderRadius: '2px',
      background:'#DDD',
      // boxShadow: '0 0 5px -1px rgba(0,0,0,0.2)',
      cursor:'pointer',
      verticalAlign:'middle',
      padding: '0.1rem',
      textAlign: 'center',
    }
    
    const submitChoices = () => {
        try{
            const url = restUrl + 'submitChoices';
            fetch(url, {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'choices': choices,
                }),
            })
            .then(response => {
                if(response.status === 200){
                    alert('Successfully submitted Choices.')
                    history.push({
                        pathname: '/test-drag',
                        state: {
                            choices: choices,
                        },
                    });
                }
                else if(response.status === 300){
                    alert('Failed to post to db.')
                }
                else{
                    throw new Error();
                }
            })
        }
        catch(error){
            console.log('error', error);
        }
    }
     
    const getChangedPos = (currentPos, newPos) => {
    console.log(currentPos, newPos);
  }; 

    return (
      <div className="flex-container">
        <div className="row">
          <form>
            <Draggable onPosChange={getChangedPos}>
              {choices.map((choice, idx) => {
                return (
                  <div style={itemList} key={idx} className="flex-item">
                    {choice}
                  </div>
                );
              })}
            </Draggable>
            <input 
              // style = {submitChoicesButton} 
              type="button" 
              value="choices" 
              onClick={submitChoices} 
            /> 
          </form>
        </div>
      </div>
    );
  }


export default TestDrag;
        