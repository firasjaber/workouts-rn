import axios from 'axios';
import create from 'zustand';

const config = {
  headers: {
    'content-type': 'application/json',
  },
};

const useAuthStore = create((set: any) => ({
  isAuth: false,
  signIn: () => set({ isAuth: true }),
  signOut: () => set({ isAuth: false }),
  betaLogin: async () => {
    try {
      const res = await axios.post(
        'http://localhost:8000/api/users/login',
        { email: 'jhon@doe', password: '1234567' },
        config
      );
      console.log(res);
    } catch (error: any) {
      console.log(error.response.data);
    }
  },
}));

export default useAuthStore;
