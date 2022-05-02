import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition/lib/SpeechRecognition";
import { restUrl } from "..";

let MeetingId = '';
let NetId = '';
let sendDataBool = true;

function ClientMain(){

    const location = useLocation();
    
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
    };

    const {
        transcript,
        resetTranscript,
    } = useSpeechRecognition();

    navigator.mediaDevices.getUserMedia({audio:true})

    function endMeeting(){
        sendDataBool = false;
        const url = restUrl + 'finish';
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
            SpeechRecognition.stopListening();
        });
    }

    function sendData(netId, meetingId, transcript){
        const url = restUrl + 'pollconversation';
        const text = transcript;
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
            NetId = location.state.netId;
            MeetingId = location.state.meetingId;
            if(sendDataBool){
                sendData(location.state.netId, location.state.meetingId, transcript);
            }
            else {
                // request for mic permissions
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [location, transcript]);

    return(
        <div onLoadStart = {SpeechRecognition.startListening({continuous: true})} style={instructionsPopupStyle} id = 'clientMain'>
            {sendDataBool && <div>
                <h3>The meeting is underway</h3>
                <button style={finishButtonStyle} onClick={() => {endMeeting();SpeechRecognition.startListening();}}>End meeting</button>
            </div>}
            {!sendDataBool && <div>
                <h3>The meeting has ended.</h3>
            </div>}
        </div>
        );
    }
export default ClientMain;
        