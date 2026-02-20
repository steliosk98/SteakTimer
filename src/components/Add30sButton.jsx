import { motion } from 'framer-motion';

const MotionButton = motion.button;

export default function Add30sButton({ onClick }) {
  return (
    <MotionButton
      type="button"
      className="secondary-button add-time-button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 3a7 7 0 1 1-6.18 3.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M3.2 2.8v4.2h4.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 6v8M6 10h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      Add 30s
    </MotionButton>
  );
}
