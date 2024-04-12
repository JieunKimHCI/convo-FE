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
    const [altChoice, setAltChoice] = useState([]);
    const [groupReady, setGroupReady] = useState(false);

    const infoPieces = {
        0: {
            "A0": "Candidate A :",
            "A1": "can anticipate dangerous situations",
            "A2": "is able to see complex connections",
            "A3": "has excellent spatial vision",
            "A4": "has very good leadership qualities",
            "A5": "is regarded as pretentious",
            "A6": "sometimes adopts the wrong tone when communicating",
            "A7": "has difficulty communicating ideas",
            "A8": "is regarded as egocentric",
            "B0": "Candidate B :",
            "B1": "is not good at taking criticism",
            "B2": "is not very willing to further his education",
            "B3": "is regarded as arrogant",
            "B4": "has relatively weak leadership skills",
            "B5": "is regarded as a 'know-it-all'",
            "C0": "Candidate C :",
            "C1": "can be unorganized",
            "C2": "has a hot temper",
            "C3": "is considered moody",
            "C4": "is regarded as a loner",
            "C5": "has a relatively weak memory",
            "D0": "Candidate D :",
            "D1": "understands complicated technology",
            "D2": "puts concern for others above everything",
            "D3": "is regarded as pretentious",
            "D4": "is not very willing to further his education",
            "D5": "is considered moody",
            "D6": "has a relatively weak memory",
        },
        1: {
            "A0": "Candidate A :",
            "A1": "is regarded as a show-off",
            "A2": "is regarded as pretentious",
            "A3": "sometimes adopts the wrong tone when communicating",
            "A4": "has difficulty communicating ideas",
            "A5": "is regarded as egocentric",
            "B0": "Candidate B :",
            "B1": "keeps calm in a crisis",
            "B2": "known to be 100% reliable",
            "B3": "good at assessing weather conditions",
            "B4": "has excellent computer skills",
            "B5": "is not very willing to further his education",
            "B6": "is regarded as arrogant",
            "B7": "has relatively weak leadership skills",
            "B8": "is regarded as a 'know-it-all'",
            "C0": "Candidate C :",
            "C1": "is unfriendly",
            "C2": "has a hot temper",
            "C3": "is considered moody",
            "C4": "is regarded as a loner",
            "C5": "has a relatively weak memory",
            "D0": "Candidate D :",
            "D1": "has excellent attention skills",
            "D2": "responds to unexpected events adequately",
            "D3": "is regarded as pretentious",
            "D4": "is not very willing to further his education",
            "D5": "is considered moody",
            "D6": "has a relatively weak memory",
        },
        2: {
            "A0": "Candidate A :",
            "A1": "can be uncooperative",
            "A2": "is regarded as pretentious",
            "A3": "sometimes adopts the wrong tone when communicating",
            "A4": "has difficulty communicating ideas",
            "A5": "is regarded as egocentric",
            "B0": "Candidate B :",
            "B1": "makes nasty remarks about his colleagues",
            "B2": "is not very willing to further his education",
            "B3": "is regarded as arrogant",
            "B4": "has relatively weak leadership skills",
            "B5": "is regarded as a 'know-it-all'",
            "C0": "Candidate C :",
            "C1": "can make correct decisions quickly",
            "C2": "handles stress very well",
            "C3": "creates a positive atmosphere with his crew",
            "C4": "is very conscientious",
            "C5": "has a hot temper",
            "C6": "is considered moody",
            "C7": "is regarded as a loner",
            "C8": "has a relatively weak memory",
            "D0": "Candidate D :",
            "D1": "can concentrate very well",
            "D2": "solves problems extremely well",
            "D3": "is regarded as pretentious",
            "D4": "is not very willing to further his education",
            "D5": "is considered moody",
            "D6": "has a relatively weak memory",
        },
        3: {
          "A0": "Candidate A :",
          "A1": "can be uncooperative",
          "A2": "is regarded as pretentious",
          "A3": "sometimes adopts the wrong tone when communicating",
          "A4": "has difficulty communicating ideas",
          "A5": "is regarded as egocentric",
          "B0": "Candidate B :",
          "B1": "makes nasty remarks about his colleagues",
          "B2": "is not very willing to further his education",
          "B3": "is regarded as arrogant",
          "B4": "has relatively weak leadership skills",
          "B5": "is regarded as a 'know-it-all'",
          "C0": "Candidate C :",
          "C1": "can make correct decisions quickly",
          "C2": "handles stress very well",
          "C3": "creates a positive atmosphere with his crew",
          "C4": "is very conscientious",
          "C5": "has a hot temper",
          "C6": "is considered moody",
          "C7": "is regarded as a loner",
          "C8": "has a relatively weak memory",
          "D0": "Candidate D :",
          "D1": "can concentrate very well",
          "D2": "solves problems extremely well",
          "D3": "is regarded as pretentious",
          "D4": "is not very willing to further his education",
          "D5": "is considered moody",
          "D6": "has a relatively weak memory",
        },
    };

    const handleChoiceChange = (event) => {
        setChoice([event.target.value]);
    };

    const altHandleChoiceChange = (event) => {
        setAltChoice([event.target.value]);
    };

    const submitChoice = () => {
        try {
            const url = restUrl + 'submitChoices';
            if (choice.length === 0 || altChoice.length === 0) {
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
                        'altChoices': altChoice,
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
                    <h1>Group Decision-Making Task</h1>
                    <h3>Discuss with your teammates and choose the best pilot candidate. Gather and share unique candidate insights for an informed decision.</h3>
                </InstructionsBar>
                <AreaWidth>
                    <>
                        <H3>Hiring Pilot Task</H3>
                        <H4>Please feel free to share the candidate information below with your teammates</H4>
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
                                <h3>Which candidate did your group decide to choose?</h3>
                            </InstructionsParagraph>
                            <div className="radio-group">
                                <label className="radio">
                                    <input type="radio" name="Candidate" value="CandidateA" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate A</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="Candidate" value="CandidateB" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate B</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="Candidate" value="CandidateC" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate C</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="Candidate" value="CandidateD" onChange={handleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate D</span>
                                </label>
                            </div>
                            <InstructionsParagraph style={{ 'textAlign': "center" }}>
                                <h3>Who do you think is the best candidate, regardless of what the team decides?</h3>
                            </InstructionsParagraph>
                            <div className="radio-group">
                                <label className="radio">
                                    <input type="radio" name="CandidateAlt" value="CandidateA" onChange={altHandleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate A</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="CandidateAlt" value="CandidateB" onChange={altHandleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate B</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="CandidateAlt" value="CandidateC" onChange={altHandleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate C</span>
                                </label>
                                <label className="radio">
                                    <input type="radio" name="CandidateAlt" value="CandidateD" onChange={altHandleChoiceChange} />
                                    <span className="radio-custom"></span>
                                    <span className="radio-label">Candidate D</span>
                                </label>
                            </div>
                            <SubmitElementsButton
                                type="button"
                                value="Submit"
                                onClick={confirmSubmit}
                                disabled={choice.length === 0 || altChoice.length === 0}
                                choice={choice}
                                altChoice={altChoice}
                            />
                        </div>
                    }
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default HiddenProblem;
