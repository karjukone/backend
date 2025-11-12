import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';

// mini mini express sovellus
const router = express.Router();

// bind base url for all cat routes to catRouter
router.use('/cats', catRouter);

// bind base url for all cat routes to userRouter
router.use('/users', userRouter);

export default router;