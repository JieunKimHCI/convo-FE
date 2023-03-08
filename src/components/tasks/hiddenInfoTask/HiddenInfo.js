import { useLocation } from "react-router-dom";
import { Container, CenteredInstruction, H3, AreaWidth, InstructionsArea, InstructionsParagraph, InstructionsBar, SubmitElementsButton } from '../taskStyles';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function HiddenInfo() {
  // const { state } = useLocation();
  // const { meetingId, netId, taskNumber } = state;

  const taskNumber = 1;

  const infoPieces = {
    1: "The murderer is a woman.",
    2: "The murderer has short hair.",
    3: "The murderer is wearing blue jeans.",
    4: "The murderer is famous."
  };

  const submitReady = () => {

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
          <h2>Secret Message</h2>
          <h3><strong>Read the following information. Click 'Ready' when you are finished reading.</strong></h3>
        </InstructionsBar>
        <AreaWidth>
          <>
            <H3>Hidden Info</H3>
            <InstructionsArea>
              <InstructionsParagraph>
                {infoPieces[taskNumber.toString()]}
              </InstructionsParagraph>
              <InstructionsParagraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </InstructionsParagraph>
            </InstructionsArea>
          </>
        </AreaWidth>
      </CenteredInstruction>
      <SubmitElementsButton
        type="button"
        value="Ready"
        onClick={confirmReady}
      />
      {/* <center> */}

      {/* </center> */}
    </div>
  );
}
export default HiddenInfo;
