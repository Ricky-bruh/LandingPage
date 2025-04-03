// ====== UTILITY FUNCTIONS ======
document.addEventListener('DOMContentLoaded', () => {
    // Wait for page to load
    setTimeout(() => {
        initializePortfolio();
    }, 100);
});

// Initialize all portfolio functions
function initializePortfolio() {
    // Core functionality
    setupDarkMode();
    setupMobileMenu();
    setupScrollEffects();
    initTerminal();
    setupInteractiveCode();
    initScrollAnimations();
    updateTimelineWithUserData();
    
    // Easter eggs and microinteractions
    setupKonamiCode();
    setupCommandLine();
    setupDebugPanel();
    setupContactForm();
    setupHiddenContent();
}

// ====== DARK MODE TOGGLE ======
function setupDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const moonIcon = document.getElementById('moon-icon');
    const sunIcon = document.getElementById('sun-icon');
    
    // Check system preference or time of day for initial state
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentHour = new Date().getHours();
    const isNighttime = currentHour < 6 || currentHour > 18;
    
    if (prefersDarkMode || isNighttime) {
        document.body.classList.add('dark-mode');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Toggle sun/moon icons
        moonIcon.style.display = isDarkMode ? 'none' : 'block';
        sunIcon.style.display = isDarkMode ? 'block' : 'none';
        
        // Store preference
        localStorage.setItem('darkMode', isDarkMode);
    });
}

// ====== MOBILE NAVIGATION ======
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Toggle hamburger animation
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on links
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            
            // Reset hamburger
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ====== UPDATE TIMELINE WITH USER DATA ======
function updateTimelineWithUserData() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;
    
    // Clear existing timeline
    timelineContainer.innerHTML = '';
    
    // User's timeline data
    const timelineData = [
        {
            year: '2008',
            title: 'Born in Italy',
            description: 'Started my journey in beautiful Italy. (relatable)'
        },
        {
            year: '2015',
            title: 'Tech Exploration Begins',
            description: 'Started opening devices to understand how they work.'
        },
        {
            year: '2016',
            title: 'First Steps in Coding',
            description: 'Began learning Batch to create classic "fake virus" scripts.'
        },
        {
            year: '2017',
            title: 'Scratch Programming',
            description: 'Explored block-based programming with Scratch at school.'
        },
        {
            year: '2018',
            title: 'Batch & HTML',
            description: 'Returned to Batch programming and started learning HTML.'
        },
        {
            year: '2019',
            title: 'Web Development Foundations',
            description: 'Continued learning HTML and began exploring CSS.'
        },
        {
            year: '2020',
            title: 'Multiple Tech Paths',
            description: 'Expanded skills with CSS, Arduino programming, and Flipper Zero.'
        },
        {
            year: '2021',
            title: 'Python Programming',
            description: 'Began learning Python and machine learning.'
        },
        {
            year: '2022',
            title: 'C++ Development',
            description: 'Started learning C++ programming language.'
        },
        {
            year: '2023',
            title: 'School Programming',
            description: 'Advanced JavaScript and Python through school curriculum.'
        },
        {
            year: '2024 - Present',
            title: 'Advanced Programming',
            description: 'Mastering C++ and picking up Java development once again.'
        }
    ];
    
    // Create timeline items
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date">${item.year}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-text">${item.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
    
    // Re-apply animations
    initScrollAnimations();
}

