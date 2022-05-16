import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition/lib/SpeechRecognition";
import { restUrl } from "..";

let MeetingId = '';
let NetId = '';
let sendDataBool = true;

function ClientMain(){

    const location = useLocation();
    const [excited, setExcited] = useState(0.0);
    const [frustrated, setFrustrated] = useState(0.0);
    const [impolite, setImpolite] = useState(0.0);
    const [polite, setPolite] = useState(0.0);
    const [sad, setSad] = useState(0.0);
    const [satisfied, setSatisfied] = useState(0.0);
    const [sympathetic, setSympathetic] = useState(0.0);
    const [currentTranscript, setCurrentTranscipt] = useState("");

    
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
        try{
            if(transcript != ""){
                const url = restUrl + 'pollconversation';
                const text = transcript;
                setCurrentTranscipt(currentTranscript + text);
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
                    if(response.status === 200){
                        response.json().then( response => {
                            setExcited(response.emotions.excited);
                            setFrustrated(response.emotions.frustrated);
                            setPolite(response.emotions.polite);
                            setImpolite(response.emotions.impolite);
                            setSad(response.emotions.sad);
                            setSatisfied(response.emotions.satisfied);
                            setSympathetic(response.emotions.sympathetic);
                        });
                    }
                    else{
                        throw new Error();
                    }
                });
            }
        }
        catch(error){
            console.log(error);
        }
        
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
        }, 7000);
        return () => clearInterval(interval);
    }, [location, transcript]);

    return(
        <div onLoadStart = {SpeechRecognition.startListening({continuous: true})} style={instructionsPopupStyle} id = 'clientMain'>
            {sendDataBool && <div>
                <h3>Now you are joining in a meeting</h3>
                <h3>Meeting ID: {MeetingId}</h3>
                <textarea value={currentTranscript}></textarea>
                <h3>Your emotion is detected by the agent</h3>
                <p>
                    Excited: {excited}, Frustrated: {frustrated}, Polite: {polite}, Impolite: {impolite}, Sad: {sad}, Satisfied: {satisfied}, Sympathetic: {sympathetic}
                </p>
                <button style={finishButtonStyle} onClick={() => {endMeeting();SpeechRecognition.startListening();}}>End meeting</button>
            </div>}
            {!sendDataBool && <div>
                <h3>The meeting has ended.</h3>
            </div>}
        </div>
        );
    }
export default ClientMain;
        