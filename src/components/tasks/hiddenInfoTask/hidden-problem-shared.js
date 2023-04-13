import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "./hidden-problem.css";
import React, { useState } from "react";
import { restUrl } from "../../../index";
import { Container, EmotionDetectionPopupStyle, H3, H4, AreaWidth, ItemWidth, InstructionsArea, InstructionsParagraph, InstructionsBar } from '../task-styles';

let record = null;
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

function HiddenProblem({ submittable }) {
    const { state } = useLocation();
    const { meetingId, netId, participantId } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const [choice, setChoice] = useState([]);
    console.log(submittable);

    const infoPieces = {
        0: {
          "A": "Candidate A can anticipant dangerous situations. They are able to see complex connections.",
          "B": "Candidate B keeps calm in a crisis. They can be grumpy. They can be uncooperative.",
          "C": "Candidate C can make correct decisions quickly. They handle stress very well. They have difficulty communicating their ideas.",
          "D": "Candidate D responds to unexpected events adequately. They can concentrate very well."
        },
        1: {
          "A": "Candidate A has excellent spatial vision. They have very good leadership qualities. They are sometimes not good at taking criticism.",
          "B": "Candidate B has relatively weak memory for numbers. They make nasty remarks about their colleagues.",
          "C": "Candidate C creates a positive atmosphere with their crew. They are very conscientious.",
          "D": "Candidate D is regarded as arrogant. They have relatively weak leadership skills. They are regarded as a 'know-it-all'."
        },
        2: {
          "A": "Candidate A can be unorganized. They are regarded as a show-off.",
          "B": "Candidate B is good at assessing weather conditions. They have excellent computer skills. They are known to be 100% reliable.",
          "C": "Candidate C understands complicated technology. They put concern for others above everything.",
          "D": "Candidate D has a hot temper. They are considered moody. They are regarded as a loner."
        },
        3: {
          "A": "Candidate A is regarded as being not open to new ideas. They are unfriendly and eats unhealthily.",
          "B": "Candidate B is regarded as pretentious. They sometimes adopt the wrong tone when communicating.",
          "C": "Candidate C has excellent attention skills. They are regarded as egocentric. They are not very willing to futher their education.",
          "D": "Candidate D solves problems extremely well. They take responsibility seriously."
        },
      };

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
                        record.set('submitForGroup', 'false');
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
            message: 'Are you sure this is the group\'s final answer?',
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
                    <h3><strong>Discuss with your teammates which candidate is best for the pilot position.</strong></h3>
                </InstructionsBar>
                <AreaWidth>
                    <>
                        <H3>Hiring Pilot Task</H3>
                        <H4>For your convenience, providing your unique information again.</H4>
                        {/* <TextArea rows={5} defaultValue='' /> */}
                        {/* <H3>Hidden Info</H3> */}
                        <InstructionsArea>
                        <InstructionsParagraph>
                            {infoPieces[participantId.toString()]["A"]}
                        </InstructionsParagraph>
                        <InstructionsParagraph>
                            {infoPieces[participantId.toString()]["B"]}
                        </InstructionsParagraph>
                        <InstructionsParagraph>
                            {infoPieces[participantId.toString()]["C"]}
                        </InstructionsParagraph>
                        <InstructionsParagraph>
                            {infoPieces[participantId.toString()]["D"]}
                        </InstructionsParagraph>
                        </InstructionsArea>
                    </>

                </AreaWidth>

                <ItemWidth>
                    {!submittable ?
                        <div>
                            <InstructionsParagraph style={{ 'textAlign': "center" }}>
                                Submission options will appear only after consensus is reached!
                            </InstructionsParagraph>
                        </div>
                        :
                        <div>
                            <InstructionsParagraph style={{ 'textAlign': "center" }}>
                                <h2>Choose one of the below</h2>
                            </InstructionsParagraph>
                            <div class="radio-group">
                                <label class="radio">
                                    <input type="radio" name="CandidateA" value="CandidateA" onChange={handleChoiceChange} />
                                    <span class="radio-custom"></span>
                                    <span class="radio-label">CandidateA</span>
                                </label>
                                <label class="radio">
                                    <input type="radio" name="CandidateB" value="CandidateB" onChange={handleChoiceChange} />
                                    <span class="radio-custom"></span>
                                    <span class="radio-label">CandidateB</span>
                                </label>
                                <label class="radio">
                                    <input type="radio" name="CandidateC" value="CandidateC" onChange={handleChoiceChange} />
                                    <span class="radio-custom"></span>
                                    <span class="radio-label">CandidateC</span>
                                </label>
                                <label class="radio">
                                    <input type="radio" name="CandidateD" value="CandidateD" onChange={handleChoiceChange} />
                                    <span class="radio-custom"></span>
                                    <span class="radio-label">CandidateD</span>
                                </label>
                            </div>
                            <SubmitElementsButton
                                type="button"
                                value="Submit"
                                onClick={confirmSubmit}
                                disabled={choice.length === 0}
                                choice={choice}
                            />
                        </div>
                    }
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default HiddenProblem;
