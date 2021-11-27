const uuid = require("uuid")
const bcrypt = require("bcrypt")
const AuthModel = require("../models/auth.model")
const tokenService = require("./token.service")
const mailService = require("./mail.service")
const CustomError = require("./errorResponse")
const UserModel = require("../models/user.model")

// module.exports.register = async (email, password) => {
// 	try {
// 		// Сheck the user for uniqueness
// 		const checkEmail = await AuthModel.findOne({ email }, "email").exec()
// 		if (checkEmail) throw CustomError(`User ${email} already exists`)

// 		// Hash password
// 		const salt = await bcrypt.genSalt()
// 		const hashPass = await bcrypt.hash(password, salt)

// 		// Create Activation link
// 		const activationLink = uuid.v4()

// 		// const auth = new AuthModel({ _id: new mongoose.Types.ObjectId(), email, password: hashPass, activationLink })
// 		// auth.save(err => {
// 		// 	if (err) return console.log("error auth.save", err)

// 		// 	const user = new UserModel({ userId: auth._id })
// 		// 	user.save(err => {
// 		// 		if (err) return console.log("error user.save", err)
// 		// 	})
// 		// })
// 		// const { _id: userId, role } = auth

// 		// Create User in DB (auth & user collections)
// 		const { _id: userId, role } = await AuthModel.create({ email, password: hashPass, activationLink })
// 		await UserModel.create({ userId })

// 		// Send activation mail
// 		//await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activation/${activationLink}`)

// 		// Create tokens and save
// 		const { accessToken, refreshToken } = tokenService.generateTokens({ userId, role })
// 		await tokenService.saveRefreshToken(userId, refreshToken)

// 		return { accessToken, refreshToken, userId, role, email, activationLink }
// 	} catch (error) {
// 		console.log(err)
// 	}
// }

// module.exports.activate = async activationLink => {
// 	// Check Activation link
// 	const user = await AuthModel.findOne({ activationLink })
// 	if (!user) throw CustomError.badRequest("Некорректная ссылка активации")

// 	user.isActivated = true
// 	await user.save()
// }

// module.exports.login = async (email, password) => {
// 	console.log(`email, password`, email, password)
// 	// Сheck user by email
// 	const user = await AuthModel.findOne({ email })
// 	if (!user) throw CustomError.badRequest("Неверный логин или пароль")
// 	const { _id: id, password: hashedPass, isActivated } = user

// 	// Check password by compare with hashed password
// 	const checkPass = await bcrypt.compare(password, hashedPass)
// 	console.log(`user`, user)
// 	console.log(`checkPass`, checkPass)
// 	if (!user || !checkPass) throw CustomError.badRequest("Неверный логин или пароль")

// 	//Create tokens and save
// 	const { accessToken, refreshToken } = tokenService.generateTokens({ id, email, isActivated })
// 	console.log(`accessToken refreshtokenTC`, accessToken, refreshToken)
// 	await tokenService.saveRefreshToken(id, refreshToken)

// 	return { id, email, isActivated, accessToken, refreshToken }
// }

// module.exports.logout = async refreshToken => {
// 	const token = await tokenService.removeToken(refreshToken)
// 	return token
// }

// module.exports.refresh = async token => {
// 	if (!token) throw CustomError(401, "Failed to authenticate")

// 	const checkToken = tokenService.validateRefreshToken(token)
// 	const tokenFronDb = await tokenService.findToken(token)
// 	if (!checkToken || !tokenFronDb) throw CustomError(401, "Failed to authenticate")

// 	// Get users data for token
// 	const { _id: id, email, isActivated } = await AuthModel.findById(checkToken.id)

// 	// Cretate new tokens with users data
// 	const { accessToken, refreshToken } = tokenService.generateTokens({ id, email, isActivated })
// 	await tokenService.saveRefreshToken(id, refreshToken)

// 	return { id, email, isActivated, accessToken, refreshToken }
// }

module.exports.getAllUsers = async () => {
	const users = AuthModel.find()
	return users
}
