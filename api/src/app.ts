import express from 'express';
import workoutRoute from './routes/workouts.route';

const app = express();

//json parser
app.use(express.json());

app.use('/api/workouts', workoutRoute);

export default app;
