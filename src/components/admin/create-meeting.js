import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { restUrl } from "../..";

function CreateMeeting() {

    const navigate = useNavigate();
    const [meetingName, setMeetingName] = useState("");
    const [taskId, setTaskId] = useState("");

    const loginPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex: '9',
        width: '125vh',
        height: '70vh',
        textAlign: 'left',
        padding: '2vh',
        overflowY: 'auto',
    };

    const padding_top = {
        paddingTop: '5vh',
    }

    const loginButtonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '40%',
        padding: '2vh',
    }

    const loginButtonDisabledStyle = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '40%',
        padding: '2vh'
    }

    const taskButtonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '20%',
        padding: '2vh',
    }

    const taskButtonDisabledStyle = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '20%',
        padding: '2vh',
    }

    const innerBoxStyle = {
        paddingTop: '150px'
    }

    const taskButtonStyle = {
        display: 'inline',
        width: '100%',
        float: 'left',
        paddingTop: '25px',
        justifyContent: 'space-between'
    }

    function handleTextInputChange(event) {
        const value = event.target.value
        setMeetingName(value)
        setTaskId("");
    }

    function handleTaskDesertChange() {
        setTaskId(0);
    }

    function handleTaskHiddenChange() {
        setTaskId(1);
    }

    function createMeeting() {
        try {
            const url = restUrl + 'createMeeting';
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // 'meetingId': meetingId,
                    'meetingName': meetingName,
                    'taskId': taskId
                }),
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(data => {
                            const meetingId = data.meetingId;
                            navigate('/admin', {
                                state: {
                                    meetingId: meetingId,
                                },
                            });
                        });
                    }
                    else if (response.status === 300) {
                        alert('The meeting id that was entered was used previously. Please enter a new meeting id.')
                    }
                    else {
                        throw new Error();
                    }
                })
        }
        catch (error) {
            console.log('error', error);
        }
    }    

    return (
        <div style={loginPopupStyle} id='login'>
            <center>
                <form style={innerBoxStyle}>
                    <div style={padding_top}>
                        <b>Meeting Name</b>&nbsp;&nbsp;
                        <input id='meetingName' name='meetingName' onChange={handleTextInputChange} />
                    </div>
                    <div style={taskButtonStyle}>
                        <input
                            id='desertTask'
                            style={meetingName === "" || taskId === 1 ? taskButtonDisabledStyle : taskButtonEnabledStyle}
                            type="button"
                            value="Select Desert Task"
                            onClick={handleTaskDesertChange}
                            disabled={meetingName === ""}
                        />
                    </div>
                    <div style={taskButtonStyle}>
                        <input
                            id='hiddenTask'
                            style={meetingName === "" || taskId === 0 ? taskButtonDisabledStyle : taskButtonEnabledStyle}
                            type="button"
                            value="Select Hidden Task"
                            onClick={handleTaskHiddenChange}
                            disabled={meetingName === ""}
                        />
                    </div>
                    <div style={{ paddingTop: '21vh' }}>
                        <input
                            style={taskId === "" || meetingName === "" ? loginButtonDisabledStyle : loginButtonEnabledStyle}
                            type="button"
                            value="Create Meeting"
                            onClick={createMeeting}
                            disabled={meetingName === "" || taskId === ""}
                        />
                    </div>
                </form>
            </center>
        </div>
    );
}

export default CreateMeeting;