import express from 'express';
import workoutsRoute from './routes/workouts.route';
import usersRoute from './routes/users.route';

const app = express();

//json parser
app.use(express.json());

app.use('/api/workouts', workoutsRoute);
app.use('/api/users', usersRoute);

export default app;
