import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { confirmAlert } from 'react-confirm-alert'; // Import
import "./hidden-problem-shared.css";
import React, { useState } from "react";
import { restUrl } from "../index";  

let record = null;
const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://conversation-agent-deepstream.herokuapp.com');
client.login();

const Container = styled.div`
    margin: 2rem;
    display:grid;
`;

const EmotionDetectionPopupStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 10em 45em;
    grid-column-gap: 20px;
    background-color: white;
    color: black;
    z-index: 9;
    width: 75rem;
    height: 55rem;
    text-align: center;
    padding: 0rem 2rem;
    ${'' /* border: 2px solid red; */}
`;

const AreaWidth = styled.div`
    grid-area: 2 / 1 / 3 / 3;
    height: 95%; 
    border: 2px solid #000;
`;

const ItemWidth = styled.div`
    grid-area: 2 / 3 / 3 / 4;
    height:95%;
    border: 2px solid #000;
`;

const InstructionsArea = styled.div`
    padding:2em;
`;

const InstructionsParagraph = styled.p`
    overflow-y: auto;
    width: 100%;
    color:  black;
    text-align: justify;
    font-weight: 400;
    line-height: 1.7em;
    

`;
   
const H3 = styled.h3`
    font-size: 25px;
    text-decoration: underline;
`;

const InstructionsBar = styled.div`
    grid-area: 1 / 1 / 2 / 4;
    height: 5rem;
`;

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
    const {state} = useLocation();
    const { meetingId, netId } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const [choice, setChoice] = useState([]);

    const handleChoiceChange = (event) => {
        setChoice([event.target.value]);
    };

    const handleConfirmSubmit = () => {
        confirmSubmit(meetingId, netId, choice);
    };

    const submitChoice = (meetingId, netId, choice) => {
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
                    'choice': choice,
                    'meetingId': meetingId,
                    'netId': netId,
                    'timestamp': new Date().toISOString(),
                    }),
                })
                .then(response => {
                    if(record == null){
                        record = client.record.getRecord(location.state.meetingId);
                    }
                    record.set('submitForGroup', 'true');  
                    navigate('/survey');
                })
            }
        }
        catch(error){
            console.log('error', error);
        }
    }
    
    const confirmSubmit = (meetingId, netId, choice) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to submit?',
            buttons: [
            {
                label: 'Yes',
                onClick: submitChoice(meetingId, netId, choice)
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
                    <InstructionsParagraph style={{  'text-align': "center" }}>
                        <h2>Choose one of the below</h2>
                    </InstructionsParagraph>
                    <div class="radio-group">
                        <label class="radio">
                            <input type="radio" name="killer" value="john-doe" onChange={handleChoiceChange}/>
                            <span class="radio-custom"></span>
                            <span class="radio-label">John Doe</span>
                        </label>
                        <label class="radio">
                            <input type="radio" name="killer" value="jane-doe" onChange={handleChoiceChange}/>
                            <span class="radio-custom"></span>
                            <span class="radio-label">Jane Doe</span>
                        </label>
                        <label class="radio">
                            <input type="radio" name="killer" value="john-smith" onChange={handleChoiceChange} />
                            <span class="radio-custom"></span>
                            <span class="radio-label">John Smith</span>
                        </label>
                    </div>
                    <SubmitElementsButton 
                        type="button" 
                        value="Submit" 
                        onClick={handleConfirmSubmit}
                        disabled={choice.length === 0}
                        choice={choice}
                    /> 
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default HiddenProblem;
