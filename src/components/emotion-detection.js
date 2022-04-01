import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '@mui/material/Button'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ReplayIcon from '@mui/icons-material/Replay';

function EmotionDetection() {

    const [sentence, setSentence] = useState('');
    const [excited, setExcited] = useState(0.0);
    const [frustrated, setFrustrated] = useState(0.0);
    const [impolite, setImpolite] = useState(0.0);
    const [polite, setPolite] = useState(0.0);
    const [sad, setSad] = useState(0.0);
    const [satisfied, setSatisfied] = useState(0.0);
    const [sympathetic, setSympathetic] = useState(0.0);

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

    const textareaStyle = {
        maxWidth: '99%',
        width: '99%',
        height: '40vh',
    }

    const padding_top = {
        paddingTop : '2vh',
    }

    const padding_left = {
        paddingLeft : '2vh',
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
        color: 'black',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    function handleEmotion(){
        try{
            const url = 'https://ibm-convo.herokuapp.com/ibm/emotions'
            fetch(url, {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'sentence': transcript,
                }),
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

    const{
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    function MicrophoneOn(){
        SpeechRecognition.startListening({continuous:true})
    }
    return(
        <div style = {emotionDetectionPopupStyle} id = 'emotion-detection'>
            <div>
                <b>Please Speak Any Word or Sentence</b>
                <p>Microphone: {listening ? 'on' : 'off'}</p>
                <Button variant="outlined" sx={{color:'black', border: 1}} startIcon={<MicIcon sx={{ color: 'black' }}/>} onClick={MicrophoneOn}>Start</Button>
                <Button variant="outlined" sx={{color:'black', border: 1}} startIcon={<MicOffIcon sx={{ color: 'black' }}/>} onClick={SpeechRecognition.stopListening}>Stop</Button>
                <Button variant="outlined" sx={{color:'black', border: 1}} startIcon={<ReplayIcon sx={{ color: 'black' }}/>} onClick={resetTranscript}>Reset</Button>
                <textarea style={textareaStyle} value={transcript}></textarea>
            </div> 
            <div style={padding_top}>
                <input
                type="button" 
                style={ (transcript === "") ? buttonDisabledStyle : buttonEnabledStyle } 
                value="Show Emotions" 
                onClick= {handleEmotion}
                disabled={ (transcript === "") } />
            </div>
            <br></br>
            <b style={padding_top}>Excited: </b> {excited}
            <b style={padding_left}>Frustrated: </b> {frustrated}
            <b style={padding_left}>Polite: </b> {polite}
            <b style={padding_left}>Impolite: </b> {impolite}
            <b style={padding_left}>Sad: </b> {sad}
            <b style={padding_left}>Satisfied: </b> {satisfied}
            <b style={padding_left}>Sympathetic: </b> {sympathetic}
        </div>
    );
}
export default EmotionDetection;