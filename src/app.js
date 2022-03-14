import React, { Component } from 'react';
import Agreement from './components/agreement';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Emotions from './components/emotions';

class App extends Component{

    handleSubmit = (character) => {
        // this.setState({characters: [...this.state.characters, character]});
        const url = 'http://localhost:3000/userconsent'
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
                </Routes>
            </BrowserRouter>
            </div>
        );
    }
}

export default App;