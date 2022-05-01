import { useState, useEffect, KeyboardEvent} from "react";
import { useLocation } from "react-router-dom";


function EmotionDetection() {

    const location = useLocation();
    const [activeParticipants, setActiveParticipants] = useState("");
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
    }

    const handleKeyDown = (event) => {
        const key = event.code; 
        switch (key) {
          case 'KeyW':
            setInterjection("Interjection Statement 1")
            break;
          case 'KeyA':
            setInterjection("Interjection Statement 2");
            break;
          case 'KeyS':
            setInterjection("Interjection Statement 3");
            break;
          case 'KeyD':
            setInterjection("Interjection Statement 4");
            break;
          default:
            alert("HELLO");  
        }
      }
    function handleEmotion(meetingId){
        try{
            const url = 'https://convo-test-1.herokuapp.com/emotions?meetingId=' + meetingId;
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
                        setActiveParticipants(response.participants);
                        let activeParticipantsList = "";
                        for (let i of response.participants) activeParticipantsList += i + '\n';
                        setActiveParticipants(activeParticipantsList);
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
            // Create a page for admin to input the meeting id
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
                                <b style={padding_left}>Frustrated: </b> {frustrated}
                                <b style={padding_left}>Polite: </b> {polite}
                                <b style={padding_left}>Impolite: </b> {impolite}
                            </h2>
                            <h2>
                                <b style={padding_left}>Sad: </b> {sad}
                                <b style={padding_left}>Satisfied: </b> {satisfied}
                                <b style={padding_left}>Sympathetic: </b> {sympathetic}
                            </h2>
                            <textarea style={{width: '99%'}} rows = '5' value = {interjection} onKeyDown={handleKeyDown} />
                        </center>
                    </div>
                            
                </div>
                <div style={column2Style}>
                    <h3>Active Participants</h3>
                    <p>{activeParticipants}</p>
                </div>
            </div>
        </div>
    );
}
export default EmotionDetection;