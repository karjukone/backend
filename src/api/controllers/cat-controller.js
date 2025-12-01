import {addCat, findCatById, listAllCats, modifyCat, removeCat} from '../models/cat-model.js';

const getCat = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(req.params.id);
  if (cat) {
    res.json(cat); 
  } else {
    res.sendStatus(404);
  }
};

const postCat = async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400).json({message: 'File is required'});
  }
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};


const putCat = async (req, res) => {
  const cat = await modifyCat(req.params.id, req.body);
  if (cat) {
    res.status(200).json({message: 'Cat item updated.'});
  } else {
    res.sendStatus(404);
  }
};

const deleteCat = async (req, res) => {
  const cat = await removeCat(req.params.id);
  if (cat) {
    res.status(200).json({message: 'Cat item deleted.'});
  } else {
    res.sendStatus(404);
  }
};

export {getCat, getCatById, postCat, putCat, deleteCat};