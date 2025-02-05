// Timer functionality
let timerInterval;
let seconds = 0;
let isRunning = false;

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `${hours}:${minutes}:${secs}`;
    }, 1000);
}

document.getElementById('start-stop-timer').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        document.getElementById('start-stop-timer').textContent = 'Start';
    } else {
        startTimer();
        document.getElementById('start-stop-timer').textContent = 'Stop';
    }
    isRunning = !isRunning;
});

// YouTube Player functionality
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId: 'jfKfPfyJRdk', // Your live stream ID
        playerVars: {
            autoplay: 1, // Autoplay when page loads
            mute: 1, // Start muted (required for autoplay)
            controls: 0, // Hide controls
            modestbranding: 1,
            rel: 0,
        },
        events: {
            onReady: (event) => {
                event.target.playVideo(); // Start playback
            }
        }
    });
}

// Play/Pause button logic
document.getElementById('music-control').addEventListener('click', () => {
    if (player.isMuted()) {
        player.unMute(); // Unmute audio
        document.getElementById('music-control').textContent = 'Pause Music';
    } else {
        player.mute(); // Mute audio (effectively pauses)
        document.getElementById('music-control').textContent = 'Play Music';
    }
});



let currentImageIndex = 0;

// Updated JavaScript
let currentBg = 0;
const backgrounds = document.querySelectorAll('.bg');

function preloadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
  });
}

async function changeBackground() {
  // Preload next image first
  const nextBg = (currentBg + 1) % 2;
  const newUrl = `https://picsum.photos/1400/700?random=${Date.now()}`;
  
  await preloadImage(newUrl);
  
  // Set new background
  backgrounds[nextBg].style.backgroundImage = `url(${newUrl})`;
  
  // Switch active class
  backgrounds[currentBg].classList.remove('bg-active');
  backgrounds[nextBg].classList.add('bg-active');
  
  currentBg = nextBg;
}

// Change every 10 seconds
setInterval(changeBackground, 10000);

// Initial load
changeBackground();