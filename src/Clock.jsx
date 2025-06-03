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

import { useEffect, useRef, useState } from 'react';

function Clock({ isRunning, handleStartStop }) {
  const [time, setTime] = useState(new Date());

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(new Date());
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const getTimeDigits = () => {
    const hour = String(time.getHours()).padStart(2, '0');
    const min = String(time.getMinutes()).padStart(2, '0');
    const sec = String(time.getSeconds()).padStart(2, '0');

    return [...hour, '시', ...min, '분', ...sec, '초'];
  };

  return (
    <div className="timer-container">
      <h1>RealTime Clock</h1>
      <div className="timer-boxes">
        {getTimeDigits().map((char, index) => (
          <div className="time-box" key={index}>
            {char}
          </div>
        ))}
      </div>
      <button className={isRunning ? 'timer-stop' : 'timer-start'} onClick={handleStartStop}>
        {isRunning ? '타이머 일시정지' : '타이머 시작'}
      </button>
    </div>
  );
}

export default Clock;
