document.addEventListener("DOMContentLoaded", function() {
    var audioPlayer = document.getElementById("bgm-player");
    var playPauseButton = document.getElementById("btn-play-pause");
    var currentTimeDisplay = document.getElementById("current-time");
    var totalTimeDisplay = document.getElementById("total-time");
    var timelineBar = document.getElementById("timeline-bar");

    // 오디오 메타데이터 로드 시 총 재생 시간 표시
    audioPlayer.onloadedmetadata = function() {
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    };

    // 오디오 재생 시간 업데이트 시 현재 시간과 타임라인 바 업데이트
    audioPlayer.ontimeupdate = function() {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        updateTimeline(audioPlayer.currentTime, audioPlayer.duration);
    };

    // 재생/일시 정지 버튼 클릭 이벤트 처리
    playPauseButton.addEventListener("click", function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = "❚❚";
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = "►";
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
        var bar = "━".repeat(progress) + "❚" + "━".repeat(10 - progress);
        timelineBar.textContent = bar;
    }
});
