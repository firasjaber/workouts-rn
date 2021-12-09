import create from 'zustand';

const useAuthStore = create((set: any) => ({
  isAuth: false,
  signIn: () => set({ isAuth: true }),
  signOut: () => set({ isAuth: false }),
}));

export default useAuthStore;
