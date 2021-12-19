import create from 'zustand';

const initialState = {
  exercices: [],
  name: '',
  muscles: [],
};

const useWorkoutStore = create((set: any) => ({
  exercices: [],
  selectedExercices: [],
  name: '',
  muscles: [],
  setExercices: (exercices: Array<number>) => set({ exercices }),
  setSelectedExercices: (exs: Array<number>) => {
    set({ selectedExercices: exs });
  },
}));

export default useWorkoutStore;
