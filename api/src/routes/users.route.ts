import express from 'express';
import {
  getAllUsers,
  loginUser,
  registerUser,
} from '../controllers/users.controller';
const router = express.Router();

router.get('/all', getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);

export = router;
