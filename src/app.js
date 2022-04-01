import React from 'react';
import Agreement from './components/agreement';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmotionDetection from './components/emotion-detection';
import Instructions from './components/instructions';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path="/emotion-detection">
                        <EmotionDetection />
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