// Reference to the display element
const display = document.getElementById('display');

// Store the user input as a string
let expression = '';

/**
 * Updates the calculator screen
 * If the expression is empty, show '0'
 */
function updateDisplay() {
  display.textContent = expression || '0';
}

/**
 * Adds a digit or decimal to the expression
 * @param {string} num - The digit or '.' to add
 */
function appendNumber(num) {
  expression += num;
  updateDisplay();
}

/**
 * Adds an operator (+, -, *, /, %) to the expression
 * Ensures no two operators are added in a row
 * @param {string} op - The operator to add
 */
function appendOperator(op) {
  if (expression === '') return;

  const lastChar = expression.slice(-1);
  if ('+-*/%'.includes(lastChar)) {
    // Replace last operator if one already exists
    expression = expression.slice(0, -1);
  }
  expression += op;
  updateDisplay();
}

/**
 * Clears the entire expression and display
 */
function clearDisplay() {
  expression = '';
  updateDisplay();
}

/**
 * Deletes the last character from the expression
 */
function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

/**
 * Calculates the result using eval
 * Handles percentage by converting to division
 */
function calculate() {
  try {
    // Convert % to division by 100 before evaluating
    const result = eval(expression.replace('%', '/100'));
    expression = result.toString();
    updateDisplay();
  } catch {
    // If there's a syntax error or invalid input
    display.textContent = 'Error';
    expression = '';
  }
}

/**
 * Adds keyboard support for better UX
 */
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Allow numeric and decimal input
  if (/\d/.test(key)) {
    appendNumber(key);
  } else if (key === '.') {
    appendNumber(key);
  }
  // Allow basic operators
  else if (['+', '-', '*', '/', '%'].includes(key)) {
    appendOperator(key);
  }
  // Calculate result with Enter
  else if (key === 'Enter') {
    event.preventDefault(); // prevent accidental form submits
    calculate();
  }
  // Backspace to delete last entry
  else if (key === 'Backspace') {
    deleteLast();
  }
  // Escape to clear all
  else if (key === 'Escape') {
    clearDisplay();
  }
});
