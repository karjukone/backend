import express from 'express';
import {
  getUser,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {authorizeSelf} from '../middlewares/authorization.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter
  .route('/:id').get(getUserById).put(authenticateToken, authorizeSelf, putUser).delete(authenticateToken, authorizeSelf, deleteUser);

export default userRouter;