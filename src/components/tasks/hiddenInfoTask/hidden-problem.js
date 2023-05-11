import { useNavigate, useLocation } from "react-router-dom";
import { CenteredInstruction, AreaWidth, InstructionsArea, InstructionsParagraph, InstructionsBar, SubmitButton } from '../task-styles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { restUrl } from "../../../index";

function HiddenProblem() {
  const { state } = useLocation();
  const { meetingId, netId, participantId } = state;

  const navigate = useNavigate();

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
          'isGroup': false
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
    confirmAlert({
      title: 'Confirmation',
      message: 'Have you finished reading?',
      buttons: [
        {
          label: 'Yes',
          onClick: submitReady
        },
        {
          label: 'No',
          onClick: () => console.log('Clicked No Taking Back')
        }
      ]
    });
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
    <div>
      <CenteredInstruction>
        <InstructionsBar>
          <h2>Hidden Information Problem</h2>
          <h3><strong>Read the following information. Click 'Ready' when you are finished reading.</strong></h3>
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
                  <div key={i} style={{ flex: 1, border: "1px solid #ccc", padding: "10px" }}>
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
      </CenteredInstruction>
      <SubmitButton
        type="button"
        value="Ready"
        onClick={confirmReady}
      />
    </div>
  );
}
export default HiddenProblem;
