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

export const deleteExercice = async (req: Request, res: Response) => {
  try {
    const exercice = await prisma.exercice.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!exercice) {
      return res.status(400).json({
        success: false,
        message: `Exercice with id = ${req.params.id} not found`,
      });
    }
    await prisma.exercice.delete({ where: { id: parseInt(req.params.id) } });
    return res
      .status(201)
      .json({ success: true, message: 'Exercice deleted succefully' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

export const getExercice = async (req: Request, res: Response) => {
  try {
    const exercice = await prisma.exercice.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { Workout: true, muscle: true },
    });
    if (!exercice) {
      return res.status(404).json({
        success: false,
        message: `Exercice with id = ${req.params.id} not found`,
      });
    }
    return res.status(200).json({ status: 'success', data: exercice });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'internal error' });
  }
};
