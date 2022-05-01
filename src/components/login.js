import { useState } from "react";
import { useHistory } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Login (){
    
    const history = useHistory();
    const [meetingId, setMeetingId] = useState("");
    const [keywords, setKeywords] = useState("");
    const [summary, setSummary] = useState("");

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

    function onChangeHandler(event){
        const value = event.target.value
        setMeetingId(value)
    }

    function login(){
        history.push("/admin")
    }
    function displayKeywords(meetingId){
        const url = 'https://convo-test-1.herokuapp.com/keywords';
        fetch(url, {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'meetingId': meetingId,
            }),
        })
        .then(response => {
            setKeywords(response)
        });
    }
    function displaySummary(meetingId){
        const url = 'https://convo-test-1.herokuapp.com/summary';
        fetch(url, {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'meetingId': meetingId,
            }),
        })
        .then(response => {
            setSummary(response)
        });
    }
    return(
        <div style = {agreementPopupStyle} id = 'agreement'>
            <form>
                <center>
                <div style={padding_top}>
                    <b>Meeting ID</b>&nbsp;&nbsp;
                    <textarea id = 'meetingId' name='meetingId' onChange={onChangeHandler} style={textBoxStyle}></textarea>
                </div>
                </center>
                <div style={padding_top}>
                    <input 
                        style={nextButtonEnabledStyle}
                        type="button" 
                        value="NEXT" 
                        onClick={login}
                    /> 
                    <textarea rows = "3" >{keywords}</textarea>
                    <input 
                        style={nextButtonEnabledStyle}
                        type="button" 
                        value="SHOW KEYWORDS" 
                        onClick={displayKeywords}
                    />
                    <textarea rows = "3">{summary}</textarea>  
                    <input 
                        style={nextButtonEnabledStyle}
                        type="button" 
                        value="SHOW SUMMARY" 
                        onClick={displaySummary}
                    />
                </div>
            </form>
        </div>
    );
}

export default Login;