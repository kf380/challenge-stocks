const { Router } = require("express");
const {User} = require ("../db");
const {createUser,getUser} = require ('../controllers/userControllers.js')
const router = Router();

router.post("/", createUser)
router.get("/", getUser)


module.exports = router;