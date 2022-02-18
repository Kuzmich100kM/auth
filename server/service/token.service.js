const jwt = require("jsonwebtoken")
const AuthModel = require("../models/auth.model")

module.exports.findToken = async refreshToken => await AuthModel.findOne({ refreshToken })

module.exports.removeToken = async refreshToken =>
	await AuthModel.findOneAndUpdate({ refreshToken }, { refreshToken: "" })

module.exports.generateTokens = payload => {
	const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "600s" })
	const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "864000s" })
	return { accessToken, refreshToken }
}

module.exports.saveRefreshToken = async (userId, refreshToken) =>
	await AuthModel.findByIdAndUpdate(userId, { refreshToken }, { new: true })

module.exports.validateAccessToken = token => {
	try {
		return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
	} catch (error) {
		return null
	}
}
module.exports.validateRefreshToken = token => jwt.verify(token, process.env.JWT_REFRESH_SECRET)
