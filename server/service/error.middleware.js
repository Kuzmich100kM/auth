const CustomError = require("./errorResponse")

const errorMiddleware = (err, req, res, next) => {
	if (err instanceof CustomError) {
		return res.status(err.status).json({ message: err.message, errors: err.errors })
	}
	return res.status(500).json({ message: "Internal Server Error" })
}

module.exports = errorMiddleware
