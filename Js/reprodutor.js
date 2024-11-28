document.addEventListener('DOMContentLoaded', () => {
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const audioPlayer = document.getElementById('audio-player');
    const progressBar = document.getElementById('progressBar');
    const currentTimeSpan = document.getElementById('currentTime');
    const totalTimeSpan = document.getElementById('totalTime');

    // Formata o tempo em "min:seg"
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Atualiza a barra de progresso e o tempo atual
    function updateProgressBar() {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
        currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
    }

    // Atualiza o tempo total da música
    function updateTotalTime() {
        if (audioPlayer.readyState > 0) {
            totalTimeSpan.textContent = formatTime(audioPlayer.duration);
        } else {
            audioPlayer.addEventListener('loadedmetadata', () => {
                totalTimeSpan.textContent = formatTime(audioPlayer.duration);
            });
        }
    }

    // Reproduz ou pausa a música
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audioPlayer.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });

    // Sincroniza a barra de progresso com o áudio
    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    // Reseta o player quando a música termina
    audioPlayer.addEventListener('ended', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        progressBar.value = 0;
        currentTimeSpan.textContent = formatTime(0);
    });

    // Atualiza o progresso e o tempo total em eventos do áudio
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    audioPlayer.addEventListener('loadedmetadata', updateTotalTime);

    // Atualiza o tempo total ao carregar a página
    updateTotalTime();
});
