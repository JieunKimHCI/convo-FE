import { useState } from "react";
import { useHistory } from "react-router-dom";

function Agreement (){

    const [name, setName] = useState('');
    const [netId, setNetId] = useState('');
    const [purposeOfStudyAgreement, setPurposeOfStudyAgreement] = useState(false);
    const [procedureAgreement, setProcedureAgreement] = useState(false);
    
    const history = useHistory();

    function handleCheckboxInputChange(event) {
        const name = event.target.id
        const value = event.target.checked
        if(name === 'purposeOfStudyAgreement') setPurposeOfStudyAgreement(value)
        else setProcedureAgreement(value)
    }

    function handleTextInputChange(event) {
        const name = event.target.id
        const value = event.target.value
        if(name === 'name') setName(value)
        else setNetId(value)
    }

    function submitForm() {
        try{
            const url = 'http://localhost:3000/userconsent'
            fetch(url, {
                method: 'POST',
                mode: 'cors', 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'name': name,
                    'netId': netId,
                    'purposeOfStudyAgreement': purposeOfStudyAgreement,
                    'procedureAgreement': procedureAgreement,
                }),
            })
            .then(response => {
                response.json()
                if(response.status === 200) history.push('/emotion-detection');
                else throw new Error();
            });
        }
        catch(error){
            alert('Something went wrong please refresh!')
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

    const padding_right = {
        paddingRight : '2vh',
    }

    const padding_top = {
        paddingTop : '2vh',
    }

    const textareaStyle = {
        maxWidth: '99%',
        width: '99%',
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

    const smallText = {
        fontSize: '0.75em',
    }

    const purposeOfStudyMessage = "A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message.";
    const procedureMessage = "A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message.";
    const statementOfConsentMessage = "I give the researchers permission to use my recorded screen data, including still images, in publications and at conferences or presentations."
    
    return(
        <div style = {agreementPopupStyle} id = 'agreement'>
            <form>
                <p>
                    <b>Purpose of study</b>
                    <textarea style = {textareaStyle} rows = "3" readOnly>{purposeOfStudyMessage}</textarea>
                    <input type="checkbox" id="purposeOfStudyAgreement" name="purposeOfStudyAgreement" value={purposeOfStudyAgreement} onChange={handleCheckboxInputChange}/>
                    <label style={smallText} for="purposeOfStudyAgreement">I have read and agree</label>
                </p>
                <p>
                    <b>Procedure</b>
                    <textarea style = {textareaStyle} rows = "3" readOnly>{procedureMessage}</textarea>
                    <input type="checkbox" id="procedureAgreement" name="procedureAgreement" value={procedureAgreement} onChange={handleCheckboxInputChange}/>
                    <label style={smallText} for="procedureAgreement">I have read and agree</label>
                </p>
                <p>
                    <b>Statement of Consent</b><br></br>
                    {statementOfConsentMessage}
                </p>
                <div>
                    <label style = {padding_right} htmlFor="name"><b>Name</b></label>
                    <input type="text" name="name" id="name" onChange={handleTextInputChange} />
                </div>
                <div>
                    <label style = {padding_right} htmlFor="job"><b>Net Id</b></label>
                    <input type="text" name="netId" id="netId" onChange={handleTextInputChange} />
                </div>
                <div style={padding_top}>
                    <input 
                        style = {(!purposeOfStudyAgreement || !procedureAgreement || name === "" || netId === "") ? nextButtonDisabledStyle : nextButtonEnabledStyle } 
                        type="button" 
                        value="Next" 
                        onClick={submitForm}
                        disabled = {(!purposeOfStudyAgreement || !procedureAgreement || name === "" || netId === "")} 
                    />   
                </div>
            </form>
        </div>
    );
}

export default Agreement;