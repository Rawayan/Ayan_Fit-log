export interface Workout {
  id: string | number;
  name: string;
  description: string;
  image: string;
  category: string | string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: number;
  duration: number;
  calories: number;
  rating: number;
  instructions: string[];
}