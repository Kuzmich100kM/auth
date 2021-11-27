class CustomError extends Error {
	constructor(status = 500, message, errors = []) {
		super(message)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, CustomError)
		}
		this.status = status
		this.errors = errors
	}

	// static BadRequest(message, errors = []) {
	// 	return new CustomError(400, message, errors)
	// }

	// static UnauthorizedError() {
	// 	return new CustomError(401, "Failed to authenticate")
	// }

	// static Forbidden() {
	// 	return new CustomError(403, "Does not have access permission")
	// }

	// static NotFound() {
	// 	return new CustomError(404, "The requested resource does not exist")
	// }
}

module.exports = CustomError
