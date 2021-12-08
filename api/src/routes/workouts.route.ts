import express from 'express';
import { getAllWorkouts } from '../controllers/workouts.controller';
const router = express.Router();

router.get('/all', getAllWorkouts);

export = router;
