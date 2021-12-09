import express from 'express';
import workoutsRoute from './routes/workouts.route';
import usersRoute from './routes/users.route';
import exercicesRoute from './routes/exercices.route';
import musclesRoute from './routes/muscles.route';
import cors from 'cors';
const app = express();

//json parser
app.use(cors());
app.use(express.json());

app.use('/api/workouts', workoutsRoute);
app.use('/api/users', usersRoute);
app.use('/api/exercices', exercicesRoute);
app.use('/api/muscles', musclesRoute);

export default app;
