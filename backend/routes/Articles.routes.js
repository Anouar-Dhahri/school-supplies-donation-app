import express from 'express';
import {   
  findAll,
  findMine,
  create,
  update,
  status,
  remove 
} from './../controllers/Articles.Controller.js'

//import { upload } from '../helpers/file.helper.js';

export const router = express.Router();

router.get('/get', findAll)

router.get('/get/:id', findMine)

router.post('/create', create)

router.put('/update/:id', update)

router.put('/status/:id', status)

router.delete('/remove/:id', remove)