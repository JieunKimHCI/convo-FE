import Timer from './timer'; 
import { useState, useCallback } from "react"; 
import { useLocation } from "react-router-dom";
import DragAndDropWrapper from '../components/dragAndDrop/dragAndDropWrapper';
import styled from "styled-components";


const Container = styled.div`
        margin: 2rem;
        display:grid;
    `;

    const EmotionDetectionPopupStyle = styled.div`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 10em 45em;
        grid-column-gap: 20px;
        background-color: white;
        color: black;
        z-index: 9;
        width: 75rem;
        height: 55rem;
        text-align: center;
        padding: 0rem 2rem;
        ${'' /* border: 2px solid red; */}
    `;

    const AreaWidth = styled.div`
        grid-area: 2 / 1 / 3 / 3;
        height: 95%; 
        border: 2px solid #000;
    `;

    const ItemWidth = styled.div`
        grid-area: 2 / 3 / 3 / 4;
        height:95%;
        border: 2px solid #000;
    `;

    const InstructionsArea = styled.div`
       padding:2em;
    `;

    const InstructionsParagraph = styled.p`
        overflow-y: auto;
        width: 100%;
        color:  black;
        text-align: justify;
        font-weight: 400;
        line-height: 1.7em;
        

    `;
   
    const H3 = styled.h3`
        font-size: 25px;
        text-decoration: underline;
    `;
const InstructionsBar = styled.div`
    grid-area: 1 / 1 / 2 / 4;
    height: 5rem;
    `;

function DesertProblem() {
    const {state} = useLocation();

    console.log(state)
    const { meetingId, netId } = state;

    return (
        <Container>
            <EmotionDetectionPopupStyle>
                <InstructionsBar>
                    <h2>Individual Decision-Making Task</h2>
                    <p><strong>Read the Desert Survival scenario and rank the items according to their importance to your survival in the desert</strong></p>
                </InstructionsBar>
                <AreaWidth>
                    <>
                        <H3>DESERT PROBLEM</H3>
                        {/* <TextArea rows={5} defaultValue='' /> */}
                        <InstructionsArea>
                            <InstructionsParagraph>
                                It  is  approximately  10am  in  mid-July  and  you have just  crash  landed  in  the  Sonora  Desert, near  the  Mexico-USA  border.  The  plane  has completely  burnt out,  only  the  frame  remains. Miraculously,  the  10  passengers  are  uninjured but the pilot has been killed. The  pilot  was  unable  to  tell  anyone  of  your position  before  the  crash. However,  ground sightings taken shortly before the crash suggest that you are about 65 miles off the course filed in your  flight  plan. A  few  moments  before  the crash,  the  pilot  indicated  you  were  about  70 miles south east of a mining camp. The camp is the nearest known settlement. The immediate area is quite flat and, except for the  occasional  thorn  bush  and  cacti,  is  rather barren.     Before the plane caught fire, your group was able to save the 10 items on the desk.Your task is to rank them according to their importance to your survival in the desert. In pairs, rank the items starting with 1 for the most important, down to 10 for the least important. Be prepared to justify your decisions!
                            </InstructionsParagraph>
                        </InstructionsArea>
                    </>
                    
                </AreaWidth> 
                <ItemWidth>
                    <InstructionsParagraph style={{ margin: "10px 1em" }}>
                        Drag and rank items from green box to grey box.
                    </InstructionsParagraph>
                   <DragAndDropWrapper meetingId={meetingId} netId={netId} />
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default DesertProblem;
