import express from 'express';
import {   
    Dashboard
} from './../controllers/Dashboard.Controller.js';

export const router = express.Router();

router.get('/get/:id', Dashboard)