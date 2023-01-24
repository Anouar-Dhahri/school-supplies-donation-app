import express from 'express';
import {   
  findAll,
} from './../controllers/User.Controller.js'

export const router = express.Router();

router.get('/get', findAll)
