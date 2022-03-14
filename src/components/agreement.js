import { Component } from "react";
import { useNavigate } from 'react-router-dom';

class Agreement extends Component{
    
    initialState ={
        purposeOfStudyAgreement: false,
        procedureAgreement: false,
        name: '',
        netId: '',
    }

    state = this.initialState

    handleCheckboxInputChange = (event) => {
        const name = event.target.id
        const value = event.target.checked
        this.setState({
            [name]: value,
        })
    }

    handleTextInputChange = (event) => {
        const name = event.target.id
        const value = event.target.value
        this.setState({
            [name]: value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
    }

    render() {
        const { purposeOfStudyAgreement, procedureAgreement, name, netId } = this.state;

        const agreementPopupStyle = {
            backgroundColor: 'white',
            color: 'black',
            zIndex : '9',
            width : '125vh',
            height : '70vh',
            textAlign : 'left',
            padding : '2vh',
            overflowY: 'auto',
        };

        const padding_right = {
            paddingRight : '2vh',
        }

        const padding_top = {
            paddingTop : '2vh',
        }

        const textareaStyle = {
            maxWidth: '99%',
            width: '99%',
        }

        const nextButtonEnabledStyle = {
            backgroundColor: '#282c34',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '99%',
            padding: '2vh',
        }

        const nextButtonDisabledStyle = {
            backgroundColor: 'grey',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            width: '99%',
            padding: '2vh',
        }

        const smallText = {
            fontSize: '0.75em',
        }

        const purposeOfStudyMessage = "A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message.";
        const procedureMessage = "A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message. A very long message.";
        const statementOfConsentMessage = "I give the researchers permission to use my recorded screen data, including still images, in publications and at conferences or presentations."
        
        return(
            <div style = {agreementPopupStyle} id = 'agreement'>
                <form>
                    <p>
                        <b>Purpose of study</b>
                        <textarea style = {textareaStyle} rows = "3" readOnly>{purposeOfStudyMessage}</textarea>
                        <input type="checkbox" id="purposeOfStudyAgreement" name="purposeOfStudyAgreement" value={purposeOfStudyAgreement} onChange={this.handleCheckboxInputChange}/>
                        <label style={smallText} for="purposeOfStudyAgreement">I have read and agree</label>
                    </p>
                    <p>
                        <b>Procedure</b>
                        <textarea style = {textareaStyle} rows = "3" readOnly>{procedureMessage}</textarea>
                        <input type="checkbox" id="procedureAgreement" name="procedureAgreement" value={procedureAgreement} onChange={this.handleCheckboxInputChange}/>
                        <label style={smallText} for="procedureAgreement">I have read and agree</label>
                    </p>
                    <p>
                        <b>Statement of Consent</b><br></br>
                        {statementOfConsentMessage}
                    </p>
                    <div>
                        <label style = {padding_right} htmlFor="name"><b>Name</b></label>
                        <input type="text" name="name" id="name" value={name} onChange={this.handleTextInputChange} />
                    </div>
                    <div>
                        <label style = {padding_right} htmlFor="job"><b>Net Id</b></label>
                        <input type="text" name="netId" id="netId" value={netId} onChange={this.handleTextInputChange} />
                    </div>
                    <div style={padding_top}>
                        <input 
                            style = {(!this.state.purposeOfStudyAgreement || !this.state.procedureAgreement || this.state.name == "" || this.state.netId == "") ? nextButtonDisabledStyle : nextButtonEnabledStyle} 
                            type="button" 
                            value="Next" 
                            onClick={this.submitForm} 
                            disabled={(!this.state.purposeOfStudyAgreement || !this.state.procedureAgreement || this.state.name == "" || this.state.netId == "")}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Agreement;