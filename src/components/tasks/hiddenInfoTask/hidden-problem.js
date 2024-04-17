import { useNavigate, useLocation } from "react-router-dom";
import { CenteredInstruction, CenteredChoiceSelection, AreaWidth, InstructionsArea, InstructionsParagraph, InstructionsBar, SubmitButton } from '../task-styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../../tsOverride.css'
import { restUrl } from "../../../index";
import { useState,} from "react";

function HiddenProblem() {
  const { state } = useLocation();
  const { meetingId, netId, participantId } = state;
  const [selectedCandidate, setSelectedCandidate] = useState("None");

  const navigate = useNavigate();

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

  const submitReady = () => {
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
          'isGroup': false,
          'candidate': selectedCandidate,
        }),
      })
        .then(response => {
          navigate(
            '/waiting',
            {
              state: {
                netId: netId,
                meetingId: meetingId,
                taskId: 1,
                participantId: participantId
              },
            });
        });
    } catch (error) {
      console.log('error', error);
    }
  };

  const confirmReady = () => {
    if (selectedCandidate === "None") {
      alert("A candidate must be selected before proceeding");
    }
    else {
      confirmAlert({
        title: 'Confirmation',
        message: 'Do you confirm your selection?',
        buttons: [
          {
            label: 'Yes',
            onClick: submitReady
          },
          {
            label: 'No',
          }
        ]
      });
    }
  };

  const InstructionBox = ({ title, content, myid }) => {
    const [isClicked,] = useState(false);
    const [boxId,] = useState(myid);

    const handleClick = () => {
      let selection = boxId;
      setSelectedCandidate(() => selection);
    };

    return (
      <div
        style={{
          flex: 1,
          padding: '15px',
          cursor: 'pointer',
          margin: '-2px'
        }}
        className="hov"
        onClick={handleClick}
      >
        <p style={{ textAlign: 'left' }}>{title}</p>
        <ul style={{ textAlign: 'left' }}>{content}</ul>
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
    <div>
      <CenteredInstruction>
        <InstructionsBar>
          <h2>Hidden Information Problem</h2>
          <h3><strong>Read the following information. Click 'Submit' after selecting a candidate.</strong></h3>
        </InstructionsBar>
        <AreaWidth>
          <>
            <InstructionsArea>
              <InstructionsParagraph>
                You are a personnel manager in an airline company that is looking to hire a new pilot for long-distance flights. After multiple rounds of screening and interview processes, four candidates (A, B, C, D) were listed as finalists. In this stage, you need to select only one candidate among them to hire based on the information about their job qualities.
                After reviewing the following information, you will need to discuss with your teammate which candidate is best for the position. Each of your team members will have different pieces of information about the candidates.
              </InstructionsParagraph>
              <div style={{ display: "flex", gap: "20px" }}>
              {[...Array(4)].map((_, i) => (
                <div key={i} style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
                  <InstructionBox
                    title={'Candidate ' + ['A', 'B', 'C', 'D'][i] + ' : '}
                    content={getBullets(infoPieces[participantId.toString()], String.fromCharCode(65 + i))}
                    myid={['A', 'B', 'C', 'D'][i]}
                  />
                </div>
              ))}
              </div>
            </InstructionsArea>
          </>
        </AreaWidth>
      </CenteredInstruction>
      <CenteredChoiceSelection>
        Selected Candidate: {selectedCandidate}
      </CenteredChoiceSelection>
      <SubmitButton
        type="button"
        value="Submit"
        onClick={confirmReady}
      />
    </div>
  );
}
export default HiddenProblem;
