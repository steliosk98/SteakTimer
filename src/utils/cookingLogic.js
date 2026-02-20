export const DONENESS_OPTIONS = [
  { label: 'Rare', minutes: 4, tempF: '120-125F', tempC: '49-52C' },
  { label: 'Medium Rare', minutes: 6, tempF: '130-135F', tempC: '54-57C' },
  { label: 'Medium', minutes: 8, tempF: '140-145F', tempC: '60-63C' },
  { label: 'Medium Well', minutes: 10, tempF: '150-155F', tempC: '66-68C' },
  { label: 'Well', minutes: 12, tempF: '160F+', tempC: '71C+' },
];

export const METHOD_OPTIONS = ['Pan', 'Grill'];

const BASE_TIME_BY_DONENESS = DONENESS_OPTIONS.reduce((acc, option) => {
  acc[option.label] = option.minutes;
  return acc;
}, {});

export function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export function calculateCookTimes({ thickness, unit, boneIn, method, doneness }) {
  const thicknessCm = unit === 'inches' ? thickness * 2.54 : thickness;
  const selectedDoneness = BASE_TIME_BY_DONENESS[doneness] ? doneness : 'Medium Rare';

  let totalMinutes = BASE_TIME_BY_DONENESS[selectedDoneness];

  // Every 1.25cm beyond 2.5cm adds ~1 minute per side.
  const extraThicknessCm = Math.max(0, thicknessCm - 2.5);
  const extraPerSideMinutes = Math.ceil(extraThicknessCm / 1.25);
  totalMinutes += extraPerSideMinutes * 2;

  if (boneIn) {
    totalMinutes += 1;
  }

  if (method === 'Grill') {
    totalMinutes *= 0.9;
  }

  const sideTimeSeconds = Math.max(60, Math.round((totalMinutes / 2) * 60));
  const restTimeSeconds = Math.max(60, Math.round((totalMinutes / 2) * 60));

  return {
    sideTime: sideTimeSeconds,
    restTime: restTimeSeconds,
    totalTime: sideTimeSeconds * 2 + restTimeSeconds,
    meta: {
      thicknessCm,
      selectedDoneness,
    },
  };
}
