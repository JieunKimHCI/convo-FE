import React from 'react';
import UserConsent from './components/user-consent';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdminMain from './components/admin-main';
import Instructions from './components/instructions';
import ClientMain from './components/client-main';
import CreateMeeting from './components/create-meeting';
import Summary from './components/summary';

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
                        <ClientMain />
                    </Route>
                    <Route path="/get-summary">
                        <Summary />
                    </Route>
                    <Route path="/user-consent">
                        <UserConsent />
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