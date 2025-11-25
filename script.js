const bdayCard = document.getElementById('bdayCard');
const typewriterElement = document.getElementById('typewriterText');
const fullText = typewriterElement.textContent.trim();
const slideshowDiv = document.getElementById("slideshow");
const slideImg = document.getElementById("slideImg");

// 🔊 NEW: Music Player Variable (Yah HTML mein 'birthdayMusic' ID se connect hota hai)
const musicPlayer = document.getElementById('birthdayMusic'); 

// New variables for background effects
const particlesContainer = document.querySelector('.particles');
const balloonsContainer = document.querySelector('.balloons');

let photos = [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg",
    "images/pic4.jpg",
    "images/pic5.jpg",
    "images/pic6.jpg",
    "images/pic7.jpg",
    "images/pic8.jpg",
    "images/pic9.jpg",
    // Add more images here, e.g., "images/pic5.jpg"
];

let index = 0;
let slideshowInterval;
let typingCompleted = false;

// ------------------- Card Flip (Updated to play music) -------------------
bdayCard.addEventListener('click', () => {
    if (!bdayCard.classList.contains('flipped')) {
        bdayCard.classList.add('flipped');
        
        // 1. Music Play Logic: Card flip hone par music start karo
        if (musicPlayer) {
            musicPlayer.volume = 0.6; // Volume ko 60% par set kiya
            const playPromise = musicPlayer.play();
            
            // Promise handling is zaroori hai autoplay errors se bachne ke liye
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Music successfully started
                    console.log("Music started playing!");
                }).catch(error => {
                    // Agar browser ne roka, toh console mein error dikhegi
                    console.error("Music play blocked by browser:", error);
                });
            }
        }

        // 2. Start typing after the flip is complete (1000ms is the CSS transition time)
        setTimeout(typeWriterEffect, 1000); 
    }
});

// ------------------- Typewriter Effect -------------------
function typeWriterEffect() {
    if (typingCompleted) return;

    typewriterElement.textContent = '';
    typewriterElement.style.opacity = '1';

    let charIndex = 0;
    const typingInterval = 30; // Typing speed in milliseconds
    
    function type() {
        if (charIndex < fullText.length) {
            typewriterElement.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingInterval);
        } else {
            typewriterElement.classList.add('done'); // Removes cursor
            typingCompleted = true;
        }
    }
    type();
}

// ------------------- Slideshow Logic -------------------
function startSlideshow() {
    slideshowDiv.style.display = "flex";
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    // Start showing the first image immediately
    showImage(true);
    // Set interval for subsequent images
    slideshowInterval = setInterval(showImage, 2500); 
}

function showImage(isInitial = false) {
    // Fade out
    slideImg.style.opacity = '0';
    
    setTimeout(() => {
        slideImg.src = photos[index];
        index = (index + 1) % photos.length;
        // Fade in
        slideImg.style.opacity = '1';
    }, 500); 

    // Handle initial image load without waiting for fade-out
    if (isInitial) {
        slideImg.src = photos[index];
        index = (index + 1) % photos.length;
        slideImg.style.opacity = '1';
    }
}

function closeSlide() {
    clearInterval(slideshowInterval);
    slideshowDiv.style.display = "none";
}


// ------------------- Background Effects Logic -------------------
const balloonEmojis = ['🎈', '💖', '⭐', '🎂', '🌹', '✨']; 

function createParticle() {
    const particle = document.createElement('i');
    particle.textContent = '•'; 
    
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.fontSize = Math.random() * 2 + 5 + 'px'; 
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    particlesContainer.appendChild(particle);
}

function createBalloon() {
    const balloon = document.createElement('i');
    balloon.textContent = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)]; 
    
    balloon.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 10 + 15; // 15s to 25s float time
    balloon.style.setProperty('--duration', duration + 's');
    balloon.style.animationDelay = Math.random() * 5 + 's';
    
    balloonsContainer.appendChild(balloon);

    setTimeout(() => {
        balloon.remove();
    }, duration * 1000);
}

// ------------------- Main Initialization -------------------
window.onload = function() {
    // Initial Particles for permanent background effect
    for (let i = 0; i < 50; i++) {
        createParticle();
    }
    
    // Continuous generation of balloons
    setInterval(createBalloon, 2000); 
    
    // Ensure typewriter text is hidden until card flips
    typewriterElement.style.opacity = '0'; 
};