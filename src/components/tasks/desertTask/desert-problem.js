import { useLocation } from "react-router-dom";
import DragAndDropWrapper from '../../dragAndDrop/dragAndDropWrapper';
import { Container, EmotionDetectionPopupStyle, H3, AreaWidth, ItemWidth, InstructionsArea, InstructionsParagraph, InstructionsBar } from '../task-styles';

function DesertProblem() {
    const { state } = useLocation();
    const { meetingId, netId } = state;

    return (
        <Container>
            <EmotionDetectionPopupStyle>
                <InstructionsBar>
                    <h2>Individual Decision-Making Task</h2>
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
                               Mirror, Torch, Pistol, Water, Coat
                            </InstructionsParagraph>
                            <InstructionsParagraph>
                                <b>Your task is to rank them according to their importance to your survival in the desert.</b>
                            </InstructionsParagraph>
                        </InstructionsArea>
                    </>

                </AreaWidth>
                <ItemWidth>
                    <InstructionsParagraph style={{ margin: "0px 0.5em" ,textAlign: "center"}}>
                        Drag and rank items.
                    </InstructionsParagraph>
                    <InstructionsParagraph style={{ margin: "0px 0.5em",textAlign: "center" }}>
                        from the top (1) to the bottom (5).
                    </InstructionsParagraph>
                    <DragAndDropWrapper meetingId={meetingId} netId={netId} isGroup={false} />
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default DesertProblem;
