document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.querySelector('.audio-element');
    const songTitleElement = document.querySelector('.song-title');
    const playPauseButton = document.querySelector('.play-pause');
    const currentTimeElement = document.querySelector('.current-time');
    const durationElement = document.querySelector('.duration');
    const progressBar = document.querySelector('.progress-bar');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const shuffleButton = document.querySelector('.shuffle');

    let currentSongIndex = 0;
    let isShuffle = false;

    const playlist = [
        { src: 'music/Undertale.mp3', name: '𝚄𝚗𝚍𝚎𝚛𝚝𝚊𝚕𝚎 𝙾𝚂𝚃 𝟶𝟿𝟶 𝙷𝚒𝚜 𝚃𝚑𝚎𝚖𝚎' },
        { src: 'music/LetDown.mp3', name: '𝙻𝚎𝚝 𝙳𝚘𝚠𝚗 - 𝚁𝚊𝚍𝚒𝚘𝚑𝚎𝚊𝚍' }
    ];

    function loadSong(index) {
        const song = playlist[index];
        audioElement.src = song.src;
        songTitleElement.textContent = song.name;
    }

    playPauseButton.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            playPauseButton.textContent = '❚❚';
        } else {
            audioElement.pause();
            playPauseButton.textContent = '▶';
        }
    });

    audioElement.addEventListener('timeupdate', function() {
        const currentTime = audioElement.currentTime;
        const duration = audioElement.duration;

        currentTimeElement.textContent = formatTime(currentTime);
        progressBar.value = (currentTime / duration) * 100;

        // 맨 처음에는 항상 0:00 지점에 위치하도록 함
        progressBar.style.setProperty('left', '0');

        if (!isNaN(duration) && durationElement.textContent === '0:00') {
            durationElement.textContent = formatTime(duration);
        }
    });

    progressBar.addEventListener('input', function() {
        const duration = audioElement.duration;
        const value = progressBar.value;
        audioElement.currentTime = (value / 100) * duration;
    });

    prevButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        audioElement.play();
    });

    nextButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        audioElement.play();
    });

    shuffleButton.addEventListener('click', function() {
        isShuffle = !isShuffle;
        shuffleButton.classList.toggle('active', isShuffle);
    });

    audioElement.addEventListener('ended', function() {
        if (isShuffle) {
            currentSongIndex = Math.floor(Math.random() * playlist.length);
        } else {
            currentSongIndex = (currentSongIndex + 1) % playlist.length;
        }
        loadSong(currentSongIndex);
        audioElement.play();
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    loadSong(currentSongIndex);
});
