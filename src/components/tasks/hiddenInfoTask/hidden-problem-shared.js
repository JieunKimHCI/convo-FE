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

const GroupReadyButton = styled.input`
    background-color: #66e29a;
    border: none;
    cursor: pointer;
    width: 80%;
    padding: 1rem;
    font-size: 16px;
    white-space: normal;
    align-self: center;
    border-radius: 6px;
`;

function HiddenProblem({ submittable, setSendDataBool }) {
    const { state } = useLocation();
    const { meetingId, netId, participantId } = state;
    const navigate = useNavigate();
    const location = useLocation();
    const [choice, setChoice] = useState([]);
    const [groupReady, setGroupReady] = useState(false);

    const infoPieces = {
        0: {
            "A0": "Candidate A :",
            "A1": "Can anticipate dangerous situations",
            "A2": "Is able to see complex connections",
            "B0": "Candidate B :",
            "B1": "Keeps calm in a crisis",
            "B2": "They can be grumpy",
            "B3": "They can be uncooperative",
            "C0": "Candidate C :",
            "C1": "Can make correct decisions quickly",
            "C2": "They handle stress very well",
            "C3": "They have difficulty communicating their ideas",
            "D0": "Candidate D :",
            "D1": "Responds to unexpected events adequately",
            "D2": "Can concentrate very well"
        },
        1: {
            "A0": "Candidate A :",
            "A1": "Has excellent spatial vision",
            "A2": "Have very good leadership qualities",
            "A3": "Are sometimes not good at taking criticism.",
            "B0": "Candidate B :",
            "B1": "Has relatively weak memory for numbers",
            "B2": "Make nasty remarks about their colleagues.",
            "C0": "Candidate C :",
            "C1": "Creates a positive atmosphere with their crew",
            "C2": "Are very conscientious.",
            "D0": "Candidate D :",
            "D1": "Is regarded as arrogant",
            "D2": "Have relatively weak leadership skills",
            "D3": "Is regarded as a 'know-it-all'."
        },
        2: {
            "A0": "Candidate A :",
            "A1": "Can be unorganized",
            "A2": "Is are regarded as a show-off.",
            "B0": "Candidate B :",
            "B1": "Is good at assessing weather conditions",
            "B2": "Have excellent computer skills",
            "B3": "Is known to be 100% reliable.",
            "C0": "Candidate C :",
            "C1": "Understands complicated technology",
            "C2": "They put concern for others above everything",
            "D0": "Candidate D :",
            "D1": "Has a hot temper",
            "D2": "Is considered moody",
            "D3": "Is regarded as a loner."
        },
        3: {
            "A0": "Candidate A :",
            "A1": "Is regarded as being not open to new ideas",
            "A2": "Is unfriendly and eats unhealthily",
            "B0": "Candidate B :",
            "B1": "Is regarded as pretentious",
            "B2": "They sometimes adopt the wrong tone when communicating",
            "C0": "Candidate C :",
            "C1": "Has excellent attention skills",
            "C2": "Is regarded as egocentric",
            "C3": "Is not very willing to futher their education",
            "D0": "Candidate D :",
            "D1": "Solves problems extremely well",
            "D2": "Take responsibility seriously."
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
                        'isGroup': true,
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
                        setSendDataBool(false);
                        navigate(
                            '/survey',
                            {
                                state: {
                                    taskId: location.state.taskId
                                }
                            })
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

    const confirmGroupReady = () => {
        setGroupReady(true);
        try {
            const url = restUrl + 'submitReady';
            fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'netId': netId,
                    'meetingId': meetingId,
                    'isGroup': true
                }),
            })
        }
        catch (error) {
            console.log('error', error);
        }
    };

    const InstructionBox = ({ title, content }) => {
        return (
          <div style={{ flex: 1, padding: "15px" }}>
            <p style={{ textAlign: "left" }}>{title}</p>
            <ul style={{ textAlign: "left" }}>
              {content}
            </ul>
          </div>
        );
    };
    
    const getBullets = (content, candidate) => {
        const items = [];
        for (let i = 1; i <= 10; i++) {
            const bulletKey = `${content[`${candidate}${i}`]}`;
            if (bulletKey !== "undefined") {
            items.push(<li key={bulletKey}>{bulletKey}</li>);
            } else {
            return items;
            }
        }
        return items;
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
                        <InstructionsArea>
                        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} style={{ 
                                    flex: i < 2 ? 1 : "calc(50% - 10px)",
                                    border: "1px solid #ccc", 
                                    padding: "10px",
                                    boxSizing: "border-box"
                                }}>
                                <InstructionBox 
                                    title={infoPieces[participantId.toString()][`${String.fromCharCode(65+i)}0`]} 
                                    content={getBullets(infoPieces[participantId.toString()], String.fromCharCode(65+i))}
                                />
                                </div>
                            ))}
                        </div>

                        </InstructionsArea>
                    </>

                </AreaWidth>

                <ItemWidth>
                    {!submittable ?
                        groupReady ?
                            <div>
                                <InstructionsParagraph style={{ 'textAlign': "center", 'padding': '20px', 'width': '90%' }}>
                                    <h3>Submission options will appear once everyone is ready!</h3>
                                </InstructionsParagraph>
                            </div>
                            :
                            <div>
                                <InstructionsParagraph style={{ 'textAlign': "center", 'padding': '20px', 'width': '90%' }}>
                                    <h4>Once your group has achieved consensus, press this button to submit the group’s decision</h4>
                                </InstructionsParagraph>
                                <GroupReadyButton
                                    type="button"
                                    value="Ready to submit decision"
                                    onClick={confirmGroupReady}
                                />
                            </div>
                        :
                        <div>
                            <InstructionsParagraph style={{ 'textAlign': "center" }}>
                                <h2>Choose one of the below</h2>
                            </InstructionsParagraph>
                            <div className="radio-group">
                                <label className="radio">
                                    <input type="radio" name="CandidateA" value="CandidateA" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate A</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="CandidateB" value="CandidateB" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate B</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="CandidateC" value="CandidateC" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate C</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="CandidateD" value="CandidateD" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate D</span>
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
