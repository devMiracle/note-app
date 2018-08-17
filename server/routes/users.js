var express = require('express');
var router = express.Router();
const UserController = require('../controllers/UsersController');
var JWT_Verify = require('../middlewares/jwt');

/* GET users listing. */
router.post('/register',UserController.register);
router.post('/login', UserController.login);

module.exports = router;
