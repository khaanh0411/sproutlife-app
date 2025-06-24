import { useQuery } from "@tanstack/react-query";
import { BottomNavigation } from "@/components/bottom-navigation";
import { RewardCard } from "@/components/reward-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Gift, Star } from "lucide-react";
import { TIER_COLORS } from "@/lib/colors";
import type { User, Reward } from "@shared/schema";

export default function RewardsPage() {
  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: rewards = [], isLoading: rewardsLoading } = useQuery<Reward[]>({
    queryKey: ["/api/rewards"],
  });

  if (userLoading || rewardsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Unable to load rewards data.</p>
      </div>
    );
  }

  const availableRewards = rewards.filter(r => r.isAvailable && !r.isClaimed);
  const claimedRewards = rewards.filter(r => r.isClaimed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Rewards</h1>
            <div className="flex items-center space-x-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-gray-800">{user.coins}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6 pb-20">
        {/* Coin Balance */}
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{user.coins.toLocaleString()}</div>
            <div className="text-gray-600">Available Coins</div>
          </CardContent>
        </Card>

        {/* Reward Tiers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-500" />
              Reward Tiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
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
          </CardContent>
        </Card>

        {/* Available Rewards */}
        {availableRewards.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Gift className="w-5 h-5 mr-2 text-green-500" />
                Available Rewards ({availableRewards.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {availableRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Claimed Rewards */}
        {claimedRewards.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Claimed Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {claimedRewards.map((reward) => (
                  <RewardCard key={reward.id} reward={reward} />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {rewards.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No rewards yet</h3>
              <p className="text-gray-600">
                Keep completing habits to earn coins and unlock rewards!
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
