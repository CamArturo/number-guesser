var firstRun = true;
var guessValueInput = document.getElementById('guess-value');
var resetBtn = document.getElementById('reset-btn');
var clearBtn = document.getElementById('clear-btn');
var minValueInput = document.getElementById('min-value');
var maxValueInput = document.getElementById('max-value');
var minValue = 1;
var maxValue = 100;
resetBtn.disabled = true;
clearBtn.disabled = true;
var randomNumber;
var previousMinValue;
var previousMaxValue;
var victory = false;


testGuessInputHasValue();

// Event Listeners
document.getElementById('guess-btn').addEventListener('click', userGuess);
document.getElementById('reset-btn').addEventListener('click', clearOutput);
document.getElementById("guess-value").addEventListener("keydown", handleKeyPress);

// Key Press Event
function handleKeyPress(event) {
    if (event.keyCode === 13) {
        userGuess();
    }
}

function winGame() {
    console.log('win game called');
    firstRun = true;
    clearOutput();
    victory = true;
    changeMinValue(victory);
    changeMaxValue(victory);
}

// Main Function
function userGuess() {
    console.log('userGuess called');
    var guessInput = document.getElementById('guess-value').value;
    guessInput = parseInt(guessInput);
    if (firstRun) {
        if (minValueInput.value && maxValueInput.value) {
            minValue = minValueInput.value;
            maxValue = maxValueInput.value;
        } else {
            minValue = 1;
            maxValue = 100;
        }
        randomNumber = getRandomInt(minValue, maxValue);
        console.log('First Run = True and Random Num = ' + randomNumber);
        changeMinValue();
        changeMaxValue();

        if (testAcceptableRange(guessInput)) {
            updateDisplay(guessInput)
        }
    }
    if (firstRun === true) {
        firstRun = false;
    } else {
        clearOutput();
        updateDisplay(guessInput);
    }
    // if (firstRun === true) {
    //     updateDisplay(guessInput);
    // }
    if (victory === false) {
        minValue = minValueInput.value;
        maxValue = maxValueInput.value;
    } else {
        minValue = previousMinValue;
        maxValue = previousMaxValue;

    }
}

function getRandomInt(min, max) {
    console.log('getRandomInt called')
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNumber = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    console.log('random number = ' + randomNumber);
    return randomNumber;
}

function changeMinValue(win) {
    console.log('changeMinValue called')
    if (victory) {
        previousMinValue = minValue - 10;
    } else if (firstRun) {
        var minValueInput = document.getElementById('min-value');
        if (minValueInput.value === '') {
            minValue = 1;
        } else {
            minValue = parseInt(minValueInput.value);
        }
    }

    if (win) {
        previousMinValue = minValue - 10;
    } else {
        var minValueInput = document.getElementById('min-value');
        previousMinValue = minValueInput.value;
        if (minValueInput.value) {
            minValue = minValueInput.value;
        } else {
            minValue = 1;
        }
    }
}

function changeMaxValue(win) {
    console.log('changeMaxValue called');
    if (victory) {
        previousMaxValue = maxValue + 10;
    } else if (firstRun) {
        var maxValueInput = document.getElementById('max-value');
        if (maxValueInput.value === '') {
            maxValue = 100;
        } else {
            maxValue = parseInt(maxValueInput.value);
        }
    }

    if (win) {
        previousMaxValue = maxValue - 10;
    } else {
        var maxValueInput = document.getElementById('max-value');
        previousMaxValue = maxValueInput.value;
        console.log('previous max value = ' + previousMaxValue);

        if (maxValueInput.value) {
            maxValue = maxValueInput.value;
        } else {
            maxValue = 100;
        }
    }
}

function testGuessInputHasValue() {
    console.log('testGuessInputHasValue');
    guessValueInput.addEventListener('input', function (evt) {
        if (guessValueInput.value === '') {
            resetBtn.disabled = true;
            clearBtn.disabled = true;
        } else {
            resetBtn.disabled = false;
            clearBtn.disabled = false;
        }
    });
}

function updateDisplay(guessInput) {
    console.log('updateDisplay called');
    displayLastGuess();

    displayGuessValue(guessInput);

    displayGuessFeedback(guessInput);
}

function displayLastGuess() {
    console.log('displayLastGuess called');
    // display your last guess was
    var lastGuess = document.createElement('p');
    lastGuess.className = 'last-guess';
    var lastGuessText = document.createTextNode("Your last guess was");
    lastGuess.appendChild(lastGuessText);
    document.getElementsByClassName('output')[0].appendChild(lastGuess);
}

function displayGuessValue(guessInput) {
    console.log('displayGuessValue called');
    var guessValue = document.createElement('p');
    guessValue.className = 'guess-value';
    var guessValueText = document.createTextNode(guessInput);
    guessValue.appendChild(guessValueText);
    document.getElementsByClassName('output')[0].appendChild(guessValue);
}

function displayGuessFeedback(guessInput) {
    console.log('displayGuessFeedback is being called' + guessInput);
    var result = document.createElement('p');
    var resultText = '';
    if (guessInput > randomNumber) {
        resultText = document.createTextNode('That is too high');
    } else if (guessInput < randomNumber) {
        resultText = document.createTextNode('That is too low');
    } else {
        resultText = document.createTextNode('BOOM!');
        // window.setTimeout(3000);
        setTimeout(function() { winGame(); }, 4000);
    }
    if (victory) {
        result.className = 'boom';
    } else {
        result.className = 'result';
    }
    result.appendChild(resultText);
    document.getElementsByClassName('output')[0].appendChild(result);
}

function errorMessage() {
    console.log('errorMessage')
    var errorMessage = document.createElement('p');
    var errorText = document.createTextNode('Please enter number between ' + minValue + ' and ' + maxValue);
    errorMessage.appendChild(errorText);
    document.getElementsByClassName('output')[0].appendChild(errorMessage);
}

function testAcceptableRange(guessInput) {
    changeMinValue(guessInput);
    changeMaxValue(guessInput);
    console.log('test acceptable range function called');
    console.log('maxValue = ' + maxValue);
    console.log('minValue = ' + minValue);
    console.log('guess input is ' + guessInput);
    if (isNaN(guessInput) || guessInput > maxValue || guessInput < minValue || typeof guessInput !== 'number') {
        console.log('test acceptable not passed');
        errorMessage(guessInput);
        return;
    } else return true;
}

function clearOutput() {
    console.log('clearOutput');
    var child = document.getElementsByClassName('output').item(0);
    child.innerHTML = '';
    minValueInput.value = '';
    maxValueInput.value = '';
    guessValueInput.value = '';
}