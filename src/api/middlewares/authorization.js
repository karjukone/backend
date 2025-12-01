import {findCatById} from '../models/cat-model.js';

const authorizeOwner = async (req, res, next) => {
  // require authenticated user
  if (!res.locals.user) {
    return res.sendStatus(401);
  }

  const catId = req.params.id;
  try {
    const cat = await findCatById(catId);
    if (!cat) return res.sendStatus(404);
    // compare owner id from DB with user id from token
    // admins bypass owner check
    if (res.locals.user.role && res.locals.user.role === 'admin') {
      return next();
    }
    if (String(cat.owner) !== String(res.locals.user.user_id)) {
      return res.status(403).json({message: 'forbidden'});
    }
    next();
  } catch (err) {
    console.error('authorizeOwner error', err);
    res.sendStatus(500);
  }
};

const authorizeSelf = (req, res, next) => {
  if (!res.locals.user) return res.sendStatus(401);
  // admins may act on any user
  if (res.locals.user.role && res.locals.user.role === 'admin') return next();
  if (String(res.locals.user.user_id) !== String(req.params.id)) {
    return res.status(403).json({message: 'forbidden'});
  }
  next();
};

export {authorizeOwner, authorizeSelf};
