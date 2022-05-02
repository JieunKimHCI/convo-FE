import { useState } from "react";
import { useHistory } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Login (){
    
    const history = useHistory();
    const [meetingId, setMeetingId] = useState("");

    const loginPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '125vh',
        height : '70vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
    };

    const padding_top = {
        paddingTop : '5vh',
    }

    const loginButtonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    const loginButtonDisabledStyle = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    function handleTextInputChange(event){
        const value = event.target.value
        setMeetingId(value)
    }

    function login(){
        history.push({
            pathname: '/admin',
            state: {
                meetingId: meetingId,
            },
        });
    }

    return(
        <div style = {loginPopupStyle} id = 'login'>
            <form>
                <div style={padding_top}>
                    <b>Meeting ID</b>&nbsp;&nbsp;
                    <input id = 'meetingId' name='meetingId' onChange={handleTextInputChange} />
                </div>
                <div style={padding_top}>
                    <input 
                        style = {meetingId === "" ? loginButtonDisabledStyle : loginButtonEnabledStyle } 
                        type="button" 
                        value="Start Meeting" 
                        onClick={login}
                        disabled = {meetingId === ""} 
                    /> 
                </div>
            </form>
            <div>
                <h4>INSTRUCTIONS</h4>
                <ol>
                    <li>Please share the next screen on Zoom</li>
                </ol>
            </div>
        </div>
    );
}

export default Login;