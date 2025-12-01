import {addUser, findUserById, listAllUsers, modifyUser, removeUser} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUser = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const result = await findUserById(req.params.id);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const authUser = res.locals.user;
  if (!authUser) return res.sendStatus(401);
  // allow admin or the user 
  if (!(authUser.role === 'admin' || String(authUser.user_id) === String(req.params.id))) {
    return res.status(403).json({message: 'forbidden'});
  }

  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  const user = await modifyUser(req.params.id, req.body, authUser);
  if (user) {
    res.status(200).json({message: 'User updated.'});
  } else {
    res.sendStatus(404);
  }
};

const deleteUser = async (req, res) => {
  const authUser = res.locals.user;
  if (!authUser) return res.sendStatus(401);
  if (!(authUser.role === 'admin' || String(authUser.user_id) === String(req.params.id))) {
    return res.status(403).json({message: 'forbidden'});
  }
  const user = await removeUser(req.params.id, authUser);
  if (user) {
    res.status(200).json({message: 'User deleted.'});
  } else {
    res.sendStatus(404);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};