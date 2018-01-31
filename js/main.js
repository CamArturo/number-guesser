// var number = getRandomInt(1, 100);
var firstRun = true;
var guessValueInput = document.getElementById('guess-value');
var resetBtn = document.getElementById('reset-btn');
var clearBtn = document.getElementById('clear-btn');
var minValueInput = document.getElementById('min-value');
var maxValueInput = document.getElementById('max-value');
// var guessValue = document.getElementById('guess-value');
resetBtn.disabled = true;
clearBtn.disabled = true;
var number;
var previousMinValue;
var previousMaxValue;

testGuessInputHasValue();

// Event Listeners

document.getElementById('guess-btn').addEventListener('click', guessFunction);
document.getElementById("guess-value").addEventListener("keydown", handleKeyPress);

// Key Press Event

function handleKeyPress (event) {
    if (event.keyCode === 13) {
        guessFunction();
    }
}


// Main Function

function guessFunction() {
    var guessInput = document.getElementById('guess-value').value;
    changeMinGuessValue();
    changeMaxGuessValue();
    var number = getRandomInt(minValueInput, maxValueInput);

    guessInput = parseInt(guessInput);

    if (firstRun === true) {
        firstRun = false;
    } else {
        clearOutput();
    }

    if (testAcceptableRange(guessInput)) {

        // changeMinGuessValue();
        // changeMaxGuessValue();

        updateDisplay(guessInput)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function changeMinGuessValue() {
    var minValueElement = document.getElementById('min-value');
    previousMinValue = minValueElement.value;
    console.log('previous value = ' + previousMinValue);
    if (minValueElement.value) {
        minValueInput = minValueElement.value;
    } else {
        minValueInput = 1;
    }
}

function changeMaxGuessValue() {
    var maxValueElement = document.getElementById('max-value');
    previousMaxValue = maxValueElement.value;
    if (maxValueElement.value) {
        maxValueInput = maxValueElement.value;
    } else {
        maxValueInput = 100;
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

function displayLastGuess(guessInput) {
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
    if (guessInput > number) {
        resultText = document.createTextNode('That is too high');
    } else if (guessInput < number) {
        resultText = document.createTextNode('That is too low');
    } else {
        resultText = document.createTextNode('BOOM!');
        setTimeout(3000);
        // TODO add 10
        // changeMinGuessValue();
        // changeMaxGuessValue();
        // TODO new random number
        // TODO add toggle for start of program

    }
    result.className = 'result';
    result.appendChild(resultText);
    document.getElementsByClassName('output')[0].appendChild(result);
}

function errorMessage(guessInput) {
    var errorMessage = document.createElement('p');
    var errorText = document.createTextNode('Please enter number between 1 and 100');
    errorMessage.appendChild(errorText);
    document.getElementsByClassName('output')[0].appendChild(errorMessage);
}

function testAcceptableRange(guessInput) {
    if (isNaN(guessInput) || guessInput > maxValueInput || guessInput < minValueInput || typeof guessInput !== 'number') {
        errorMessage(guessInput);
        return false;
    } else return true;
}

function clearOutput() {
    // var child = document.getElementsByClassName("output")[0];
    var child = document.getElementsByClassName('output').item(0);
    child.innerHTML = '';
    // TODO clear field on every submission
    minValueInput.value = '';
    maxValueInput.value = '';
    guessValueInput.value = '';
    // var form = document.getElementById("myForm");
    // form.reset();
}



// document.getElementById('idname').addEventListener('blur', functionName, false);