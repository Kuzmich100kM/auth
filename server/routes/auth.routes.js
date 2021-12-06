const router = require("express").Router()
const controller = require("../controllers/auth.controller")

router.post("/login", controller.login)
router.post("/logout", controller.logout)
router.post("/registration", controller.registration)
router.get("/activation/:link", controller.activation)
router.get("/refreshtoken", controller.refresh)

router.post("/changerole", controller.changeRole)

module.exports = router
