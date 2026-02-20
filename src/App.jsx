import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import SetupForm from './components/SetupForm';
import TimerScreen from './components/TimerScreen';
import { calculateCookTimes } from './utils/cookingLogic';

const MotionDiv = motion.div;

function App() {
  const [times, setTimes] = useState(null);

  const handleStart = (inputs) => {
    setTimes(calculateCookTimes(inputs));
  };

  const handleRestart = () => {
    setTimes(null);
  };

  return (
    <div className="app-frame">
      <AnimatePresence mode="wait">
        {times ? (
          <MotionDiv key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TimerScreen times={times} onRestart={handleRestart} />
          </MotionDiv>
        ) : (
          <MotionDiv key="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SetupForm onStart={handleStart} />
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
