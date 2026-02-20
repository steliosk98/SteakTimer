import { AnimatePresence, motion } from 'framer-motion';

const MotionDiv = motion.div;
const MotionPath = motion.path;

export default function SteakStage({ phaseIndex, isRunning, isFinished }) {
  const isRestPhase = phaseIndex >= 2 || isFinished;
  const isCooking = !isRestPhase;
  const isFlipped = phaseIndex === 1;

  const steakMain = isRestPhase ? '#6a3328' : phaseIndex === 0 ? '#9f4135' : '#7b362c';
  const steakFat = isRestPhase ? '#d59a7b' : '#f0b092';
  const steakCrust = isRestPhase ? '#2a1712' : '#3a1f18';

  return (
    <MotionDiv
      className={`steak-stage ${isRestPhase ? 'is-rest' : 'is-cooking'}`}
      style={{
        '--steak-main': steakMain,
        '--steak-fat': steakFat,
        '--steak-crust': steakCrust,
      }}
      animate={{
        scaleX: isRestPhase ? 1 : isFlipped ? -1 : 1,
      }}
      transition={{ scaleX: { type: 'spring', stiffness: 260, damping: 20 } }}
    >
      <MotionDiv
        className="steak-bob"
        animate={isCooking && isRunning ? { y: [0, -2.8, 0] } : { y: 0 }}
        transition={
          isCooking && isRunning
            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.2 }
        }
      >
        <svg className="steak-svg" viewBox="0 0 220 220" aria-hidden="true">
          {isCooking ? (
            <>
              <ellipse cx="110" cy="168" rx="90" ry="32" className="steak-pan-base" />
              <ellipse cx="110" cy="166" rx="66" ry="16" className="steak-pan-glow" />
            </>
          ) : (
            <>
              <ellipse cx="110" cy="174" rx="90" ry="30" className="steak-plate-rim" />
              <ellipse cx="110" cy="174" rx="74" ry="22" className="steak-plate-core" />
              <path
                d="M158 168c9 0 16 5 20 14-8 1-15 1-21-2-5-3-9-7-11-12 4 0 8 0 12 0z"
                className="steak-herb"
              />
              <path
                d="M148 174c8-1 13 1 18 7-7 2-12 2-17 0-4-2-6-4-8-7 3 0 5 0 7 0z"
                className="steak-herb"
              />
            </>
          )}

          <g>
            <path
              className="steak-shape"
              d="M58 128c-18-20-17-66 20-88 14-9 36-11 57-4 35 11 57 45 47 82-10 37-42 58-80 53-23-3-35-15-44-43z"
            />
            <path
              className="steak-fat"
              d="M74 74c11-8 25-10 39-7-3 9-9 16-18 19-9 3-18 2-27-2 1-4 3-7 6-10z"
            />
            <path
              className="steak-fat"
              d="M122 102c8-6 19-8 30-5-2 8-7 13-15 16-8 2-16 1-23-2 1-4 3-7 8-9z"
            />
            <path className="steak-mark" d="M86 108c11 10 25 16 40 17" />
            <path className="steak-mark" d="M80 126c16 10 37 16 58 16" />
            <MotionPath
              className="steak-highlight"
              d="M85 64c12-8 29-10 45-4"
              animate={isCooking && isRunning ? { opacity: [0.15, 0.4, 0.15] } : { opacity: 0.2 }}
              transition={
                isCooking && isRunning
                  ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.25 }
              }
            />
          </g>
        </svg>
      </MotionDiv>

      <AnimatePresence>
        {isCooking && isRunning ? (
          <MotionDiv
            className="sizzle-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span />
            <span />
            <span />
            <span />
          </MotionDiv>
        ) : null}
      </AnimatePresence>
    </MotionDiv>
  );
}
