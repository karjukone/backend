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

const modifyUser = async (id, user) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'sucess'}
};

const removeUser = async (id) => {
  try {
    // first delete cat
    await promisePool.execute(
      'DELETE FROM wsk_cats WHERE owner = ?', [id]
    );
    const [rows] = await promisePool.execute(
      'DELETE FROM wsk_users WHERE user_id = ?', [id]
    );
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  } catch (error) {
    console.error('Error removing user:', error);
    return false;
  }
};


export {listAllUsers, findUserById, addUser, modifyUser, removeUser};