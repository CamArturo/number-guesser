var firstRun = true;
var guessValueInput = document.getElementById('guess-value');
var resetBtn = document.getElementById('reset-btn');
var clearBtn = document.getElementById('clear-btn');
var minValueInput = document.getElementById('min-value');
var maxValueInput = document.getElementById('max-value');
var minValue;
var maxValue;
resetBtn.disabled = true;
clearBtn.disabled = true;
var randomNumber;
var previousMinValue;
var previousMaxValue;
var victory = false;


testGuessInputHasValue();

// Event Listeners
document.getElementById('guess-btn').addEventListener('click', userGuess);
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

    var guessInput = document.getElementById('guess-value').value;
    guessInput = parseInt(guessInput);

    if (victory === false) {
        minValue = minValueInput.value;
        maxValue = maxValueInput.value;
    } else {
        minValue = previousMinValue;
        maxValue = previousMaxValue;
    }

    if (firstRun) {
        randomNumber = getRandomInt(minValue, maxValue);
        console.log('First Run = True and Random Num = ' + randomNumber);
        changeMinValue();
        changeMaxValue();
    }

    if (firstRun === true) {
        firstRun = false;
    } else {
        clearOutput();
    }

    if (testAcceptableRange(guessInput)) {

        updateDisplay(guessInput)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomNumber = Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    console.log('random number = ' + randomNumber);
    return randomNumber;
}

function changeMinValue(win) {
    if(victory) {
        previousMinValue = minValue - 10;
    } else if (firstRun) {
        // var minValueInput = document.getElementById('min-value');
        minValue = parseInt(minValueInput.value);
    }

    if (win) {
        previousMinValue = minValue - 10;
    } else {
        // var minValueElement = document.getElementById('min-value');
        previousMinValue = minValueInput.value;
        if (minValueInput.value) {
            minValue = minValueInput.value;
        } else {
            minValue = 1;
        }
    }
}

function changeMaxValue(win) {
    if (victory) {
        previousMaxValue = maxValue + 10;
    } else if (firstRun) {
        // var maxValueInput = document.getElementById('max-value');
        maxValue = parseInt(maxValueInput.value);
    }

    if (win) {
        previousMaxValue = maxValue - 10;
    } else {
        // var maxValueInput = document.getElementById('max-value');
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
    displayLastGuess();

    displayGuessValue(guessInput);

    displayGuessFeedback(guessInput);
}

function displayLastGuess() {
    // display your last guess was
    var lastGuess = document.createElement('p');
    lastGuess.className = 'last-guess';
    var lastGuessText = document.createTextNode("Your last guess was");
    lastGuess.appendChild(lastGuessText);
    document.getElementsByClassName('output')[0].appendChild(lastGuess);
}

function displayGuessValue(guessInput) {
    var guessValue = document.createElement('p');
    guessValue.className = 'guess-value';
    var guessValueText = document.createTextNode(guessInput);
    guessValue.appendChild(guessValueText);
    document.getElementsByClassName('output')[0].appendChild(guessValue);
}

function displayGuessFeedback(guessInput) {
    // display high or low
    var result = document.createElement('p');
    var resultText = '';
    if (guessInput > randomNumber) {
        resultText = document.createTextNode('That is too high');
    } else if (guessInput < randomNumber) {
        resultText = document.createTextNode('That is too low');
    } else {
        resultText = document.createTextNode('BOOM!');
        window.setTimeout(3000);
        winGame();
    }
    if(victory) {
        result.className = 'boom';
    } else {
        result.className = 'result';
    }
    result.appendChild(resultText);
    document.getElementsByClassName('output')[0].appendChild(result);
}

function errorMessage() {
    var errorMessage = document.createElement('p');
    var errorText = document.createTextNode('Please enter number between 1 and 100');
    errorMessage.appendChild(errorText);
    document.getElementsByClassName('output')[0].appendChild(errorMessage);
}

function testAcceptableRange(guessInput) {
    if (isNaN(guessInput) || guessInput > maxValue || guessInput < minValue || typeof guessInput !== 'number') {
        errorMessage(guessInput);
        return false;
    } else return true;
}

function clearOutput() {
    // var child = document.getElementsByClassName("output")[0];
    var child = document.getElementsByClassName('output').item(0);
    child.innerHTML = '';
    minValueInput.value = '';
    maxValueInput.value = '';
    guessValueInput.value = '';
    // var form = document.getElementById("myForm");
    // form.reset();
}


// document.getElementById('idname').addEventListener('blur', functionName, false);