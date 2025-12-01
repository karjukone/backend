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

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE username = ?',
    [username]
  );
  if (rows.length === 0) return false;
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

const modifyUser = async (id, user, authUser) => {
  try {
    let sql;
    if (authUser.role && authUser.role === 'admin') {
      sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [user, id]);
    } else if (authUser) {
      sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ? AND user_id = ?`, [user, id, authUser.user_id]);
    } else {
      return false;
    }
    const rows = await promisePool.execute(sql);
    //console.log('rows', rows);
    if (rows[0].affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  } catch (err) {
    console.error(err);
    return false;
  }
};

const removeUser = async (id, authUser) => {
  try {
    if (!(authUser.role && authUser.role === 'admin') && String(authUser.user_id) !== String(id)) {
      return false;
    }
 
    await promisePool.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);

    let result;
    if (authUser && authUser.role && authUser.role === 'admin') {
      result = await promisePool.execute('DELETE FROM wsk_users WHERE user_id = ?', [id]);
    } else {
      result = await promisePool.execute('DELETE FROM wsk_users WHERE user_id = ? AND user_id = ?', [id, authUser.user_id]);
    }
    const rows = result[0];
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return {message: 'success'};
  } catch (error) {
    console.error('Error;', error);
    return false;
  }
};


export {listAllUsers, findUserById, addUser, modifyUser, removeUser, findUserByUsername};