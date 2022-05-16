import { useState, useEffect, KeyboardEvent} from "react";
import { useLocation } from "react-router-dom";
import { restUrl } from "..";

var activeParticipants = [];
var MeetingActive = true;

function EmotionDetection() {

    const location = useLocation();
    const [meetingId, setMeetingId] = useState("");
    const [accumulatedTranscript, setAccumulatedTranscript] = useState(""); 
    // const [activeParticipants, setActiveParticipants] = useState([]);
    const [message, setMessage] = useState();
    const [dropdownOptionChose, setDropdownOptionChose] = useState("");
    const [meetingActive, setMeetingActive] = useState(true);

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
        height: '66vh'
    }

    const textBoxStyle = {
        width: '98%',
        height: '7vh',
        paddingTop: '2vh',
    }

    const finishButtonStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    };

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
        const value = event.target.value
        if(dropdownOptionChose === "") alert('Select a valid participant!')
        else alert('Sending message ' + message + ' to ' + dropdownOptionChose);
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

    useEffect(() => {
        const interval = setInterval(() => {
            if(MeetingActive){
                setMeetingId(location.state.meetingId);
                handleEmotion(location.state.meetingId);
                getAccumulatedTranscript(location.state.meetingId);
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
                        <textarea style={textBoxStyle} value = {accumulatedTranscript} readOnly/>
                    </center>
                </div>
                <div>
                    <label>Message: </label>
                    &nbsp;&nbsp;
                    <input type="text" name="text" onChange={handleMessageInputChange} />
                    <label>Send To: </label>
                    <select id='dropdown' onChange={handleDropdownOptionChange}/>
                    <button onClick={sendMessage}>Send</button>
                </div>
                <button style={finishButtonStyle} onClick={endMeeting}>End meeting</button>
            </div>}
            {!MeetingActive && <div>
                <div style={fullWidth}>
                    <center>
                        <h2>Meeting ID: {meetingId} was ended by the admin.</h2>
                    </center>
                </div>
            </div>}
        </div>
    );
}
export default EmotionDetection;