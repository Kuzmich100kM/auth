require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./service/error.middleware")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

require("./routes")(app)
app.use(errorMiddleware)

// This only for builded and deployed app
app.use(express.static("public"))
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/index.html"))
})
;(async () => {
	try {
		await require("./db")()

		app.listen(process.env.PORT, () => {
			console.log(`Server started on port ${process.env.PORT}`)
		})
	} catch (e) {
		console.error(e)
	}
})()
