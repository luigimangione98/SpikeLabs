import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WorkoutWeek, WorkoutLog } from '../data/types';
import { getWorkoutProgram } from '../data/workoutData';

interface SetData {
  reps: number;
  weight?: number;
}

const TrainingModule = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [currentWeek, setCurrentWeek] = useState<WorkoutWeek | null>(null);
  const [setData, setSetData] = useState<{ [key: string]: SetData }>({});
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<string | null>(null);

  useEffect(() => {
    if (moduleId) {
      const program = getWorkoutProgram(moduleId);
      setCurrentWeek(program[0]); // Start with week 1

      // Load existing logs
      const savedLogs = localStorage.getItem(`${moduleId}-logs`);
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    }
  }, [moduleId]);

  const handleInputChange = (exerciseId: string, field: keyof SetData, value: number) => {
    setSetData(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        [field]: value
      }
    }));
  };

  const isWeightlessExercise = (exerciseName: string): boolean => {
    const weightlessExercises = ['Jump Rope', 'Box Step-Ups', 'Plank Hold'];
    return weightlessExercises.includes(exerciseName);
  };

  const isTimedExercise = (exerciseName: string): boolean => {
    return exerciseName === 'Plank Hold';
  };

  const saveWorkoutLog = (exerciseId: string) => {
    const data = setData[exerciseId] || { reps: 0 };
    const newLog: WorkoutLog = {
      date: new Date().toISOString(),
      exerciseId,
      sets: [data]
    };

    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem(`${moduleId}-logs`, JSON.stringify(updatedLogs));

    // Show confirmation message
    setShowConfirmation(exerciseId);
    setTimeout(() => setShowConfirmation(null), 3000);

    // Clear input fields after logging
    setSetData(prev => {
      const updated = { ...prev };
      delete updated[exerciseId];
      return updated;
    });
  };

  if (!currentWeek || !moduleId) {
    return <div>Loading...</div>;
  }

  const getModuleName = (id: string) => {
    switch (id) {
      case 'vertical-jump':
        return 'Jump Training';
      case 'stretching':
        return 'Stretching';
      case 'strength':
        return 'Strength Training';
      default:
        return 'Training Module';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2C5784]">
            {getModuleName(moduleId)} - Week {currentWeek.weekNumber}
          </h1>
        </div>

        <div className="space-y-6">
          {currentWeek.exercises.map((exercise) => (
            <div key={exercise.id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#2C5784] mb-2 md:mb-0">
                  {exercise.name}
                </h3>
                <span className="text-gray-600">
                  {exercise.sets} sets × {exercise.reps} {isTimedExercise(exercise.name) ? 'seconds' : 'reps'}
                </span>
              </div>

              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 order-2 md:order-1">
                  <p className="text-gray-600 mb-4">{exercise.description}</p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {exercise.formTips && exercise.formTips.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium text-[#2C5784]">Form Tips</h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          {exercise.formTips.map((tip, index) => (
                            <li key={index} className="text-gray-600">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {exercise.commonMistakes && exercise.commonMistakes.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium text-[#FF8E3C]">
                          Common Mistakes to Avoid
                        </h4>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-[#FF8E3C]">
                          {exercise.commonMistakes.map((mistake, index) => (
                            <li key={index}>{mistake}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {exercise.imageUrl && (
                  <div className="w-full md:w-64 h-64 flex-shrink-0 rounded-lg overflow-hidden shadow-lg order-1 md:order-2 mb-4 md:mb-0">
                    <img
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
              </div>

              {/* Workout Logger */}
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium mb-3 text-lg text-[#2C5784]">Log Your Set</h4>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex gap-4 flex-wrap">
                    <input
                      type="number"
                      placeholder={isTimedExercise(exercise.name) ? "Time (seconds)" : "Reps"}
                      value={setData[exercise.id]?.reps || ''}
                      onChange={(e) => handleInputChange(exercise.id, 'reps', Number(e.target.value))}
                      className="border rounded px-3 py-2 w-32 focus:ring-2 focus:ring-[#2C5784] focus:border-transparent"
                      min="0"
                    />
                    {!isWeightlessExercise(exercise.name) && (
                      <input
                        type="number"
                        placeholder="Weight (lbs)"
                        value={setData[exercise.id]?.weight || ''}
                        onChange={(e) => handleInputChange(exercise.id, 'weight', Number(e.target.value))}
                        className="border rounded px-3 py-2 w-32 focus:ring-2 focus:ring-[#2C5784] focus:border-transparent"
                        min="0"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => saveWorkoutLog(exercise.id)}
                    className="bg-[#2C5784] text-white px-6 py-2 rounded-lg hover:bg-[#1f3f61] transition-colors duration-300 flex items-center w-full sm:w-auto justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Log Set
                  </button>
                </div>
                {showConfirmation === exercise.id && (
                  <div className="mt-2 text-green-600 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Set logged successfully!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;
