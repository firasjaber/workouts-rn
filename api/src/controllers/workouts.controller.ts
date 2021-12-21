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

interface createWorkoutBody {
  name: string;
  muscles: number[];
  exercices: number[];
  userId: number;
}

export const createWorkout = async (req: Request, res: Response) => {
  try {
    const { name, muscles, exercices, userId }: createWorkoutBody = req.body;
    const musclesFormatted: Array<{ id: number }> = muscles.map(
      (id: number) => {
        const formatted: { id: number } = { id };
        return formatted;
      }
    );
    const exercicesFormatted: Array<{ id: number }> = exercices.map(
      (id: number) => {
        const formatted: { id: number } = { id };
        return formatted;
      }
    );
    await prisma.workout.create({
      data: {
        name,
        User: { connect: { id: res.locals.user.id } },
        muscles: { connect: musclesFormatted },
        exercices: { connect: exercicesFormatted },
      },
    });
    res
      .status(201)
      .json({ succes: true, message: 'Workout created succesfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'internal error' });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!workout) {
      return res.status(400).json({
        success: false,
        message: `Workout with id = ${req.params.id} not found`,
      });
    }
    await prisma.workout.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res
      .status(201)
      .json({ success: true, message: 'Workout deleted succefully' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};
