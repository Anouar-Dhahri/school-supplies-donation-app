import express from 'express';
import { Signup, Signin, Profile } from './../controllers/Admin.Controller.js';

export const router = express.Router();

router.post('/signup', Signup);

router.post('/signin', Signin);

router.put('/profile/:id', Profile);