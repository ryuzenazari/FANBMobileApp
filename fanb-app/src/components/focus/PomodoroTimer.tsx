import { useState, useEffect, useRef } from 'react';

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
  const [animation, setAnimation] = useState('');
  const [timerMode, setTimerMode] = useState<'focus' | 'short' | 'long'>('focus');
  const [sessionCount, setSessionCount] = useState(0);
  
  const elapsedRef = useRef(0);
  const totalSeconds = useRef(initialMinutes * 60);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = window.setInterval(() => {
        elapsedRef.current += 1;
        
        if (seconds === 0) {
          if (minutes === 0) {
            if (interval) window.clearInterval(interval);
            setIsActive(false);
            onComplete?.();
            setAnimation('pulse');
            
            // Timer completed logic
            if (timerMode === 'focus') {
              setSessionCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount % 4 === 0) {
                  // After 4 sessions, take long break
                  setTimerMode('long');
                  setMinutes(15);
                  setIsBreak(true);
                } else {
                  // Take short break
                  setTimerMode('short');
                  setMinutes(5);
                  setIsBreak(true);
                }
                return newCount;
              });
            } else {
              // Break ended, go back to focus
              setTimerMode('focus');
              setMinutes(initialMinutes);
              setIsBreak(false);
            }

            // Reset timer animation after 1 second
            setTimeout(() => setAnimation(''), 1000);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && interval) {
      window.clearInterval(interval);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, minutes, seconds, initialMinutes, onComplete, timerMode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    setAnimation(isActive ? '' : 'start');
    setTimeout(() => setAnimation(''), 300);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (timerMode === 'focus') {
      setMinutes(initialMinutes);
    } else if (timerMode === 'short') {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
    elapsedRef.current = 0;
    setAnimation('reset');
    setTimeout(() => setAnimation(''), 300);
  };

  const switchMode = (mode: 'focus' | 'short' | 'long') => {
    setIsActive(false);
    setTimerMode(mode);
    
    if (mode === 'focus') {
      setMinutes(initialMinutes);
      setIsBreak(false);
    } else if (mode === 'short') {
      setMinutes(5);
      setIsBreak(true);
    } else {
      setMinutes(15);
      setIsBreak(true);
    }
    
    setSeconds(0);
    elapsedRef.current = 0;
    totalSeconds.current = (mode === 'focus' ? initialMinutes : mode === 'short' ? 5 : 15) * 60;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const total = timerMode === 'focus' 
      ? initialMinutes * 60 
      : timerMode === 'short' 
      ? 5 * 60 
      : 15 * 60;
    const remaining = minutes * 60 + seconds;
    return ((total - remaining) / total) * 100;
  };

  // Format time as MM:SS
  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Determine the current mode color
  const getModeColor = () => {
    switch (timerMode) {
      case 'focus': return 'text-primary border-primary';
      case 'short': return 'text-green-500 border-green-500';
      case 'long': return 'text-indigo-500 border-indigo-500';
      default: return 'text-primary border-primary';
    }
  };

  const progress = calculateProgress();
  const circumference = 2 * Math.PI * 60; // 2πr where r=60
  const dashoffset = circumference * (1 - progress / 100);
  
  return (
    <div className="flex flex-col items-center">
      {/* Mode selector */}
      <div className="flex space-x-2 mb-4">
        <button 
          onClick={() => switchMode('focus')}
          className={`px-3 py-1 rounded-full text-sm ${
            timerMode === 'focus' 
              ? 'bg-primary text-white' 
              : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          Fokus
        </button>
        <button 
          onClick={() => switchMode('short')}
          className={`px-3 py-1 rounded-full text-sm ${
            timerMode === 'short' 
              ? 'bg-green-500 text-white' 
              : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          Istirahat Pendek
        </button>
        <button 
          onClick={() => switchMode('long')}
          className={`px-3 py-1 rounded-full text-sm ${
            timerMode === 'long' 
              ? 'bg-indigo-500 text-white' 
              : 'text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          Istirahat Panjang
        </button>
      </div>
      
      {/* Timer display */}
      <div className={`relative w-64 h-64 ${animation}`}>
        {/* Circle background */}
        <svg className="w-full h-full" viewBox="0 0 160 160">
          <circle 
            cx="80" 
            cy="80" 
            r="60" 
            fill="none" 
            stroke="rgba(224, 224, 224, 0.3)" 
            strokeWidth="10" 
            className="dark:opacity-20"
          />
          <circle 
            cx="80" 
            cy="80" 
            r="60" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="10" 
            strokeDasharray={circumference} 
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            style={{ 
              transform: 'rotate(-90deg)', 
              transformOrigin: 'center',
              transition: 'stroke-dashoffset 0.5s ease'
            }}
            className={`${
              timerMode === 'focus' 
                ? 'stroke-primary' 
                : timerMode === 'short'
                ? 'stroke-green-500'
                : 'stroke-indigo-500'
            }`}
          />
        </svg>
        
        {/* Timer center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold mb-2 transition-colors ${
            timerMode === 'focus' 
              ? 'text-primary' 
              : timerMode === 'short'
              ? 'text-green-500'
              : 'text-indigo-500'
          }`}>
            {formatTime()}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {timerMode === 'focus' 
              ? 'Waktu fokus' 
              : timerMode === 'short'
              ? 'Istirahat pendek'
              : 'Istirahat panjang'
            }
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center mt-6 space-x-4">
        <button 
          onClick={toggleTimer}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            ${isActive 
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300' 
              : `
                ${timerMode === 'focus' 
                  ? 'bg-primary hover:bg-primary-dark text-white' 
                  : timerMode === 'short'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }
              `
            }
            transition-all
          `}
        >
          {isActive ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          )}
        </button>
        
        <button 
          onClick={resetTimer}
          className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
      
      {/* Session counter */}
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        {sessionCount === 0 ? 'Belum ada sesi diselesaikan' : `Sesi diselesaikan: ${sessionCount}`}
      </div>

      {/* Add CSS for animations */}
      <style>{`
        .pulse {
          animation: pulse-animation 1s ease;
        }
        
        .start {
          animation: start-animation 0.3s ease;
        }
        
        .reset {
          animation: reset-animation 0.3s ease;
        }
        
        @keyframes pulse-animation {
          0% { transform: scale(1); }
          10% { transform: scale(1.1); }
          20% { transform: scale(1); }
          30% { transform: scale(1.05); }
          40% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        
        @keyframes start-animation {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        
        @keyframes reset-animation {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default PomodoroTimer; 