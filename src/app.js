import React from 'react';
import UserConsent from './components/user-consent';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AdminMain from './components/admin-main';
import Instructions from './components/instructions';
import DraggableList from './components/DraggableList';
import DesertProblem from './components/desert-problem';
import DesertProblemShared from './components/desert-problem-shared';
import ClientMain from './components/client-main';
import CreateMeeting from './components/create-meeting';
import Summary from './components/summary';
import Timer from './components/timer';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Switch>
                    <Route path="/create-meeting">
                        <CreateMeeting />
                    </Route>
                    <Route path="/admin">
                        <AdminMain />
                    </Route>
                    <Route path="/client">
                        <DesertProblemShared />
                        <ClientMain />
                    </Route>
                    <Route path="/get-summary">
                        <Summary />
                    </Route>
                    <Route path="/user-consent">
                        <UserConsent />
                    </Route>
                    <Route path="/draggable-list">
                        <DraggableList />
                    </Route>
                    <Route path="/desert-problem">
                        <DesertProblem />
                    </Route>
                     <Route path="/timer">
                        <Timer fontSize='5em' />
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