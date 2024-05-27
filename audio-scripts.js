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
        { src: 'music/Undertale.mp3', name: 'Undertale OST 090 His Theme' },
        { src: 'music/LetDown.mp3', name: 'Let Down - Radiohead' }
    ];

    function loadSong(index) {
        const song = playlist[index];
        audioElement.src = song.src;
        songTitleElement.textContent = song.name;

        // 프로그레스 바와 시간 초기화
        progressBar.value = 0;
        currentTimeElement.textContent = '0:00';
        durationElement.textContent = '0:00';

        // 메타데이터가 로드된 후 duration 업데이트
        audioElement.addEventListener('loadedmetadata', function() {
            const duration = audioElement.duration;
            durationElement.textContent = formatTime(duration);
        });
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

        if (!isNaN(duration) && durationElement.textContent === '0:00') {
            durationElement.textContent = formatTime(duration);
        }
    });

    
