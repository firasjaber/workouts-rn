import create from 'zustand';

const useAuthStore = create((set: any) => ({
  isAuth: false,
  signIn: () => set({ isAuth: true }),
}));

export default useAuthStore;
