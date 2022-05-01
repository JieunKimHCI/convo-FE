import { useState } from "react";
import { useHistory } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Login (){
    
    const history = useHistory();

    const agreementPopupStyle = {
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
        paddingTop : '5vh',
    }

    const nextButtonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    const textBoxStyle = {
        width: '200px',
        height: '30px',
    }

    function login(){
        history.push("/admin")
    }

    return(
        <div style = {agreementPopupStyle} id = 'agreement'>
            <form>
                <center>
                <div style={padding_top}>
                    <b>Meeting ID</b>&nbsp;&nbsp;
                    <textarea id = 'meetingId' style={textBoxStyle}></textarea>
                </div>
                </center>
                <div style={padding_top}>
                    <input 
                        style={nextButtonEnabledStyle}
                        type="button" 
                        value="NEXT" 
                        onClick={login}
                    />   
                </div>
            </form>
        </div>
    );
}

export default Login;