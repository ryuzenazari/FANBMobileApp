import { useState, useEffect } from 'react';

interface PomodoroTimerProps {
  initialMinutes?: number;
  onComplete?: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  initialMinutes = 25,
  onComplete,
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (interval) window.clearInterval(interval);
            setIsActive(false);
            onComplete?.();
            // Jika timer berakhir, ganti antara fokus dan istirahat
            setIsBreak(!isBreak);
            setMinutes(isBreak ? 25 : 5); // 25 menit fokus, 5 menit istirahat
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (interval) {
      window.clearInterval(interval);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsBreak(false);
  };

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
        {isBreak ? 'Istirahat' : 'Fokus'}
      </h2>
      <div className="text-5xl font-bold text-center mb-6 text-primary-dark">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="px-6 py-2 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer; 