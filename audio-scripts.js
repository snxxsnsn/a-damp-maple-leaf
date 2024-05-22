document.addEventListener("DOMContentLoaded", function() {
    var audioPlayer = document.querySelector(".bgm-player");
    var songFilenameElement = document.querySelector("#song-filename");
    var startTimeElement = document.querySelector(".start-time");
    var currentTimeElement = document.getElementById("current-time");
    var endTimeElement = document.getElementById("end-time");
    var timelineBar = document.querySelector(".timeline-bar");
    var totalTimeDisplay = document.querySelector(".total-time");

    // 오디오 파일 이름 설정
    var audioSource = audioPlayer.querySelector("source");
    var songFilename = audioSource.getAttribute("src").split("/").pop(); // 파일 경로에서 파일 이름 추출
    songFilenameElement.textContent = songFilename;

        // 자동 재생이 실패한 경우에 대한 처리
    if (autoPlayPromise !== undefined) {
        autoPlayPromise.catch(function(error) {
            // 자동 재생이 실패한 경우, 재생 버튼을 클릭하여 수동으로 재생할 수 있도록 함
            playPauseButton.addEventListener("click", function() {
                audioPlayer.play();
                playPauseButton.textContent = "❚❚";
                playPauseButton.removeEventListener("click", arguments.callee); // 클릭 이벤트 리스너 제거
            });
        });
    }

    // 현재 시간 업데이트 함수
    function updateCurrentTime(currentTime) {
        currentTimeElement.textContent = formatTime(currentTime);
    }

    // 시간 형식 변환 함수
    function formatTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = Math.floor(seconds % 60);
        return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
    }

    // 끝 시간 설정
    audioPlayer.addEventListener("loadedmetadata", function() {
        endTimeElement.textContent = formatTime(audioPlayer.duration);
        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);
    });

    // 오디오 재생 시간 업데이트 시 현재 시간과 타임라인 바 업데이트
    audioPlayer.addEventListener("timeupdate", function() {
        var currentTime = audioPlayer.currentTime;
        updateCurrentTime(currentTime);
        updateTimeline(currentTime, audioPlayer.duration);
    });

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

    // 타임라인 바 업데이트 함수
    function updateTimeline(currentTime, duration) {
        var progress = (currentTime / duration) * 10;
        var bar = "━".repeat(Math.floor(progress)) + "❚" + "━".repeat(10 - Math.floor(progress));
        timelineBar.textContent = bar;
    }
});
