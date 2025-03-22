import express from 'express';
import { addReusable, deleteItem, getReusables, updateItem } from '../controller/reuse.controller.js';

const router = express.Router();

router.post('/add', addReusable);  // Use the controller function instead of the React component
router.get('/list', getReusables);  // Fetch Reusables
router.delete('/delete/:id', deleteItem);
router.put('/update/:id', updateItem);

export default router;
