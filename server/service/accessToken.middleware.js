// Данный (Middleware) отпределяет верифицированный ли пользователь делает запрос.
// (Middleware) принимает с фронта (header) и валидирует (access token)
// Если токен валидный -> отправляет данные по юзеру дальше в контроллер
const tokenService = require("./token.service")
const CustomError = require("./errorResponse")

module.exports = (req, res, next) => {
	const tokenHeader = req.headers.authorization
	if (!tokenHeader) throw new CustomError(401, "You must be logged in")

	// Get only Token after Bearer
	const accessToken = tokenHeader.replace("Bearer ", "")
	if (!accessToken) throw new CustomError(401, "You must be logged in")

	const userData = tokenService.validateAccessToken(accessToken)
	if (!userData) throw new CustomError(401, "You must be logged in")

	req.user = userData
	next()
}
