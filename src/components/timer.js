import React from 'react';
import { useTimer } from 'react-timer-hook';
import { useHistory } from "react-router-dom";

function MyTimer({ expiryTimestamp, fontSize}) {
    const history = useHistory();

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
  } = useTimer({ expiryTimestamp, onExpire: () => console.log('Timer expired!, Redirecting...') });


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
      {!isRunning && 
            
            history.push({
                pathname: '/client',
            })}
    </div>
  );
}

export default function Timer({fontSize, sec}) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + sec); // 30 sec timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} fontSize={fontSize}/>
    </div>
  );
}

