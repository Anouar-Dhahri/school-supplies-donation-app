import express from 'express';
import {
  create,
  update,
  remove
} from './../controllers/Comments.Controller.js' 

export const router = express.Router();

router.post('/create', create)

router.put('/update/:id', update)

router.delete('/remove/:id', remove)
