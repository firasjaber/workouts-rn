import { Request, Response } from 'express';
import prisma from '../database/prisma';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'internal error' });
  }
};
