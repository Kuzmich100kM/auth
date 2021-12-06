const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const CustomError = require("../service/errorResponse")
const tokenService = require("../service/token.service")
const mailservice = require("../service/mail.service")
const AuthModel = require("../models/auth.model")
const UserModel = require("../models/user.model")

module.exports.registration = async (req, res, next) => {
	try {
		const { email, password } = req.body

		// Сheck the user for uniqueness
		const checkEmail = await AuthModel.findOne({ email })
		if (checkEmail) throw new CustomError(400, `User ${email} already exists`)

		// Hash password
		const salt = await bcrypt.genSalt()
		const hashPass = await bcrypt.hash(password, salt)

		// Create Activation link
		const activationLink = uuid.v4()

		// Create User in DB Auth collections
		const user = await AuthModel.create({ email, password: hashPass, activationLink })
		const { _id: userId, roles, isActivated } = user

		// Create User in DB User collections
		// All other user information will be saved here
		await UserModel.create({ userId })

		// Send activation mail
		await mailservice.sendActivationMail(email, `${process.env.API_URL}/activation/${activationLink}`)

		// Create tokens and save
		const { accessToken, refreshToken } = tokenService.generateTokens({ userId, roles })
		await tokenService.saveRefreshToken(userId, refreshToken)

		// Send to browser authData and RefreshToken to browser cookie
		res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // if use https-> {secure: true}
		return res.status(200).json({ userId, email, roles, isActivated, accessToken })
	} catch (err) {
		next(err)
	}
}

module.exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		// Сheck user by email
		const user = await AuthModel.findOne({ email })
		if (!user) throw new CustomError(401, "Wrong login or password")
		const { _id: userId, password: hashedPass, roles, isActivated } = user

		// Check password by compare with hashed password
		const checkPass = await bcrypt.compare(password, hashedPass)
		if (!checkPass) throw new CustomError(401, "Wrong login or password")

		//Create new tokens and save
		const { accessToken, refreshToken } = tokenService.generateTokens({ userId, roles })
		await tokenService.saveRefreshToken(userId, refreshToken)

		// Send to browser authData and RefreshToken to browser cookie
		res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // if use https-> {secure: true}
		return res.status(200).json({ userId, email, roles, isActivated, accessToken })
	} catch (error) {
		next(error)
	}
}

module.exports.logout = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies

		// Remove RefreshToken from db Auth Collection
		const token = await tokenService.removeToken(refreshToken)

		// Remove RefreshToken from Browsers cookie
		res.clearCookie("refreshToken")
		return res.status(200).json(token)
	} catch (error) {
		next(error)
	}
}

module.exports.refresh = async (req, res, next) => {
	try {
		const token = req.cookies.refreshToken
		if (!token) throw new CustomError(401, "Failed to authenticate")

		const checkToken = tokenService.validateRefreshToken(token)
		if (!checkToken) throw new CustomError(401, "Failed to authenticate")

		const tokenFromDb = await tokenService.findToken(token)
		if (!tokenFromDb) throw new CustomError(401, "Failed to authenticate")
		const { _id: userId, email, roles, isActivated } = tokenFromDb

		// Cretate new tokens with users data
		const { accessToken, refreshToken } = tokenService.generateTokens({ userId, roles })
		await tokenService.saveRefreshToken(userId, refreshToken)

		// Send to browser authData and RefreshToken to browser cookie
		res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) // if use https-> {secure: true}
		return res.status(200).json({ userId, email, roles, isActivated, accessToken })
	} catch (error) {
		next(error)
	}
}

module.exports.activation = async (req, res, next) => {
	try {
		const activationLink = req.params.link

		// Check Activation link
		const user = await AuthModel.findOneAndUpdate(
			{ activationLink },
			{ isActivated: true, activationLink: "" },
			{ new: true }
		)

		if (!user) throw new CustomError(400, "Invalid activation link")

		return res.redirect(process.env.CLIENT_URL)
	} catch (err) {
		next(err)
	}
}

// Fake controler for demonstration up to Admin
module.exports.changeRole = async (req, res, next) => {
	try {
		const { userId, newRole } = req.body

		let resp = await AuthModel.findByIdAndUpdate(userId, { roles: newRole }, { new: true })
		return res.status(200).json(resp)
	} catch (error) {
		next(error)
	}
}
