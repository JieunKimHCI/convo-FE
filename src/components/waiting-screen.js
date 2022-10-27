function WaitingScreen() {
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
                <h2>Please wait while the other participants complete the task</h2>
            </div>
        </div>
    )

 }
 export default WaitingScreen;