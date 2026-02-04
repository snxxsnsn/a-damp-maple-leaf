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
            audioPlayerElement.classList.add('playing'); // 음악 재생 중일 때 클래스 추가
        } else {
            audioElement.pause();
            playPauseButton.textContent = '▶';
            audioPlayerElement.classList.remove('playing'); // 음악 재생 중이 아닐 때 클래스 제거
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
        playPauseButton.textContent = '❚❚'; // 아이콘 변경
        audioPlayerElement.classList.add('playing'); // 음악 재생 중일 때 클래스 추가
    });

    nextButton.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
        audioElement.play();
        playPauseButton.textContent = '❚❚'; // 아이콘 변경
        audioPlayerElement.classList.add('playing'); // 음악 재생 중일 때 클래스 추가
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
        audioPlayerElement.classList.add('playing'); // 음악 재생 중일 때 클래스 추가
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // 초기 로드 시 첫 곡을 설정하고 재생 버튼을 초기화합니다.
    loadSong(currentSongIndex);
    resetProgressBar();

    // 슬라이더 초기값을 0으로 설정하고 오디오 요소가 준비되면 초기 상태를 설정합니다.
    progressBar.value = 0;

    // 추가: 오디오 요소가 준비되었는지 확인하고 초기화
    if (audioElement.readyState > 0) {
        durationElement.textContent = formatTime(audioElement.duration);
        progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
        currentTimeElement.textContent = formatTime(audioElement.currentTime);
    } else {
        audioElement.addEventListener('loadedmetadata', function() {
            durationElement.textContent = formatTime(audioElement.duration);
            progressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
            currentTimeElement.textContent = formatTime(audioElement.currentTime);
        });
    }
});
