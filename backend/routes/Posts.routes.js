import express from 'express';
import { 
  create,
  findAll,
  findMine,
  findComments,
  update,
  remove
} from '../controllers/Posts.Controller.js';

export const router = express.Router();

router.get('/get', findAll)

router.get('/get/:id', findMine)

router.get('/comments/:id', findComments)

router.post('/create', create)

router.put('/update/:id', update)

router.delete('/remove/:id', remove)