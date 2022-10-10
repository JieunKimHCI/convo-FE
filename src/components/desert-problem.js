function LatestDesign(){
    const emotionDetectionPopupStyle = {
        backgroundColor: 'white',
        color: 'black',
        zIndex : '9',
        width : '100vh',
        height : '70vh',
        textAlign : 'left',
        padding : '2vh',
        overflowY: 'auto',
    };
    
    const rowStyle = {
        display: 'table',
        clear: 'both',
        width: '100%'
    }

    const areaWidth = {
        width: '70%',
        float: 'left',
    }

    const itemWidth = {
        width: '30%',
        float: 'right',
    }

    const textArea ={
        overflowY: 'scroll',
        width: '500px',
        height: '400px',
    }

    const itemList = {
        borderWidth: '1px',
        height: '400px',
    }

    return(
        <div style = {emotionDetectionPopupStyle}>
            <div style={rowStyle}>
                    <div style={areaWidth}>
                        <center>
                            <h3>DESERT PROBLEM</h3>
                            <textarea style={textArea} rows = '5' value = "It  is  approximately  10am  in  mid-July  and  you have just  crash  landed  in  the  Sonora  Desert, near  the  Mexico-USA  border.  The  plane  has completely  burnt out,  only  the  frame  remains. Miraculously,  the  10  passengers  are  uninjured but the pilot has been killed. 
                            The  pilot  was  unable  to  tell  anyone  of  your position  before  the  crash. However,  ground sightings taken shortly before the crash suggest that you are about 65 miles off the course filed in your  flight  plan. A  few  moments  before  the crash,  the  pilot  indicated  you  were  about  70 miles south east of a mining camp. The camp is the nearest known settlement. The immediate area is quite flat and, except for the  occasional  thorn  bush  and  cacti,  is  rather barren.     
                            Before the plane caught fire, your group was able to save the 10 items on the desk.
                            Your task is to rank them according to their importance to your survival in the desert. 
                            In pairs, rank the items starting with 1 for the most important, down to 10 for the least important. 
                            Be prepared to justify your decisions!"/>
                        </center>
                    </div> 
                    <div style={itemWidth}>
                        <center>
                            <h3>ITEM LIST</h3>
                            <textarea style={itemList}/>
                        </center>
                    </div>          
                </div>
        </div>
    );
}
export default LatestDesign;
