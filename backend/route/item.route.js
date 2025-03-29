import express from 'express';
import { addItem, getItem, updateItem, deleteItem,getItemById } from '../controller/item.controller.js';

const router = express.Router();

router.post('/', addItem);
router.get('/', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);
router.get('/:id', getItemById);


export default router;
