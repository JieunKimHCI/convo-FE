import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { restUrl } from "../index";

function UserConsent() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [netId, setNetId] = useState('');
    const [meetingId, setMeetingId] = useState('');
    const [screenRecordingAgreement, setScreenRecordingAgreement] = useState(false);
    const [finalConsentAgreement, setFinalConsentAgreement] = useState(false);

    const navigate = useNavigate();

    function handleCheckboxInputChange(event) {
        const name = event.target.id
        const value = event.target.checked
        if (name === 'screenRecordingAgreement') setScreenRecordingAgreement(value)
        else setFinalConsentAgreement(value)
    }

    function handleTextInputChange(event) {
        const name = event.target.id
        const value = event.target.value
        if (name === 'firstName') setFirstName(value)
        else if (name === 'lastName') setLastName(value)
        else if (name === 'netId') setNetId(value)
        else setMeetingId(value)
    }

    async function submitForm() {
        try {
            const url = restUrl + 'userconsent'
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'firstName': firstName,
                    'lastName': lastName,
                    'netId': netId,
                    'meetingId': meetingId
                }),
            })
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(response => {
                            if (response.taskId === 0) {
                                navigate('/desert-problem', {
                                    state: {
                                        netId: netId,
                                        meetingId: meetingId,
                                    },
                                });
                            }
                            else if (response.taskId === 1) {
                                navigate('/hidden-problem', {
                                    state: {
                                        netId: netId,
                                        meetingId: meetingId,
                                        participantId: response.participantId
                                    },
                                });
                            }
                        })
                    }
                    else if (response.status === 300) {
                        alert("Please check the meeting id. If the issue persists, please contact the admin.")
                    }
                    else {
                        throw new Error();
                    }
                });
        }
        catch {
            alert("Please check the meeting id. If the issue persists, please contact the admin.")
        }

        console.log(firstName,lastName)
    }

    const agreementPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex: '9',
        width: '125vh',
        height: '75vh',
        textAlign: 'left',
        padding: '2vh',
        overflowY: 'auto',
    };

    const padding_right_fname = {
        paddingRight: '6vh',
    }
    const padding_right_lname = {
        paddingRight: '6.5vh',
    }
    const padding_right_netid = {
        paddingRight: '10.5vh',
    }
    const padding_right_meetingid = {
        paddingRight: '5.9vh',
    }
    const padding_top = {
        paddingTop: '2vh',
    }

    const textareaStyle = {
        maxWidth: '99%',
        width: '99%',
        fontSize: '14px'
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

    const purposeOfStudyMessage = "The goal of this study is to understand the group dynamics where multiple users verbally interact with each other and make a group decision through an online video conferencing platform. Participants will discuss with other participants to make a consensus on the item ranking and successfully submit the group decision.";
    const procedureMessage = "In this experiment, you will first be asked to make an individual decision on ranking the provided items. Once submitting the result, you will join a group meeting and discuss it with other participants to make a consensus on the item ranking. Once the group decision is made and submitted, a survey link will be provided.";

    return (
        <div style={agreementPopupStyle} id='agreement'>
            <form>
                <p>
                    <b>Purpose of Study</b>
                    <textarea style={textareaStyle} rows="3" value={purposeOfStudyMessage} readOnly></textarea>
                </p>
                <p>
                    <b>Experiment Procedure</b>
                    <textarea style={textareaStyle} rows="3" value={procedureMessage} readOnly></textarea>
                </p>
                <p>
                    <b>Statement of Consent</b><br></br>
                    <input type="checkbox" id="screenRecordingAgreement" name="screenRecordingAgreement" value={screenRecordingAgreement} onChange={handleCheckboxInputChange} />
                    <label htmlFor="screenRecordingAgreement">I understand and agree that my screen recording is necessary to participate in this study.</label> <br></br>
                    <input type="checkbox" id="finalConsentAgreement" name="finalConsentAgreement" value={finalConsentAgreement} onChange={handleCheckboxInputChange} />
                    <label htmlFor="finalConsentAgreement">I have read the above information. I consent to take part in the study.</label>
                </p>
                <div>
                    <label style={padding_right_fname}><b>First Name</b></label>
                    <input type="text" name="firstName" id="firstName" onChange={handleTextInputChange} />
                </div>
                <div>
                    <label style={padding_right_lname}><b>Last Name</b></label>
                    <input type="text" name="lastName" id="lastName" onChange={handleTextInputChange} />
                </div>
                <div>
                    <label style={padding_right_netid}><b>Net ID</b></label>
                    <input type="text" name="netId" id="netId" onChange={handleTextInputChange} />
                </div>
                <div>
                    <label style={padding_right_meetingid}><b>Meeting ID</b></label>
                    <input type="text" name="meetingId" id="meetingId" onChange={handleTextInputChange} />
                </div>
                <div style={padding_top}>
                    <input
                        style={(!screenRecordingAgreement || !finalConsentAgreement || firstName === "" || lastName==="" || netId === "" || meetingId === "") ? nextButtonDisabledStyle : nextButtonEnabledStyle}
                        type="button"
                        value="Next"
                        onClick={submitForm}
                        disabled={(!screenRecordingAgreement || !finalConsentAgreement || firstName === "" || lastName==="" || netId === "" || meetingId === "")}
                    />
                </div>
            </form>
        </div>
    );
}

export default UserConsent;