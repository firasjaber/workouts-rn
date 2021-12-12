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

export const addExercice = async (req: Request, res: Response) => {
  try {
    await prisma.exercice.create({ data: req.body });
    res
      .status(201)
      .json({ success: true, message: 'Exercice created succefully' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
