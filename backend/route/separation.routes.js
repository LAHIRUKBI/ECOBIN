import express from 'express';
import { 
  createSeparation, 
  getSeparations, 
  getSeparationStats 
} from '../controller/separation.controller.js';

const router = express.Router();

// Create new separation record
router.post('/', createSeparation);

// Get all separation records
router.get('/', getSeparations);

// Get separation statistics
router.get('/stats', getSeparationStats);

export default router; 