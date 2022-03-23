import { Component } from "react";
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Dictaphone from "./speechtotext";

class EmotionDetection extends Component{
    
    submitForm = () => {
        this.props.handleEmotion(this.state)
    }
   
    state = this.initialState

    render() {

        const emotionPopupStyle = {
            backgroundColor: 'black',
            color: 'white',
            zIndex : '9',
            width : '125vh',
            height : '70vh',
            textAlign : 'center',
            padding : '2vh',
            overflowY: 'auto',
        };

        const padding_top = {
            paddingTop : '2vh',
        }

        const buttonDisabledStyle = {
            backgroundColor: 'grey',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            width: '99%',
            padding: '2vh',
        }
        
       return(
            <div style = {emotionPopupStyle} id = 'emotion-detection'>
                <div>
                    <Dictaphone/>
                </div>
                <div style={padding_top}>
                        <input 
                            type="button"
                            style={buttonDisabledStyle}
                            value="Show Emotions" 
                            onClick= {this.submitForm.handleEmotion}/>
                </div>
            </div>
        );
    }
}

export default EmotionDetection; 