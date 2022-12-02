import React from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useLocation } from "react-router-dom";

const { DeepstreamClient } = window.DeepstreamClient;
const client = new DeepstreamClient('wss://desolate-spire-52971.herokuapp.com');
client.login();
let record = null;
let isPaused = null;
function MyStopwatch({ MeetingEnd }) {
  const location = useLocation();
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const startButtonStyle = {
    color: 'black',
    alignSelf: 'center',
    // gridRowStart: 2,
    // gridColumnStart: 3,
    backgroundColor: 'rgba(217, 217, 214, 0.8)',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.8)',
    padding: '10%',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '10px',
    alignContent: 'center',
    fontSize: '15px'
}

  function startGroupDiscussion(event) {
    start();
    record.set('startGroupProblem', 'true');
  }

  
  
  if(record == null){
    record = client.record.getRecord(location.state.meetingId);
    console.log("Welcome to edhbdkjd")
    console.log("from outside",hours, minutes, seconds)

    record.subscribe('endMeetingTimer', function(value) {
      if (value === 'true') {
        console.log("Pausing now");
        console.log(hours, minutes, seconds)
        pause();
        isPaused = true;
      }
    });
  }
  
    return (
    <div style={{textAlign: 'center'}}>
      
        {hours === 0 && minutes === 0 && seconds === 0 ? <span></span>:
          <div style={{ fontSize: '50px' }}>
            <span> {hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </div>
        }
        {!isRunning && <button onClick={startGroupDiscussion} style={startButtonStyle}>Start Group Discussion</button>}
    </div>
  );
}

export default function discussionTimer({MeetingEnd}) {
    return (
      <div>
        <MyStopwatch MeetingEnd={MeetingEnd}/>
      </div>
    );
  }