import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { restUrl } from "..";

const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();
let record = null;

function WaitingScreen() {
    const navigate = useNavigate();
    const location = useLocation();
    const allEqual = arr => arr.every(val => val === arr[0]);

    const container = {
        padding: '5vh',
    }

    const emotionDetectionPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        gridColumnGap: '0px',
        gridRowGap: '0px',
        width: '100vh',
        height: '80vh',
        alignItems: 'center',
        justifyContent: 'center',
    };

    function resetChoices(idx) {
        try {
            const url = restUrl + 'resetChoices?meetingId=' + location.state.meetingId;
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'idx': idx,
                }),
            })
                .then(response => {
                    if (response.status === 200) {
                        // do nothing
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

    function getSubmittedChoices() {
        try {
            const url = restUrl + 'submittedChoices';
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
                            console.log(response)
                            if (response.choices.length === 2) {
                                if (allEqual(response.choices)) {
                                    console.log('navigating to survey in waiting screen');
                                    navigate('/survey');
                                } else {
                                    resetChoices(response.idx);
                                    console.log('navigating in choices');
                                    navigate(
                                        '/client',
                                        {
                                            state: {
                                                netId: location.state.netId,
                                                meetingId: location.state.meetingId,
                                                taskId: location.state.taskId
                                            },
                                        });
                                }
                            }
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

    useEffect(() => {
        if (location.state.final) {
            console.log('i am here in interval')
            console.log(location.state.final)
            const interval = setInterval(() => {
                getSubmittedChoices();
            }, 9000);
            return () => clearInterval(interval);
        }
    });

    if (record == null) {
        record = client.record.getRecord(location.state.meetingId);

        record.subscribe('startGroupProblem', function (value) {
            if (value === 'true' && !location.state.final) {
                console.log('navigating in group');
                navigate(
                    '/client',
                    {
                        state: {
                            netId: location.state.netId,
                            meetingId: location.state.meetingId,
                            taskId: location.state.taskId
                        },
                    });
            }
        });
    }

    return (
        <div style={container}>
            <div style={emotionDetectionPopupStyle}>
                <h2>Please wait while the other participants complete the task.</h2>
            </div>
        </div>
    )

}
export default WaitingScreen;