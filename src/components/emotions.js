import { Component } from "react";

class EmotionDetection extends Component{


    submitForm = () => {
        this.props.handleEmotion(this.state)
    }
   
    state = this.initialState

    render() {

        const emotionPopupStyle = {
            backgroundColor: 'black',
            color: 'white',
            zIndex : '9',
            width : '125vh',
            height : '70vh',
            textAlign : 'center',
            padding : '2vh',
            overflowY: 'auto',
        };

        const padding_top = {
            paddingTop : '2vh',
        }

        const textareaStyle = {
            maxWidth: '99%',
            width: '99%'
        }

        const buttonDisabledStyle = {
            backgroundColor: 'grey',
            color: 'black',
            border: 'none',
            cursor: 'pointer',
            width: '99%',
            padding: '2vh',
        }
       return(
            <div style = {emotionPopupStyle} id = 'emotion-detection'>
                <p>
                        <b>Please Speak Any Word or Sentence</b>
                        <textarea style = {textareaStyle} rows = "10" readOnly></textarea>
                </p>
                <div style={padding_top}>
                        <input 
                            type="button"
                            style={buttonDisabledStyle}
                            value="Show Emotions" 
                            onClick= {this.submitForm.handleEmotion}/>
                </div>
            </div>
        );
    }
}

export default EmotionDetection; 