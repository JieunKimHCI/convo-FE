import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition/lib/SpeechRecognition";
import { restUrl, deepStreamUrl } from "..";

let MeetingId = '';
let NetId = '';
let sendDataBool = true;
let record = null;
const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://desolate-spire-52971.herokuapp.com');
client.login();

function ClientMain(){

    const location = useLocation();
    const [excited, setExcited] = useState('0.00');
    const [frustrated, setFrustrated] = useState('0.00');
    const [impolite, setImpolite] = useState('0.00');
    const [polite, setPolite] = useState('0.00');
    const [sad, setSad] = useState('0.00');
    const [satisfied, setSatisfied] = useState('0.00');
    const [sympathetic, setSympathetic] = useState('0.00');
    const [currentTranscript, setCurrentTranscipt] = useState("");
    const [meetingId, setMeetingId] = useState("");

     const container = {
        padding: '10vh',
    }
    
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

    const textareaStyle = {
        maxWidth: '99%',
        width: '99%',
    }

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
            // if(transcript != ""){
                const url = restUrl + 'pollconversation';
                const text = transcript;
                if(text != ""){
                    setCurrentTranscipt(currentTranscript + (currentTranscript=="" ? "" : ". ") + text);
                }
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
                            setExcited(Math.round(response.emotions.excited * 100) / 100);
                            setFrustrated(Math.round(response.emotions.frustrated * 100) / 100);
                            setPolite(Math.round(response.emotions.polite * 100) / 100);
                            setImpolite(Math.round(response.emotions.impolite * 100) / 100);
                            setSad(Math.round(response.emotions.sad * 100) / 100);
                            setSatisfied(Math.round(response.emotions.satisfied * 100) / 100);
                            setSympathetic(Math.round(response.emotions.sympathetic * 100) / 100);
                        });
                    }
                    else{
                        throw new Error();
                    }
                });
            // }
        }
        catch(error){
            console.log(error);
        }
        
    }

    useEffect(() => {
        const interval = setInterval(() => {
            console.log(location)
            NetId = location.state.netId;
            MeetingId = location.state.meetingId;
            setMeetingId(MeetingId);
            if(record == null){
                record = client.record.getRecord(location.state.meetingId);
                record.subscribe(location.state.netId, function(value) {
                    alert('Intervention: ' + value);
                }); 
                record.subscribe('endMeeting', function(value) {
                    if(value == 'true'){
                        endMeeting();
                    }
                })
            }
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
        <div style={container}>
        <div onLoadStart = {SpeechRecognition.startListening({continuous: true})} style={instructionsPopupStyle} id = 'clientMain'>
            {sendDataBool && <div>
                <center>
                    <h3>Meeting ID: {meetingId}</h3>
                    <textarea style={textareaStyle} rows = "10" value={currentTranscript} readOnly></textarea>
                    {/* <h3>Your emotion is detected by the agent</h3>
                    <p>
                        Excited: {excited}, Frustrated: {frustrated}, Polite: {polite}, Impolite: {impolite}, Sad: {sad}, Satisfied: {satisfied}, Sympathetic: {sympathetic}
                    </p> */}
                    <button style={finishButtonStyle} onClick={endMeeting}>Leave Meeting</button>
                </center>
            </div>}
            {!sendDataBool && <div>
                <center>
                    <h3>You have left the meeting.</h3>
                </center>
            </div>}
        </div>
        </div>
        );
    }
export default ClientMain;
        