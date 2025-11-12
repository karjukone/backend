const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3608,
    name: 'Jane Doe',
    username: 'janedoe',
    email: 'jane@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3607,
    name: 'Little Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems[0].user_id + 1;
  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return {user_id: newId};
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