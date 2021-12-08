import express from 'express';
import workoutRoute from './routes/workouts.route';

const app = express();

app.use('/api/workouts', workoutRoute);

export default app;