// ====== SCROLL EFFECTS ======
function setupScrollEffects() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        // Header background on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====== TERMINAL WELCOME ANIMATION ======
function initTerminal() {
    const typingText = document.getElementById('typing-text');
    const fullText = document.getElementById('full-welcome-text').textContent.trim();
    const terminalHelp = document.getElementById('terminal-help');
    const helpResponse = document.getElementById('help-response');
    const terminalInteractive = document.getElementById('terminal-interactive');
    
    let i = 0;
    typingText.textContent = '';
    
    // Type out the welcome text
    function typeWriter() {
        if (i < fullText.length) {
            if (fullText[i] === '\n' && fullText[i+1] === '\n') {
                typingText.innerHTML += '<br><br>';
                i += 2;
            } else if (fullText[i] === '\n') {
                typingText.innerHTML += '<br>';
                i++;
            } else {
                typingText.textContent += fullText[i];
                i++;
            }
            
            setTimeout(typeWriter, 30);
        } else {
            // Show help command after typing is complete
            setTimeout(() => {
                terminalHelp.style.display = 'flex';
                // Show help response after a delay
                setTimeout(() => {
                    helpResponse.style.display = 'flex';
                    setupTerminalInteractivity();
                }, 500);
            }, 1000);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
    
    // Setup terminal interactivity
    function setupTerminalInteractivity() {
        // Listen for commands in the terminal interface
        const availableCommands = ['projects', 'skills', 'contact', 'experience', 'easter-egg'];
        
        function executeCommand(cmd) {
            const command = cmd.toLowerCase().trim();
            let responseHTML = '';
            
            // Create a new command line
            const cmdLine = document.createElement('div');
            cmdLine.classList.add('terminal-line');
            cmdLine.innerHTML = `
                <span class="terminal-prompt">~$</span>
                <div>
                    <span class="terminal-command">${cmd}</span>
                </div>
            `;
            terminalInteractive.appendChild(cmdLine);
            
            // Create response line
            const responseLine = document.createElement('div');
            responseLine.classList.add('terminal-line');
            
            if (availableCommands.includes(command) || command === 'help') {
                switch (command) {
                    case 'help':
                        responseHTML = `
                            Available commands:
                            <br>- projects    : View my latest projects
                            <br>- skills      : See my technical skills
                            <br>- contact     : How to get in touch
                            <br>- experience  : My professional journey
                            <br>- easter-egg  : ???
                        `;
                        break;
                    case 'projects':
                        responseHTML = `Navigating to projects section...`;
                        setTimeout(() => {
                            document.querySelector('#portfolio').scrollIntoView({ 
                                behavior: 'smooth' 
                            });
                        }, 800);
                        break;
                    case 'skills':
                        responseHTML = `Navigating to skills section...`;
                        setTimeout(() => {
                            document.querySelector('#skills').scrollIntoView({ 
                                behavior: 'smooth' 
                            });
                        }, 800);
                        break;
                    case 'contact':
                        responseHTML = `Navigating to contact section...`;
                        setTimeout(() => {
                            document.querySelector('#contact').scrollIntoView({ 
                                behavior: 'smooth' 
                            });
                        }, 800);
                        break;
                    case 'experience':
                        responseHTML = `Navigating to experience section...`;
                        setTimeout(() => {
                            document.querySelector('#timeline').scrollIntoView({ 
                                behavior: 'smooth' 
                            });
                        }, 800);
                        break;
                    case 'easter-egg':
                        responseHTML = `You found a secret command! Unlocking hidden content...`;
                        setTimeout(() => {
                            activateKonamiCode();
                        }, 800);
                        break;
                }
            } else {
                responseHTML = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
            }
            
            responseLine.innerHTML = `<div class="terminal-text">${responseHTML}</div>`;
            terminalInteractive.appendChild(responseLine);
            
            // Scroll terminal to bottom
            const terminalBody = document.querySelector('.terminal-body');
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        
        // Make terminal clickable to focus
        const terminalBody = document.querySelector('.terminal-body');
        terminalBody.addEventListener('click', () => {
            // Create hidden input for keyboard events
            let hiddenInput = document.getElementById('terminal-hidden-input');
            
            if (!hiddenInput) {
                hiddenInput = document.createElement('input');
                hiddenInput.id = 'terminal-hidden-input';
                hiddenInput.style.position = 'absolute';
                hiddenInput.style.opacity = '0';
                hiddenInput.style.height = '0';
                hiddenInput.style.width = '0';
                document.body.appendChild(hiddenInput);
                
                // Setup input handling
                let currentCommand = '';
                const cmdLine = document.createElement('div');
                cmdLine.classList.add('terminal-line');
                cmdLine.innerHTML = `
                    <span class="terminal-prompt">~$</span>
                    <div>
                        <span class="terminal-command" id="current-command"></span>
                        <span class="terminal-cursor"></span>
                    </div>
                `;
                terminalInteractive.appendChild(cmdLine);
                
                const currentCommandDisplay = document.getElementById('current-command');
                
                hiddenInput.addEventListener('input', (e) => {
                    currentCommand = e.target.value;
                    currentCommandDisplay.textContent = currentCommand;
                });
                
                hiddenInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const command = currentCommand;
                        hiddenInput.value = '';
                        currentCommand = '';
                        currentCommandDisplay.textContent = '';
                        
                        // Remove the current input line
                        terminalInteractive.removeChild(cmdLine);
                        
                        // Execute the command
                        if (command.trim() !== '') {
                            executeCommand(command);
                        }
                        
                        // Add a new input line
                        const newCmdLine = document.createElement('div');
                        newCmdLine.classList.add('terminal-line');
                        newCmdLine.innerHTML = `
                            <span class="terminal-prompt">~$</span>
                            <div>
                                <span class="terminal-command" id="current-command"></span>
                                <span class="terminal-cursor"></span>
                            </div>
                        `;
                        terminalInteractive.appendChild(newCmdLine);
                        document.getElementById('current-command').textContent = '';
                    }
                });
            }
            
            hiddenInput.focus();
        });
    }
}

