const { Router } = require("express");
const {Stock} = require ("../db");
const {getStock} = require ('../controllers/stockControllers.js')
const router = Router();

router.get("/", getStock)


module.exports = router;