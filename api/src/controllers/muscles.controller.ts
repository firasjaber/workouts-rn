import { Request, Response } from 'express';
import prisma from '../database/prisma';

export const getAllMuscles = async (req: Request, res: Response) => {
  try {
    const muscles = await prisma.muscle.findMany();
    return res.status(200).json({ success: true, data: muscles });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'internal error' });
  }
};
