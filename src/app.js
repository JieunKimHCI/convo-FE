import React from 'react';
import Agreement from './components/agreement';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmotionDetection from './components/emotion-detection';
import Instructions from './components/instructions';
import ClientMain from './components/client-main';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path="/emotion-detection">
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