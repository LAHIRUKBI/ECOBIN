// backend/route/scanner.route.js
import express from 'express';
import multer from 'multer';
import { analyzeWasteImage } from '../controller/scanner.controller.js';

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

const router = express.Router();
router.post('/analyze', upload.single('image'), analyzeWasteImage);

export default router;