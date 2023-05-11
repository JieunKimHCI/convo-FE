import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition/lib/SpeechRecognition";
import { restUrl } from "../..";
import DesertProblemShared from '../tasks/desertTask/desert-problem-shared';
import HiddenProblemShared from '../tasks/hiddenInfoTask/hidden-problem-shared';
import { useSpeechSynthesis } from "react-speech-kit";
import "./client-main.css";

let MeetingId = '';
let NetId = '';
let record = null;
let timeSilent = 0;
const { DeepstreamClient } = window.DeepstreamClient;
let client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();

function ClientMain() {

    const location = useLocation();
    const navigate = useNavigate();
    const [excited, setExcited] = useState('0.00');
    const [frustrated, setFrustrated] = useState('0.00');
    const [impolite, setImpolite] = useState('0.00');
    const [polite, setPolite] = useState('0.00');
    const [sad, setSad] = useState('0.00');
    const [satisfied, setSatisfied] = useState('0.00');
    const [sympathetic, setSympathetic] = useState('0.00');
    const [currentTranscript, setCurrentTranscipt] = useState("");
    const [meetingId, setMeetingId] = useState("");
    const [promptCounter, setPromptCounter] = useState(-1);
    const [submittable, setSubmittable] = useState(false);
    const [sendDataBool, setSendDataBool] = useState(true);

    // intervention text
    const [intervention, setIntervention] = useState('');
    // voice pitch
    const [pitch, setPitch] = useState(1);
    // speaking rate
    const [rate, setRate] = useState(1);
    // index used to control which voice to use for text-to-speech
    const [voiceIndex, setVoiceIndex] = useState(0);

    const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();

    // the specific voice object used to convert text to speech
    const voice = voices[voiceIndex] || null;

    const container = {
        padding: '10vh',
    }

    const instructionsPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex: '9',
        width: '125vh',
        height: '70vh',
        textAlign: 'left',
        padding: '2vh',
        overflowY: 'auto',
    };

    const finishButtonStyle = {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh'
    };

    const textareaStyle = {
        maxWidth: '99%',
        width: '99%',
    }

    const {
        transcript,
        resetTranscript,
    } = useSpeechRecognition();

    navigator.mediaDevices.getUserMedia({ audio: true })

    function endMeeting() {
        setSendDataBool(false);
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
                SpeechRecognition.stopListening();
                console.log('endmeeting true');
                record.set('endMeeting', 'false');
                record.set('endMeetingTimer', 'true');
            });
    }

    function leaveMeeting() {
        setSendDataBool(false);
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
                SpeechRecognition.stopListening();
                console.log('leaving in leave meeting')
                navigate('/survey');
            });
    }

    function sendData(netId, meetingId, transcript) {
        try {
            // if(transcript != ""){
            const url = restUrl + 'pollconversation';
            const text = transcript;
            if (text !== "") {
                setCurrentTranscipt(currentTranscript + (currentTranscript === "" ? "" : ". ") + text);
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
                    if (response.status === 200) {
                        response.json().then(response => {
                            setExcited(Math.round(response.emotions.excited * 100) / 100);
                            setFrustrated(Math.round(response.emotions.frustrated * 100) / 100);
                            setPolite(Math.round(response.emotions.polite * 100) / 100);
                            setImpolite(Math.round(response.emotions.impolite * 100) / 100);
                            setSad(Math.round(response.emotions.sad * 100) / 100);
                            setSatisfied(Math.round(response.emotions.satisfied * 100) / 100);
                            setSympathetic(Math.round(response.emotions.sympathetic * 100) / 100);
                        });
                    }
                    // 204 when either (1) no speech data or (2) not enough speech data was sent for emotion classification
                    else if (response.status === 204) {
                        console.log("Not enough text was collected to classify emotion!")
                    }
                    else {
                        throw new Error();
                    }
                });
            // }
        }
        catch (error) {
            console.log(error);
        }

    }

    function setTimeSilent(netId, meetingId, newTimeSilent) {
        try {
            const url = restUrl + 'setTimeSilent';
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'newTimeSilent': newTimeSilent,
                    'netId': netId,
                    'meetingId': meetingId,
                }),
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error();
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    function incrementPingCount(netId, meetingId) {
        try {
            const url = restUrl + 'incrementPingCount';
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'netId': netId,
                    'meetingId': meetingId,
                }),
            })
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error();
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    SpeechRecognition.startListening({ continuous: true })

    useEffect(() => {
        if (intervention && voice && intervention !== "dummy") {
            speak({ text: intervention, voice, rate, pitch });
        }
    }, [intervention, voice]);

    useEffect(() => {
        const interval = setInterval(() => {
            NetId = location.state.netId;
            MeetingId = location.state.meetingId;
            setMeetingId(MeetingId);
            // to make sure that the intervention only pops up once and not periodically every few seconds
            let prevValue = '';
            let submittable = false;
            if (record == null) {
                record = client.record.getRecord(location.state.meetingId);
                record.subscribe(location.state.netId, function (value) {
                    if (value.message !== "" && !(JSON.stringify(value) === JSON.stringify(prevValue))) {
                        if (value.messageType !== "Audio") {
                            prevValue = value;
                            setPitch(1);
                            setRate(1);
                            setVoiceIndex(0);
                            setIntervention("dummy");
                        }
                        if (value.messageType !== "Text") {
                            prevValue = value;
                            setPitch(value.pitch);
                            setRate(value.rate);
                            setVoiceIndex(value.voiceIndex);
                            setIntervention(value.message);
                        }

                        var messageDiv = document.getElementById('message');
                        if (value.messageType !== "Text") {
                            messageDiv.innerHTML = 'Intervention received!';
                        }
                        if (value.messageType !== "Audio") {
                            messageDiv.innerHTML = value.message;
                        }
                    }
                });
                // redirect all users to survey page if (1) admin ends meeting
                record.subscribe('endMeeting', function (value) {
                    if (value === 'true') {
                        record.set('startGroupProblem', 'false');
                        endMeeting();
                        record.set('endMeeting', 'false');
                        record.set('endMeetingTimer', 'true');
                        navigate('/survey');
                    }
                });
                record.subscribe('submissionPrompt', function (value) {
                    if (value === 'true' && !submittable) {
                        submittable = true;
                        setSubmittable(true);
                        alert("Please finalize your response and submit!");
                    }
                });
            }
            if (sendDataBool) {
                sendData(location.state.netId, location.state.meetingId, transcript);

                if (transcript === '') {
                    timeSilent = timeSilent + 7;
                    setTimeSilent(location.state.netId, location.state.meetingId, timeSilent);
                }
            }
        }, 7000);
        return () => clearInterval(interval);
    }, [location, transcript, navigate, sendDataBool]);

    // update ping counts of each user every 7 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (sendDataBool) {
                incrementPingCount(location.state.netId, location.state.meetingId);
            }
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    const closeModal = () => {
        setIntervention("");
    }

    return (
        <div style={container}>
            <div id='clientMain'>
                {sendDataBool &&
                    <div>
                        <div className={`Modal ${intervention ? 'Show' : ''}`}>
                            <div id="message" style={{ padding: '10px', color: 'black' }}></div>
                            {intervention !== "dummy" && (
                                <button onClick={() => speak({ text: intervention, voice, rate, pitch })}>
                                    Replay
                                </button>
                            )}
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                onClick={closeModal}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div>
                            {location.state.taskId === 0 ?
                                <DesertProblemShared submittable={submittable} setSendDataBool={setSendDataBool} /> :
                                <HiddenProblemShared submittable={submittable} setSendDataBool={setSendDataBool} />
                            }
                        </div>
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
