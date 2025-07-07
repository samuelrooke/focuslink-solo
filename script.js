document.addEventListener("DOMContentLoaded", () => {
    // === STATE MANAGEMENT ===
    const state = {
        timers: { focus: 25, break: 5, longBreak: 15 },
        longBreakInterval: 4,
        timeLeft: 25 * 60,
        isFocus: true,
        isRunning: false,
        sessionCount: 0,
        focusSessionsToday: 0,
        timerInterval: null,
        dailyGoal: 8,
        theme: 'default',
        notificationSound: 'ding',
        ambientSound: { id: 'none', isPlaying: false, element: null },
        tasks: [],
        activeTaskId: null,
        stats: {}, // { 'YYYY-MM-DD': count }
    };

    // === DOM ELEMENTS ===
    const dom = {
        timer: document.getElementById('timer'),
        sessionInfo: document.getElementById('session-info'),
        progress: document.getElementById('progress-foreground'),
        startBtn: document.getElementById('start-btn'),
        pauseBtn: document.getElementById('pause-btn'),
        skipBtn: document.getElementById('skip-btn'),
        taskInput: document.getElementById('new-task-input'),
        addTaskBtn: document.getElementById('add-task-btn'),
        taskList: document.getElementById('task-list'),
        activeTaskDisplay: document.getElementById('active-task-display'),
        dailyGoalInput: document.getElementById('daily-goal-input'),
        dailyGoalProgress: document.getElementById('daily-goal-progress'),
        statsChart: document.getElementById('chart'),
        themeSelect: document.getElementById('theme-select'),
        soundSelect: document.getElementById('sound-select'),
        ambientSelect: document.getElementById('ambient-select'),
        ambientToggleBtn: document.getElementById('ambient-toggle-btn'),
        favicon: document.getElementById('favicon'),
        inputs: {
            focus: document.getElementById('focus-input'),
            break: document.getElementById('break-input'),
            longBreak: document.getElementById('long-break-input'),
            interval: document.getElementById('long-break-interval'),
        }
    };
    
    // === CORE TIMER LOGIC ===
    const tick = () => {
        if (state.timeLeft > 0) {
            state.timeLeft--;
            updateDisplay();
        } else {
            clearInterval(state.timerInterval);
            state.isRunning = false;
            if (state.isFocus) {
                state.sessionCount++;
                state.focusSessionsToday++;
                logStat();
                if(state.activeTaskId) {
                    const task = state.tasks.find(t => t.id === state.activeTaskId);
                    if(task) task.pomodoros++;
                }
            }
            playSound(state.notificationSound);
            showNotification(state.isFocus ? "Break time!" : "Time to focus!", "Your session has ended.");
            switchSession();
            saveState();
        }
    };

    const startTimer = () => {
        if (state.isRunning) return;
        state.isRunning = true;
        dom.startBtn.style.display = 'none';
        dom.pauseBtn.style.display = 'inline-block';
        state.timerInterval = setInterval(tick, 1000);
        updateFavicon();
    };

    const pauseTimer = () => {
        if (!state.isRunning) return;
        state.isRunning = false;
        dom.startBtn.style.display = 'inline-block';
        dom.pauseBtn.style.display = 'none';
        clearInterval(state.timerInterval);
        updateFavicon();
    };
    
    const resetTimer = () => {
        pauseTimer();
        let duration;
        if(state.isFocus) {
            duration = state.timers.focus;
        } else {
            duration = (state.sessionCount > 0 && state.sessionCount % state.longBreakInterval === 0) 
                       ? state.timers.longBreak 
                       : state.timers.break;
        }
        state.timeLeft = duration * 60;
        updateDisplay();
    };

    const switchSession = () => {
        state.isFocus = !state.isFocus;
        resetTimer();
    };

    // === UI & DISPLAY ===
    const updateDisplay = () => {
        const minutes = Math.floor(state.timeLeft / 60).toString().padStart(2, '0');
        const seconds = (state.timeLeft % 60).toString().padStart(2, '0');
        dom.timer.textContent = `${minutes}:${seconds}`;
        document.title = `${minutes}:${seconds} - ${state.isFocus ? "Focus" : "Break"}`;
        
        const totalDuration = (state.isFocus ? state.timers.focus : state.timers.break) * 60;
        const progressPercent = (totalDuration - state.timeLeft) / totalDuration;
        const circumference = 2 * Math.PI * 45;
        dom.progress.style.strokeDashoffset = circumference * (1 - progressPercent);
        
        dom.sessionInfo.textContent = state.isFocus ? "Focus Time" : (state.sessionCount > 0 && state.sessionCount % state.longBreakInterval === 0) ? "Long Break" : "Short Break";
        dom.dailyGoalProgress.textContent = `Progress: ${state.focusSessionsToday} / ${state.dailyGoal}`;
    };
    
    const updateFavicon = () => {
        let newFavicon = `images/favicon-${state.isFocus ? 'focus' : 'break'}.png`;
        if(!state.isRunning) newFavicon = 'images/favicon-paused.png';
        dom.favicon.href = newFavicon;
    };
    
    // === FEATURES ===
    const applySettings = () => {
        state.timers.focus = parseInt(dom.inputs.focus.value);
        state.timers.break = parseInt(dom.inputs.break.value);
        state.timers.longBreak = parseInt(dom.inputs.longBreak.value);
        state.longBreakInterval = parseInt(dom.inputs.interval.value);
        state.dailyGoal = parseInt(dom.dailyGoalInput.value);
        if(!state.isRunning) resetTimer();
        saveState();
        updateDisplay();
    };
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        state.theme = theme;
        saveState();
    };

    const renderTasks = () => {
        dom.taskList.innerHTML = '';
        state.tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.text} (${task.pomodoros})`;
            li.dataset.id = task.id;
            if(task.completed) li.classList.add('completed');
            if(task.id === state.activeTaskId) li.classList.add('active');
            
            li.addEventListener('click', () => {
                state.activeTaskId = state.activeTaskId === task.id ? null : task.id;
                dom.activeTaskDisplay.textContent = state.activeTaskId ? `Active: ${state.tasks.find(t=>t.id===state.activeTaskId).text}` : 'No active task';
                renderTasks();
                saveState();
            });

            // Add a simple delete button for tasks
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.onclick = (e) => {
                e.stopPropagation();
                state.tasks = state.tasks.filter(t => t.id !== task.id);
                if(state.activeTaskId === task.id) state.activeTaskId = null;
                renderTasks();
                saveState();
            };
            li.appendChild(deleteBtn);
            
            dom.taskList.appendChild(li);
        });
    };

    const logStat = () => {
        const today = new Date().toISOString().slice(0, 10);
        state.stats[today] = (state.stats[today] || 0) + 1;
        renderStats();
    };
    
    const renderStats = () => {
        dom.statsChart.innerHTML = '';
        const today = new Date();
        for(let i=6; i>=0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateKey = date.toISOString().slice(0, 10);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const count = state.stats[dateKey] || 0;
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${count > 0 ? (count / Math.max(...Object.values(state.stats), 1)) * 100 : 5}%`;
            
            const countLabel = document.createElement('span');
            countLabel.className = 'count';
            countLabel.textContent = count;
            
            const dayLabel = document.createElement('span');
            dayLabel.className = 'label';
            dayLabel.textContent = day;
            
            bar.appendChild(countLabel);
            bar.appendChild(dayLabel);
            dom.statsChart.appendChild(bar);
        }
    };
    
    // === SOUNDS & NOTIFICATIONS ===
    const playSound = (soundId) => {
        if(soundId === 'none') return;
        const sound = document.getElementById(`sound-${soundId}`);
        if(sound) {
            sound.currentTime = 0;
            sound.play();
        }
    };
    
    const toggleAmbientSound = () => {
        if(state.ambientSound.isPlaying) {
            state.ambientSound.element.pause();
            state.ambientSound.isPlaying = false;
            dom.ambientToggleBtn.textContent = 'Play';
        } else {
            const id = dom.ambientSelect.value;
            if(id === 'none') return;
            state.ambientSound.element = document.getElementById(`ambient-${id}`);
            state.ambientSound.element.play();
            state.ambientSound.isPlaying = true;
            dom.ambientToggleBtn.textContent = 'Pause';
        }
        state.ambientSound.id = dom.ambientSelect.value;
        saveState();
    };

    const showNotification = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        }
    };
    
    // === LOCAL STORAGE & INITIALIZATION ===
    const saveState = () => {
        // We don't save volatile state like isRunning or timerInterval
        const stateToSave = { ...state, isRunning: false, timerInterval: null, ambientSound: {...state.ambientSound, element: null} };
        localStorage.setItem('pomodoroState', JSON.stringify(stateToSave));
    };
    
    const loadState = () => {
        const savedState = JSON.parse(localStorage.getItem('pomodoroState'));
        if(savedState) {
            Object.assign(state, savedState);
            // Check if it's a new day to reset daily progress
            const today = new Date().toISOString().slice(0, 10);
            if(!state.stats[today]) { // A simple check
                state.focusSessionsToday = 0;
            }
        }
    };
    
    const init = () => {
        loadState();
        
        Notification.requestPermission();
        
        // Populate inputs and selectors from loaded state
        dom.inputs.focus.value = state.timers.focus;
        dom.inputs.break.value = state.timers.break;
        dom.inputs.longBreak.value = state.timers.longBreak;
        dom.inputs.interval.value = state.longBreakInterval;
        dom.dailyGoalInput.value = state.dailyGoal;
        dom.themeSelect.value = state.theme;
        dom.soundSelect.value = state.notificationSound;
        dom.ambientSelect.value = state.ambientSound.id;

        // Apply loaded settings
        setTheme(state.theme);
        resetTimer();
        renderTasks();
        renderStats();

        // Event Listeners
        dom.startBtn.addEventListener('click', startTimer);
        dom.pauseBtn.addEventListener('click', pauseTimer);
        dom.skipBtn.addEventListener('click', () => {
             pauseTimer();
             switchSession();
        });
        
        dom.addTaskBtn.addEventListener('click', () => {
            const text = dom.taskInput.value.trim();
            if(text) {
                state.tasks.push({ id: Date.now(), text, pomodoros: 0, completed: false });
                dom.taskInput.value = '';
                renderTasks();
                saveState();
            }
        });
        
        dom.themeSelect.addEventListener('change', (e) => setTheme(e.target.value));
        dom.soundSelect.addEventListener('change', (e) => { state.notificationSound = e.target.value; saveState(); });
        dom.ambientToggleBtn.addEventListener('click', toggleAmbientSound);
        dom.ambientSelect.addEventListener('change', () => {
            if(state.ambientSound.isPlaying) toggleAmbientSound(); // Stop old sound first
            toggleAmbientSound(); // Play new sound
        });
        
        [dom.inputs.focus, dom.inputs.break, dom.inputs.longBreak, dom.inputs.interval, dom.dailyGoalInput].forEach(input => {
            input.addEventListener('change', applySettings);
        });

        // Keyboard Shortcuts
        window.addEventListener('keydown', (e) => {
            if(e.code === 'Space' && !['INPUT', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                state.isRunning ? pauseTimer() : startTimer();
            }
            if(e.altKey && e.code === 'KeyS') { e.preventDefault(); dom.skipBtn.click(); }
            if(e.altKey && e.code === 'KeyR') { e.preventDefault(); resetTimer(); }
        });
    };

    init();
});