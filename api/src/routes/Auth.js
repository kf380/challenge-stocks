const { Router } = require("express");
const {User} = require ("../db");
const {authLogin} = require ('../controllers/authControllers.js')

const { check } = require("express-validator");
const { validateInputs } = require("../middlewares/validate-input");

const router = Router();

router.post('/', authLogin);


module.exports = router;