import express from 'express';
import { getAllMuscles } from '../controllers/muscles.controller';
const router = express.Router();

router.get('/all', getAllMuscles);

export = router;
