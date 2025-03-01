document.addEventListener('DOMContentLoaded', function() {
    // Simulate visitor count with localStorage
    let visitorCount = localStorage.getItem('visitorCount') || 0;
    visitorCount = parseInt(visitorCount) + 1;
    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('visitor-count').textContent = visitorCount;

    // Add staggered fade-in animation
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.3}s`;
    });
});