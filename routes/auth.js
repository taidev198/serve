const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController.js');

router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
router.post('/update',AuthController.update);
router.post('/delete',AuthController.deleteUser);
router.post('/department/get/',AuthController.getUserOfDepart);

module.exports = router;