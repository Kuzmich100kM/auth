const { model, Schema } = require("mongoose")

const userSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "Auth" },
})

module.exports = model("User", userSchema)
