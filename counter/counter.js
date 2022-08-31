const counterArea = document.getElementById('counterArea')

function runCountdown(totalSeconds) {
    const SECONDS_COUNTER = setInterval(function(){
        if(totalSeconds <= 0) {
            clearInterval(SECONDS_COUNTER)
        }
      counterArea.innerText = totalSeconds
      totalSeconds--
    }, 1000)
}

runCountdown(10);