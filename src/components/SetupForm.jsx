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
const RANGE_CONFIG = {
  inches: { min: 1, max: 5, step: 0.25, defaultValue: 1 },
  cm: { min: 1, max: 13, step: 0.5, defaultValue: 2.5 },
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const roundToStep = (value, step) => Math.round(value / step) * step;

export default function SetupForm({ onStart }) {
  const [thickness, setThickness] = useState(RANGE_CONFIG.inches.defaultValue);
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
  const activeRange = RANGE_CONFIG[unit];
  const equivalentText =
    unit === 'cm'
      ? `Equivalent: ${thicknessInches.toFixed(2)} inches (${RANGE_CONFIG.inches.step} step)`
      : `Equivalent: ${thicknessCm.toFixed(1)} cm (${RANGE_CONFIG.cm.step} step)`;

  const handleUnitChange = (nextUnit) => {
    if (nextUnit === unit) {
      return;
    }

    const convertedValue = nextUnit === 'cm' ? thickness * 2.54 : thickness / 2.54;
    const targetRange = RANGE_CONFIG[nextUnit];
    const snapped = roundToStep(convertedValue, targetRange.step);
    const clamped = clamp(snapped, targetRange.min, targetRange.max);

    setThickness(clamped);
    setUnit(nextUnit);
  };

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
                  onClick={() => handleUnitChange('cm')}
                >
                  cm
                </button>
                <button
                  type="button"
                  className={unit === 'inches' ? 'is-active' : ''}
                  onClick={() => handleUnitChange('inches')}
                >
                  inches
                </button>
              </div>
            </div>
            <input
              id="thickness-range"
              className="thickness-slider"
              type="range"
              min={activeRange.min}
              max={activeRange.max}
              step={activeRange.step}
              value={thickness}
              onChange={(event) => setThickness(Number(event.target.value))}
              aria-valuemin={activeRange.min}
              aria-valuemax={activeRange.max}
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
