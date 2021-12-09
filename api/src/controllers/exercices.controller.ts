import { Request, Response } from 'express';
import prisma from '../database/prisma';

export const getAllExercices = async (req: Request, res: Response) => {
  try {
    const exercices = await prisma.exercice.findMany();
    res.status(200).json({ success: true, data: exercices });
  } catch (error) {
    res.status(500).json({ success: false, message: 'internal error' });
  }
};
