const authRoutes = require("./auth.routes")
const adminRoutes = require("./admin.routes")
const userRoutes = require("./user.routes")

module.exports = app => {
	app.use("/auth", authRoutes)
	app.use("/admin", adminRoutes)
	app.use("/u", userRoutes)
}
