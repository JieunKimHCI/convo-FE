import React, { Component } from 'react';
import Agreement from './components/agreement';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hi from './components/hi';

class App extends Component{

    handleSubmit = (character) => {
        // this.setState({characters: [...this.state.characters, character]});
        console.log(character['name']);
        console.log(character['netId']);
        fetch('http://localhost:3000/userconsent', {
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
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Agreement initialState={this.state} handleSubmit={this.handleSubmit}/>}/>
                    <Route path="/hi" element={<Hi />}/>
                </Routes>
            </BrowserRouter>
        );
    }
}

export default App;