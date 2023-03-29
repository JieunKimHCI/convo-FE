import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./hidden-problem-shared.css";
import React, { useState } from "react";
import { restUrl } from "../../../index";
import { Container, EmotionDetectionPopupStyle, H3, AreaWidth, ItemWidth, InstructionsArea, InstructionsParagraph, InstructionsBar } from '../task-styles';

const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();

const SubmitElementsButton = styled.input`
    background-color: ${props => props.choice.length === 1 ? '#66e29a' : '#d4d4d4'};
    color: white;
    border: none;
    cursor: pointer;
    width: 80%;
    padding: 1rem;
    margin: 0.5rem;
    align-self: center;
    margin-top: 2rem;
    ${'' /* border-radius: 6px; */}
`;

function HiddenProblem() {
    const { state } = useLocation();
    const { meetingId, netId } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const [choice, setChoice] = useState([]);

    const handleChoiceChange = (event) => {
        setChoice([event.target.value]);
    };

    const submitChoice = () => {
        try {
            const url = restUrl + 'submitChoices';
            if (choice.length === 0) {
                alert("Submissions with no choice selection are not allowed!")
            } else {
                fetch(url, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'choices': choice,
                        'meetingId': meetingId,
                        'netId': netId,
                        'timestamp': new Date().toISOString(),
                    }),
                })
                    .then(response => {
                        if (record == null) {
                            record = client.record.getRecord(location.state.meetingId);
                        }
                        record.set('submitForGroup', 'true');
                        navigate('/survey');
                    });
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }

    const confirmSubmit = () => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to submit?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: submitChoice
                },
                {
                    label: 'No',
                    onClick: () => console.log('Clicked No Taking Back')
                }
            ]
        });
    };

    return (
        <Container>
            <EmotionDetectionPopupStyle>
                <InstructionsBar>
                    <h2>Group Decision-Making Task</h2>
                    <h3><strong>Read the scenario and choose who the potential killer could be</strong></h3>
                </InstructionsBar>
                <AreaWidth>
                    <>
                        <H3>Murder Mystery Challenge: Work Together to Solve the Crime!</H3>
                        {/* <TextArea rows={5} defaultValue='' /> */}
                        <InstructionsArea>
                            <InstructionsParagraph>
                                You are all tasked with identifying the criminal. Each of you has been given a unique piece of information that nobody else knows. Collaborate with each other, share your information, and work together to come to a decision on who the killer is. Once you've made your decision, select the person who you think is the culprit on the right.
                            </InstructionsParagraph>
                        </InstructionsArea>
                    </>

                </AreaWidth>
                <ItemWidth>
                    <InstructionsParagraph style={{ 'textAlign': "center" }}>
                        <h2>Choose one of the below</h2>
                    </InstructionsParagraph>
                    <div className="radio-group">
                        <label className="radio">
                            <input type="radio" name="killer" value="john-doe" onChange={handleChoiceChange} />
                            <span className="radio-custom"></span>
                            <span className="radio-label">John Doe</span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="killer" value="jane-doe" onChange={handleChoiceChange} />
                            <span className="radio-custom"></span>
                            <span className="radio-label">Jane Doe</span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="killer" value="john-smith" onChange={handleChoiceChange} />
                            <span className="radio-custom"></span>
                            <span className="radio-label">John Smith</span>
                        </label>
                    </div>
                    <SubmitElementsButton
                        type="button"
                        value="Submit"
                        onClick={confirmSubmit}
                        disabled={choice.length === 0}
                        choice={choice}
                    />
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default HiddenProblem;
