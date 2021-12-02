let currentTotal = 0;
let onScreen = "0";
let previousOperator = null;

// variable for replacing the on-screen number with whatever typed number, with the condition: immediately after equals or after on-screen number deleted with backspace to 0
let resetOnScreen = false;

// calculation indicator
let calculationScreen = document.querySelector(".calculation");

const screen = document.querySelector(".result");

function buttonClick(value) {
  if (isNaN(value)) {
    //the value is not number
    handleSymbol(value);
  } else {
    //the value is number
    handleNumber(value);
  }
  screen.innerText = onScreen;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case ".":
      onScreen += ".";
      break;
    case "C":
      onScreen = "0";
      currentTotal = 0;
      calculationScreen.innerText = currentTotal;
      break;
    case "←":
      if (onScreen.length === 1) {
        onScreen = 0;
        resetOnScreen = true;
        return;
      }
      onScreen = onScreen.substring(0, onScreen.length - 1);
      break;
    case "=":
      if (previousOperator === null) {
        return;
      } else {
        calculateOperation(parseFloat(onScreen));
        previousOperator = null;
        onScreen = currentTotal;
        calculationScreen.innerText = currentTotal;
        currentTotal = 0;
        resetOnScreen = true;
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (onScreen === "0") {
    // replace the previous operator with the most recent operator
    previousOperator = symbol;
    // return the function
    return;
  }

  const intOnScreen = parseFloat(onScreen);

  if (currentTotal === 0 && previousOperator === null) {
    currentTotal = intOnScreen;
  } else {
    calculateOperation(intOnScreen);
  }

  // update calculation process
  calculationScreen.innerText = currentTotal;

  previousOperator = symbol;

  onScreen = "0";
}

function calculateOperation(intOnScreen) {
  switch (previousOperator) {
    case "+":
      currentTotal += intOnScreen;
      break;
    case "−":
      currentTotal -= intOnScreen;
      break;
    case "×":
      currentTotal *= intOnScreen;
      break;
    case "÷":
      currentTotal /= intOnScreen;
      break;
  }
}

function handleNumber(numberString) {
  if (onScreen === "0" || resetOnScreen === true) {
    onScreen = numberString;
    resetOnScreen = false;
  } else {
    onScreen += numberString;
  }
}

function init() {
  let button = document.querySelectorAll(".calc-button");
  for (i = 0; i < button.length; i++) {
    button[i].addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
  }
}

init();
