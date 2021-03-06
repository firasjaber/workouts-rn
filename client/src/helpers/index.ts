export const getMusclesFromWorkout = (
  muscles: [{ id: string; name: string }]
) => {
  let res = '';
  muscles.map(
    (muscle: { id: string; name: string }) => (res += muscle.name + ', ')
  );
  return res.slice(0, -2);
};

export const muscles = [
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Core',
];
