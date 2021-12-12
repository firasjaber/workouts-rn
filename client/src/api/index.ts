import axios from 'axios';

export const getMuscles = async () => {
  const res = await axios.get('http://localhost:8000/api/muscles/all');
  return res.data.data;
};
