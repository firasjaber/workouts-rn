import express from 'express';
import {
  createWorkout,
  getAllWorkouts,
  getWorkout,
} from '../controllers/workouts.controller';
import auth from '../middlewares/auth';
const router = express.Router();

router.get('/all', getAllWorkouts);
router.get('/:id', getWorkout);
router.post('/', auth, createWorkout);

export = router;
