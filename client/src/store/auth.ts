import axios from 'axios';
import create from 'zustand';

const config = {
  headers: {
    'content-type': 'application/json',
  },
};

interface LoginData {
  email: string;
  password: string;
}

const useAuthStore = create((set: any) => ({
  isAuth: false,
  error: '',
  user: null,
  loading: false,
  authToken: null,
  signIn: () => set({ isAuth: true }),
  signOut: () => set({ isAuth: false }),
  betaLogin: async (body: LoginData) => {
    try {
      set({ loading: true });
      const res: any = await axios.post(
        'http://localhost:8000/api/users/login',
        body,
        config
      );
      set({
        loading: false,
        isAuth: true,
        error: '',
        authToken: res.data.token,
        user: res.data.user,
      });
      console.log(res.data);
    } catch (error: any) {
      const msg = error.response.data.message;
      set({ error: msg, loading: false });
    }
  },
}));

export default useAuthStore;
