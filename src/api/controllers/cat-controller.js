import {addCat, findCatById, listAllCats, modifyCat, removeCat} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res, next) => {
  const cat = await findCatById(req.params.id);
  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }
  res.json(cat);
};

const postCat = async (req, res, next) => {
  // check if file is rejected by multer
  if (!req.file) {
    const error = new Error('Invalid or missing file');
    error.status = 400;
    next(error);
  }
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  if (result.error) {
    return next(new Error(result.error));
  }
  res.status(201).json({message: 'New media item added.', ...result});
};


const putCat = async (req, res, next) => {
  const authUser = res.locals.user;
  const cat = await modifyCat(req.params.id, req.body, authUser);
  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'Cat item updated.'});
};

const deleteCat = async (req, res, next) => {
  const authUser = res.locals.user;
  const cat = await removeCat(req.params.id, authUser);
  if (!cat) {
    const error = new Error('Cat not found');
    error.status = 404;
    return next(error);
  }
  res.status(200).json({message: 'Cat item deleted.'});
};

export {getCat, getCatById, postCat, putCat, deleteCat};