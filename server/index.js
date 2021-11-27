require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./service/error.middleware")
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

require("./routes")(app)
app.use(errorMiddleware)
;(async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
		})
		console.log(`MongoDb connected`)
		app.listen(process.env.PORT, () => console.log(`Start server on port ${process.env.PORT}`))
	} catch (e) {
		console.error(e)
	}
})()
