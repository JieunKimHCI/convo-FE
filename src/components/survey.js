import { useLocation } from "react-router-dom";

function Survey() {
    const location = useLocation();

    const container = {
        padding: '5vh',
    }

    const emotionDetectionPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
        gridColumnGap: '0px',
        gridRowGap: '0px',
        width: '100vh',
        height: '80vh',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={container}>
            <div style={emotionDetectionPopupStyle}>
                <h2>
                    <p>Thank you for your participation!</p><p>Please click on this {location.state.taskId === 0 ?
                        <a href="https://cornell.ca1.qualtrics.com/jfe/form/SV_ezGPELpDZ0Yy7jw">link</a> :
                        <a href="https://cornell.ca1.qualtrics.com/jfe/form/SV_0qWCvdEMCsuI0Ae">link</a>
                    } to complete the survey.
                    </p>
                </h2>
            </div>
        </div>
    )

}
export default Survey;