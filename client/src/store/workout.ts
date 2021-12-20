import create from 'zustand';

const useWorkoutStore = create((set: any) => ({
  exercices: [],
  selectedExercices: [],
  name: '',
  muscles: [],
  error: '',
  loading: false,
  setExercices: (exercices: Array<number>) => set({ exercices }),
  setSelectedExercices: (exs: Array<number>) => {
    set({ selectedExercices: exs });
  },
}));

export default useWorkoutStore;
