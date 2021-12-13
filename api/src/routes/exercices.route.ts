import express from 'express';
import {
  addExercice,
  deleteExercice,
  getAllExercices,
} from '../controllers/exercices.controller';
import {
  checkValidationResult,
  createValidationFor,
} from '../utils/validation';
const router = express.Router();

router.get('/all', getAllExercices);
router.post(
  '/',
  createValidationFor('addExercice'),
  checkValidationResult,
  addExercice
);
router.delete('/:id', deleteExercice);

export = router;
