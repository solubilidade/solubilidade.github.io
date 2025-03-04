document.addEventListener('DOMContentLoaded', function() {
    const entryScreen = document.getElementById('entry-screen');
    const video = document.getElementById('background-video');
    const pageContainer = document.querySelector('.page-container');
    
    if (video) {
        video.pause();
    }
    
    if (entryScreen) {
        entryScreen.addEventListener('click', function() {
            entryScreen.classList.add('hidden');
            
            if (pageContainer) {
                setTimeout(() => {
                    pageContainer.classList.add('show-cards');
                }, 200);
            }
            
            if (video) {
                video.muted = false;
                
                video.play().catch(error => {
                    console.error('Video playback failed:', error);
                });
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayRequestedTechLogos();
    
    typewriterEffect();
});

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
    
    const requestedTech = ['c++', 'c#', 'c', 'javascript', 'lua', 'typescript', 'nodejs'];
    
    requestedTech.forEach((tech, index) => {
        const logoInfo = techLogos[tech.toLowerCase()];
        
        const logoLink = document.createElement('a');
        logoLink.href = logoInfo.learnLink;
        logoLink.target = '_blank';
        logoLink.rel = 'noopener noreferrer';
        logoLink.style.textDecoration = 'none';
        
        const logoContainer = document.createElement('div');
        logoContainer.className = 'tech-logo-container';
        logoContainer.style.setProperty('--glow-color', logoInfo.color);
        
        const logoImg = document.createElement('img');
        logoImg.className = 'tech-logo';
        logoImg.src = logoInfo.url;
        logoImg.alt = `${tech} logo`;
        
        logoContainer.appendChild(logoImg);
        
        logoLink.appendChild(logoContainer);
        
        container.appendChild(logoLink);
    });
}

function typewriterEffect() {
    const text = "professional idiot";
    const typewriterElement = document.getElementById('typewriter');
    let direction = 'forward';
    let index = 0;
    
    function updateText() {
        if (direction === 'forward') {
            index++;
            typewriterElement.textContent = text.substring(0, index);
            
            if (index >= text.length) {
                direction = 'pause';
                setTimeout(() => {
                    direction = 'backward';
                    updateText();
                }, 2000);
                return;
            }
        } else if (direction === 'backward') {
            index--;
            typewriterElement.textContent = text.substring(0, index);
            
            if (index <= 0) {
                direction = 'pause';
                setTimeout(() => {
                    direction = 'forward';
                    updateText();
                }, 1000);
                return;
            }
        }
        
        const speed = direction === 'forward' ? 100 : 80;
        setTimeout(updateText, speed);
    }
    
    updateText();
}

document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('background-video');
    
    if (video) {
        video.play().catch(error => {
            console.log("Auto-play was prevented, this is normal in some browsers:", error);
            
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
    
    if (video && volumeSlider) {
        video.volume = volumeSlider.value / 100;
        
        volumeSlider.addEventListener('input', function() {
            video.volume = this.value / 100;
            updateVolumeIcon(this.value);
        });
    }
    
    function updateVolumeIcon(value) {
        if (!volumeIcon) return;

        volumeIcon.classList.remove('fa-volume-up', 'fa-volume-down', 'fa-volume-off', 'fa-volume-mute');
        
        if (value >= 60) {
            volumeIcon.classList.add('fa-volume-up');
        } else if (value > 0) {
            volumeIcon.classList.add('fa-volume-down');
        } else {
            volumeIcon.classList.add('fa-volume-mute');
        }
    }
    
    if (volumeSlider) {
        updateVolumeIcon(volumeSlider.value);
    }
});
