const express = require('express');
const route = express.Router();
const DepartmentController = require('../controllers/DepartmentController.js');

route.get('/getAll',DepartmentController.getDepartments);
route.post('/add',DepartmentController.addDepartment);
module.exports = route