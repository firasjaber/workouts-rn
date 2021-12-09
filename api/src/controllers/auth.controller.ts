import { Request, Response, NextFunction } from 'express';
import bcryptjs from 'bcryptjs';
import prisma from '../database/prisma';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, firstName, lastName, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return res.status(401).json({
        message: 'User already exits.',
        success: false,
      });
    }

    bcryptjs.hash(password, 10, async (hashError, hash) => {
      if (hashError) {
        return res.status(500).json({
          message: hashError.message,
          error: hashError,
        });
      }
      let _user = {
        email,
        firstName,
        lastName,
        password: hash,
      };

      await prisma.user.create({ data: _user });

      return res.status(201).json({
        message: 'User Created',
        user: _user,
        success: true,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
/*
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid Credentials',
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid Credentials',
        success: false,
      });
    }

    signJWT(user, (_error, token) => {
      if (_error) throw _error;
      if (token) {
        return res.status(200).json({
          message: 'Authentication Successful',
          token,
          user,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};
*/
