import express from 'express';
import { companyLogin, deleteEmployee, deleteUser, getAllEmployees, getAllUsers, getEmployeeCount, registerEmployee } from '../controller/employee.controller.js';

const router = express.Router();

// POST: Register Employee
router.post('/register', registerEmployee);
router.get('/', getAllEmployees);
router.delete('/:id', deleteEmployee);
router.post('/login', companyLogin);
router.get("/count", getEmployeeCount);

// Route to get all users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);


export default router;
