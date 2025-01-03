export interface SetData {
  reps: number;
  weight?: number;
}

export interface WorkoutLog {
  date: string;
  exerciseId: string;
  sets: SetData[];
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  requiresWeight: boolean;
  isTimed?: boolean;
  restTime: string;
  imageUrl?: string;
  videoUrl?: string;
  formTips?: string[];
  commonMistakes?: string[];
}

export interface WorkoutWeek {
  weekNumber: number;
  exercises: Exercise[];
}
