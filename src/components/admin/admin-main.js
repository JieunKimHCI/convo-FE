import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { restUrl } from "../..";
import TextToSpeech from "./text-to-speech";

import AdminUserControl from './admin-user-control';

var activeParticipants = []
var MeetingActive = true;
let record = null;
const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();

function AdminMain() {

    const location = useLocation();
    const meetingId = location.state.meetingId;
    const [accumulatedTranscript, setAccumulatedTranscript] = useState("");
    const [message, setMessage] = useState();
    const [dropdownOptionChose, setDropdownOptionChose] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [meetingActive, setMeetingActive] = useState(true);
    const [summary, setSummary] = useState("");
    const [keywords, setKeywords] = useState("");
    const [displayActiveParticipants, setDisplayActiveParticipants] = useState([])

    // voice pitch
    const [pitch, setPitch] = useState(1);
    // speaking rate
    const [rate, setRate] = useState(1);
    // index used to control which voice to use for text-to-speech
    const [voiceIndex, setVoiceIndex] = useState(0);

    const emotionDetectionPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex: '9',
        width: '125vh',
        height: '70vh',
        textAlign: 'left',
        padding: '2vh',
        overflowY: 'auto',
        margin: '3vh'
    };

    const fullWidth = {
        width: '100%',
    }

    const textBoxStyle = {
        maxWidth: '99%',
        width: '99%',
    }

    const finishButtonStyle = {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        padding: '2vh',
    };

    const sendButtonStyleEnabled = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '10%',
        padding: '0.5vh',
    }

    const sendButtonStyleDisabled = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '10%',
        padding: '0.5vh',
    }

    const userButtonStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        padding: '10px 0px',
        fontSize: '20px',
        textAlign: 'center',
        margin: '5px',
        alignContent: 'center',
        fontWeight: 'bold',
        width: '6.5em'
    }

    const labelStyle = {
        color: 'black',
        alignSelf: 'center',
        fontSize: '25px'
    }

    const gridContainer = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridTemplateRows: 'repeat(1, 1fr)',
        gridColumnGap: '10px',
        gridRowGap: '10px',
        justifyContent: 'center',
        width: '125vh',
        gridAutoRows: 'minmax(100px, auto)',
        backgroundColor: 'white',
        color: 'black',
        padding: '2vh',
        marginTop: '20px'
    };

    const padding_top = {
        paddingTop: '5vh',
    }

    const buttonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    const buttonDisabledStyle = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    const summaryTextBoxStyle = {
        width: '98%',
        height: '15vh',
    }

    const inputTextStyle = {
        width: '50%',
    };

    const dropDownStyle = {
        width: '15%',
    }

    function getActiveParticipants(meetingId) {
        try {
            const url = restUrl + 'activeParticipants?meetingId=' + meetingId;
            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(response => {
                            let same = true;

                            // check that each response entry is in current list
                            for (let netId in response) {
                                let name = response[netId];
                                const inList = activeParticipants.some(element => {
                                    return (element.netId === netId && element.name === name);
                                });

                                if (!inList) {
                                    same = false;
                                }
                            }

                            // check that lists are the same length
                            if (activeParticipants.length !== Object.keys(response).length) {
                                same = false
                            }

                            if (!same) {
                                let participants = [];
                                for (let netId in response) {
                                    let name = response[netId];
                                    participants.push({ netId, name });
                                }
                                activeParticipants = participants;
                                setDisplayActiveParticipants(participants);

                                let dropdownOptions = "<option value=''/>";
                                for (let netId in response) {
                                    dropdownOptions += "<option value=" + netId + ">" + netId + "</option>"
                                }
                                document.getElementById('dropdown').innerHTML = dropdownOptions;
                            }
                        });
                    }
                    else {
                        throw new Error();
                    }
                });
        }
        catch (error) {
            alert('Something went wrong please refresh!');
        }
    }

    function handleMessageInputChange(event) {
        const value = event.target.value;
        setMessage(value);
    }

    function handleDropdownOptionChange(event) {
        const value = event.target.value;
        setDropdownOptionChose(value);
    }

    function sendMessage(event) {
        if (dropdownOptionChose === "") alert('Select a valid participant!');
        else if (message === "") alert('Message is empty!');
        else {
            record.set(dropdownOptionChose, {
                message: message,
                pitch: pitch,
                rate: rate,
                voiceIndex: voiceIndex,
            });
            alert('Message sent to ' + dropdownOptionChose);
            setMessage("");
            setDropdownOptionChose("");
        }
    }

    function getAccumulatedTranscript(meetingId) {
        try {
            const url = restUrl + 'transcript?meetingId=' + meetingId;
            fetch(url, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(response => {
                            setAccumulatedTranscript(response.transcript);
                        });
                    }
                    else {
                        alert('Something went wrong!')
                        throw new Error();
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    function endMeeting() {
        try {
            const url = restUrl + 'endMeeting';
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
                    if (response.status === 200) {
                        MeetingActive = false;
                        setMeetingActive(false);
                        record.set('endMeeting', 'true');
                        record.set('endMeetingTimer', 'true');
                    }
                    else {
                        alert('Something went wrong! Please try to end the meeting again.');
                        throw new Error();
                    }
                });
        }
        catch (error) {
            alert('Something went wrong! Please try to end the meeting again.');
        }
    }

    function getSummary() {
        try {
            const url = restUrl + 'summary';
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
                    if (response.status === 200) {
                        response.json().then(response => {
                            setSummary(response.summary);
                        });
                    }
                    else if (response.status === 404) {
                        alert('Enter a valid meeting ID');
                    }
                    else {
                        throw new Error();
                    }
                });
        }
        catch (error) {
            alert('Something went wrong!');
        }
    }

    function getKeywords() {
        try {
            const url = restUrl + 'keywords';
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
                    if (response.status === 200) {
                        response.json().then(response => {
                            setKeywords(response.keywords);
                        });
                    }
                    else if (response.status === 404) {
                        alert('Enter a valid meeting ID');
                    }
                    else {
                        throw new Error();
                    }
                });
        }
        catch (error) {
            alert('Something went wrong!');
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (MeetingActive) {
                getActiveParticipants(location.state.meetingId);
                getAccumulatedTranscript(location.state.meetingId);
            }
            if (record == null) {
                record = client.record.getRecord(location.state.meetingId);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [location]);

    return (
        <><AdminUserControl meetingId={meetingId} />
            <div style={emotionDetectionPopupStyle}>

                {MeetingActive && <div>
                    <div style={gridContainer}>
                        <label style={labelStyle}>Active Participants</label>
                        {displayActiveParticipants.map((i) => <button style={userButtonStyle} key={i.name}> {i.name} </button>)}
                    </div>
                    <div style={fullWidth}>
                        <center>
                            <h2>Meeting ID: {meetingId}</h2>
                            <textarea rows="10" style={textBoxStyle} value={accumulatedTranscript} readOnly />
                        </center>
                    </div>
                    <br></br>
                    <div>
                        <center>
                            <label>Message: </label>
                            <input style={inputTextStyle} id='messageInput' type="text" value={message} onChange={handleMessageInputChange} />
                            <label>  Send To: </label>
                            <select style={dropDownStyle} id='dropdown' value={dropdownOptionChose} onChange={handleDropdownOptionChange} />
                            &nbsp;&nbsp;
                            <button style={(message === "" || dropdownOptionChose === "") ? sendButtonStyleDisabled : sendButtonStyleEnabled} onClick={sendMessage} disabled={message === "" || dropdownOptionChose === ""}>Send</button>
                            <TextToSpeech text={message} pitch={pitch} setPitch={setPitch} rate={rate} setRate={setRate} voiceIndex={voiceIndex} setVoiceIndex={setVoiceIndex} />
                        </center>
                    </div>
                    <br></br><br></br><br></br><br></br>
                    <button style={finishButtonStyle} onClick={endMeeting}>End Meeting</button>
                </div>}
                {!MeetingActive && <div>
                    <div style={fullWidth}>
                        <center>
                            <h2>Meeting ID: {meetingId} was ended by the admin.</h2>
                        </center>
                        <div style={padding_top}>
                            <input
                                style={meetingId === "" ? buttonDisabledStyle : buttonEnabledStyle}
                                type="button"
                                value="Get Summary"
                                onClick={getSummary}
                                disabled={meetingId === ""}
                            />
                            <textarea value={summary} style={summaryTextBoxStyle} readOnly></textarea>
                        </div>
                        <div style={padding_top}>
                            <input
                                style={meetingId === "" ? buttonDisabledStyle : buttonEnabledStyle}
                                type="button"
                                value="Get Keywords"
                                onClick={getKeywords}
                                disabled={meetingId === ""}
                            />
                            <textarea value={keywords} style={summaryTextBoxStyle} readOnly></textarea>
                        </div>
                    </div>
                </div>}
            </div>
        </>
    );
}
export default AdminMain;