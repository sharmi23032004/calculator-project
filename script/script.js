const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const equalsButton = document.querySelector('[data-action="calculate"]');

let currentOperand = '0';
let previousOperand = '';
let operation = null;


function updateDisplay() {
    currentOperandElement.textContent = currentOperand;

    if(operation != null) {
        previousOperandElement.textContent = `${previousOperand} ${operation}`;
    }
    else {
        previousOperandElement.textContent = previousOperand;
    }
}

function clearCalculator () {
    currentOperand = '0' ;
    previousOperand = '' ;
    operation = null ;
    updateDisplay() ;
}

function deleteNumber() {
    if(currentOperand === '0' || currentOperand === 'Error')
        return;

    if(currentOperand.length === 1) {
        currentOperand = '0';
    }
    else {
        currentOperand = currentOperand.slice(0,-1);
    }

    updateDisplay();
}

function appendNumber(number) {
    if(currentOperand === 'Error') {
        currentOperand = '0';
    }

    if(number === '.' && currentOperand.includes('.')) 
        return;

    if(currentOperand === '0' && number !== '.') {
        currentOperand = number;
    }
    else {
        currentOperand += number;
    }

    updateDisplay();
}

    function chooseOperation(operator) {
        if(currentOperand === 'Error'){
            clearCalculator();
            return;
        }

        if(previousOperand !== ''){
            calculate();
        }

        operation = operator;
        previousOperand = currentOperand;
        currentOperand = '0';
        updateDisplay();
    }

    function calculate () {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
    

    if(isNaN(prev) || isNaN(current))
        return;

    switch(operation) {
        case '+' :
            computation = prev + current ;
            break;
        case '-' :
            computation = prev - current ;
            break;
        case '*' :
            computation = prev * current ;
            break;
        case '/' :
            if(current === 0) {
                currentOperand = 'Error';
                previousOperand = '';
                operation = null;
                updateDisplay();
                return;
            }

            computation = prev / current;
            break;
        case '%' :
            computation = prev % current ;
            break;
        default :
             return;
    }

    computation = Math.round(computation * 100000000) / 100000000;

    currentOperand = computation.toString();
    operation = null;
    previousOperand = '';
    updateDisplay();
}

    numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.getAttribute('data-number'));
    });
});


operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.getAttribute('data-operator'));
    });
});

clearButton.addEventListener('click',clearCalculator);
deleteButton.addEventListener('click',deleteNumber);
equalsButton.addEventListener('click',calculate);

document.addEventListener('keydown', (e) => {
    if(e.key >= '0' && e.key <= '9'){
        appendNumber(e.key);
    }
    if(e.key === '.' || e.key === ',') {
        appendNumber('.');
    }

    if(e.key === '+')
        chooseOperation('+');
    if(e.key === '-')
        chooseOperation('-');
    if(e.key === '*')
        chooseOperation('*');
    if(e.key === '/') {
        e.preventDefault();
        chooseOperation('/');
    }

    if(e.key === '%') 
        chooseOperation('%');

    if(e.key === 'Enter' || e.key === '='){
        e.preventDefault();
        calculate();
    }

    if(e.key === 'Backspace') {
        e.preventDefault();
        deleteNumber();
    }

    if(e.key === 'Escape') {
        clearCalculator();
    }
});

updateDisplay();