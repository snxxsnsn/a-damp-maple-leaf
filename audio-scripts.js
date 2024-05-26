const audioElement = document.querySelector('.audio-element');
const playPauseButton = document.querySelector('.play-pause');
const progressBar = document.querySelector('.progress-bar');
const currentTimeElement = document.querySelector('.current-time');
const durationElement = document.querySelector('.duration');
const shuffleButton = document.querySelector('.shuffle');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const replayButton = document.querySelector('.replay');

audioElement.addEventListener('loadedmetadata', () => {
    durationElement.textContent = formatTime(audioElement.duration);
    progressBar.max = audioElement.duration;
});

audioElement.addEventListener('timeupdate', () => {
    currentTimeElement.textContent = formatTime(audioElement.currentTime);
    progressBar.value = audioElement.currentTime;
});

playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseButton.textContent = '❚❚';
    } else {
        audioElement.pause();
        playPauseButton.textContent = '▶';
    }
});

progressBar.addEventListener('input', () => {
    audioElement.currentTime = progressBar.value;
});

shuffleButton.addEventListener('click', () => {
    // Shuffle functionality to be implemented
});

prevButton.addEventListener('click', () => {
    // Previous track functionality to be implemented
});

nextButton.addEventListener('click', () => {
    // Next track functionality to be implemented
});

replayButton.addEventListener('click', () => {
    audioElement.currentTime = 0;
    audioElement.play();
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
