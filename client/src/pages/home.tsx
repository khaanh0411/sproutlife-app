import { useQuery } from "@tanstack/react-query";
import { PlantVisualization } from "@/components/plant-visualization";
import { DailyChecklist } from "@/components/daily-checklist";
import { CategoryCard } from "@/components/category-card";
import { AchievementCard } from "@/components/achievement-card";
import { RewardCard } from "@/components/reward-card";
import { GoalCard } from "@/components/goal-card";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Coins, Star, Sprout, User } from "lucide-react";
import { getNextLevel } from "@/lib/plant-levels";
import { TIER_COLORS } from "@/lib/colors";
import type { User as UserType, Category, Habit, Achievement, Goal, Reward } from "@shared/schema";

export default function Home() {
  const { data: user, isLoading: userLoading } = useQuery<UserType>({
    queryKey: ["/api/user"],
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: habits = [], isLoading: habitsLoading } = useQuery<Habit[]>({
    queryKey: ["/api/habits"],
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });

  const { data: goals = [], isLoading: goalsLoading } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  const { data: rewards = [], isLoading: rewardsLoading } = useQuery<Reward[]>({
    queryKey: ["/api/rewards"],
  });

  if (userLoading || categoriesLoading || habitsLoading || achievementsLoading || goalsLoading || rewardsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Sprout!</h1>
          <p className="text-gray-600">Unable to load user data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const { next: nextLevel, progress: progressPercent } = getNextLevel(user.xp);
  const xpToNext = nextLevel.xpRequired - user.xp;
  const availableRewards = rewards.filter(r => r.isAvailable && !r.isClaimed);
  const recentAchievements = achievements
    .sort((a, b) => new Date(b.earnedAt).getTime() - new Date(a.earnedAt).getTime())
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center sprout-glow">
                <Sprout className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Sprout</h1>
                <p className="text-xs text-gray-600">
                  Level {user.level} • {user.levelName}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Coins className="text-amber-500 w-4 h-4" />
                  <span className="text-sm font-semibold text-gray-800">
                    {user.coins.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="text-amber-400 w-3 h-3" />
                  <span className="text-xs text-gray-600">
                    {user.xp.toLocaleString()} XP
                  </span>
                </div>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gray-100">
                  <User className="w-4 h-4 text-gray-600" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Plant Growth Widget */}
        <PlantVisualization
          user={user}
          nextLevelXp={nextLevel.xpRequired}
          xpToNext={xpToNext}
          progressPercent={progressPercent}
        />

        {/* Daily Checklist */}
        <DailyChecklist habits={habits} categories={categories} />

        {/* Category Overview */}
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Recent Achievements */}
        {recentAchievements.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Achievements</h2>
              <Button variant="ghost" size="sm" className="text-green-600">
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {/* Rewards System */}
        {availableRewards.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Rewards Haven</h2>
              <span className="text-sm text-gray-500">
                {availableRewards.length} available
              </span>
            </div>

            {/* Rewards Tiers */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["bronze", "silver", "gold"].map((tier) => {
                const tierColor = TIER_COLORS[tier as keyof typeof TIER_COLORS];
                const coinValues = { bronze: 50, silver: 100, gold: 250 };
                
                return (
                  <div key={tier} className={`rounded-lg p-3 text-center ${tierColor.bg}`}>
                    <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${tierColor.bg}`}>
                      <Coins className={`w-4 h-4 ${tierColor.icon}`} />
                    </div>
                    <div className={`text-sm font-semibold ${tierColor.text}`}>
                      {coinValues[tier as keyof typeof coinValues]} Coins
                    </div>
                    <div className={`text-xs ${tierColor.text} capitalize`}>
                      {tier} Tier
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Available Rewards */}
            <div className="space-y-3">
              {availableRewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
            </div>
          </div>
        )}

        {/* Goals Tracking */}
        {goals.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Goal Tracking</h2>
              <Button variant="ghost" size="sm" className="text-green-600">
                + Add Goal
              </Button>
            </div>
            <div className="space-y-4">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
