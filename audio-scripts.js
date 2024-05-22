document.addEventListener("DOMContentLoaded", function() {
    var audioPlayer = document.querySelector(".bgm-player");
    var playPauseButton = document.querySelector(".btn-play-pause");
    var currentTimeDisplay = document.querySelector(".current-time");
    var totalTimeDisplay = document.querySelector(".total-time");
    var timelineBar = document.querySelector(".timeline-bar");

    // 오디오 메타데이터 로드 시 총 재생 시간 표시
    audioPlayer.onloadedmetadata = function() {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    };

    // 오디오 재생 시간 업데이트 시 현재 시간과 타임라인 바 업데이트
    audioPlayer.ontimeupdate = function() {
        var currentTime = audioPlayer.currentTime;
        currentTimeDisplay.textContent = formatTime(currentTime);
        updateTimeline(currentTime, audioPlayer.duration);
    };

     // 오디오 파일 이름 설정
    var audioSource = audioPlayer.querySelector("source");
    var songFilename = audioSource.getAttribute("src").split("/").pop(); // 파일 경로에서 파일 이름 추출
    songFilenameElement.textContent = songFilename;

    // 재생/일시 정지 버튼 클릭 이벤트 처리
    playPauseButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = "❚❚";
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = "▶";
        }
    });

    // 시간 포맷팅 함수 (mm:ss)
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var seconds = Math.floor(seconds % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return minutes + ":" + seconds;
    }

    // 타임라인 바 업데이트 함수
    function updateTimeline(currentTime, duration) {
        var progress = (currentTime / duration) * 10;
        var bar = "━".repeat(Math.floor(progress)) + "❚" + "━".repeat(10 - Math.floor(progress));
        timelineBar.textContent = bar;
    }
});

