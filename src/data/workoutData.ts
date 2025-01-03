import { Exercise, WorkoutWeek } from './types';
import exerciseImages from './imageUrls';

const generateProgressiveWorkouts = (baseExercises: Exercise[]): WorkoutWeek[] => {
  const weeks: WorkoutWeek[] = [];
  
  for (let weekNumber = 1; weekNumber <= 12; weekNumber++) {
    const weekExercises = baseExercises.map(exercise => {
      // Progressive overload: increase reps or weight every 2-3 weeks
      const progressionFactor = Math.floor((weekNumber - 1) / 3);
      const baseReps = exercise.reps;
      
      return {
        ...exercise,
        reps: exercise.requiresWeight 
          ? baseReps // Keep reps stable for weighted exercises
          : baseReps + (progressionFactor * 2), // Increase reps for bodyweight exercises
      };
    });

    weeks.push({
      weekNumber,
      exercises: weekExercises,
    });
  }

  return weeks;
};

// Jump Training Exercises
const jumpExercises: Exercise[] = [
  {
    id: 'squat',
    name: 'Squat',
    description: 'Basic squat movement with proper form',
    sets: 3,
    reps: 10,
    requiresWeight: true,
    restTime: '60s',
    imageUrl: exerciseImages.squat,
    formTips: [
      'Keep chest up and core engaged',
      'Push knees out as you descend',
      'Keep weight in heels',
      'Break at hips and knees simultaneously'
    ],
    commonMistakes: [
      'Knees caving in',
      'Rising onto toes',
      'Rounding lower back',
      'Not reaching proper depth'
    ]
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    description: 'Stand on your toes, then lower back down',
    sets: 3,
    reps: 15,
    requiresWeight: true,
    restTime: '45s',
    imageUrl: exerciseImages.calfRaises,
    formTips: [
      'Rise as high as possible on toes',
      'Lower heels below platform level',
      'Keep legs straight but not locked',
      'Control the movement'
    ],
    commonMistakes: [
      'Not going through full range of motion',
      'Rushing the movement',
      'Bending knees',
      'Not controlling descent'
    ]
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    description: 'Basic jump rope exercise',
    sets: 3,
    reps: 50,
    requiresWeight: false,
    restTime: '60s',
    imageUrl: exerciseImages.jumpRope,
    formTips: [
      'Keep jumps small and quick',
      'Stay on balls of feet',
      'Keep elbows close to body',
      'Look straight ahead'
    ],
    commonMistakes: [
      'Jumping too high',
      'Landing flat-footed',
      'Looking down',
      'Arms too wide'
    ]
  },
  {
    id: 'box-steps',
    name: 'Box Step-Ups',
    description: 'Step up and down from a raised platform',
    sets: 3,
    reps: 12,
    requiresWeight: false,
    restTime: '45s',
    imageUrl: exerciseImages.boxSteps,
    formTips: [
      'Step fully onto box',
      'Drive through heel',
      'Keep chest up',
      'Control the descent'
    ],
    commonMistakes: [
      'Pushing off back foot',
      'Not stepping fully onto box',
      'Leaning forward too much',
      'Dropping quickly off box'
    ]
  }
];

