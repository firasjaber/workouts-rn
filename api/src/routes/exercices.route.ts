import express from 'express';
import { getAllExercices } from '../controllers/exercices.controller';
const router = express.Router();

router.get('/all', getAllExercices);

export = router;
