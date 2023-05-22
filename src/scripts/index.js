import './../styles/index.scss';

let [operand1, operand2] = [0, null];
let unary = undefined;

const keyBoard = document.querySelector('.calc__keyboard');

const actionElem = document.querySelector('.calc__what');
actionElem.textContent = String(+operand1);

const calcField = document.querySelector('.calc__field');
calcField.textContent = operand1;

keyBoard.addEventListener('click', e => {
	// Первое число
	if (
		e.target.closest('.calc__button') &&
		unary === undefined &&
		operand2 === null &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
			e.target.closest('.calc__button').textContent.trim()
		)
	) {
		operand1 = String(operand1) + e.target.textContent;

		actionElem.textContent = String(+operand1);
	}

	// Унарный
	else if (
		e.target.closest('.calc__button') &&
		['+', '-', '/', '%', '*'].includes(
			e.target.closest('.calc__button').dataset.unary
		) &&
		operand2 === null
	) {
		unary = e.target.closest('.calc__button').dataset.unary;

		actionElem.textContent = `${
			actionElem.textContent.split(' ')[0]
		} ${unary} `;
	}
	// Второе число
	else if (
		unary !== undefined &&
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+e.target.textContent) &&
		e.target.closest('.calc__button') &&
		e.target.closest('.calc__button').textContent !==
			'\n\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t'
	) {
		console.log(22);
		operand2 = String(+operand2) + e.target.textContent;

		actionElem.textContent = `${
			actionElem.textContent.split(' ')[0]
		} ${unary} ${+operand2}`;
	}
	// ====
	else if (
		e.target.textContent.trim() === '=' &&
		operand2 !== null &&
		unary !== undefined
	) {
		equally();
	}
	// Полнный сброс
	else if (e.target.textContent.trim() === 'C') {
		fullReset();
	}
	// Неполный сброс
	else if (e.target.textContent.trim() === 'CE') {
		lastReset();
	}
	// Если продолжать
	else if (
		unary !== undefined &&
		operand2 !== null &&
		e.target.closest('.calc__button') &&
		['+', '-', '/', '%', '*'].includes(
			e.target.closest('.calc__button').dataset.unary
		)
	) {
		equally();
		unary = e.target.closest('.calc__button').dataset.unary;
		actionElem.textContent = `${operand1} ${unary} `;
	}
});

function operation(key) {
	switch (key) {
		case '+':
			return +operand1 + +operand2;
			break;
		case '-':
			return +operand1 - +operand2;
			break;
		case '/':
			return +operand1 / +operand2;
			break;
		case '*':
			return +operand1 * +operand2;
			break;
		case '%':
			return +operand1 % +operand2;
			break;
	}
}

function equally() {
	actionElem.textContent = String(operation(unary));
	calcField.textContent = operation(unary);
	operand1 = operation(unary);
	operand2 = null;
	unary = undefined;
}

function fullReset() {
	actionElem.textContent = String(0);
	operand1 = 0;
	operand2 = null;
	unary = undefined;
	calcField.textContent = operand1;
}

function lastReset() {
	actionElem.textContent = actionElem.textContent.split(' ')[0];
	operand2 = null;
	unary = undefined;
}
