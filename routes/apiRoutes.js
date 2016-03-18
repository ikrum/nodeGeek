var express = require('express');
var userController = require('../controllers/userController');

var router = express.Router();


/* GET users listing. */
router.get('/', userController.getUsers);
router.post('/', userController.addUser);

module.exports = router;