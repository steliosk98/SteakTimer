import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Add30sButton from './Add30sButton';
import ProgressRing from './ProgressRing';
import SteakStage from './SteakStage';
import { formatSeconds } from '../utils/cookingLogic';

const MotionMain = motion.main;
const MotionDiv = motion.div;

const PHASE_META = [
  { label: 'Side 1', helper: 'Sear for crust', ring: '#bf5b2c' },
  { label: 'Side 2', helper: 'Flip and finish', ring: '#aa472b' },
  { label: 'Rest', helper: 'Let juices settle', ring: '#5d6f44' },
];

export default function TimerScreen({ times, onRestart }) {
  const phases = useMemo(
    () => [
      { ...PHASE_META[0], seconds: times.sideTime },
      { ...PHASE_META[1], seconds: times.sideTime },
      { ...PHASE_META[2], seconds: times.restTime },
    ],
    [times.sideTime, times.restTime],
  );

  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(times.sideTime);
  const [isRunning, setIsRunning] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [phaseAlert, setPhaseAlert] = useState('Start cooking');
  const [awaitingAction, setAwaitingAction] = useState(null);

  useEffect(() => {
    if (!isRunning || isFinished) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        if (currentPhase === 0) {
          setAwaitingAction('flip');
          setIsRunning(false);
          setPhaseAlert('Flip the steak');
          return 0;
        }

        if (currentPhase === 1) {
          setAwaitingAction('takeoff');
          setIsRunning(false);
          setPhaseAlert('Take it off heat');
          return 0;
        }

        if (currentPhase < phases.length - 1) {
          const nextPhase = currentPhase + 1;
          setCurrentPhase(nextPhase);
          setPhaseAlert('Rest phase started');
          return phases[nextPhase].seconds;
        }

        setIsFinished(true);
        setIsRunning(false);
        setPhaseAlert('Steak is ready');
        return 0;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [currentPhase, isFinished, isRunning, phases]);

  useEffect(() => {
    if (!phaseAlert) {
      return undefined;
    }

    const timeoutId = setTimeout(() => setPhaseAlert(''), 2200);
    return () => clearTimeout(timeoutId);
  }, [phaseAlert]);

  const activePhase = phases[currentPhase];
  const progress = isFinished ? 100 : (timeLeft / activePhase.seconds) * 100;

  const toggleRunning = () => {
    if (isFinished || awaitingAction) {
      return;
    }
    setIsRunning((prev) => !prev);
  };

  const add30s = () => {
    if (!isFinished && !awaitingAction) {
      setTimeLeft((prev) => prev + 30);
    }
  };

  const confirmPhaseAction = () => {
    if (awaitingAction === 'flip') {
      setCurrentPhase(1);
      setTimeLeft(phases[1].seconds);
      setAwaitingAction(null);
      setIsRunning(true);
      setPhaseAlert('Side 2 started');
      return;
    }

    if (awaitingAction === 'takeoff') {
      setCurrentPhase(2);
      setTimeLeft(phases[2].seconds);
      setAwaitingAction(null);
      setIsRunning(true);
      setPhaseAlert('Rest phase started');
    }
  };

  return (
    <MotionMain
      className="screen-shell"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="panel timer-panel">
        <header className="timer-head">
          <p className="eyebrow">Steak Timer</p>
          <h2>{isFinished ? 'Done' : activePhase.label}</h2>
          <p className="muted">{isFinished ? 'Serve immediately.' : activePhase.helper}</p>
        </header>

        <div className="timer-layout">
          <div className="ring-wrap">
            <ProgressRing progress={progress} color={activePhase.ring} trackColor="#2a3340" />
            <div className="ring-overlay">
              <SteakStage phaseIndex={currentPhase} isRunning={isRunning} isFinished={isFinished} />
              {awaitingAction ? (
                <button type="button" className="center-action-button" onClick={confirmPhaseAction}>
                  {awaitingAction === 'flip' ? 'Flipped' : 'Taken off'}
                </button>
              ) : (
                <div className="timer-meta">
                  <p className="timer-readout">{formatSeconds(timeLeft)}</p>
                  <p className="timer-subtext">{isRunning ? 'Running' : isFinished ? 'Complete' : 'Paused'}</p>
                </div>
              )}
            </div>
          </div>

          <div className="phase-pills" aria-label="Phase progress">
            {phases.map((phase, index) => {
              const isActive = index === currentPhase;
              const isComplete = index < currentPhase || (isFinished && index === currentPhase);
              return (
                <span
                  key={phase.label}
                  className={`phase-pill ${isActive ? 'is-active' : ''} ${isComplete ? 'is-complete' : ''}`}
                >
                  {phase.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="actions-row">
          <button type="button" className="secondary-button" onClick={toggleRunning} disabled={isFinished || !!awaitingAction}>
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <Add30sButton onClick={add30s} />
          <button type="button" className="ghost-button" onClick={onRestart}>
            Start Over
          </button>
        </div>

        <AnimatePresence>
          {phaseAlert ? (
            <MotionDiv
              key={phaseAlert}
              className="phase-alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              aria-live="polite"
            >
              {phaseAlert}
            </MotionDiv>
          ) : null}
        </AnimatePresence>
      </section>
    </MotionMain>
  );
}
