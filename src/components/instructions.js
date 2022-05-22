import { useHistory } from "react-router-dom";
    
function Instructions(){

    const history = useHistory();
    
    const instructionsPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '125vh',
        height : '70vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
    };

    const padding_right = {
        paddingRight : '2vh',
    }

    const padding_top = {
        paddingTop : '2vh',
    }

    const bulletStyle = {
        padding : '2vh',
        textAlign: 'left',
    }

    const innerBoxStyle = {
        width : '70%',
    }

    const nextButtonStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '40%',
        padding: '2vh',
    }
    
    function nextPage(){
        history.push('/agreement')
    }

    return(
        <div style={instructionsPopupStyle} id = 'instructions'>
            <center>
                <div style={innerBoxStyle}>
                    <h2>Please follow the instructions carefully and check the box next to each instruction</h2>
                    <ol>
                        <li style={bulletStyle}>Enable Microphone access on your browser when prompted</li>
                        <li style={bulletStyle}>Fill out the consent form to start using the software and participate in the study</li>
                        <li style={bulletStyle}>Enter the meeting ID given by the researcher</li>
                        <li style={bulletStyle}><b>PLEASE AVOID GOING ON MUTE</b></li>
                    </ol>
                    <button style={nextButtonStyle} onClick={nextPage}>Begin</button>
                </div>      
            </center>  
        </div>
        );
    }
export default Instructions;
        