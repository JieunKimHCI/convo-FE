import {DraggableList} from './DraggableList';
import Timer from './timer'; 
import { useState, useCallback } from "react"; 

function DesertProblemShared() {

    const [isSubmitted, setIsSubmitted] = useState(false);

    const wrapperSetIsSubmitted = useCallback(val => {
        setIsSubmitted(val);
    }, [setIsSubmitted]);

    const container = {
        padding: '5vh',
    }
    const emotionDetectionPopupStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        gridAutoRows: 'minmax(100px, auto)',
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '100vh',
        height : '80vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
        margin:'3vh'
    };
    
    const rowStyle = {
        // display: 'table',
        // clear: 'both',
        // width: '100%'
    }

    const areaWidth = {
        // width: '70%',
        // float: 'left',
        gridColumn: '1 / 3',
        gridRow: '1',
    }

    const itemWidth = {
        // width: '30%',
        // float: 'right',
        gridColumn: '3',
        gridRow: '1',
    }

    const textArea ={
        overflowY: 'scroll',
        width: '100%',
        height: '50vh',
    }

    const itemList = {
        borderWidth: '1px',
        height: '400px',
    }

    return (
        <div style={container}>

            <div style = {emotionDetectionPopupStyle}>
                <div style={areaWidth}>
                    <center>
                        <h3>DESERT PROBLEM SHARED</h3>
                        <textarea style={textArea} rows={5} value='It  is  approximately  10am  in  mid-July  and  you have just  crash  landed  in  the  Sonora  Desert, near  the  Mexico-USA  border.  The  plane  has completely  burnt out,  only  the  frame  remains. Miraculously,  the  10  passengers  are  uninjured but the pilot has been killed. The  pilot  was  unable  to  tell  anyone  of  your position  before  the  crash. However,  ground sightings taken shortly before the crash suggest that you are about 65 miles off the course filed in your  flight  plan. A  few  moments  before  the crash,  the  pilot  indicated  you  were  about  70 miles south east of a mining camp. The camp is the nearest known settlement. The immediate area is quite flat and, except for the  occasional  thorn  bush  and  cacti,  is  rather barren.     Before the plane caught fire, your group was able to save the 10 items on the desk.Your task is to rank them according to their importance to your survival in the desert. In pairs, rank the items starting with 1 for the most important, down to 10 for the least important. Be prepared to justify your decisions!' />
                    </center>
                    <Timer fontSize='2em' sec={300} />
                </div> 
                <div style={itemWidth}>
                    <center>
                        <h3>ITEM LIST</h3>
                        {/* <textarea style={itemList} /> */}
                        <DraggableList setIsSubmiitedSetter={wrapperSetIsSubmitted}/>
                    </center>
                </div>
            </div>
        </div>
    );
}
export default DesertProblemShared;
