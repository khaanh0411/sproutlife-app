import { useQuery } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings, 
  Trophy, 
  Flame, 
  Target, 
  Coins,
  Star,
  Calendar,
  TrendingUp 
} from "lucide-react";
import { PLANT_LEVELS } from "@/lib/plant-levels";
import type { User as UserType, Achievement } from "@shared/schema";

export default function Profile() {
  const { data: user, isLoading: userLoading } = useQuery<UserType>({
    queryKey: ["/api/user"],
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  if (userLoading || achievementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Unable to load profile data.</p>
      </div>
    );
  }

  const currentPlantLevel = PLANT_LEVELS.find(level => level.level === user.level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Profile</h1>
            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="bg-green-100 text-green-600 text-2xl">
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.username}</h2>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Level {user.level} • {user.levelName}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm">
              {currentPlantLevel?.description || "Growing strong!"}
            </p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{user.xp.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total XP</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{user.coins.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Coins</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{user.currentStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">{user.badgesEarned}</div>
              <div className="text-sm text-gray-600">Badges</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Progress Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-blue-600">{user.totalHabitsCompleted}</div>
                <div className="text-sm text-gray-600">Habits Completed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-purple-600">{achievements.length}</div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plant Growth Levels */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Plant Growth Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {PLANT_LEVELS.map((level) => (
                <div 
                  key={level.level}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    level.level <= user.level 
                      ? "bg-green-50 border border-green-200" 
                      : "bg-gray-50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    level.level === user.level
                      ? "bg-green-500 text-white"
                      : level.level < user.level
                      ? "bg-green-200 text-green-700"
                      : "bg-gray-200 text-gray-500"
                  }`}>
                    {level.level}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      level.level <= user.level ? "text-green-800" : "text-gray-600"
                    }`}>
                      {level.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {level.description}
                    </div>
                  </div>
                  {level.level === user.level && (
                    <Badge variant="default" className="bg-green-500">
                      Current
                    </Badge>
                  )}
                  {level.level < user.level && (
                    <div className="text-green-500">
                      <Trophy className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-amber-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{achievement.title}</div>
                      <div className="text-sm text-gray-600">{achievement.description}</div>
                      <div className="text-xs text-amber-600 font-medium">
                        +{achievement.xpReward} XP
                      </div>
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
