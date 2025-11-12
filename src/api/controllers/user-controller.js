import {addUser, findUserById, listAllUsers, modifyUser, removeUser} from '../models/user-model.js';


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
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  const user = modifyUser(req.params.id, req.body);
  if (user) {
    res.status(200).json({message: 'User updated.'});
  } else {
    res.sendStatus(404);
  }
};

const deleteUser = (req, res) => {
  const user = removeUser(req.params.id);
  if (user) {
    res.status(200).json({message: 'User deleted.'});
  } else {
    res.sendStatus(404);
  }
};

export {getUser, getUserById, postUser, putUser, deleteUser};