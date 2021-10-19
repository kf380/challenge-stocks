const {Router} = require ('express');
const UserRoutes = require('./User');
const StockRoutes = require('./Stock');
const AuthRoutes = require('./Auth');
const LoginRoutes = require('./Login')
const router = Router();


router.use('/user',UserRoutes);
router.use('/stock',StockRoutes);
router.use('/auth',AuthRoutes);
router.use('/login',LoginRoutes);

module.exports = router;