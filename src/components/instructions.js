import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Instructions() {

    const [check1, setcheck1] = useState(false);
    const [check2, setcheck2] = useState(false);
    const [check3, setcheck3] = useState(false);
    const [check4, setcheck4] = useState(false);
    const [check5, setcheck5] = useState(false);

    const navigate = useNavigate();

    const instructionsPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex: '9',
        width: '125vh',
        height: '70vh',
        textAlign: 'left',
        padding: '2vh',
        overflowY: 'auto',
    };

    const innerBoxStyle = {
        paddingTop: '15vh',
        width: '80%',
    }

    const nextButtonEnabledStyle = {
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    const nextButtonDisabledStyle = {
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        width: '99%',
        padding: '2vh',
    }

    const h2Special = {
        border: '2px solid black',
        padding: '10px',
        borderRadius: '20px',
    }


    function nextPage() {
        navigate('/user-consent')
    }

    function handleCheckboxInputChange(event) {
        const name = event.target.id
        const value = event.target.checked
        if (name === 'check1') setcheck1(value)
        else if (name === 'check2') setcheck2(value)
        else if (name === 'check3') setcheck3(value)
        else if (name === 'check4') setcheck4(value)
        else setcheck5(value)
    }

    return (
        <div style={instructionsPopupStyle} id='instructions'>
            <center>
                <div style={innerBoxStyle}>
                    <h1 style={h2Special}>Please check each box to confirm the system setup.</h1>
                    <p align="left" class="checkbox-wrapper-19"><input type="checkbox" id="check1" name="check1" value={check1} onChange={handleCheckboxInputChange} /><label for="check1" class="check-box"/>&ensp;I confirm that I am using Chrome browser.</p>
                    <p align="left" class="checkbox-wrapper-19"><input type="checkbox" id="check2" name="check2" value={check2} onChange={handleCheckboxInputChange} /><label for="check2" class="check-box"/>&ensp;I have enabled microphone access when prompted.</p>
                    <p align="left" class="checkbox-wrapper-19"><input type="checkbox" id="check3" name="check3" value={check3} onChange={handleCheckboxInputChange} /><label for="check3" class="check-box"/>&ensp;I received the meeting ID from the researcher.</p>
                    <p align="left" class="checkbox-wrapper-19"><input type="checkbox" id="check4" name="check4" value={check4} onChange={handleCheckboxInputChange} /><label for="check4" class="check-box"/>&ensp;I am using earphones/headphones with microphone support.</p>
                    <p align="left" class="checkbox-wrapper-19"><input type="checkbox" id="check5" name="check5" value={check5} onChange={handleCheckboxInputChange} /><label for="check5" class="check-box"/><b>&ensp;I am in a quiet place without background noises.</b></p>
                    <input
                        style={(!check1 || !check2 || !check3 || !check4 || !check5) ? nextButtonDisabledStyle : nextButtonEnabledStyle}
                        type="button"
                        value="Begin"
                        onClick={nextPage}
                        disabled={(!check1 || !check2 || !check3 || !check4 || !check5)}
                    />
                </div>


            </center>
        </div>
    );
}
export default Instructions;