// ====== INTERACTIVE CODE SECTION ======
function setupInteractiveCode() {
    const codeInput = document.querySelector('.code-input');
    const outputContainer = document.getElementById('particle-output');
    
    let particleCanvas = null;
    let animationFrameId = null;
    let initTime = Date.now();
    
    function createParticleSystem(config) {
        // Clear any previous animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        
        // Create new canvas
        const canvas = document.createElement('canvas');
        canvas.width = outputContainer.clientWidth;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        
        // Empty the output container and append new canvas
        outputContainer.innerHTML = '';
        outputContainer.appendChild(canvas);
        
        // Initialize particles
        const particles = [];
        const particleCount = config.count || 50;
        const particleColor = config.color || '#4cc9f0';
        const particleSize = config.size || 3;
        const particleSpeed = config.speed || 1;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * particleSize + 1,
                color: particleColor,
                speedX: (Math.random() - 0.5) * particleSpeed,
                speedY: (Math.random() - 0.5) * particleSpeed
            });
        }
        
        // Animation function
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Time based color pulse for particles if not explicitly set
            let pulseColor = particleColor;
            if (config.color === undefined) {
                const timePassed = Date.now() - initTime;
                const hue = (timePassed / 50) % 360;
                pulseColor = `hsl(${hue}, 80%, 60%)`;
            }
            
            particles.forEach(particle => {
                // Update position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) {
                    particle.speedX *= -1;
                }
                
                if (particle.y < 0 || particle.y > canvas.height) {
                    particle.speedY *= -1;
                }
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = pulseColor;
                ctx.fill();
                
                // Draw connections between particles
                particles.forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Connect particles within 100 pixels
                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.strokeStyle = pulseColor;
                        ctx.globalAlpha = 0.2 * (1 - distance / 80);
                        ctx.lineWidth = 1;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                });
            });
            
            animationFrameId = requestAnimationFrame(animate);
        }
        
        // Start the animation
        animate();
        return canvas;
    }
    
    // Function to evaluate user input and create particles
    function evaluateParticles() {
        try {
            // Get user code
            const userCode = codeInput.value;
            
            // Execute the code to get configuration
            const configFunction = new Function(`
                ${userCode}
                return config;
            `);
            
            const config = configFunction();
            
            // Create the particle system
            particleCanvas = createParticleSystem(config);
        } catch (error) {
            outputContainer.innerHTML = `<div style="color: #ff5f56; padding: 10px;">Error: ${error.message}</div>`;
        }
    }
    
    // Evaluate on input change (with debounce)
    let debounceTimer;
    codeInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(evaluateParticles, 500);
    });
    
    // Initial evaluation
    evaluateParticles();
    
    // Update canvas size on window resize
    window.addEventListener('resize', () => {
        if (particleCanvas) {
            particleCanvas.width = outputContainer.clientWidth;
        }
    });
}

// ====== SCROLL ANIMATIONS ======
function initScrollAnimations() {
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Skills animation
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Observe elements and trigger animations when they come into view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    skillItems.forEach(item => {
        observer.observe(item);
        
        // Add random delay to stagger animation
        const delay = Math.random() * 0.5;
        item.style.transitionDelay = `${delay}s`;
    });
}

// ====== EASTER EGGS & MICROINTERACTIONS ======

// Konami Code Easter Egg (up, up, down, down, left, right, left, right, B, A)
function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        const key = e.key.toLowerCase();
        const requiredKey = konamiCode[konamiIndex].toLowerCase();
        
        if (key === requiredKey) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateKonamiCode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    // Close button for easter egg
    document.getElementById('close-egg').addEventListener('click', () => {
        document.getElementById('konami-egg').classList.remove('active');
    });
}

function activateKonamiCode() {
    const easterEgg = document.getElementById('konami-egg');
    easterEgg.classList.add('active');
}

