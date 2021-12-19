import express from 'express';
import {
  createWorkout,
  getAllWorkouts,
  getWorkout,
} from '../controllers/workouts.controller';
import auth from '../middlewares/auth';
import {
  checkValidationResult,
  createValidationFor,
} from '../utils/validation';
const router = express.Router();

router.get('/all', getAllWorkouts);
router.get('/:id', getWorkout);
router.post(
  '/',
  auth,
  createValidationFor('createWorkout'),
  checkValidationResult,
  createWorkout
);

export = router;
