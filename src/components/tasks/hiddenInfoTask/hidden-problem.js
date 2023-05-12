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
        "A3": "Has excellent spatial visions",
        "B0": "Candidate B :",
        "B1": "Is unfriendly",
        "B2": "Eats unhealthy",
        "B3": "Can be grumpy",
        "C0": "Candidate C :",
        "C1": "Is regarded as a 'know-it-all'",
        "C2": "Has a hot temper",
        "D0": "Candidate D :",
        "D1": "Takes responsibility seriously",
        "D2": "Is regarded as being open to new ideas"
    },
    1: {
        "A0": "Candidate A :",
        "A1": "Understands complicated technology",
        "A2": "Puts concern for others above everything",
        "B0": "Candidate B :",
        "B1": "Has very good leadership qualities",
        "B2": "Keeps calm in a crisis",
        "B3": "Known to be 100% reliable",
        "C0": "Candidate C :",
        "C1": "Can be uncooperative",
        "C2": "Has a relatively weak memory for numbers",
        "C3": "Makes nasty remarks about his colleagues",
        "D0": "Candidate D :",
        "D1": "Is considered moody",
        "D2": "Is regarded as a loner"
    },
    2: {
        "A0": "Candidate A :",
        "A1": "Is regarded as egocentric",
        "A2": "Is not very willing to further his education",
        "B0": "Candidate B :",
        "B1": "Has excellent attention skills",
        "B2": "Responds to unexpected events adequetly",
        "C0": "Candidate C :",
        "C1": "Good at accessing weather conditions",
        "C2": "Has excellent computer skills",
        "C3": "Can make correct decisions quickly",
        "D0": "Candidate D :",
        "D1": "Is regarded as pretentious",
        "D2": "Sometimes adopts the wrong tone when communicating",
        "D3": "Has difficulty communicating ideas"
    },
    3: {
        "A0": "Candidate A :",
        "A1": "Is sometimes not good at taking criticism",
        "A2": "Can be unorganized",
        "A3": "Is regarded as a show-off",
        "B0": "Candidate B :",
        "B1": "Is regarded as arrogant",
        "B2": "Has relatively weak leadership skills",
        "C0": "Candidate C :",
        "C1": "Can concentrate very well",
        "C2": "Solves problems extremely well",
        "D0": "Candidate D :",
        "D1": "Handles stress very well",
        "D2": "Creates a positive atmosphere with his crew",
        "D3": "Is very conscientious"
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