// Command Line Interface
function setupCommandLine() {
    const cmdBtn = document.getElementById('terminal-command-btn');
    const cmdPopup = document.getElementById('cmd-popup');
    const cmdInput = document.getElementById('cmd-input');
    const cmdResults = document.getElementById('cmd-results');
    
    cmdBtn.addEventListener('click', () => {
        cmdPopup.classList.toggle('active');
        if (cmdPopup.classList.contains('active')) {
            cmdInput.focus();
        }
    });
    
    cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = cmdInput.value.trim().toLowerCase();
            cmdInput.value = '';
            
            // Process command
            let response = '';
            switch (command) {
                case 'help':
                    response = `
                        Available commands:<br>
                        - goto [section]<br>
                        - theme [light/dark]<br>
                        - debug<br>
                        - version<br>
                        - clear
                    `;
                    break;
                case 'version':
                    response = `Portfolio v1.0.0 - Last updated: 2025-04-03`;
                    break;
                case 'clear':
                    cmdResults.innerHTML = '';
                    return;
                case 'debug':
                    toggleDebugPanel();
                    response = 'Debug panel toggled';
                    break;
                default:
                    if (command.startsWith('goto ')) {
                        const section = command.split(' ')[1];
                        const validSections = ['home', 'portfolio', 'skills', 'timeline', 'contact'];
                        
                        if (validSections.includes(section)) {
                            document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
                            response = `Navigating to ${section}...`;
                        } else {
                            response = `Invalid section. Try: ${validSections.join(', ')}`;
                        }
                    } else if (command.startsWith('theme ')) {
                        const mode = command.split(' ')[1];
                        if (mode === 'dark') {
                            document.body.classList.add('dark-mode');
                            document.getElementById('moon-icon').style.display = 'none';
                            document.getElementById('sun-icon').style.display = 'block';
                            response = 'Dark mode activated';
                        } else if (mode === 'light') {
                            document.body.classList.remove('dark-mode');
                            document.getElementById('moon-icon').style.display = 'block';
                            document.getElementById('sun-icon').style.display = 'none';
                            response = 'Light mode activated';
                        } else {
                            response = 'Invalid theme. Use "theme light" or "theme dark"';
                        }
                    } else {
                        response = `Unknown command: ${command}. Type "help" for available commands.`;
                    }
            }
            
            const resultElement = document.createElement('div');
            resultElement.innerHTML = `<div style="margin-bottom: 5px;"><span style="color: #4ecca3;">></span> ${command}</div><div>${response}</div><div style="height: 10px;"></div>`;
            cmdResults.appendChild(resultElement);
            
            // Scroll to bottom
            cmdResults.scrollTop = cmdResults.scrollHeight;
        }
    });
    
    // Close command popup when clicking outside
    document.addEventListener('click', (e) => {
        if (cmdPopup.classList.contains('active') && 
            !cmdPopup.contains(e.target) && 
            e.target !== cmdBtn) {
            cmdPopup.classList.remove('active');
        }
    });
}

// Debug Panel
function setupDebugPanel() {
    const debugPanel = document.getElementById('debug-panel');
    const browserInfo = document.getElementById('debug-browser');
    const screenInfo = document.getElementById('debug-screen');
    const domInfo = document.getElementById('debug-dom');
    const loadInfo = document.getElementById('debug-load');
    
    // Populate debug info
    browserInfo.textContent = `${navigator.userAgent}`;
    screenInfo.textContent = `${window.innerWidth}x${window.innerHeight} (Ratio: ${(window.devicePixelRatio).toFixed(2)})`;
    domInfo.textContent = `Elements: ${document.getElementsByTagName('*').length}`;
    loadInfo.textContent = `${(window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) / 1000}s`;
    
    // Secret key combo for debug panel (Ctrl+Shift+D)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            toggleDebugPanel();
        }
    });
}

function toggleDebugPanel() {
    const debugPanel = document.getElementById('debug-panel');
    debugPanel.classList.toggle('active');
}

