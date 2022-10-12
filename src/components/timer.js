import React from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, fontSize}) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => alert('Timer Expired') });


  return (
    <div style={{textAlign: 'center'}}>
      <p>Time Left</p>
      <div style={{fontSize: fontSize}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>Timer Status : {isRunning ? 'Running' : 'Not running'}</p>
      {/* <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
      }}>Restart</button> */}
    </div>
  );
}

export default function Timer({fontSize}) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 300); // 5 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} fontSize={fontSize}/>
    </div>
  );
}

