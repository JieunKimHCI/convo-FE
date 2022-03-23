import React, { Component } from 'react';
import Agreement from './components/agreement';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Emotions from './components/emotions';
import Dictaphone from './components/speechtotext';

class App extends Component{

    handleSubmit = (character) => {
        // this.setState({characters: [...this.state.characters, character]});
        const url = 'http://127.0.0.1:5000/userconsent'
        fetch(url, {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(character),
        })
    }

    handleEmotion = (character) => {
        // this.setState({characters: [...this.state.characters, character]});
        const url = 'http://127.0.0.1:000/emotions'
        fetch(url, {
            method: 'POST',
            mode: 'cors', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(character),
        })
    }

    render() {
        return (
            <div className='App'> 
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Agreement initialState={this.state} handleSubmit={this.handleSubmit} />}/>
                    <Route path="/emotions" element={<Emotions />}/>
                    <Route path="/speech" element={<Dictaphone />}/>
                </Routes>
            </BrowserRouter>
            </div>
        );
    }
}

export default App;