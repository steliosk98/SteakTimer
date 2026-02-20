const METHOD_META = {
  Pan: {
    subtitle: 'hot sear + butter baste',
    icon: (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <ellipse cx="52" cy="44" rx="36" ry="18" className="svg-fill-subtle" />
        <rect x="80" y="40" width="30" height="8" rx="4" className="svg-fill-main" />
        <ellipse cx="52" cy="44" rx="26" ry="10" className="svg-fill-main" />
      </svg>
    ),
  },
  Grill: {
    subtitle: 'smoky, faster finish',
    icon: (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <rect x="16" y="24" width="88" height="32" rx="12" className="svg-fill-subtle" />
        <rect x="26" y="30" width="68" height="4" rx="2" className="svg-fill-main" />
        <rect x="26" y="38" width="68" height="4" rx="2" className="svg-fill-main" />
        <rect x="26" y="46" width="68" height="4" rx="2" className="svg-fill-main" />
      </svg>
    ),
  },
};

export default function MethodToggle({ value, onChange, options }) {
  return (
    <fieldset className="field-group" aria-label="Cooking method">
      <legend className="label">Cooking Method</legend>
      <div className="method-grid">
        {options.map((option) => {
          const active = value === option;
          const meta = METHOD_META[option];

          return (
            <button
              key={option}
              type="button"
              className={`method-card ${active ? 'is-active' : ''}`}
              onClick={() => onChange(option)}
              aria-pressed={active}
            >
              <span className="method-icon">{meta.icon}</span>
              <span className="method-copy">
                <span className="method-title">{option}</span>
                <span className="method-subtitle">{meta.subtitle}</span>
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
