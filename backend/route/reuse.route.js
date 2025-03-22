import express from 'express';
import { addReusable } from '../controller/reuse.controller.js';

const router = express.Router();

router.post('/add', addReusable);  // Use the controller function instead of the React component

export default router;
