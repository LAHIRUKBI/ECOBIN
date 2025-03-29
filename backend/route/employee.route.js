import express from 'express';
import { companyLogin, deleteEmployee, deleteUser, getAllEmployees, getEmployeeById, getEmployeeCount, registerEmployee, updateEmployee } from '../controller/employee.controller.js';

const router = express.Router();

// POST: Register Employee
router.post('/register', registerEmployee);
router.get('/', getAllEmployees);
router.delete('/:id', deleteEmployee);
router.post('/login', companyLogin);
router.get("/count", getEmployeeCount);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);


// Route to get all users
router.delete('/users/:id', deleteUser);


export default router;
