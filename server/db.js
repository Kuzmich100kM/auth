const mongoose = require("mongoose")

module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log(`MongoDb connected`)
	} catch (e) {
		console.error(`Error with MongoDb connection, ${e.message}`)
	}
}
