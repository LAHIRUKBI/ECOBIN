import express from 'express';
import { addReusable, getReusables } from '../controller/reuse.controller.js';

const router = express.Router();

router.post('/add', addReusable);  // Use the controller function instead of the React component
router.get('/list', getReusables);  // Fetch Reusables

export default router;
