import { useState } from "react";
import { useHistory } from "react-router-dom";
import { restUrl } from "..";

function Summary (){
    
    const [meetingId, setMeetingId] = useState("");
    const [summary, setSummary] = useState("");
    const [keywords, setKeywords] = useState("");


    const summaryPopupStyle = {
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

    const textBoxStyle = {
        width: '98%',
        height: '15vh',
    }

    function handleTextInputChange(event){
        const value = event.target.value
        setMeetingId(value)
    }
    
    function getSummary(){
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
            else{
                throw new Error();
            }
        });
    }

    function getKeywords(){
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
            else{
                throw new Error();
            }
        });
    }

    return(
        <div style = {summaryPopupStyle} id = 'summary'>
            <form>
                <div style={padding_top}>
                    <b>Meeting ID</b>&nbsp;&nbsp;
                    <input id = 'meetingId' name='meetingId' onChange={handleTextInputChange} />
                </div>
                <div style={padding_top}>
                    <input 
                        style = {meetingId === "" ? buttonDisabledStyle : buttonEnabledStyle } 
                        type="button" 
                        value="Get Summary" 
                        onClick={getSummary}
                        disabled = {meetingId === ""} 
                    /> 
                    <textarea value={summary} style={textBoxStyle} readOnly></textarea>
                </div>
                <div style={padding_top}>
                    <input 
                        style = {meetingId === "" ? buttonDisabledStyle : buttonEnabledStyle } 
                        type="button" 
                        value="Get Keywords" 
                        onClick={getKeywords}
                        disabled = {meetingId === ""} 
                    /> 
                    <textarea value={keywords} style={textBoxStyle} readOnly></textarea>
                </div>
            </form>
        </div>
    );
}

export default Summary;