// Contact Form Handling
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Simple form validation
        if (!nameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Mock API call
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = 'Message Sent!';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Additional hidden content and interactions
function setupHiddenContent() {
    // Check for special dates
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    
    if ((month === 10 && day === 31) ||         // Halloween
        (month === 12 && day >= 20 && day <= 25) ||  // Christmas
        (month === 1 && day === 1)) {           // New Year
        
        // Add special holiday effects
        const specialEffect = document.createElement('div');
        specialEffect.classList.add('holiday-effect');
        
        if (month === 10) { // Halloween
            createFloatingElements('🎃', 10);
        } else if (month === 12) { // Christmas
            createFloatingElements('❄️', 20);
        } else if (month === 1) { // New Year
            createFloatingElements('✨', 15);
        }
    }
    
    // Special greeting based on the time of day
    const hour = today.getHours();
    let greeting = '';
    
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning, Ricky!';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon, Ricky!';
    } else if (hour >= 18 && hour < 22) {
        greeting = 'Good evening, Ricky!';
    } else {
        greeting = 'Working late, Ricky? Me too!';
    }
    
    // Add a hidden greeting that shows on a specific interaction
    document.addEventListener('mousemove', createTimeGreetingDebounced(greeting));
}

function createFloatingElements(emoji, count) {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '1000';
    container.style.overflow = 'hidden';
    
    document.body.appendChild(container);
    
    for (let i = 0; i < count; i++) {
        const element = document.createElement('div');
        element.textContent = emoji;
        element.style.position = 'absolute';
        element.style.fontSize = `${Math.random() * 20 + 10}px`;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = '-20px';
        element.style.opacity = '0.7';
        element.style.animation = `fall ${Math.random() * 10 + 5}s linear infinite ${Math.random() * 5}s`;
        
        container.appendChild(element);
    }
    
    // Add the animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(-20px) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}

// Create a debounced greeting function
function createTimeGreetingDebounced(greeting) {
    let hasShown = false;
    
    return debounce((e) => {
        // Only show once and only when moving mouse near top right
        if (!hasShown && e.clientY < 100 && e.clientX > window.innerWidth - 100) {
            hasShown = true;
            
            const greetingElement = document.createElement('div');
            greetingElement.textContent = greeting;
            greetingElement.style.position = 'fixed';
            greetingElement.style.top = '80px';
            greetingElement.style.right = '20px';
            greetingElement.style.padding = '10px 15px';
            greetingElement.style.backgroundColor = 'var(--accent-blue)';
            greetingElement.style.color = 'var(--text-light)';
            greetingElement.style.borderRadius = '5px';
            greetingElement.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            greetingElement.style.zIndex = '1000';
            greetingElement.style.opacity = '0';
            greetingElement.style.transform = 'translateY(-20px)';
            greetingElement.style.transition = 'opacity 0.5s, transform 0.5s';
            
            document.body.appendChild(greetingElement);
            
            // Show with animation
            setTimeout(() => {
                greetingElement.style.opacity = '1';
                greetingElement.style.transform = 'translateY(0)';
                
                // Auto hide after a few seconds
                setTimeout(() => {
                    greetingElement.style.opacity = '0';
                    greetingElement.style.transform = 'translateY(-20px)';
                    
                    // Remove from DOM after animation
                    setTimeout(() => {
                        document.body.removeChild(greetingElement);
                    }, 500);
                }, 3000);
            }, 100);
        }
    }, 200);
}

// Update version info with current date
document.addEventListener('DOMContentLoaded', () => {
    // Set portfolio version with current date and time
    const currentDate = "2025-04-03 19:13:39";  // Current date & time from user query
    const currentUser = "Ricky";  // Current user from user query
    
    // Update the logo text with the user's name if it matches the expected pattern
    const logoElement = document.querySelector('.logo');
    if (logoElement && currentUser.includes("Ricky")) {
        logoElement.innerHTML = `<span class="logo-bracket">&lt;</span>${currentUser.split('-')[0]}<span class="logo-bracket">/&gt;</span>`;
    }
    
    // Also update page title to match username
    document.title = `Developer Portfolio | ${currentUser}`;
    
    // Add current timestamp to debug panel
    const debugPanel = document.getElementById('debug-panel');
    if (debugPanel) {
        const timestampInfo = document.createElement('div');
        timestampInfo.classList.add('debug-item');
        
        const timestampLabel = document.createElement('div');
        timestampLabel.classList.add('debug-label');
        timestampLabel.textContent = 'Last Update:';
        
        const timestampValue = document.createElement('div');
        timestampValue.classList.add('debug-value');
        timestampValue.textContent = currentDate;
        
        timestampInfo.appendChild(timestampLabel);
        timestampInfo.appendChild(timestampValue);
        debugPanel.appendChild(timestampInfo);
    }
});