import { useState } from "react";    
    
function Instructions(){
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
        paddingTop : '2vh',
    }

    const nextButtonStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    function nextPage(){
        history.push('/agreement')
    }
    return(
        <div style={instructionsPopupStyle} id = 'instructions'>
                <h1>INSTRUCTIONS</h1>
                    <p>
                        <ol>
                            <li>Fill out the agreement to start using the software and participate in this study</li>
                            <li>Enable Microphone access on your browser when prompted</li>
                            <li>Click on the Microphone Icon to start recording </li>
                            <li>Double click on the Microphone Icon to stop recording </li>
                            <li>Click on the show emotions button to analyze emotions</li>
                        </ol>
                    </p>
                <button style={nextButtonStyle} onClick={nextPage}>BEGIN</button>
            </div>
        );
    }
export default Instructions;
        