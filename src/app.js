import React from 'react';
import UserConsent from './components/user-consent';
import { Route, Routes } from "react-router-dom";

import DragAndDropWrapper from './components/dragAndDrop/dragAndDropWrapper';
import AdminMain from './components/admin-main';

import Instructions from './components/instructions';
import DraggableList from './components/DraggableList';
import DesertProblem from './components/desert-problem';
import DesertProblemShared from './components/desert-problem-shared';
import ClientMain from './components/client-main';
import CreateMeeting from './components/create-meeting';
import Summary from './components/summary';

import Waiting from './components/waiting-screen';
import Survey from './components/survey';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path="/dragAndDrop" element={<DragAndDropWrapper />} >
                        {/* <CreateMeeting /> */}
                    </Route>
                    <Route path="/create-meeting" element={<CreateMeeting />} >
                        {/* <CreateMeeting /> */}
                    </Route>
                    <Route path="/admin" element={ <><AdminMain /></>} >
                        {/* <AdminMain /> */}
                    </Route>
                    <Route path="/client" element={<><DesertProblemShared />
                        <ClientMain /></>}>
                        {/* <DesertProblemShared />
                        <ClientMain /> */}
                    </Route>
                    <Route path="/get-summary" element={<Summary />} >
                        {/* <Summary /> */}
                    </Route>
                    <Route path="/user-consent" element={<UserConsent />} >
                        {/* <UserConsent /> */}
                    </Route>
                    <Route path="/draggable-list" element={<DraggableList />} >
                        {/* <DraggableList /> */}
                    </Route>
                    <Route path="/desert-problem" element={<><DesertProblem /></>} >
                        {/* <DesertProblem /> */}
                    </Route>
                    <Route path="/waiting" element={<Waiting />} >
                        {/* <WaitingRoom /> */}
                    </Route>
                     
                    <Route path="/" element={<Instructions />} >
                        {/* <Instructions /> */}
                    </Route> 
                    <Route path="/survey" element={<Survey />} >
                        {/* <WaitingRoom /> */}
                    </Route>
                </Routes>
             
        </div>
    );
}

export default App;