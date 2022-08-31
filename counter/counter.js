const COUNTER_AREA = document.getElementById('counterArea')
let abort = false;

function setupApp() {
    abort = true;
    COUNTER_AREA.innerText = ''
    document.getElementById('submitButton').removeAttribute('disabled')
    document.getElementById('countDownSeconds').removeAttribute('disabled')
    document.getElementById('countDownSeconds').value = '10'
    document.getElementById('changeSettingsDuringCountdown').setAttribute('class', 'transparent-input hideElement')
    document.getElementById('resetButton').setAttribute('class', 'styledButton hideElement')
    document.getElementById('rocket-ship').classList.remove('liftoff')
    document.getElementById('smoke-left').classList.remove('smoke-launch')
    document.getElementById('smoke-right').classList.remove('smoke-launch')

    document.getElementById('submitButton').addEventListener('click', function (event) {
        event.preventDefault()
        document.getElementById('submitButton').setAttribute('disabled', '')
        document.getElementById('countDownSeconds').setAttribute('disabled', '')
        document.getElementById('changeSettingsDuringCountdown').classList.remove('hideElement')
        document.getElementById('resetButton').classList.remove('hideElement')
        document.getElementById('resetButton').addEventListener('click', setupApp)
        document.getElementById('increaseSeconds').addEventListener('click', increaseSeconds)
        document.getElementById('decreaseSeconds').addEventListener('click', decreaseSeconds)

        let countDownSeconds = document.getElementById('countDownSeconds')
        runCountdown(countDownSeconds.value)
    })
}

function runCountdown(totalSeconds) {
    abort = false

    const SECONDS_COUNTER = setInterval(function () {
        if (abort) {
            clearInterval(SECONDS_COUNTER)
            return
        }
        if (totalSeconds <= 0) {
            clearInterval(SECONDS_COUNTER)
            totalSeconds = 'Liftoff!'
            document.getElementById('rocket-ship').setAttribute('class', 'liftoff')
            document.getElementById('smoke-left').setAttribute('class', 'smoke-launch')
            document.getElementById('smoke-right').setAttribute('class', 'smoke-launch')
        }
        COUNTER_AREA.innerText = totalSeconds
        totalSeconds--
    }, 1000)
}

function increaseSeconds() {
    let increasedValue = COUNTER_AREA.innerText
    if (!isNaN(increasedValue)) {
        increasedValue = Number(increasedValue) + 1
        abort = true
        COUNTER_AREA.innerText = increasedValue
        document.getElementById('increaseSeconds').setAttribute('disabled', '')
        document.getElementById('decreaseSeconds').setAttribute('disabled', '')
        setTimeout(function () {
            document.getElementById('increaseSeconds').removeAttribute('disabled')
            document.getElementById('decreaseSeconds').removeAttribute('disabled')
            console.log(typeof increasedValue)
            console.log(increasedValue)
            runCountdown(increasedValue)
        }, 1000);
    }
}

function decreaseSeconds() {
    let decreasedValue = COUNTER_AREA.innerText
    if (!isNaN(decreasedValue)) {
        decreasedValue = Number(decreasedValue) - 1
        abort = true
        COUNTER_AREA.innerText = decreasedValue
        document.getElementById('increaseSeconds').setAttribute('disabled', '')
        document.getElementById('decreaseSeconds').setAttribute('disabled', '')
        setTimeout(function () {
            document.getElementById('increaseSeconds').removeAttribute('disabled')
            document.getElementById('decreaseSeconds').removeAttribute('disabled')
            console.log(typeof decreasedValue)
            runCountdown(decreasedValue)
        }, 1000);
    }
}

setupApp()
