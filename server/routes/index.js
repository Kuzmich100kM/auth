const authRoutes = require("./auth.routes")
const tokenRoutes = require("./token.routes")

module.exports = app => {
	app.use("/", authRoutes)
	//app.use("/api/token", tokenRoutes)
}
