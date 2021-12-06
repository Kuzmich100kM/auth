const router = require("express").Router()
const controller = require("../controllers/admin.controller")

router.get("/panel", controller.getAdmindata)

module.exports = router
