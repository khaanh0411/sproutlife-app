import { useQuery } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/bottom-navigation";
import { DailyChecklist } from "@/components/daily-checklist";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import type { Habit, Category } from "@shared/schema";

export default function Habits() {
  const { data: habits = [], isLoading: habitsLoading } = useQuery<Habit[]>({
    queryKey: ["/api/habits"],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  if (habitsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Habits</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </Button>
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Daily Checklist */}
        <DailyChecklist habits={habits} categories={categories} />

        {/* Habits by Category */}
        {categories.map((category) => {
          const categoryHabits = habits.filter(h => h.categoryId === category.id);
          
          if (categoryHabits.length === 0) return null;
          
          return (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {category.name} Habits
              </h2>
              <div className="space-y-3">
                {categoryHabits.map((habit) => (
                  <div key={habit.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{habit.title}</h3>
                        {habit.description && (
                          <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
                        )}
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        +{habit.xpReward} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {habits.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No habits yet</h3>
            <p className="text-gray-600 mb-4">
              Start building healthy habits to grow your plant!
            </p>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Habit
            </Button>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
