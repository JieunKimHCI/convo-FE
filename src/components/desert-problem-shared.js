import Timer from './timer'; 
import { useState, useCallback } from "react"; 
// import DragAndDropList from '../components/dragAndDrop/DragList';
import DragAndDropWrapper from '../components/dragAndDrop/dragAndDropWrapper';
import styled from "styled-components";


const Container = styled.div`
        margin: 2rem;
        display:grid;
    `;

    const EmotionDetectionPopupStyle = styled.div`
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 10rem 30rem;
        grid-column-gap: 20px;
        background-color: white;
        color: black;
        z-index: 9;
        width: 75rem;
        height: 55rem;
        text-align: center;
        padding: 0rem 2rem;
    `;

    const AreaWidth = styled.div`
        grid-area: 2 / 1 / 3 / 3;
        height: 20rem; 
    `;

    const ItemWidth = styled.div`
        grid-area: 2 / 3 / 3 / 4;
        height:20rem;
    `;

    const TextArea = styled.textarea`
        overflow-y: scroll;
        width: 100%;
        height: 20rem;
        color:  black;
    `;
   
    const H3 = styled.h3`
        font-size: 25px;
    `;
const InstructionsBar = styled.div`
    grid-area: 1 / 1 / 2 / 4;
    height: 5rem;
    `;

function DesertProblemShared() {
    return (
        <Container>
            <EmotionDetectionPopupStyle>
                <InstructionsBar>
                    <h2>Group Decision-Making Task</h2>
                    <p><strong>Discuss with your group members to make a final decision for the item rank </strong> -- Drag and rank items from 1 (the most important) to 5 (the least important).</p>
                </InstructionsBar>
                <AreaWidth>
                    <>
                        <H3>DESERT PROBLEM</H3>
                        <TextArea rows={5} defaultValue='It  is  approximately  10am  in  mid-July  and  you have just  crash  landed  in  the  Sonora  Desert, near  the  Mexico-USA  border.  The  plane  has completely  burnt out,  only  the  frame  remains. Miraculously,  the  10  passengers  are  uninjured but the pilot has been killed. The  pilot  was  unable  to  tell  anyone  of  your position  before  the  crash. However,  ground sightings taken shortly before the crash suggest that you are about 65 miles off the course filed in your  flight  plan. A  few  moments  before  the crash,  the  pilot  indicated  you  were  about  70 miles south east of a mining camp. The camp is the nearest known settlement. The immediate area is quite flat and, except for the  occasional  thorn  bush  and  cacti,  is  rather barren.     Before the plane caught fire, your group was able to save the 10 items on the desk.Your task is to rank them according to their importance to your survival in the desert. In pairs, rank the items starting with 1 for the most important, down to 10 for the least important. Be prepared to justify your decisions!' />
                    </>
                    
                </AreaWidth> 
                <ItemWidth>
                   <DragAndDropWrapper/>
                </ItemWidth>
            </EmotionDetectionPopupStyle>
        </Container>
    );
}
export default DesertProblemShared;
