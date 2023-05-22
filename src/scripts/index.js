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
	// Точка с запятой - 1
	else if (
		!String(operand1).includes('.') &&
		e.target.closest('.calc__button') &&
		e.target.closest('.calc__button').textContent === ',' &&
		unary === undefined
	) {
		operand1 = String(operand1) + '.';
		actionElem.textContent = actionElem.textContent + '.';
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

		actionElem.textContent = `${+actionElem.textContent.split(
			' '
		)[0]} ${unary} `;
	}

	// Второе число
	else if (
		unary !== undefined &&
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+e.target.textContent) &&
		e.target.closest('.calc__button') &&
		e.target.closest('.calc__button').textContent !==
			'\n\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\t\n\t\t\t\t\t\n\t\t\t\t'
	) {
		operand2 === null
			? (operand2 = String(+operand2) + e.target.textContent)
			: (operand2 = String(operand2) + e.target.textContent);

		actionElem.textContent = `${+actionElem.textContent.split(
			' '
		)[0]} ${unary} ${String(+operand2)}`;
	}
	// Точка с запятой - 2
	else if (
		!String(operand2).includes('.') &&
		e.target.closest('.calc__button') &&
		e.target.closest('.calc__button').textContent === ',' &&
		unary !== undefined
	) {
		operand2 = String(+operand2) + '.';
		actionElem.textContent = `${+actionElem.textContent.split(
			' '
		)[0]} ${unary} ${String(+operand2 + '.')}`;
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
	if (String(operand1).split('.').length > 1) {
		operand1 = (+operand1).toFixed(
			String(operand1).split('.')[1].length
		);
	}
	if (String(operand2).split('.').length > 1) {
		operand2 = (+operand2).toFixed(
			String(operand2).split('.')[1].length
		);
	}
	switch (key) {
		case '+':
			{
				const maxLength = Math.max(
					operand1.toString().split('.')[1]?.length || 0,
					operand2.toString().split('.')[1]?.length || 0
				);
				const multiplier = Math.pow(10, maxLength);
				return (
					(operand1 * multiplier + operand2 * multiplier) / multiplier
				);
			}
			break;
		case '-':
			{
				const maxLength = Math.max(
					operand1.toString().split('.')[1]?.length || 0,
					operand2.toString().split('.')[1]?.length || 0
				);
				const multiplier = Math.pow(10, maxLength);
				return (
					(operand1 * multiplier - operand2 * multiplier) / multiplier
				);
			}
			break;
		case '/':
			{
				const maxLength = Math.max(
					operand1.toString().split('.')[1]?.length || 0,
					operand2.toString().split('.')[1]?.length || 0
				);
				const multiplier = Math.pow(10, maxLength);
				return (operand1 * multiplier) / (operand2 * multiplier);
			}
			break;
		case '*':
			{
				const maxLength = Math.max(
					operand1.toString().split('.')[1]?.length || 0,
					operand2.toString().split('.')[1]?.length || 0
				);
				const multiplier = Math.pow(10, maxLength);
				return (
					(operand1 * multiplier * (operand2 * multiplier)) /
					(multiplier * multiplier)
				);
			}
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
