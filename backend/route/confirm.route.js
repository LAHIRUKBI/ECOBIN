import express from 'express';
import { 
    createConfirmOrder, 
    getConfirmOrders,
    getConfirmOrderById,
    deleteConfirmOrder 
} from '../controller/confirm.controller.js';

const router = express.Router();

// Create new confirmed order
router.post('/confirm', createConfirmOrder);

// Get all confirmed orders
router.get('/confirmed-orders', getConfirmOrders);

// Get single confirmed order by ID
router.get('/confirmed-orders/:orderId', getConfirmOrderById);

// Delete confirmed order
router.delete('/confirmed-orders/:orderId', deleteConfirmOrder);

export default router;
