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
                final: false
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

  return (
    <div>
      <CenteredInstruction>
        <InstructionsBar>
          <h2>Hidden Information Problem</h2>
          <h3><strong>Read the following information. Click 'Ready' when you are finished reading.</strong></h3>
        </InstructionsBar>
        <AreaWidth>
          <>
            {/* <H3>Hidden Info</H3> */}
            <InstructionsArea>
              <InstructionsParagraph>
                You are a personnel manager in an airline company that is looking to hire a new pilot for long-distance flights. After multiple rounds of screening and interview processes, four candidates (A, B, C, D) were listed as finalists. In this stage, you need to select only one candidate among them to hire based on the information about their job qualities.
                After reviewing the following information, you will need to discuss with your teammate which candidate is best for the position. Each of your team members will have different pieces of information about the candidates.
              </InstructionsParagraph>
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
