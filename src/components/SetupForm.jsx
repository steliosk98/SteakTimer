import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import DonenessSelector from './DonenessSelector';
import MethodToggle from './MethodToggle';
import {
  calculateCookTimes,
  DONENESS_OPTIONS,
  METHOD_OPTIONS,
  formatSeconds,
} from '../utils/cookingLogic';

const MotionMain = motion.main;

export default function SetupForm({ onStart }) {
  const [thickness, setThickness] = useState(1);
  const [unit, setUnit] = useState('inches');
  const [boneIn, setBoneIn] = useState(false);
  const [method, setMethod] = useState('Pan');
  const [doneness, setDoneness] = useState('Medium Rare');

  const preview = useMemo(
    () => calculateCookTimes({ thickness, unit, boneIn, method, doneness }),
    [thickness, unit, boneIn, method, doneness],
  );

  const thicknessDisplay = Number(thickness.toFixed(2)).toString();
  const thicknessCm = unit === 'cm' ? thickness : thickness * 2.54;
  const thicknessInches = unit === 'inches' ? thickness : thickness / 2.54;
  const equivalentText =
    unit === 'cm'
      ? `Equivalent: ${thicknessInches.toFixed(2)} inches (0.25 step)`
      : `Equivalent: ${thicknessCm.toFixed(1)} cm (0.25 step)`;

  const handleSubmit = (event) => {
    event.preventDefault();
    onStart({ thickness, unit, boneIn, method, doneness });
  };

  return (
    <MotionMain
      className="screen-shell"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <section className="panel">
        <header className="panel-header">
          <p className="eyebrow">Steak Timer</p>
          <h1>Cook Every Steak Consistently</h1>
          <p className="muted">
            Dial in thickness, method, and doneness. The timer walks you through each side and rest.
          </p>
        </header>

        <form className="setup-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="label" htmlFor="thickness-range">
              Thickness
            </label>
            <div className="thickness-row">
              <span className="thickness-value">{thicknessDisplay}</span>
              <div className="unit-toggle" role="group" aria-label="Thickness unit">
                <button
                  type="button"
                  className={unit === 'cm' ? 'is-active' : ''}
                  onClick={() => setUnit('cm')}
                >
                  cm
                </button>
                <button
                  type="button"
                  className={unit === 'inches' ? 'is-active' : ''}
                  onClick={() => setUnit('inches')}
                >
                  inches
                </button>
              </div>
            </div>
            <input
              id="thickness-range"
              className="thickness-slider"
              type="range"
              min="1"
              max="5"
              step="0.25"
              value={thickness}
              onChange={(event) => setThickness(Number(event.target.value))}
              aria-valuemin={1}
              aria-valuemax={5}
              aria-valuenow={thickness}
            />
            <p className="hint">{equivalentText}</p>
          </div>

          <MethodToggle value={method} onChange={setMethod} options={METHOD_OPTIONS} />

          <DonenessSelector value={doneness} onChange={setDoneness} options={DONENESS_OPTIONS} />

          <label className="check-row elegant-check" htmlFor="bone-in">
            <input
              id="bone-in"
              type="checkbox"
              className="bone-checkbox"
              checked={boneIn}
              onChange={(event) => setBoneIn(event.target.checked)}
            />
            <span className="bone-checkmark" aria-hidden="true" />
            <span>Bone-in cut (+1 min total)</span>
          </label>

          <div className="preview-grid">
            <div>
              <p className="preview-label">Per Side</p>
              <p className="preview-value">{formatSeconds(preview.sideTime)}</p>
            </div>
            <div>
              <p className="preview-label">Rest</p>
              <p className="preview-value">{formatSeconds(preview.restTime)}</p>
            </div>
            <div>
              <p className="preview-label">Total Session</p>
              <p className="preview-value">{formatSeconds(preview.totalTime)}</p>
            </div>
          </div>

          <button type="submit" className="primary-button">
            Start Timer
          </button>
        </form>
      </section>
    </MotionMain>
  );
}
