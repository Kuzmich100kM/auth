// Из валидатора возвращаем (true) или текст ошибки

// Обязательное поле
export const isFilled = input => {
	let isCheck = input && input.toString().length > 0
	return !isCheck ? "Обязательное поле" : true
}

// Проверка на число
export const isNumber = input => {
	let isCheck = input != null && !isNaN(input)
	return !isCheck ? "Только число" : true
}

// Проверка на целое число
export const isInt = input => {
	let isCheck = input != null && Number.isInteger(+input)
	return !isCheck ? "Только целое число" : true
}

// Проверка, что число в диапазоне
export const isNumberRange = (input, min, max) => {
	let isCheck = input != null && !isNaN(input) && input >= min && input <= max
	return !isCheck ? `Число в диапазоне ${min}...${max}` : true
}

// Проверка, что число больше указанного
export const isNumberMore = (input, min) => {
	let isCheck = input != null && !isNaN(input) && input > min
	return !isCheck ? `Введите число больше ${min}` : true
}

// Проверка, что число меньше указанного
export const isNumberLess = (input, max) => {
	let isCheck = input != null && !isNaN(input) && input < max
	return !isCheck ? `Введите число меньше ${max}` : true
}

// Проверка, что символов не меньше указанного
export const isLengthMore = (input, length) => {
	let isCheck = input && input.toString().trim().length >= length
	return !isCheck ? `Не меньше ${length} символов` : true
}

// Проверка, что символов не больше указанного
export const isLengthLess = (input, length) => {
	let isCheck = input && input.toString().trim().length <= length
	return !isCheck ? `Не больше ${length} символов` : true
}

export const isTrue = input => {
	let isCheck = input === true
	return !isCheck ? "Обязательное поле" : true
}

// Валидация email
export const isEmail = mail => {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	let isCheck = regex.test(mail)
	return !isCheck ? "Укажите реальную почту" : true
}
