import express from 'express';
import {
  getAllUsers,
  loginUser,
  registerUser,
} from '../controllers/users.controller';
import {
  checkValidationResult,
  createValidationFor,
} from '../utils/validation';
const router = express.Router();

router.get('/all', getAllUsers);
router.post(
  '/register',
  createValidationFor('register'),
  checkValidationResult,
  registerUser
);
router.post(
  '/login',
  createValidationFor('login'),
  checkValidationResult,
  loginUser
);

export = router;
