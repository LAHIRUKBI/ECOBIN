import express from 'express';
import { confirmOrder, deleteConfirmedOrder, getConfirmedOrders } from '../controller/confirm.controller.js';

const router = express.Router();

router.post('/confirm', confirmOrder);
router.get('/confirmed-orders', getConfirmedOrders);
router.delete('/confirmed-orders/:orderId', deleteConfirmedOrder);

export default router;
