function Survey() {
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
        width : '100vh',
        height : '80vh',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return(
        <div style={container}>
            <div style = {emotionDetectionPopupStyle}>
                <h2><p>Thank you for your participation!</p><p>Please click on the link below to complete the survey</p></h2>
            </div>
        </div>
    )

 }
 export default Survey;