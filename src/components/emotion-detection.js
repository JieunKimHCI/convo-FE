import { useState, useEffect, KeyboardEvent} from "react";
import { useLocation } from "react-router-dom";
import { restUrl, deepStreamUrl } from "..";

var activeParticipants = [];
var MeetingActive = true;
let record = null;
const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('localhost:6020');
// const client = new DeepstreamClient(deepStreamUrl);
client.login();

function EmotionDetection() {

    const location = useLocation();
    const [meetingId, setMeetingId] = useState("");
    const [accumulatedTranscript, setAccumulatedTranscript] = useState(""); 
    // const [activeParticipants, setActiveParticipants] = useState([]);
    const [message, setMessage] = useState();
    const [dropdownOptionChose, setDropdownOptionChose] = useState("");
    const [meetingActive, setMeetingActive] = useState(true);
    const [summary, setSummary] = useState("");
    const [keywords, setKeywords] = useState("");
    // const { DeepstreamClient } = window.DeepstreamClient;
    // const client = new DeepstreamClient(deepStreamUrl);
    // client.login();

    const emotionDetectionPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '125vh',
        height : '70vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
    };

    const fullWidth = {
        width: '100%',
    }

    const textBoxStyle = {
        maxWidth: '99%',
        width: '99%',
    }

    const finishButtonStyle = {
        backgroundColor: '#282c34',
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

    const padding_top = {
        paddingTop : '5vh',
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

    function handleEmotion(meetingId){
        try{
            const url = restUrl + 'emotions?meetingId=' + meetingId;
            fetch(url, {
                method: 'GET',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if(response.status === 200){
                    response.json().then( response => {
                        let same = true;
                        if(activeParticipants.length == response.participants.length){
                            for(let activeParticipant in activeParticipants){
                                if(activeParticipants[activeParticipant] != response.participants[activeParticipant]){
                                    same = false;
                                    break;
                                }
                            }
                        }
                        else same = false;
                        if(!same){
                            activeParticipants = response.participants;
                            let dropdownOptions = "<option value=''/>";
                            for (let activeParticipant in response.participants){
                                dropdownOptions += "<option value=" + response.participants[activeParticipant] + ">" + response.participants[activeParticipant] + "</option>"
                            }
                            document.getElementById('dropdown').innerHTML = dropdownOptions;
                        }
                    });
                }
                else{
                    throw new Error();
                }
            });
        }
        catch(error){
            alert('Something went wrong please refresh!');
        }
    }
    
    function handleMessageInputChange(event) {
        const value = event.target.value;
        setMessage(value);
    }

    function handleDropdownOptionChange(event){
        const value = event.target.value;
        setDropdownOptionChose(value);
    }

    function sendMessage(event) {
        if(dropdownOptionChose === "") alert('Select a valid participant!');
        else if(message === "") alert('Message is empty!');
        else{
            record.set(dropdownOptionChose, message);
            // alert('Sending message ' + message + ' to ' + dropdownOptionChose);
        }
    }
      
    function getAccumulatedTranscript(meetingId){
        try{
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
                if(response.status === 200){
                    response.json().then( response => {
                        setAccumulatedTranscript(response.transcript);
                    });
                }
                else{
                    alert('Something went wrong!')
                    throw new Error();
                }
            });
        }
        catch(error){
            console.log(error);
        }
    }

    function endMeeting(){
        try{
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
                if(response.status === 200){
                   // do nothing
                   MeetingActive = false;
                   setMeetingActive(false);
                   record.set('endMeeting', 'true');
                }
                else{
                    alert('Something went wrong! Please try to end the meeting again.');
                    throw new Error();
                }
            });
        }
        catch(error){
            alert('Something went wrong! Please try to end the meeting again.');
        }
    }

    function getSummary(){
        try{
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
                if(response.status === 200){
                    response.json().then( response => {
                        setSummary(response.summary);
                    });
                }
                else if(response.status === 404){
                    alert('Enter a valid meeting ID');
                }
                else{
                    throw new Error();
                }
            });
        }
        catch(error){
            alert('Something went wrong!');
        }
    }

    function getKeywords(){
        try{
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
                if(response.status === 200){
                    response.json().then( response => {
                        setKeywords(response.keywords);
                    });
                }
                else if(response.status === 404){
                    alert('Enter a valid meeting ID');
                }
                else{
                    throw new Error();
                }
            });
        }
        catch(error){
            alert('Something went wrong!');
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(MeetingActive){
                setMeetingId(location.state.meetingId);
                handleEmotion(location.state.meetingId);
                getAccumulatedTranscript(location.state.meetingId);
            }
            if(record == null){
                record = client.record.getRecord(location.state.meetingId);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [location]);

    return(
        <div style = {emotionDetectionPopupStyle}>
            {MeetingActive && <div>
                <div style={fullWidth}>
                    <center>
                        <h2>Meeting ID: {meetingId}</h2>
                        <textarea rows = "14" style={textBoxStyle} value = {accumulatedTranscript} readOnly/>
                    </center>
                </div>
                <br></br>
                <div>
                    <center>
                        <label>Message: </label>
                        <input style={inputTextStyle} type="text" name="text" onChange={handleMessageInputChange} />
                        <label>  Send To: </label>
                        <select style={dropDownStyle} id='dropdown' onChange={handleDropdownOptionChange}/>
                        &nbsp;&nbsp;
                        <button style={(message == "" || dropdownOptionChose == "") ? sendButtonStyleDisabled : sendButtonStyleEnabled} onClick={sendMessage} disabled={message == "" || dropdownOptionChose == ""}>Send</button>
                    </center>
                </div>
                <br></br>
                <button style={finishButtonStyle} onClick={endMeeting}>End meeting</button>
            </div>}
            {!MeetingActive && <div>
                <div style={fullWidth}>
                    <center>
                        <h2>Meeting ID: {meetingId} was ended by the admin.</h2>
                    </center>
                    <div style={padding_top}>
                        <input 
                            style = {meetingId === "" ? buttonDisabledStyle : buttonEnabledStyle } 
                            type="button" 
                            value="Get Summary" 
                            onClick={getSummary}
                            disabled = {meetingId === ""} 
                        /> 
                        <textarea value={summary} style={summaryTextBoxStyle} readOnly></textarea>
                    </div>
                    <div style={padding_top}>
                        <input 
                            style = {meetingId === "" ? buttonDisabledStyle : buttonEnabledStyle } 
                            type="button" 
                            value="Get Keywords" 
                            onClick={getKeywords}
                            disabled = {meetingId === ""} 
                        /> 
                        <textarea value={keywords} style={summaryTextBoxStyle} readOnly></textarea>
                    </div>
                </div>
            </div>}
        </div>
    );
}
export default EmotionDetection;