import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  const result = await promisePool.execute(sql, params);
  console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {user_id: result[0].insertId};
};

const modifyUser = (id, user) => {
  const {name, username, email, role, password} = user;
  const foundUser = userItems.find((item) => item.user_id == id);
  if (foundUser) {
    Object.assign(foundUser, {
      name,
      username,
      email,
      role,
      password,
    });
    return foundUser;
  }
  return null;
};

const removeUser = (id) => {
  const index = userItems.findIndex((item) => item.user_id == id);
  if (index !== -1) {
    const removedUser = userItems.splice(index, 1);
    return removedUser[0];
  }
  return null;
};
export {listAllUsers, findUserById, addUser, modifyUser, removeUser};