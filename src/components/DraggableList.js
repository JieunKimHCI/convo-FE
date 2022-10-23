import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React, { Component } from "react";
import { Draggable } from "react-drag-reorder";
import { restUrl } from "..";  

export const DraggableList = ({setIsSubmiitedSetter}) => {

  const navigate = useNavigate();
  const [choices, setChoices] = useState(["torch 🔦","knife 🔪","raincoat ☂️","bandage 🩹","pistol 🔫","parachute 🪂","water 🥛","sunglasses 🕶️","coat 🧥","mirror 🪞"])
  const [childIsSubmitted, childSetIsSubmitted] = useState(false);
  
  useEffect(() => {
    setIsSubmiitedSetter(childIsSubmitted);
  }, [setIsSubmiitedSetter, childIsSubmitted]);

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

    const submitChoicesButtonStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '80%',
        padding: '2vh',
        margin: '2vh'
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
                    childSetIsSubmitted(true)
                  // navigate(
                        // '/draggable-list',
                          // {
                    //     
                    //     state: {
                    //         choices: choices,
                    //     },
                    // });
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
              style = {submitChoicesButtonStyle} 
              type="button" 
              value="Submit" 
              onClick={submitChoices} 
            /> 
          </form>
        </div>
      </div>
    );
  }


export default DraggableList;
        