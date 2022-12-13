import {useNavigate, useLocation} from "react-router-dom";

const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();
let record = null;

function WaitingScreen() {
    const navigate = useNavigate();
    const location = useLocation();

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
        width : '100vh',
        height : '80vh',
        alignItems: 'center',
        justifyContent: 'center',
    };

    if(record == null){
        record = client.record.getRecord(location.state.meetingId);
               
        record.subscribe('startGroupProblem', function(value) {
            if (value == 'true') {
                navigate(
                    '/client',
                    { 
                        state: {
                          netId: location.state.netId,
                          meetingId: location.state.meetingId
                        },
                    });
            }
        });
    } 

    return(
        <div style={container}>
            <div style = {emotionDetectionPopupStyle}>
                <h2>Please wait while the other participants complete the task.</h2>
            </div>
        </div>
    )

 }
 export default WaitingScreen;