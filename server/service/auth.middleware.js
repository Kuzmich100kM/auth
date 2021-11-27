// Данный (Middleware) отпределяет верифицированный ли пользователь делает запрос.
// (Middleware) принимает с фронта (header).
// Если в нем был (token) -> декодирует его и отправляет данные по юзеру дальше в контроллер
const tokenService = require("../service/token.service")

module.exports = (req, res, next) => {
	const tokenHeader = req.headers.authorization
	console.log(`req.headers`, req.headers)
	if (!tokenHeader) return res.send({ backendErrors: { errors: [{ msg: "You must be logged in" }] } })

	// Get only Token after Bearer
	const accessToken = tokenHeader.replace("Bearer ", "")
	if (!accessToken) return res.send({ backendErrors: { errors: [{ msg: "You must be logged in" }] } })

	const userData = tokenService.validateAccessToken(accessToken)
	console.log(`userData`, userData)
	if (!userData) return res.send({ backendErrors: { errors: [{ msg: "You must be logged in" }] } })

	req.user = userData
	next()
}
