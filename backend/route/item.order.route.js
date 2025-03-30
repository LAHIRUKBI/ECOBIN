import express from 'express';
import { 
    createItemOrder, 
    deleteItemOrder, 
    getAllItemOrders, 
} from '../controller/item.order.controller.js';

const router = express.Router();

// Create a new item order
router.post('/', createItemOrder);

// Get all item orders
router.get('/', getAllItemOrders);

// Delete an item order by ID
router.delete('/:id', deleteItemOrder);
export default router;