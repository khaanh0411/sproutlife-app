import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Trophy, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/lib/colors";
import type { Habit, Category } from "@shared/schema";

interface DailyChecklistProps {
  habits: Habit[];
  categories: Category[];
}

export function DailyChecklist({ habits, categories }: DailyChecklistProps) {
  const queryClient = useQueryClient();
  const [showXpGain, setShowXpGain] = useState<{ id: number; xp: number } | null>(null);

  const updateHabitMutation = useMutation({
    mutationFn: async ({ id, isCompleted }: { id: number; isCompleted: boolean }) => {
      const response = await apiRequest("PATCH", `/api/habits/${id}`, { isCompleted });
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/habits"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      
      if (variables.isCompleted) {
        // Show XP gain animation
        const habit = habits.find(h => h.id === variables.id);
        if (habit) {
          setShowXpGain({ id: variables.id, xp: habit.xpReward });
          setTimeout(() => setShowXpGain(null), 3000);
        }
      }
    },
  });

  const completedHabits = habits.filter(h => h.isCompleted).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  const getCategoryInfo = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return { name: "Unknown", color: CATEGORY_COLORS.health };
    
    const colorKey = category.color as keyof typeof CATEGORY_COLORS;
    return {
      name: category.name,
      color: CATEGORY_COLORS[colorKey] || CATEGORY_COLORS.health,
    };
  };

  const handleHabitToggle = (habitId: number, isCompleted: boolean) => {
    updateHabitMutation.mutate({ id: habitId, isCompleted });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Today's Growth Tasks</h2>
        <span className="text-sm text-green-600 font-medium">
          {completedHabits}/{totalHabits} completed
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={completionRate} className="h-2" />
      </div>

      {/* XP Gain Notification */}
      {showXpGain && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
        >
          <Trophy className="w-4 h-4" />
          <span>+{showXpGain.xp} XP earned!</span>
        </motion.div>
      )}

      {/* Habits List */}
      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No habits for today. Add some to start growing!</p>
          </div>
        ) : (
          habits.map((habit) => {
            const categoryInfo = getCategoryInfo(habit.categoryId);
            return (
              <motion.div
                key={habit.id}
                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                  habit.isCompleted
                    ? `${categoryInfo.color.bg} ${categoryInfo.color.border}`
                    : "hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Checkbox
                  checked={habit.isCompleted}
                  onCheckedChange={(checked) => handleHabitToggle(habit.id, !!checked)}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <span 
                    className={`text-gray-800 ${
                      habit.isCompleted ? "line-through opacity-75" : ""
                    }`}
                  >
                    {habit.title}
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${categoryInfo.color.bg} ${categoryInfo.color.text}`}>
                      {categoryInfo.name}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center space-x-1">
                      <Coins className="w-3 h-3" />
                      <span>+{habit.xpReward} XP</span>
                    </span>
                  </div>
                </div>
                {habit.isCompleted && (
                  <Trophy className="w-5 h-5 text-amber-500" />
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
