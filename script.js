document.addEventListener('DOMContentLoaded', function() {
    const startScreen = document.getElementById('start-screen');
    const mainContent = document.getElementById('main-content');
    const spotifyEmbed = document.getElementById('spotify-embed');
    let websiteStarted = false;

    setTimeout(() => {
        if (window._counter) {
            console.log('Counter.dev script loaded successfully');
        } else {
            console.error('Counter.dev script not loaded');
            updateVisitorCount();
        }
    }, 2000);

async function updateVisitorCount() {
    try {
        const response = await fetch('https://api.countapi.xyz/hit/solubilidade.github.io/visits');
        const data = await response.json();
        document.getElementById('visitor-count').textContent = data.value;
    } catch (error) {
        console.error('Error updating visitor count:', error);
        document.getElementById('visitor-count').textContent = '-';
    }
}

    function getVisitorTimezone() {
        try {
            const date = new Date();
            const offset = -date.getTimezoneOffset() / 60;
            const gmtString = `GMT${offset >= 0 ? '+' : ''}${offset}`;
            document.getElementById('visitor-timezone').textContent = gmtString;
        } catch (error) {
            console.error('Error getting visitor timezone:', error);
            document.getElementById('visitor-timezone').textContent = 'GMT+0';
        }
    }

    function formatTimeOnly(date) {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    function updateTimes() {
        const now = new Date();
        
        document.getElementById('visitor-time').textContent = formatTimeOnly(now);
        
        const utcTime = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        const brasiliaTime = new Date(utcTime.getTime() - (3 * 60 * 60 * 1000));
        document.getElementById('my-time').textContent = formatTimeOnly(brasiliaTime);
    }

    function initializeTimezone() {
        getVisitorTimezone();
        updateTimes();
        setInterval(updateTimes, 1000);
    }

    function startWebsite() {
        if (websiteStarted) return;
        websiteStarted = true;

        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.style.display = 'none';
        }, 500);

        mainContent.classList.remove('blurred');

        document.querySelectorAll('.fade-in, .floating, .bar').forEach(element => {
            element.style.animationPlayState = 'running';
        });

        setTimeout(() => {
            spotifyEmbed.style.opacity = '1';
        }, 1000);

        setTimeout(typeWriter, 1000);
    }

    startScreen.addEventListener('click', startWebsite);
    startScreen.addEventListener('touchstart', startWebsite);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });

    document.getElementById('discord-icon').addEventListener('click', function() {
        const username = 'solubilidade';
        
        navigator.clipboard.writeText(username).then(() => {
            const tooltip = this.parentElement.querySelector('.username-tooltip');
            tooltip.textContent = 'Copied!';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    tooltip.style.visibility = 'hidden';
                    tooltip.textContent = username;
                }, 150);
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    initializeTimezone();

    const text = "full time retard";
    let direction = 'forward';
    let currentText = "";
    let charIndex = 0;

    function typeWriter() {
        const typewriterElement = document.getElementById('typewriter');
        
        if (direction === 'forward') {
            if (charIndex < text.length) {
                currentText += text.charAt(charIndex);
                charIndex++;
            } else {
                setTimeout(() => {
                    direction = 'backward';
                }, 1000);
            }
        } else if (direction === 'backward') {
            if (charIndex > 0) {
                currentText = currentText.slice(0, -1);
                charIndex--;
            } else {
                direction = 'forward';
            }
        }

        typewriterElement.textContent = currentText;
        setTimeout(typeWriter, 100);
    }
});
