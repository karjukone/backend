import {addUser, findUserById, listAllUsers, modifyUser, removeUser} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res, next) => {
  const result = await findUserById(req.params.id);
  if (!result) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  res.json(result);
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  res.status(201);
  res.json({message: 'New user added.', result});
};

const putUser = async (req, res, next) => {
  const authUser = res.locals.user;
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const user = await modifyUser(req.params.id, req.body, authUser);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'User updated.'});
};

const deleteUser = async (req, res, next) => {
  const authUser = res.locals.user;
  const user = await removeUser(req.params.id, authUser);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'User deleted.'});
};

export {getUser, getUserById, postUser, putUser, deleteUser};