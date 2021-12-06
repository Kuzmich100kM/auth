const { model, Schema } = require("mongoose")

const authSchema = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	refreshToken: { type: String },
	roles: { type: Array, default: ["user"] },
	isActivated: { type: Boolean, default: false },
	activationLink: { type: String },
})

module.exports = model("Auth", authSchema)
