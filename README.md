# SteakTimer

A polished React + Vite steak cooking timer with guided phases, animated cooking visuals, and a deployment-ready setup for GitHub Pages.

<p align="center">
  <svg width="200" height="120" viewBox="0 0 220 120" role="img" aria-label="Cooking steak illustration">
    <ellipse cx="110" cy="96" rx="86" ry="22" fill="#1f2731"/>
    <ellipse cx="110" cy="94" rx="62" ry="12" fill="rgba(241,133,69,0.35)"/>
    <path d="M58 72c-14-16-13-48 16-64 10-6 28-8 45-3 28 8 45 33 38 60-8 26-34 42-66 38-18-2-29-11-33-31z" fill="#9f4135" stroke="#3a1f18" stroke-width="2.4"/>
    <path d="M76 34c9-7 22-8 34-6-3 7-8 13-15 15-7 3-15 2-24-1 1-3 2-5 5-8z" fill="#f0b092" opacity="0.82"/>
    <path d="M84 58c11 8 24 13 40 14" fill="none" stroke="#3a1f18" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
  </svg>
  <svg width="200" height="120" viewBox="0 0 220 120" role="img" aria-label="Rested steak illustration">
    <ellipse cx="110" cy="100" rx="88" ry="20" fill="#4f5964"/>
    <ellipse cx="110" cy="100" rx="72" ry="14" fill="#77808b"/>
    <path d="M58 72c-14-16-13-48 16-64 10-6 28-8 45-3 28 8 45 33 38 60-8 26-34 42-66 38-18-2-29-11-33-31z" fill="#6a3328" stroke="#2a1712" stroke-width="2.4"/>
    <path d="M74 36c9-6 21-8 34-5-3 7-8 12-15 14-7 2-14 2-22-1 1-3 2-5 3-8z" fill="#d59a7b" opacity="0.82"/>
    <path d="M158 94c9 0 16 5 20 14-8 1-15 1-21-2-5-3-9-7-11-12 4 0 8 0 12 0z" fill="#8aac71"/>
  </svg>
</p>

## Features

- Guided cook flow: `Side 1` -> `Side 2` -> `Rest`
- Explicit confirmation checkpoints (`Flipped` before Side 2, `Taken off` before Rest)
- Animated steak visuals in the timer circle for cooking, flipping, and resting
- Doneness presets with both Fahrenheit and Celsius ranges
- Thickness slider with touch-friendly controls and unit conversion
- Dark-mode-first UI with motion and responsive layout
- Ready for GitHub Pages project deployment

## Tech Stack

- React 19
- Vite 7
- Framer Motion
- ESLint

## Project Structure

- `src/components/SetupForm.jsx`: input form for steak settings
- `src/components/TimerScreen.jsx`: timer flow, phase transitions, action gating
- `src/components/SteakStage.jsx`: animated cooking/rest steak visual
- `src/components/ProgressRing.jsx`: SVG progress ring
- `src/utils/cookingLogic.js`: cook-time calculations and options
- `src/index.css`, `src/App.css`: global styling and theme

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

### Lint

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Usage

1. Set steak thickness and unit.
2. Select cooking method and doneness.
3. Choose whether the cut is bone-in.
4. Start the timer.
5. At the end of Side 1, press `Flipped`.
6. At the end of Side 2, press `Taken off`.
7. Let the rest timer finish, then serve.

## Cooking Logic Notes

- Base times are mapped by doneness.
- Thickness adjustments are applied above 2.5 cm.
- Bone-in adds time.
- Grill slightly reduces total time.
- Output includes per-side, rest, and total durations in seconds.

## Deploying to GitHub Pages

This repo is configured as a project page:

- Repository: `https://github.com/steliosk98/SteakTimer`
- Site URL: `https://steliosk98.github.io/SteakTimer/`

Vite base path is already set in `vite.config.js`:

```js
base: '/SteakTimer/'
```

### Typical deploy flow

1. Push code to `main`.
2. Build and publish `dist/` via GitHub Actions Pages workflow.
3. In GitHub repo settings, set Pages source to `GitHub Actions`.

## Accessibility and UX

- Keyboard-focus styles for controls
- Reduced-motion support via `prefers-reduced-motion`
- Large touch targets for slider and primary controls
- Clear phase labels and status messaging

## License

No license file is currently included. Add a `LICENSE` file if you plan to open-source this project.
