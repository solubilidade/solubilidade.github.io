document.addEventListener('DOMContentLoaded', function() {
    const entryScreen = document.getElementById('entry-screen');
    const video = document.getElementById('background-video');
    const pageContainer = document.querySelector('.page-container'); // Main container with all your content
    
    // Pause video initially
    if (video) {
        video.pause();
    }
    
    // Handle click on entry screen
    if (entryScreen) {
        entryScreen.addEventListener('click', function() {
            // Hide entry screen with animation
            entryScreen.classList.add('hidden');
            
            // Show all profile boxes with fade-in effect
            if (pageContainer) {
                // Small delay to ensure entry screen starts fading first
                setTimeout(() => {
                    pageContainer.classList.add('show-cards');
                }, 200);
            }
            
            // Play video with sound
            if (video) {
                // Unmute the video so sound plays (since this is user-initiated)
                video.muted = false;
                
                // Try to play video
                video.play().catch(error => {
                    console.error('Video playback failed:', error);
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Display the specific programming language logos
    displayRequestedTechLogos();
    
    // Start the typewriter effect
    typewriterEffect();
});

// Define tech logos with their corresponding glow colors and learning links
const techLogos = {
    'c++': { 
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', 
        color: 'var(--cpp-color)',
        learnLink: 'https://www.learncpp.com'
    },
    'c#': { 
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg', 
        color: 'var(--csharp-color)',
        learnLink: 'https://dotnet.microsoft.com/en-us/learn/csharp'
    },
    'c': { 
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', 
        color: 'var(--c-color)',
        learnLink: 'https://www.learn-c.org'
    },
    'javascript': { 
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', 
        color: 'var(--javascript-color)',
        learnLink: 'https://www.w3schools.com/js/'
    },
    'lua': { 
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg', 
        color: 'var(--lua-color)',
        learnLink: 'https://www.lua.org/start.html'
    },
    'typescript': { 
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', 
        color: 'var(--typescript-color)',
        learnLink: 'https://www.typescriptlang.org/docs/'
    },
    'nodejs': { 
        url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', 
        color: 'var(--nodejs-color)',
        learnLink: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs'
    }
};

function displayRequestedTechLogos() {
    const container = document.getElementById('learning-items');
    container.innerHTML = '';
    
    // Specifically requested languages
    const requestedTech = ['c++', 'c#', 'c', 'javascript', 'lua', 'typescript', 'nodejs'];
    
    requestedTech.forEach((tech, index) => {
        const logoInfo = techLogos[tech.toLowerCase()];
        
        // Create link wrapper for the logo
        const logoLink = document.createElement('a');
        logoLink.href = logoInfo.learnLink;
        logoLink.target = '_blank';
        logoLink.rel = 'noopener noreferrer';
        logoLink.style.textDecoration = 'none';
        
        // Create container for logo
        const logoContainer = document.createElement('div');
        logoContainer.className = 'tech-logo-container';
        logoContainer.style.setProperty('--glow-color', logoInfo.color);
        
        // Create logo image
        const logoImg = document.createElement('img');
        logoImg.className = 'tech-logo';
        logoImg.src = logoInfo.url;
        logoImg.alt = `${tech} logo`;
        
        // Append logo to container
        logoContainer.appendChild(logoImg);
        
        // Append container to link
        logoLink.appendChild(logoContainer);
        
        // Append link to main container
        container.appendChild(logoLink);
    });
}

// Typewriter effect for the subtitle
function typewriterEffect() {
    const text = "professional idiot";
    const typewriterElement = document.getElementById('typewriter');
    let direction = 'forward'; // 'forward' for typing, 'backward' for erasing
    let index = 0;
    
    function updateText() {
        if (direction === 'forward') {
            // Typing forward
            index++;
            typewriterElement.textContent = text.substring(0, index);
            
            if (index >= text.length) {
                direction = 'pause';
                setTimeout(() => {
                    direction = 'backward';
                    updateText();
                }, 2000); // Pause at the end for 2 seconds
                return;
            }
        } else if (direction === 'backward') {
            // Erasing
            index--;
            typewriterElement.textContent = text.substring(0, index);
            
            if (index <= 0) {
                direction = 'pause';
                setTimeout(() => {
                    direction = 'forward';
                    updateText();
                }, 1000); // Pause when empty for 1 second
                return;
            }
        }
        
        // Calculate typing/erasing speed (slightly faster for erasing)
        const speed = direction === 'forward' ? 100 : 80;
        setTimeout(updateText, speed);
    }
    
    // Start the effect
    updateText();
}

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('background-video');
    
    // Attempt to play the video automatically
    if (video) {
        video.play().catch(error => {
            console.log("Auto-play was prevented, this is normal in some browsers:", error);
            
            // Add a click handler to the document to play on first interaction
            document.addEventListener('click', function playVideoOnClick() {
                video.play().catch(e => console.error("Video playback failed:", e));
                document.removeEventListener('click', playVideoOnClick);
            }, { once: true });
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('background-video');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    
    // Set initial volume
    if (video && volumeSlider) {
        // Set video volume from slider (0 to 1 scale)
        video.volume = volumeSlider.value / 100;
        
        // Update volume when slider changes
        volumeSlider.addEventListener('input', function() {
            video.volume = this.value / 100;
            updateVolumeIcon(this.value);
        });
    }
    
    // Function to update the volume icon based on volume level
    function updateVolumeIcon(value) {
        if (!volumeIcon) return;
        
        // Remove all volume classes
        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-off', 'fa-volume-mute');
        
        // Add appropriate class based on volume level
        if (value >= 60) {
            volumeIcon.classList.add('fa-volume-up');
        } else if (value > 0) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-mute');
        }
    }
    
    // Initialize the icon
    if (volumeSlider) {
        updateVolumeIcon(volumeSlider.value);
    }
});