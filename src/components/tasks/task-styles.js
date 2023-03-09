import styled from "styled-components";

export const Container = styled.div`
        margin: 2rem;
        display:grid;
    `;

export const EmotionDetectionPopupStyle = styled.div`
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
    `;

export const CenteredInstruction = styled.div`
        display: grid;
        grid-template-rows: 10em 30em;
        background-color: white;
        color: black;
        z-index: 9;
        width: 75rem;
        text-align: center;
        padding: 2rem 2rem;
    `;

export const SubmitButton = styled.input`
    background-color: #66e29a;
    color: white;
    border: none;
    cursor: pointer;
    width: 79rem;
    padding: 1rem;
    margin: 1rem 0rem;
`;

export const AreaWidth = styled.div`
        grid-area: 2 / 1 / 3 / 3;
        height: 95%; 
        border: 2px solid #000;
    `;

export const ItemWidth = styled.div`
        grid-area: 2 / 3 / 3 / 4;
        height:95%;
        border: 2px solid #000;
    `;

export const InstructionsArea = styled.div`
       padding:2em;
    `;

export const InstructionsParagraph = styled.p`
        overflow-y: auto;
        width: 100%;
        color:  black;
        text-align: justify;
        font-weight: 400;
        line-height: 1.7em;
    `;

export const H3 = styled.h3`
        font-size: 25px;
        text-decoration: underline;
    `;

export const InstructionsBar = styled.div`
    grid-area: 1 / 1 / 2 / 4;
    height: 5rem;
    `;

