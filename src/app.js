import React, { Component } from 'react';
import Agreement from './components/agreement';

class App extends Component{

    handleSubmit = (character) => {
        this.setState({characters: [...this.state.characters, character]})
    }

    render() {
        return (
            <div className="App">
                <p>{this.state}</p>
                <Agreement initialState={this.state} handleSubmit={this.handleSubmit}/>
            </div>
        );
    }
}

export default App