import './../styles/index.scss';

let [operand1, operand2] = [0, 0];
let firstFilled = false;
let unary = undefined;

const keyBoard = document.querySelector('.calc__keyboard');

keyBoard.addEventListener('click', e => {
	// Первое число
	if (
		firstFilled === false &&
		unary === undefined &&
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
			e.target.closest('.calc__button').textContent.trim()
		)
	) {
		console.log('Ввели 1 число');
		operand1 += e.target.textContent;
	}

	// Унарный
	else if (
		['+', '-', '/', '%', '*'].includes(
			e.target.closest('.calc__button').dataset.unary
		) &&
		operand1 !== 0
	) {
		console.log('Унарный');
		firstFilled = true;
		unary = e.target.closest('.calc__button').dataset.unary;
	}
	// Второе число
	else if (
		firstFilled === true &&
		unary !== undefined &&
		[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+e.target.textContent)
	) {
		console.log('Ввели 2 число');
		operand2 += e.target.textContent;
	}
	// ====
	else if (
		e.target.textContent.trim() === '=' &&
		firstFilled === true &&
		operand1 !== 0 &&
		operand2 !== 0
	) {
		console.log('Резултат', operation(unary));
		operand1 = operation(unary);
		operand2 = 0;
		unary = undefined;
	}
	// Если продолжаем
	// else if () {}
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
			return +operand1 / +operand2;
			break;
		case '%':
			return +operand1 % +operand2;
			break;
	}
}
