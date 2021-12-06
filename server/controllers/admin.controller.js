module.exports.getAdmindata = (req, res, next) => {
	try {
		const picAdminUrl = "https://static10.tgstat.ru/channels/_0/15/15e0f5c67b87b751e377b4dbb3c1dc74.jpg"
		return res.status(200).json({ picAdminUrl })
	} catch (error) {
		next(error)
	}
}
