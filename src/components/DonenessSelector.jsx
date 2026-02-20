const DONENESS_TONES = {
  Rare: '#db4a2b',
  'Medium Rare': '#c74f2f',
  Medium: '#ab5634',
  'Medium Well': '#8e5937',
  Well: '#6f5737',
};

export default function DonenessSelector({ value, onChange, options }) {
  return (
    <fieldset className="field-group" aria-label="Steak doneness">
      <legend className="label">Doneness</legend>
      <div className="doneness-grid">
        {options.map((option) => {
          const active = value === option.label;
          return (
            <button
              key={option.label}
              type="button"
              className={`doneness-chip ${active ? 'is-active' : ''}`}
              onClick={() => onChange(option.label)}
              aria-pressed={active}
              style={{ '--chip-tone': DONENESS_TONES[option.label] }}
            >
              <span>{option.label}</span>
              <small>
                {option.tempF} / {option.tempC}
              </small>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
