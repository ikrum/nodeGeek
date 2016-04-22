var express = require('express');
var userController = require('../controllers/userController');

var router = express.Router();


// GET localhost:3000/api/users/
router.get('/', userController.getUsers);

//POST localhost:3000/api/users/
router.post('/', userController.addUser);

//GET localhost:3000/api/users/456
router.get('/:userid', userController.getUser);
router.put('/:userid', userController.updateUser);


module.exports = router;