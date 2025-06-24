import { useQuery } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/bottom-navigation";
import { CategoryCard } from "@/components/category-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Trophy, Flame } from "lucide-react";
import type { User, Category, Achievement } from "@shared/schema";

export default function ProgressPage() {
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  if (userLoading || categoriesLoading || achievementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Unable to load progress data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Progress</h1>
            <BarChart3 className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Overall Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{user.level}</div>
              <div className="text-sm text-gray-600">Current Level</div>
              <div className="text-xs text-green-600 font-medium">{user.levelName}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-gray-800">{user.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
              <div className="text-xs text-orange-600 font-medium">Keep going!</div>
            </CardContent>
          </Card>
        </div>

        {/* XP Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Experience Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Current XP</span>
                <span className="font-medium">{user.xp.toLocaleString()}</span>
              </div>
              <Progress value={75} className="h-3" />
              <div className="text-xs text-gray-500 text-center">
                Growing strong! Keep completing habits to level up.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Progress */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Category Progress</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-amber-500" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-600">{achievements.length}</div>
                <div className="text-xs text-gray-600">Total Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{user.totalHabitsCompleted}</div>
                <div className="text-xs text-gray-600">Habits Done</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{user.coins}</div>
                <div className="text-xs text-gray-600">Coins</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
