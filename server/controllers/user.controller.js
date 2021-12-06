module.exports.getDashboard = async (req, res, next) => {
	try {
		const picUrl = "https://cdn.javarush.ru/images/article/6a8c0181-8bbe-442e-b040-c74c62501986/800.jpeg"
		return res.status(200).json({ picUrl })
	} catch (error) {
		next(error)
	}
}
