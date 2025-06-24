import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Coffee, Dumbbell, Gift, Star, Trophy, Coins } from "lucide-react";
import { TIER_COLORS } from "@/lib/colors";
import type { Reward } from "@shared/schema";

interface RewardCardProps {
  reward: Reward;
}

const REWARD_ICONS = {
  coffee: Coffee,
  dumbbell: Dumbbell,
  gift: Gift,
  star: Star,
  trophy: Trophy,
} as const;

export function RewardCard({ reward }: RewardCardProps) {
  const queryClient = useQueryClient();
  const IconComponent = REWARD_ICONS[reward.icon as keyof typeof REWARD_ICONS] || Gift;
  
  const tierColors = TIER_COLORS[reward.tier as keyof typeof TIER_COLORS] || TIER_COLORS.bronze;

  const claimRewardMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("PATCH", `/api/rewards/${reward.id}/claim`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/rewards"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
  });

  const handleClaim = () => {
    claimRewardMutation.mutate();
  };

  return (
    <motion.div
      className={`flex items-center justify-between p-3 rounded-lg border ${tierColors.bg} ${
        reward.isClaimed ? "opacity-60" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{reward.title}</h4>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <Coins className="w-3 h-3" />
              <span>{reward.coinCost} coins</span>
            </div>
            <span>•</span>
            <span className="capitalize">{reward.tier} tier</span>
          </div>
        </div>
      </div>
      
      <Button
        onClick={handleClaim}
        disabled={reward.isClaimed || claimRewardMutation.isPending}
        size="sm"
        className={`${
          reward.isClaimed
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        } text-white`}
      >
        {reward.isClaimed ? "Claimed" : "Claim"}
      </Button>
    </motion.div>
  );
}
