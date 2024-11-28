const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const progressBar = document.getElementById('progressBar');
const currentTimeSpan = document.getElementById('currentTime');
const totalTimeSpan = document.getElementById('totalTime');
const musica = document.getElementById('musica');
const musica2 = document.getElementById('musica2');
const musica3 = document.getElementById('musica3');
const musica4 = document.getElementById('musica4');
const musica5 = document.getElementById('musica5');
const musica6 = document.getElementById('musica6');

const foto1 = document.querySelector('.foto1'); 
const foto2 = document.querySelector('.foto2'); 
const foto3 = document.querySelector('.foto3'); 
const foto4 = document.querySelector('.foto4'); 
const foto5 = document.querySelector('.foto5'); 
const foto6 = document.querySelector('.foto6');

let currentMusic = null;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function playMusic(music) {
    if (currentMusic && currentMusic !== music) {
        currentMusic.pause();
        currentMusic.currentTime = 0; 
    }
    music.play();
    currentMusic = music;
    pauseButton.textContent = "Pausar"; 
    updateProgressBar();  
    updateTotalTime();    
}

foto1.addEventListener('click', () => playMusic(musica));
foto2.addEventListener('click', () => playMusic(musica2));
foto3.addEventListener('click', () => playMusic(musica3));
foto4.addEventListener('click', () => playMusic(musica4));
foto5.addEventListener('click', () => playMusic(musica5));
foto6.addEventListener('click', () => playMusic(musica6));

pauseButton.addEventListener('click', () => {
    if (currentMusic) {
        if (currentMusic.paused) {
            currentMusic.play(); 
            pauseButton.textContent = "Pausar"; 
        } else {
            currentMusic.pause(); 
            pauseButton.textContent = "Iniciar"; 
        }
    }
});

resetButton.addEventListener('click', () => {
    if (currentMusic) {
        currentMusic.pause();  
        currentMusic.currentTime = 0; 
        pauseButton.textContent = "Iniciar"; 
        updateProgressBar(); 
    }
});

function updateProgressBar() {
    if (currentMusic) {
        currentMusic.addEventListener('timeupdate', () => {
            const progress = (currentMusic.currentTime / currentMusic.duration) * 100;
            progressBar.value = progress;
            currentTimeSpan.textContent = formatTime(currentMusic.currentTime); 
        });
    }
}

function updateTotalTime() {
    if (currentMusic) {
        if (currentMusic.readyState > 0) {
            totalTimeSpan.textContent = formatTime(currentMusic.duration); 
        } else {
            currentMusic.addEventListener('loadedmetadata', () => {
                totalTimeSpan.textContent = formatTime(currentMusic.duration);
            });
        }
    }
}

progressBar.addEventListener('input', () => {
    if (currentMusic) {
        const seekTime = (progressBar.value / 100) * currentMusic.duration;
        currentMusic.currentTime = seekTime;
    }
});


if (currentMusic) {
    currentMusic.addEventListener('ended', () => {
        pauseButton.textContent = "Iniciar"; 
        progressBar.value = 0;  
        currentTimeSpan.textContent = formatTime(0); 
    });
}
