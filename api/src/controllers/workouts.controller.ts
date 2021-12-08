import { Request, Response } from 'express';
import prisma from '../database/prisma';

export const getAllWorkouts = async (req: Request, res: Response) => {
  const workouts = await prisma.workout.findMany();
  res.status(200).json({ success: true, data: workouts });
};
