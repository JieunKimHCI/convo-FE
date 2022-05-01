import React from 'react';
import Agreement from './components/agreement';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmotionDetection from './components/emotion-detection';
import Instructions from './components/instructions';
import ClientMain from './components/client-main';
import Login from './components/login';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/admin">
                        <EmotionDetection />
                    </Route>
                    <Route path="/client">
                        <ClientMain />
                    </Route>
                    <Route path="/agreement">
                        <Agreement />
                    </Route>
                    <Route path="/">
                        <Instructions />
                    </Route> 
                </Switch>
            </BrowserRouter>    
        </div>
    );
}

export default App;