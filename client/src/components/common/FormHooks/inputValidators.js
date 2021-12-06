// Return from the validator (true) or the error text

// Required field
export const isFilled = input => {
	let isCheck = input && input.toString().length > 0
	return !isCheck ? "Required field" : true
}

// Check the number
export const isNumber = input => {
	let isCheck = input != null && !isNaN(input)
	return !isCheck ? "Number only" : true
}

// Integer check
export const isInt = input => {
	let isCheck = input != null && Number.isInteger(+input)
	return !isCheck ? "Integer only" : true
}

// Checking that a number is in a range
export const isNumberRange = (input, min, max) => {
	let isCheck = input != null && !isNaN(input) && input >= min && input <= max
	return !isCheck ? `Number in range ${min}...${max}` : true
}

// Checking if the number is greater than the specified one
export const isNumberMore = (input, min) => {
	let isCheck = input != null && !isNaN(input) && input > min
	return !isCheck ? `Please enter a number greater than ${min}` : true
}

// Checking if the number is less than the specified one
export const isNumberLess = (input, max) => {
	let isCheck = input != null && !isNaN(input) && input < max
	return !isCheck ? `Please enter a number less than ${max}` : true
}

// Checking that characters are not less than the specified one
export const isLengthMore = (input, length) => {
	let isCheck = input && input.toString().trim().length >= length
	return !isCheck ? `At least ${length} characters` : true
}

// Checking that there are no more than the specified characters
export const isLengthLess = (input, length) => {
	let isCheck = input && input.toString().trim().length <= length
	return !isCheck ? `No more than ${length} characters` : true
}

export const isTrue = input => {
	let isCheck = input === true
	return !isCheck ? "Required field" : true
}

// Email validation
export const isEmail = mail => {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	let isCheck = regex.test(mail)
	return !isCheck ? "Enter real mail" : true
}
