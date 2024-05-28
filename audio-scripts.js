document.addEventListener('DOMContentLoaded', function() {
    const audioElement = document.querySelector('.audio-element');
    const audioPlayerElement = document.querySelector('.audio-player'); // 오디오 플레이어 엘리먼트
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
        resetProgressBar(); // Load song and reset the progress bar
    }

    function resetProgressBar() {
        progressBar.value = 0; // Reset progress bar value
        currentTimeElement.textContent = formatTime(0); // Reset current time display
        durationElement.textContent = formatTime(0); // Reset duration display
    }

    playPauseButton.addEventListener('click', function() {
        if (audioElement.paused) {
            audioElement.play();
            playPauseButton.textContent = '❚❚';
            audioPlayerElement.classList.add('playing', 'animated'); // 음악 재생 중일 때 클래스 추가
        } else {
            audioElement.pause();
            playPauseButton.textContent = '▶';
            audioPlayerElement.classList.remove('playing', 'animated'); // 음악 재생 중이 아닐 때 클래스 제거
        }
    });

    audioElement.addEventListener('loadedmetadata', function() {
        durationElement.textContent = formatTime(audioElement.duration);
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

    progressBar.addEventListener('input', function() {
        const duration = audioElement.duration;
        const value = progressBar.value;
        audioElement.currentTime = (value / 100) * duration;
    });

    prevButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
        audioElement.play();
        audioPlayerElement.classList.add('playing', 'animated'); // 음악 재생 중일 때 클래스 추가
    });

    nextButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        if (!audioElement.paused) {
            playPauseButton.textContent = '❚❚'; // 재생 중이면 버튼 텍스트를 일시 정지 아이콘으로 변경
        }
        audioElement
