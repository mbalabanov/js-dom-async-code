const counterArea = document.getElementById('counterArea')
let abort = false;

function setupApp() {
    abort = true;
    counterArea.innerText = ''
    document.getElementById('submitButton').removeAttribute('disabled')
    document.getElementById('countDownSeconds').value = '10'
    document.getElementById('changeSettingsDuringCountdown').setAttribute('class', 'transparent-input hideElement')
    document.getElementById('resetButton').setAttribute('class', 'styledButton hideElement')
    document.getElementById('rocket-ship').classList.remove('liftoff')
    document.getElementById('smoke').classList.remove('smoke-launch')

    document.getElementById('submitButton').addEventListener('click', function (event) {
        event.preventDefault()
        document.getElementById('submitButton').setAttribute('disabled', '')
        document.getElementById('changeSettingsDuringCountdown').classList.remove('hideElement')
        document.getElementById('resetButton').classList.remove('hideElement')
        document.getElementById('resetButton').addEventListener('click', setupApp)
        document.getElementById('increaseSeconds').addEventListener('click', increaseSeconds)
        document.getElementById('decreaseSeconds').addEventListener('click', decreaseSeconds)

        let countDownSeconds = document.getElementById('countDownSeconds')
        runCountdown(countDownSeconds.value)
    })

    console.log('Setup complete.')
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
            document.getElementById('smoke').setAttribute('class', 'smoke-launch')
        }
        counterArea.innerText = totalSeconds
        totalSeconds--
    }, 1000)
}

function increaseSeconds() {
    let increasedValue = counterArea.innerText
    if (!isNaN(increasedValue)) {
        increasedValue = Number(increasedValue) + 1
        abort = true
        counterArea.innerText = increasedValue
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
    let decreasedValue = counterArea.innerText
    if (!isNaN(decreasedValue)) {
        decreasedValue = Number(decreasedValue) - 1
        abort = true
        counterArea.innerText = decreasedValue
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
