import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition/lib/SpeechRecognition";
// import cloneDeep from './lodash';

function ClientMain(){

    const location = useLocation();
    const [sendDataBool, setSendDataBool] = useState(true);
    const [MeetingId, setMeetingId] = useState('');
    const [NetId, setNetId] = useState('');
    
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

    const finishButtonStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    const {
        transcript,
        listening,
        resetTranscript,
    } = useSpeechRecognition();

    const hideStyle = {
        display: 'None',
    }

    function endMeeting(){
        setSendDataBool(false);
        const url = 'http://localhost:5000/finish'
        fetch(url, {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'meetingId': MeetingId,
                'netId': NetId,
            }),
        })
        .then(response => {
            console.log('response', response);
        });
    }

    function sendData(netId, meetingId){
        const url = 'http://localhost:5000/pollconversation';
        let text = document.getElementById('transcript_text').textContent;
        resetTranscript();
        fetch(url, {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'text': text,
                'netId': netId,
                'meetingId': meetingId,
                'timestamp': new Date().toISOString(),
            }),
        })
        .then(response => {
            console.log(response);
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setNetId(location.state.netId);
            setMeetingId(location.state.meetingId);
            if(sendDataBool){
                sendData(location.state.netId, location.state.meetingId);
            }
            else {
                // request for mic permissions
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [location]);

    return(
        <div onLoadStart = {SpeechRecognition.startListening({continuous: true})} style={instructionsPopupStyle} id = 'clientMain'>
            {sendDataBool && <div>
                <h3>The meeting is underway</h3>
                <p style={hideStyle} id='transcript_text'>{transcript}</p>
                <button style={finishButtonStyle} onClick={endMeeting}>End meeting</button>
            </div>}
            {!sendDataBool && <div>
                <h3>The meeting has ended.</h3>
            </div>}
        </div>
        );
    }
export default ClientMain;
        