/**
 * Clock 컴포넌트
 *
 * 실시간 시계를 표시하고 사용자가 시계를 시작하거나 정지할 수 있는 React 함수형 컴포넌트입니다.
 * 시간은 "시", "분", "초"로 나뉘어 표시됩니다.
 *
 * 주요 기능:
 * - 현재 시간을 "HH:mm:ss" 형식으로 표시합니다.
 * - 시계가 실행 중일 때 매초마다 시간을 업데이트합니다.
 **/

import { useState, useEffect, useRef } from "react";
import "./App.css";

function Clock() {
  const [time, setTime] = useState(new Date());
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if(running){
      intervalRef.current = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }

    return() => {
      if (intervalRef.current){
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  const parts =[
    {value: String(time.getHours()).padStart(2, "0"), label: "시"},
    {value: String(time.getMinutes()).padStart(2, "0"), label: "분"},
    {value: String(time.getSeconds()).padStart(2, "0"), label: "초"},
  ];


  return (
<div className="timer-container">
  <div className="card">
    <h2 className="card-title">RealTime Clock</h2>

    <div className="time-row">
      {parts.map((part, idx) => (
        <div key={idx} className="time-block">
          {part.value.split("").map((digit, i) => (
            <span key={i} className="chip">{digit}</span>
          ))}
          <span className="unit">{part.label}</span>
        </div>
      ))}
    </div>
    <button className={`btn btn-sm ${running ? "stop" : "start"}`} onClick={() => setRunning(prev => !prev)}
      aria-pressed={running}>
      {running ?"타이머 정지": "타이머 시작"}</button>
  </div>
</div>
  );
}

export default Clock;
