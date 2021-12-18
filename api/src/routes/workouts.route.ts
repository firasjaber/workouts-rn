import express from 'express';
import { getAllWorkouts, getWorkout } from '../controllers/workouts.controller';
const router = express.Router();

router.get('/all', getAllWorkouts);
router.get('/:id', getWorkout);

export = router;
