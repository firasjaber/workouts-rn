import { Request, Response } from 'express';
import prisma from '../database/prisma';

export const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workout.findMany({
      include: { muscles: true },
    });
    return res.status(200).json({ success: true, data: workouts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'internal error' });
  }
};

export const getWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { exercices: true, muscles: true },
    });
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: `Workout with id = ${req.params.id} not found`,
      });
    }
    return res.status(200).json({ status: 'success', data: workout });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'internal error' });
  }
};
