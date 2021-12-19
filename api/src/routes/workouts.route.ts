import express from 'express';
import {
  createWorkout,
  getAllWorkouts,
  getWorkout,
} from '../controllers/workouts.controller';
const router = express.Router();

router.get('/all', getAllWorkouts);
router.get('/:id', getWorkout);
router.post('/', createWorkout);

export = router;
