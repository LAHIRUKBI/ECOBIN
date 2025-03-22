import express from 'express';
import { confirmOrder, getConfirmedOrders } from '../controller/confirm.controller.js';

const router = express.Router();

router.post('/confirm', confirmOrder);
router.get('/confirmed-orders', getConfirmedOrders);

export default router;
