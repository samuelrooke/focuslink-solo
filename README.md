# 🍅 Pomodoro Focus Timer

A beautiful, feature-rich Progressive Web App (PWA) for productivity management using the Pomodoro Technique.

![Pomodoro Focus Timer](images/screenshots/screenshot1.png)

## 📖 What is the Pomodoro Technique?

The Pomodoro Technique is a time management method that uses a timer to break work into focused intervals (traditionally 25 minutes) separated by short breaks. This app helps you:
- **Stay focused** during work sessions
- **Prevent burnout** with regular breaks
- **Track your productivity** over time
- **Manage tasks** effectively

## ✨ Features

- 🎯 **Complete Pomodoro Timer**: Focus sessions, short breaks, and long breaks
- 📝 **Task Management**: Add, track, and manage your tasks
- 📊 **Productivity Stats**: 7-day progress tracking and daily goals
- 🎨 **Multiple Themes**: Default, Forest, Ocean, and Matrix themes
- 🔊 **Sound Options**: Notification sounds and ambient backgrounds
- ⌨️ **Keyboard Shortcuts**: Space (start/pause), Alt+S (skip), Alt+R (reset)
- 📱 **PWA Ready**: Install as native app, works offline
- 🎵 **Ambient Sounds**: Rain and coffee shop background audio

## 🚀 Quick Start

### Option 1: Use Online
If you have this app hosted online, simply visit the URL and start using immediately.

### Option 2: Run Locally
1. **Clone or download** this repository
2. **Open** `index.html` in your browser (double-click or use a local server)
3. **Start focusing** - No installation or build process required!

### Option 3: Install as Desktop/Mobile App
1. Open the app in your browser
2. Look for the install button in your browser's address bar
3. Click "Install" to add to your home screen/desktop
4. Launch like any other native app!

## 🛠️ Technical Details

- **Pure HTML/CSS/JavaScript**: No frameworks or dependencies
- **Progressive Web App**: Complete with manifest.json and service worker
- **Offline Capable**: Works without internet after first load
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Local Storage**: Your data persists between sessions

## 📱 Installation

### Browser-Specific Installation Instructions

#### Chrome/Edge (Desktop)
1. Open `index.html` in Chrome or Edge
2. Click the **install icon** (➕) in the address bar
3. Click "Install" in the popup dialog
4. The app will open in its own window

#### Chrome (Android)
1. Open the app in Chrome
2. Tap the **menu** (⋮) in the top-right corner
3. Tap "Install app" or "Add to Home screen"
4. Confirm installation

#### Safari (iOS/macOS)
1. Open the app in Safari
2. Tap the **Share button** (⬆️)
3. Scroll down and tap "Add to Home Screen"
4. Name the app and tap "Add"

#### Firefox (Desktop)
1. Open the app in Firefox
2. Click the **install icon** in the address bar
3. Click "Install" to add to your system

### For Development
```bash
# Clone the repository
git clone https://github.com/samuelrooke/focuslink-solo.git
cd focuslink-solo

# Option 1: Open directly
# Just open index.html in your browser

# Option 2: Use a local server (recommended for PWA testing)
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have http-server installed)
npx http-server

# Then visit http://localhost:8000 in your browser
```

## 🎯 How to Use

### Getting Started
1. **Add Your Tasks**: Click "Add" to create a task you want to work on
2. **Select a Task**: Click on a task to set it as active
3. **Customize Settings**: Adjust timer lengths, sounds, and themes to your preference
4. **Start Your Session**: Click "Start" or press **Space** to begin
5. **Stay Focused**: Work until the timer completes (default: 25 minutes)
6. **Take a Break**: Enjoy your short break (default: 5 minutes)
7. **Repeat**: Complete 4 focus sessions, then take a long break (default: 15 minutes)
8. **Track Progress**: View your daily stats and 7-day productivity chart

### Tips for Maximum Productivity
- 🎯 Plan your tasks before starting
- 🔕 Minimize distractions during focus sessions
- ✅ Check off completed tasks for motivation
- 📊 Set realistic daily goals
- 🎨 Choose a theme that helps you concentrate
- 🎵 Use ambient sounds if they help you focus

## 🎨 Themes

- **Default**: Clean blue theme for professional environments
- **Forest**: Green nature theme for calm focus
- **Ocean**: Blue water theme for peaceful concentration  
- **Matrix**: Dark green tech theme for night owls

## 🔊 Sounds

### Notification Sounds
Choose from different alert sounds when sessions complete:
- **Ding**: Short, pleasant notification sound
- **Bell**: Classic bell chime
- **Silent**: No sound (visual notifications only)

