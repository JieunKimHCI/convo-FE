import { useNavigate } from "react-router-dom";
import { useState } from "react";
 
function Instructions(){

    const [check1, setcheck1] = useState(false);
    const [check2, setcheck2] = useState(false);
    const [check3, setcheck3] = useState(false);
    const [check4, setcheck4] = useState(false);

    const navigate = useNavigate();
    
    const instructionsPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '125vh',
        height : '70vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
    };

    const padding_right = {
        paddingRight : '2vh',
    }

    const padding_top = {
        paddingTop : '3vh',
    }

    const bulletStyle = {
        padding : '2vh',
        textAlign: 'left',
    }

    const innerBoxStyle = {
        paddingTop: '15vh',
        width : '80%',
    }

    const nextButtonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }
    
    const nextButtonDisabledStyle = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    function nextPage(){
        navigate('/user-consent')
    }

    function handleCheckboxInputChange(event) {
        const name = event.target.id
        const value = event.target.checked
        if(name === 'check1') setcheck1(value)
        else if(name === 'check2') setcheck2(value)
        else if(name === 'check3') setcheck3(value)
        else setcheck4(value)
    }

    return(
        <div style={instructionsPopupStyle} id = 'instructions'>
            <center>
                <div style={innerBoxStyle}>
                    <h3>Please check the box to confirm the system setup</h3>
                    <p align = "left"><input type="checkbox" id="check1" name="check1" value={check1} onChange={handleCheckboxInputChange}/>I confirm that I am using Chrome browser</p>
                    <p align = "left"><input type="checkbox" id="check2" name="check2" value={check2} onChange={handleCheckboxInputChange}/>I enabled the microphone access when prompted</p>
                    <p align = "left"><input type="checkbox" id="check3" name="check3" value={check3} onChange={handleCheckboxInputChange}/>I recieved the meeting ID</p>
                    <p align = "left"><input type="checkbox" id="check4" name="check4" value={check4} onChange={handleCheckboxInputChange}/><b>I am in a quiet place without background noises</b></p>
                   <input 
                        style = {(!check1 || !check2 || !check3 || !check4) ? nextButtonDisabledStyle : nextButtonEnabledStyle } 
                        type="button" 
                        value="Begin" 
                        onClick={nextPage}
                        disabled = {(!check1 || !check2 || !check3 || !check4)} 
                    />   
                </div>      
            </center>  
        </div>
        );
    }
export default Instructions;
        