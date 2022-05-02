import { useState, useEffect, KeyboardEvent} from "react";
import { useLocation } from "react-router-dom";
import { restUrl } from "..";


function EmotionDetection() {

    const location = useLocation();
    const [excited, setExcited] = useState(0.0);
    const [frustrated, setFrustrated] = useState(0.0);
    const [impolite, setImpolite] = useState(0.0);
    const [polite, setPolite] = useState(0.0);
    const [sad, setSad] = useState(0.0);
    const [satisfied, setSatisfied] = useState(0.0);
    const [sympathetic, setSympathetic] = useState(0.0);
    const [interjection, setInterjection] = useState("");

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

    const padding_top = {
        paddingTop : '2vh',
    }

    const padding_left = {
        paddingLeft : '2vh',
    }

    const rowStyle = {
        display: 'table',
        clear: 'both',
        width: '100%'
    }

    const column1Style = {
        float: 'left',
        width: '75%',
        height: '90%',
        border: '1px',
        border: '1px solid',
    
    }

    const column2Style = {
        float: 'left',
        width: '22%',
        height: '69vh',
        border: '1px solid',
        paddingLeft: '1vh'
    }

    const fullWidth = {
        width: '100%',
        height: '66vh'
    }

    const textBoxStyle = {
        width: '98%',
        height: '7vh',
        paddingTop: '2vh',
    }

    const handleKeyDown = (event) => {
        const key = event.code; 
        switch (key) {
          case 'KeyW':
            setInterjection("Let others speak")
            break;
          case 'KeyA':
            setInterjection("You are being too aggressive");
            break;
          case 'KeyS':
            setInterjection("Your are being too passive");
            break;
          case 'KeyD':
            setInterjection("Participants are confused");
            break;
        }
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
                        setExcited(response.emotions.excited);
                        setFrustrated(response.emotions.frustrated);
                        setPolite(response.emotions.polite);
                        setImpolite(response.emotions.impolite);
                        setSad(response.emotions.sad);
                        setSatisfied(response.emotions.satisfied);
                        setSympathetic(response.emotions.sympathetic);
                        let activeParticipantsList = "";
                        for (let i of response.participants) activeParticipantsList += '<li>' + i + '</li>';
                        document.getElementById('activeParticipants').innerHTML = activeParticipantsList;
                    });
                }
                else{
                    throw new Error();
                }
            });
        }
        catch(error){
            setExcited(0);
            setFrustrated(0);
            setPolite(0);
            setImpolite(0);
            setSad(0);
            setSatisfied(0);
            setSympathetic(0);
            alert('Something went wrong please refresh!');
        }
    }
 

    useEffect(() => {
        const interval = setInterval(() => {
            handleEmotion(location.state.meetingId)
        }, 15000);
        return () => clearInterval(interval);
    }, [location]);

    return(
        <div style = {emotionDetectionPopupStyle}>
            <div style={rowStyle}>
                <div style={column1Style}>
                    <div style={fullWidth}>
                        <center>
                            <h2>
                                <b style={padding_top}>Excited: </b> {excited}
                            </h2>
                            <h2>
                                <b style={padding_left}>Frustrated: </b> {frustrated}
                            </h2>
                            <h2>
                                <b style={padding_left}>Polite: </b> {polite}
                            </h2>
                            <h2>
                                <b style={padding_left}>Impolite: </b> {impolite}
                            </h2>
                            <h2>
                                <b style={padding_left}>Sad: </b> {sad}
                            </h2>
                            <h2>
                                <b style={padding_left}>Satisfied: </b> {satisfied}
                            </h2>
                            <h2>
                                <b style={padding_left}>Sympathetic: </b> {sympathetic}
                            </h2>
                            <textarea style={textBoxStyle} autoFocus value = {interjection} onKeyDown={handleKeyDown} readOnly/> 
                        </center>
                    </div>
                </div>
                <div style={column2Style}>
                    <h3>Active Participants</h3>
                    <ol id="activeParticipants"></ol>
                </div>
            </div>
        </div>
    );
}
export default EmotionDetection;