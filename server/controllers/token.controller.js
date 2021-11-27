module.exports.refresh = async (req, res, next) => {
	try {
	} catch (err) {
		next(err)
	}
}

module.exports.activate = async (req, res, next) => {
	try {
		res.json([123, "asd6"])
	} catch (err) {
		next(err)
	}
}
