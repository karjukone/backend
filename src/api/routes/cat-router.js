import express from 'express';
import {
  getCat,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
import {authenticateToken} from '../middlewares/authentication.js';
import {authorizeOwner} from '../middlewares/authorization.js';
const upload = multer({dest: 'uploads/'});

const catRouter = express.Router();

catRouter.route('/').get(getCat).post(upload.single('file'), postCat);

catRouter
  .route('/:id').get(getCatById).put(authenticateToken, authorizeOwner, putCat).delete(authenticateToken, authorizeOwner, deleteCat);

export default catRouter;
