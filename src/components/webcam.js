import React from "react";
import { useState } from "react";
import Webcam from "react-webcam";

function WebcamComponent() {
    const webcamRef = React.useRef(null);
    const [webcamEnabled, setWebcam] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const [angry, setAngry] = useState(0.0);
    const [happy, setHappy] = useState(0.0);
    const [fear, setFear] = useState(0.0);
    const [surprise, setSurprise] = useState(0.0);
    const [sad, setSad] = useState(0.0);

    function start() {
        if(!webcamEnabled){
            setWebcam(true);
            setImgSrc(null);
        }
    }

    function capture() {
        if(webcamEnabled){
            const image = webcamRef.current.getScreenshot();
            setImgSrc(image);
            try{
                const url = 'https://convo-test-1.herokuapp.com/facial-expression'
                fetch(url, {
                    method: 'POST',
                    mode: 'cors', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'face': image,
                    }),
                })
                .then(response => {
                    if(response.status === 200){
                        response.json().then( response => {
                            setAngry(response.emotions.angry);
                            setFear(response.emotions.fear);
                            setHappy(response.emotions.happy);
                            setSad(response.emotions.sad);
                            setSurprise(response.emotions.surprise);
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
    }

    function stop() {
        if(webcamEnabled){
            setWebcam(false);
            setImgSrc(null);
            setAngry(0);
            setFear(0);
            setHappy(0);
            setSad(0);
            setSurprise(0);
        }
    }

    const agreementPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '125vh',
        height : '70vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
    };

    const webcamStyle = {
        maxWidth: '99%',
        width: '99%',
        height: '47vh',
    }

    const buttonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '31%',
        padding: '2vh',
        marginLeft: '2vh',
    }

    const buttonDisabledStyle = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '31%',
        padding: '2vh',
        marginLeft: '2vh',
    }

    const padding_top = {
        paddingTop : '4vh',
    }

    const padding_left = {
        paddingLeft : '2vh',
    }

    return (
        <div style = {agreementPopupStyle}>
            {webcamEnabled && <div><Webcam style = {webcamStyle} ref={webcamRef} screenshotFormat="image/jpeg" /></div>}
            {!webcamEnabled && <div style = {webcamStyle} />}
            <div style={padding_top}>
                <input style = {!webcamEnabled ? buttonEnabledStyle : buttonDisabledStyle } disabled={webcamEnabled} type="button" value="Start" onClick={start}/> 
                <input style = {webcamEnabled ? buttonEnabledStyle : buttonDisabledStyle } disabled={!webcamEnabled} type="button" value="Capture" onClick={capture}/> 
                <input style = {webcamEnabled ? buttonEnabledStyle : buttonDisabledStyle } disabled={!webcamEnabled} type="button" value="Stop" onClick={stop}/> 
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

export default WebcamComponent