// Stretching Exercises
const stretchingExercises: Exercise[] = [
  {
    id: 'shoulder-rolls',
    name: 'Shoulder Rolls',
    description: 'Roll shoulders forward and backward',
    sets: 2,
    reps: 10,
    requiresWeight: false,
    restTime: '30s',
    imageUrl: exerciseImages.shoulderRolls,
    formTips: [
      'Make circles as large as possible',
      'Keep core engaged',
      'Maintain good posture',
      'Move slowly and controlled'
    ],
    commonMistakes: [
      'Circles too small',
      'Moving too fast',
      'Poor posture',
      'Holding breath'
    ]
  },
  {
    id: 'hip-flexor',
    name: 'Hip Flexor Stretch',
    description: 'Stretch hip flexors while in a lunge position',
    sets: 2,
    reps: 30,
    requiresWeight: false,
    isTimed: true,
    restTime: '30s',
    imageUrl: exerciseImages.hipFlexor,
    formTips: [
      'Keep front knee over ankle',
      'Tuck pelvis under',
      'Keep torso upright',
      'Breathe deeply'
    ],
    commonMistakes: [
      'Arching lower back',
      'Front knee past toes',
      'Leaning forward',
      'Holding breath'
    ]
  },
  {
    id: 'ankle-mobility',
    name: 'Ankle Mobility',
    description: 'Ankle circles and flexion exercises',
    sets: 2,
    reps: 15,
    requiresWeight: false,
    restTime: '30s',
    imageUrl: exerciseImages.ankleMobility,
    formTips: [
      'Move through full range of motion',
      'Keep movements controlled',
      'Do both directions',
      'Keep leg stable'
    ],
    commonMistakes: [
      'Moving too quickly',
      'Limited range of motion',
      'Unstable leg position',
      'Skipping directions'
    ]
  },
  {
    id: 'thoracic-spine',
    name: 'Thoracic Spine Rotation',
    description: 'Rotate upper back while lying on side',
    sets: 2,
    reps: 10,
    requiresWeight: false,
    restTime: '30s',
    imageUrl: exerciseImages.thoracicSpine,
    formTips: [
      'Keep hips stacked',
      'Follow hand with eyes',
      'Move slowly',
      'Breathe steadily'
    ],
    commonMistakes: [
      'Rotating from lower back',
      'Unstacked hips',
      'Moving too quickly',
      'Not following hand'
    ]
  }
];

// Strength Training Exercises
const strengthExercises: Exercise[] = [
  {
    id: 'pushups',
    name: 'Push-Ups',
    description: 'Standard push-up movement',
    sets: 3,
    reps: 10,
    requiresWeight: false,
    restTime: '60s',
    imageUrl: exerciseImages.pushups,
    formTips: [
      'Keep body straight',
      'Hands shoulder-width',
      'Elbows 45 degrees',
      'Full range of motion'
    ],
    commonMistakes: [
      'Sagging hips',
      'Flared elbows',
      'Partial reps',
      'Head forward'
    ]
  },
  {
    id: 'band-pulls',
    name: 'Resistance Band Pulls',
    description: 'Pull resistance band apart at shoulder height',
    sets: 3,
    reps: 12,
    requiresWeight: false,
    restTime: '45s',
    imageUrl: exerciseImages.bandPulls,
    formTips: [
      'Keep shoulders down',
      'Squeeze shoulder blades',
      'Arms parallel to ground',
      'Control return'
    ],
    commonMistakes: [
      'Shrugging shoulders',
      'Arms too high/low',
      'Rushing movement',
      'Poor posture'
    ]
  },
  {
    id: 'dumbbell-rows',
    name: 'Dumbbell Rows',
    description: 'Single-arm dumbbell rows',
    sets: 3,
    reps: 10,
    requiresWeight: true,
    restTime: '60s',
    imageUrl: exerciseImages.dumbbellRows,
    formTips: [
      'Keep back straight',
      'Pull to hip',
      'Control the weight',
      'Stable base'
    ],
    commonMistakes: [
      'Rounding back',
      'Swinging weight',
      'Poor range of motion',
      'Unstable position'
    ]
  },
  {
    id: 'plank',
    name: 'Plank Hold',
    description: 'Hold plank position',
    sets: 3,
    reps: 30,
    requiresWeight: false,
    isTimed: true,
    restTime: '45s',
    imageUrl: exerciseImages.plank,
    formTips: [
      'Straight body line',
      'Engage core',
      'Shoulders down',
      'Look at floor'
    ],
    commonMistakes: [
      'Sagging hips',
      'Raised hips',
      'Shoulders by ears',
      'Head up'
    ]
  }
];

export const workoutData = {
  'vertical-jump': generateProgressiveWorkouts(jumpExercises),
  'stretching': generateProgressiveWorkouts(stretchingExercises),
  'strength': generateProgressiveWorkouts(strengthExercises)
};

export const getWorkoutProgram = (moduleId: string): WorkoutWeek[] => {
  return workoutData[moduleId as keyof typeof workoutData] || workoutData['vertical-jump'];
};
