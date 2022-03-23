import { useState } from "react";

function EmotionDetection() {

    const [sentence, setSentence] = useState('');
    const [angry, setAngry] = useState(0.0);
    const [happy, setHappy] = useState(0.0);
    const [fear, setFear] = useState(0.0);
    const [surprise, setSurprise] = useState(0.0);
    const [sad, setSad] = useState(0.0);

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
            const url = 'http://localhost:3000/emotions'
            fetch(url, {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'sentence': sentence,
                }),
            })
            .then(response => {
                if(response.status === 200){
                    response.json().then( response => {
                        setAngry(response.emotions.Angry);
                        setFear(response.emotions.Fear);
                        setHappy(response.emotions.Happy);
                        setSad(response.emotions.Sad);
                        setSurprise(response.emotions.Surprise);
                    });
                }
                else{
                    throw new Error();
                }
            });
        }
        catch(error){
            setAngry(0);
            setFear(0);
            setHappy(0);
            setSad(0);
            setSurprise(0);
            alert('Something went wrong please refresh!');
        }
    }

    function handleTextInputChange(event){
        const value = event.target.value
        setSentence(value)
    }

    return(
        <div style = {emotionDetectionPopupStyle} id = 'emotion-detection'>
            <p>
                <b>Please speak any word or sentence</b>
                <textarea id='input' style = {textareaStyle} rows = "10" onChange={handleTextInputChange}></textarea>
            </p> 
            <div style={padding_top}>
                <input 
                type="button" 
                style={ (sentence === "") ? buttonDisabledStyle : buttonEnabledStyle } 
                value="Show Emotions" 
                onClick= {handleEmotion}
                disabled={ (sentence === "") } />
            </div>
            <br></br>
            <b style={padding_top}>Happy: </b> {happy}
            <b style={padding_left}>Sad: </b> {sad}
            <b style={padding_left}>Surprise: </b> {surprise}
            <b style={padding_left}>Fear: </b> {fear}
            <b style={padding_left}>Angry: </b> {angry}
        </div>
    );
}
export default EmotionDetection;