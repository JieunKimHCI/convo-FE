import { useLocation } from "react-router-dom";
import DragAndDropWrapper from '../../dragAndDrop/dragAndDropWrapper';
import { Container, EmotionDetectionPopupStyle, H3, AreaWidth, ItemWidth, InstructionsArea, InstructionsParagraph, InstructionsBar } from '../task-styles';

function DesertProblem({ submittable }) {
    const { state } = useLocation();
    const { meetingId, netId } = state;

    return (
        <Container>
            <EmotionDetectionPopupStyle>
                <InstructionsBar>
                    <h2>Group Decision-Making Task</h2>
                    <h3><strong>Read the Desert Survival scenario and rank the items according to their importance to your survival in the desert.</strong></h3>
                </InstructionsBar>
                <AreaWidth>
                    <>
                        <H3>Desert Survival</H3>
                        {/* <TextArea rows={5} defaultValue='' /> */}
                        <InstructionsArea>
                            <InstructionsParagraph>
                                It  is  approximately  10am  in  mid-July  and  you have just  crash  landed  in  the  Sonora  Desert, near  the  Mexico-USA  border.  The  plane  has completely  burnt out,  only  the  frame  remains. Miraculously,  the  10  passengers  are  uninjured but the pilot has been killed.
                            </InstructionsParagraph>
                            <InstructionsParagraph>
                                The  pilot  was  unable  to  tell  anyone  of  your position  before  the  crash. However,  ground sightings taken shortly before the crash suggest that you are about 65 miles off the course filed in your  flight  plan. A  few  moments  before  the crash,  the  pilot  indicated  you  were  about  70 miles south east of a mining camp. The camp is the nearest known settlement.
                            </InstructionsParagraph>
                            <InstructionsParagraph>
                                The immediate area is quite flat and, except for the  occasional  thorn  bush  and  cacti,  is  rather barren.
                            </InstructionsParagraph>
                            <InstructionsParagraph>
                                <u>Before the plane caught fire, your group was able to save the 5 items on the desk.</u>
                            </InstructionsParagraph>
                            <InstructionsParagraph>
                                Your task is to rank them according to their importance to your survival in the desert.
                            </InstructionsParagraph>
                            <InstructionsParagraph>
                                As a reminder, here are the items again: Knife 🗡️, Torch 🔦, Pistol 🔫, Water 💧, Coat 🧥.
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
                            <InstructionsParagraph style={{ margin: "10px 5em" }}>
                                Drag and rank items from 1 to 5.
                            </InstructionsParagraph>
                            <DragAndDropWrapper isGroup={true} meetingId={meetingId} netId={netId} />
                        </div>
                    }
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default DesertProblem;
