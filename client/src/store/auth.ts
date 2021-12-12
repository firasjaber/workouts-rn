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

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const initialState = {
  isAuth: false,
  error: '',
  user: null,
  loading: false,
  authToken: null,
};
const useAuthStore = create((set: any) => ({
  ...initialState,
  signOut: () => set(initialState),
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
    } catch (error: any) {
      const msg = error.response.data.message;
      set({ error: msg, loading: false });
    }
  },
  register: async (body: RegisterData) => {
    try {
      set({ loading: true });
      await axios.post(
        'http://localhost:8000/api/users/register',
        body,
        config
      );
      const { email, password } = body;
      const res: any = await axios.post(
        'http://localhost:8000/api/users/login',
        { email, password },
        config
      );
      set({
        loading: false,
        isAuth: true,
        error: '',
        authToken: res.data.token,
        user: res.data.user,
      });
    } catch (error: any) {
      const msg = error.response.data.message;
      set({ error: msg, loading: false });
    }
  },
}));

export default useAuthStore;
