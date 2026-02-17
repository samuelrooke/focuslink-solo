# Pomodoro Focus Timer

A Progressive Web App for productivity management using the Pomodoro Technique.

![Pomodoro Focus Timer](images/screenshots/Screenshot%202026-02-17%20223246.png)

## What is the Pomodoro Technique?

The Pomodoro Technique breaks work into focused 25-minute intervals separated by short breaks to help you stay focused, prevent burnout, and track productivity.

## Features

- Complete Pomodoro Timer with focus sessions, short breaks, and long breaks
- Task management with Pomodoro counts
- 7-day productivity statistics and daily goals
- Multiple themes: Default, Forest, Ocean, Matrix
- Sound options: notification alerts and ambient backgrounds
- Keyboard shortcuts: Space (start/pause), Alt+S (skip), Alt+R (reset)
- Progressive Web App: install as native app, works offline
- Local data persistence

## Quick Start

1. Open `index.html` in your browser
2. Add your tasks and click Start
3. Focus for 25 minutes, then take a break

## Installation

### Run Locally
Clone the repository and open `index.html` in your browser. No build process required.

### Install as PWA
Open the app in a modern browser, look for the install prompt, and click "Install".

### Development
```bash
git clone https://github.com/samuelrooke/focuslink-solo.git
cd focuslink-solo
python -m http.server 8000  # Optional: run local server
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Space | Start/Pause |
| Alt+S | Skip session |
| Alt+R | Reset timer |

## Project Structure

```
focuslink-solo/
├── index.html       # Main app
├── styles.css       # Styling
├── script.js        # Logic
├── manifest.json    # PWA manifest
├── sw.js           # Service worker
├── images/         # Icons, screenshots
└── sounds/         # Audio files
```

## Technical Details

Pure HTML/CSS/JavaScript with no dependencies. Progressive Web App with offline support via service worker. Responsive design with local storage for data persistence.

## Browser Support

Chrome/Edge 90+, Firefox 88+, Safari 14+, and mobile browsers.

## Deployment

**GitHub Pages**: Enable in settings, select main branch  
**Netlify/Vercel**: Connect repository, no build needed  
**Self-hosting**: Upload files to any web server

## Troubleshooting

**PWA won't install**: Use HTTPS or localhost, check browser support  
**Timer issues**: Enable JavaScript, check console for errors  
**Data lost**: Avoid private mode, check localStorage settings  
**No sound**: Check autoplay permissions and volume settings

## Contributing

Fork the repository, create a feature branch, test your changes, and submit a pull request. Report bugs with reproduction steps and browser version.

## License

MIT License
