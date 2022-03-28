import React from 'react';
import Agreement from './components/agreement';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmotionDetection from './components/emotion-detection';
import WebcamComponent from './components/webcam';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path="/webcam">
                        <WebcamComponent />
                    </Route>
                    <Route path="/emotion-detection">
                        <EmotionDetection />
                    </Route>
                    <Route path="/">
                        <Agreement />
                    </Route> 
                </Switch>
            </BrowserRouter>    
        </div>
    );
}

export default App;