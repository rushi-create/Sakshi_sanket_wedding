document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library
    AOS.init({
        once: false,
        mirror: true,
        offset: 100,
    });

    // Remove Loader after delay
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }, 2000);

    // Create Floating Petals
    createPetals();

    // Audio Control
    const audio = document.getElementById('bg-music');
    const audioControl = document.getElementById('audio-control');
    const audioIcon = document.getElementById('audio-icon');
    const audioLabel = document.getElementById('audio-label');
    let isPlaying = false;
    let interactionTriggered = false;

    function playAudio() {
        if (!isPlaying) {
            audio.play().then(() => {
                isPlaying = true;
                audioControl.classList.add('playing');
                audioIcon.textContent = '🔊';
                audioLabel.textContent = 'Music: On';
            }).catch(e => console.log("Autoplay blocked"));
        }
    }

    // Try to auto-play immediately
    audio.play().then(() => {
        isPlaying = true;
        audioControl.classList.add('playing');
        audioIcon.textContent = '🔊';
        audioLabel.textContent = 'Music: On';
        interactionTriggered = true;
    }).catch(error => {
        // Autoplay blocked, wait for user interaction
        audioIcon.textContent = '🔇';
        audioLabel.textContent = 'Play Music';
    });

    // Auto-play on first interaction (click, touch, or scroll)
    const startMusicOnInteract = () => {
        if (!interactionTriggered) {
            playAudio();
            interactionTriggered = true;
            // Remove listeners once triggered
            document.removeEventListener('click', startMusicOnInteract);
            document.removeEventListener('touchstart', startMusicOnInteract);
            document.removeEventListener('scroll', startMusicOnInteract);
        }
    };

    document.addEventListener('click', startMusicOnInteract);
    document.addEventListener('touchstart', startMusicOnInteract);
    document.addEventListener('scroll', startMusicOnInteract);

    // Manual toggle
    audioControl.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent triggering the document click
        if (isPlaying) {
            audio.pause();
            audioIcon.textContent = '🔇';
            audioLabel.textContent = 'Play Music';
            audioControl.classList.remove('playing');
        } else {
            playAudio();
        }
        isPlaying = !isPlaying;
    });
});

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
    });
}

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Randomize properties
        const size = Math.random() * 15 + 10; // 10px to 25px
        const left = Math.random() * 100; // 0% to 100%
        const animationDuration = Math.random() * 10 + 10; // 10s to 20s
        const animationDelay = Math.random() * 10; // 0s to 10s

        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${left}vw`;
        petal.style.animationDuration = `${animationDuration}s`;
        petal.style.animationDelay = `${animationDelay}s`;
        
        // Random golden colors
        const colors = [
            'rgba(212, 175, 55, 0.4)', // Gold
            'rgba(252, 246, 186, 0.4)', // Light Gold
            'rgba(179, 135, 40, 0.4)'  // Dark Gold
        ];
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(petal);
    }
}
