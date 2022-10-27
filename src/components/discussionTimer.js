import React from 'react';
import { useStopwatch } from 'react-timer-hook';

function MyStopwatch() {
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

  return (
    <div style={{textAlign: 'center'}}>
        {isRunning ? 
        <div style={{fontSize: '50px'}}>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div> : 
        <button onClick={start} style={startButtonStyle}>Start Group Discussion</button>}
    </div>
  );
}

export default function discussionTimer() {
    return (
      <div>
        <MyStopwatch />
      </div>
    );
  }