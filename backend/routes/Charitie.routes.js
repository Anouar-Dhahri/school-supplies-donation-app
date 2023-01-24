import express from 'express';
import { 
  create,
  findAll,
  findMine,
  update,
  remove
} from '../controllers/Charitie.Controller.js';

export const router = express.Router();

router.get('/get', findAll)

router.get('/get/:id', findMine)

router.post('/create', create)

router.put('/update/:id', update)

router.delete('/remove/:id', remove)