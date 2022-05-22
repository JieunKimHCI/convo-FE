import { useState } from "react";
import { useHistory } from "react-router-dom";
import { restUrl } from "..";

function CreateMeeting (){
    
    const history = useHistory();
    const [meetingId, setMeetingId] = useState("");

    const loginPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '125vh',
        height : '70vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
    };

    const padding_top = {
        paddingTop : '5vh',
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
        padding: '2vh',
    }

    const innerBoxStyle = {
        padding: '20vh',
    }

    function handleTextInputChange(event){
        const value = event.target.value
        setMeetingId(value)
    }

    function createMeeting(){
        try{
            const url = restUrl + 'createMeeting';
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
                    history.push({
                        pathname: '/admin',
                        state: {
                            meetingId: meetingId,
                        },
                    });
                }
                else if(response.status === 300){
                    alert('The meeting id that was entered was used previously. Please enter a new meeting id.')
                }
                else{
                    throw new Error();
                }
            })
        }
        catch(error){
            console.log('error', error);
        }
    }

    return(
        <div style = {loginPopupStyle} id = 'login'>
            <center>
                <form style={innerBoxStyle}>
                    <div style={padding_top}>
                        <b>Meeting ID</b>&nbsp;&nbsp;
                        <input id = 'meetingId' name='meetingId' onChange={handleTextInputChange} />
                    </div>
                    <div style={padding_top}>
                        <input 
                            style = {meetingId === "" ? loginButtonDisabledStyle : loginButtonEnabledStyle } 
                            type="button" 
                            value="Create Meeting" 
                            onClick={createMeeting}
                            disabled = {meetingId === ""} 
                        /> 
                    </div>
                </form>
            </center>
        </div>
    );
}

export default CreateMeeting;