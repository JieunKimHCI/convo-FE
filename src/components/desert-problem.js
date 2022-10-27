import Timer from './timer'; 
import { useState, useCallback } from "react"; 
// import DragAndDropList from '../components/dragAndDrop/DragList';
import DragAndDropWrapper from '../components/dragAndDrop/dragAndDropWrapper';
import styled from "styled-components";


const Container = styled.div`
        padding: 1vh;
    `;

    const EmotionDetectionPopupStyle = styled.div`
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-gap: 20px;
        grid-auto-rows: minmax(100px, auto);
        background-color: white;
        color: black;
        z-index: 9;
        width: 75rem;
        height: 43rem;
        text-align: center;
        padding: 2vh;
        overflow-y: auto;
        margin:3vh;
    `;

    const AreaWidth = styled.div`
        grid-column: 1 / 3;
        grid-row: 1;
    `;

    const ItemWidth = styled.div`
        grid-column: 3;
        grid-row: 1;
    `;

    const TextArea = styled.textarea`
        overflow-y: scroll;
        width: 100%;
        height: 30rem;
        color:  black;
    `;
   
    const H3 = styled.h3`
        font-size: 25px;
    `;


function DesertProblem() {
    return (
        <Container>
            <EmotionDetectionPopupStyle>
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
export default DesertProblem;
