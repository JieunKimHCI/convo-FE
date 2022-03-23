import React from 'react';
import Agreement from './components/agreement';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Emotions from './components/emotions';
import Dictaphone from './components/speechtotext';
=======
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmotionDetection from './components/emotion-detection';
>>>>>>> 7803830d6ff5c1baf6ce0dd28c7d63e727fda746

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
<<<<<<< HEAD
                <Routes>
                    <Route path="/" element={<Agreement initialState={this.state} handleSubmit={this.handleSubmit} />}/>
                    <Route path="/emotions" element={<Emotions />}/>
                    <Route path="/speech" element={<Dictaphone />}/>
                </Routes>
            </BrowserRouter>
            </div>
        );
    }
=======
                <Switch>
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
>>>>>>> 7803830d6ff5c1baf6ce0dd28c7d63e727fda746
}

export default App;