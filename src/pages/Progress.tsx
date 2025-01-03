import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { WorkoutLog } from '../data/types';

interface ExerciseProgress {
  date: string;
  reps: number;
  weight?: number;
  time?: number;
}

interface ModuleStats {
  totalSets: number;
  lastWorkout: string;
  improvement: number;
}

const Progress = () => {
  const [selectedModule, setSelectedModule] = useState<string>('vertical-jump');
  const [exerciseData, setExerciseData] = useState<{ [key: string]: ExerciseProgress[] }>({});
  const [moduleStats, setModuleStats] = useState<{ [key: string]: ModuleStats }>({});

  const loadProgressData = () => {
    const modules = ['vertical-jump', 'stretching', 'strength'];
    const allStats: { [key: string]: ModuleStats } = {};
    const allExerciseData: { [key: string]: ExerciseProgress[] } = {};

    modules.forEach(moduleId => {
      const savedLogs = localStorage.getItem(`${moduleId}-logs`);
      if (savedLogs) {
        const logs: WorkoutLog[] = JSON.parse(savedLogs);
        
        // Calculate module stats
        const lastWorkout = logs.length > 0 
          ? formatFullDate(logs[logs.length - 1].date)
          : 'No workouts yet';
        
        // Group logs by exercise
        const exerciseGroups: { [key: string]: WorkoutLog[] } = {};
        logs.forEach(log => {
          if (!exerciseGroups[log.exerciseId]) {
            exerciseGroups[log.exerciseId] = [];
          }
          exerciseGroups[log.exerciseId].push(log);
        });

        // Calculate improvement
        let totalImprovement = 0;
        Object.entries(exerciseGroups).forEach(([exerciseId, exerciseLogs]) => {
          if (exerciseLogs.length >= 2) {
            const firstLog = exerciseLogs[0].sets[0];
            const lastLog = exerciseLogs[exerciseLogs.length - 1].sets[0];
            
            // Calculate improvement based on weight if available, otherwise use reps
            if (lastLog.weight && firstLog.weight) {
              const improvement = ((lastLog.weight - firstLog.weight) / firstLog.weight) * 100;
              totalImprovement += improvement;
            } else {
              const improvement = ((lastLog.reps - firstLog.reps) / firstLog.reps) * 100;
              totalImprovement += improvement;
            }
          }
        });

        allStats[moduleId] = {
          totalSets: logs.length,
          lastWorkout,
          improvement: Object.keys(exerciseGroups).length > 0 
            ? totalImprovement / Object.keys(exerciseGroups).length 
            : 0
        };

        // Process exercise data for charts
        Object.entries(exerciseGroups).forEach(([exerciseId, logs]) => {
          allExerciseData[exerciseId] = logs.map(log => ({
            date: formatDate(log.date),
            reps: log.sets[0].reps,
            weight: log.sets[0].weight,
            time: exerciseId.includes('plank') ? log.sets[0].reps : undefined
          }));
        });
      }
    });

    setModuleStats(allStats);
    setExerciseData(allExerciseData);
  };

  useEffect(() => {
    loadProgressData();
  }, [selectedModule, loadProgressData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const modules = [
    { id: 'vertical-jump', name: 'Jump Training' },
    { id: 'stretching', name: 'Stretching' },
    { id: 'strength', name: 'Strength' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Your Progress</h1>

        {/* Module Selection */}
        <div className="flex space-x-4 mb-8">
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => setSelectedModule(module.id)}
              className={`px-6 py-3 rounded-lg transition-colors ${
                selectedModule === module.id
                  ? 'bg-[#FF8E3C] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {module.name}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        {moduleStats[selectedModule] && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-gray-400 mb-2">Total Sets</h3>
              <p className="text-3xl font-bold">{moduleStats[selectedModule].totalSets}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-gray-400 mb-2">Last Workout</h3>
              <p className="text-3xl font-bold">{moduleStats[selectedModule].lastWorkout}</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-gray-400 mb-2">Average Improvement</h3>
              <p className="text-3xl font-bold">
                {moduleStats[selectedModule].improvement.toFixed(1)}%
              </p>
            </div>
          </div>
        )}

        {/* Progress Charts */}
        <div className="space-y-8">
          {Object.entries(exerciseData).map(([exerciseId, data]) => {
            if (data.length === 0) return null;

            const hasWeight = data.some(d => d.weight !== undefined);
            const isTimedExercise = data[0].time !== undefined;

            return (
              <div key={exerciseId} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">{exerciseId.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#9CA3AF"
                      />
                      <YAxis 
                        yAxisId="left"
                        stroke="#9CA3AF"
                        label={{ 
                          value: isTimedExercise ? 'Seconds' : 'Reps',
                          angle: -90,
                          position: 'insideLeft',
                          style: { fill: '#9CA3AF' }
                        }}
                      />
                      {hasWeight && (
                        <YAxis 
                          yAxisId="right"
                          orientation="right"
                          stroke="#9CA3AF"
                          label={{ 
                            value: 'Weight (lbs)',
                            angle: 90,
                            position: 'insideRight',
                            style: { fill: '#9CA3AF' }
                          }}
                        />
                      )}
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          border: 'none',
                          borderRadius: '0.5rem',
                          color: '#fff'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey={isTimedExercise ? 'time' : 'reps'}
                        name={isTimedExercise ? 'Time' : 'Reps'}
                        stroke="#FF8E3C" 
                        strokeWidth={2}
                        dot={{ fill: '#FF8E3C' }}
                        yAxisId="left"
                      />
                      {hasWeight && (
                        <Line 
                          type="monotone" 
                          dataKey="weight"
                          name="Weight"
                          stroke="#60A5FA"
                          strokeWidth={2}
                          dot={{ fill: '#60A5FA' }}
                          yAxisId="right"
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Data Message */}
        {Object.keys(exerciseData).length === 0 && (
          <div className="text-center py-12">
            <svg 
              className="w-16 h-16 mx-auto text-gray-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-400">No workout data yet</h3>
            <p className="text-gray-500 mt-2">Complete some workouts to see your progress here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
