import { Request, Response } from 'express';
import prisma from '../database/prisma';

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workout.findMany({
      include: { muscles: true },
    });
    res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'internal error' });
  }
};
