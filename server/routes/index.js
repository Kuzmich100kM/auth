const authRoutes = require("./auth.routes")
const adminRoutes = require("./admin.routes")
const userRoutes = require("./user.routes")
const authMiddleware = require("../service/accessToken.middleware")

module.exports = app => {
	// Auth Server
	app.use("/auth", authRoutes)

	// Other Service Servers
	app.use("/admin", authMiddleware, adminRoutes)
	app.use("/u", authMiddleware, userRoutes)
}