### Ambient Background Sounds
Play soothing background audio during your sessions:
- **Rain**: Gentle rainfall ambience
- **Coffee Shop**: Cozy café atmosphere
- **None**: Work in silence

## 🏆 Features Overview

- ✅ Customizable timer lengths
- ✅ Task tracking with Pomodoro counts
- ✅ Daily goal setting and progress
- ✅ 7-day productivity statistics
- ✅ Multiple color themes
- ✅ Sound notifications and ambient audio
- ✅ Keyboard shortcuts
- ✅ Progressive Web App capabilities
- ✅ Offline functionality
- ✅ Responsive design
- ✅ Local data persistence

## ⌨️ Keyboard Shortcuts

Master these shortcuts for faster workflow:

| Shortcut | Action |
|----------|--------|
| `Space` | Start/Pause timer |
| `Alt + S` | Skip to next session |
| `Alt + R` | Reset current timer |
| `Enter` | Add new task (when input is focused) |

## 📁 Project Structure

```
focuslink-solo/
├── index.html          # Main HTML file with app structure
├── styles.css          # All styling and theme definitions
├── script.js           # Core application logic and state management
├── manifest.json       # PWA manifest for installation
├── sw.js              # Service worker for offline functionality
├── images/
│   ├── icons/         # PWA icons in various sizes
│   ├── screenshots/   # App screenshots for PWA
│   └── favicon-*.png  # Dynamic favicons for different states
└── sounds/
    ├── ding.mp3       # Notification sounds
    ├── bell.mp3
    ├── rain.mp3       # Ambient sounds
    └── cafe.mp3
```

## 🚀 Deployment

### Deploy to GitHub Pages
```bash
# Enable GitHub Pages in repository settings
# Select "main" branch and "/" root directory
# Your app will be available at: https://yourusername.github.io/focuslink-solo/
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty)
3. Set publish directory: `/`
4. Deploy!

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel
```

### Self-Hosting
Simply upload all files to any web server. No build process or special configuration required!

## 🐛 Troubleshooting

### PWA Won't Install
- **Ensure HTTPS**: PWAs require secure connection (or localhost)
- **Check browser support**: Use Chrome, Edge, Safari, or Firefox
- **Clear cache**: Try clearing browser cache and reload
- **Check manifest**: Verify `manifest.json` is properly linked

### Timer Not Working
- **Check JavaScript**: Ensure JavaScript is enabled in your browser
- **Console errors**: Open browser DevTools (F12) and check for errors
- **Permissions**: Allow notifications if you want browser notifications

### Data Lost After Closing
- **LocalStorage**: Ensure browser isn't clearing localStorage on exit
- **Private/Incognito**: Data won't persist in private browsing mode
- **Export data**: Unfortunately, there's no export feature yet (consider contributing!)

### Sounds Not Playing
- **Browser autoplay**: Some browsers block autoplay; interact with page first
- **Volume**: Check system and browser volume settings
- **File paths**: Ensure sound files exist in `sounds/` directory

### Offline Mode Not Working
- **Service Worker**: Check if service worker is registered (DevTools → Application)
- **Cache**: The app needs to be opened online at least once to cache files
- **HTTPS required**: Service workers require secure context (HTTPS or localhost)

## 🔧 Browser Support

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS Grid/Flexbox
- Service Workers (for PWA features)

**Tested and working on:**
- ✅ Chrome/Chromium 90+
- ✅ Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs
- Check if the issue already exists
- Provide clear reproduction steps
- Include browser version and OS

### Suggesting Features
- Open an issue with the `enhancement` label
- Describe the feature and its benefits
- Consider edge cases and user experience

### Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly in multiple browsers
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines
- Keep code simple and readable
- Follow existing code style
- No external dependencies (keep it vanilla)
- Test PWA features with HTTPS or localhost
- Ensure offline functionality still works
- Update README if adding features

## 💡 Future Enhancements

Ideas for future development:
- 📱 Data sync across devices
- 📤 Export/import data (CSV, JSON)
- 📊 More detailed statistics and charts
- 🎮 Gamification (achievements, streaks)
- 🔗 Integration with task management tools
- ⏱️ Custom session patterns
- 🌍 Multiple language support
- 🎨 Custom theme creator

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Created with ❤️ focusing on simplicity, productivity, and beautiful design.

### Technologies Used
- Pure HTML5, CSS3, and JavaScript (ES6+)
- Canvas API for circular progress indicator
- LocalStorage API for data persistence
- Service Workers for offline functionality
- Web Audio API for sounds

### Inspiration
Built for anyone who wants to boost their productivity using the proven Pomodoro Technique.

---

**Ready to boost your productivity? Start your first Pomodoro session now! 🍅**

*If you find this app helpful, consider giving it a ⭐ on GitHub!*