import { motion } from "framer-motion";
import { PLANT_LEVELS } from "@/lib/plant-levels";
import type { User } from "@shared/schema";

interface PlantVisualizationProps {
  user: User;
  nextLevelXp: number;
  xpToNext: number;
  progressPercent: number;
}

export function PlantVisualization({ user, nextLevelXp, xpToNext, progressPercent }: PlantVisualizationProps) {
  const PlantStage = ({ level }: { level: number }) => {
    switch (level) {
      case 1: // Seed
        return (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-3 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full" />
          </div>
        );
      case 2: // Sprout
        return (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-4 bg-gradient-to-t from-green-700 to-green-500 rounded-full" />
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-gradient-to-br from-green-400 to-green-600 rounded-full" />
          </div>
        );
      case 3: // Root
        return (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-6 bg-gradient-to-t from-green-700 to-green-500 rounded-full" />
            <div className="absolute -top-2 -left-2 w-4 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform rotate-12" />
          </div>
        );
      case 4: // Shoot
        return (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-8 bg-gradient-to-t from-green-700 to-green-500 rounded-full" />
            <div className="absolute -top-2 -left-3 w-6 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform rotate-12 animate-gentle-bounce" />
            <div className="absolute -top-1 -right-2 w-4 h-3 bg-gradient-to-br from-green-300 to-green-500 rounded-full transform -rotate-12" />
          </div>
        );
      case 5: // Leaf
        return (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-10 bg-gradient-to-t from-green-700 to-green-500 rounded-full" />
            <div className="absolute -top-3 -left-4 w-8 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform rotate-12" />
            <div className="absolute -top-2 -right-3 w-6 h-4 bg-gradient-to-br from-green-300 to-green-500 rounded-full transform -rotate-12" />
            <div className="absolute -top-6 -left-2 w-4 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full" />
          </div>
        );
      default:
        return (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-8 bg-gradient-to-t from-green-700 to-green-500 rounded-full" />
            <div className="absolute -top-2 -left-3 w-6 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform rotate-12 animate-gentle-bounce" />
            <div className="absolute -top-1 -right-2 w-4 h-3 bg-gradient-to-br from-green-300 to-green-500 rounded-full transform -rotate-12" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 to-green-100/30 pointer-events-none" />
      <div className="relative z-10">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Growth Journey</h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-green-600">Level {user.level}</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-lg text-gray-600">{user.levelName}</span>
          </div>
        </div>
        
        {/* Plant Visualization */}
        <motion.div 
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-32 h-32 mx-auto relative">
            {/* Pot */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-full border-2 border-amber-700" />
            {/* Soil */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-amber-800 to-amber-900 rounded-full" />
            {/* Plant */}
            <PlantStage level={user.level} />
            {/* Growth sparkles */}
            <motion.div 
              className="absolute top-4 left-8 w-2 h-2 bg-amber-300 rounded-full"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute top-8 right-6 w-1 h-1 bg-green-300 rounded-full"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* XP Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{user.xp.toLocaleString()} XP</span>
            <span>{nextLevelXp.toLocaleString()} XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {xpToNext.toLocaleString()} XP to next level
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-lg font-bold text-green-600">{user.currentStreak}</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <div className="text-lg font-bold text-amber-600">{user.badgesEarned}</div>
            <div className="text-xs text-gray-600">Badges</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-600">{user.totalHabitsCompleted}</div>
            <div className="text-xs text-gray-600">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
