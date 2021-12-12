import axios from 'axios';

const config = {
  headers: {
    'content-type': 'application/json',
  },
};

export const getMuscles = async () => {
  const res = await axios.get('http://localhost:8000/api/muscles/all');
  return res.data.data;
};

interface AddExerciceBody {
  name: string;
  youtubeId: string;
  muscleId: number;
}
//export const addExercice = aync
export const addExercice = async (body: AddExerciceBody) => {
  return await axios.post('http://localhost:8000/api/exercices/', body, config);
};
