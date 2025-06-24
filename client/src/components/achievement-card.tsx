import { motion } from "framer-motion";
import { Trophy, Flame, Leaf, Star, Target } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Achievement } from "@shared/schema";

interface AchievementCardProps {
  achievement: Achievement;
}

const ACHIEVEMENT_ICONS = {
  fire: Flame,
  leaf: Leaf,
  star: Star,
  trophy: Trophy,
  target: Target,
} as const;

export function AchievementCard({ achievement }: AchievementCardProps) {
  const IconComponent = ACHIEVEMENT_ICONS[achievement.icon as keyof typeof ACHIEVEMENT_ICONS] || Trophy;
  
  const getGradientColor = (icon: string) => {
    switch (icon) {
      case "fire":
        return "from-amber-400 to-amber-600";
      case "leaf":
        return "from-green-400 to-green-600";
      case "star":
        return "from-blue-400 to-blue-600";
      case "target":
        return "from-purple-400 to-purple-600";
      default:
        return "from-amber-400 to-amber-600";
    }
  };

  const getBgColor = (icon: string) => {
    switch (icon) {
      case "fire":
        return "from-amber-50 to-yellow-50 border-amber-200";
      case "leaf":
        return "from-green-50 to-green-50 border-green-200";
      case "star":
        return "from-blue-50 to-blue-50 border-blue-200";
      case "target":
        return "from-purple-50 to-purple-50 border-purple-200";
      default:
        return "from-amber-50 to-yellow-50 border-amber-200";
    }
  };

  return (
    <motion.div
      className={`flex items-center space-x-3 p-3 bg-gradient-to-r rounded-lg border ${getBgColor(achievement.icon)}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${getGradientColor(achievement.icon)} rounded-full flex items-center justify-center shadow-lg`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
        <p className="text-sm text-gray-600">{achievement.description}</p>
        <span className="text-xs text-green-600 font-medium">
          +{achievement.xpReward} XP • {formatDistanceToNow(new Date(achievement.earnedAt), { addSuffix: true })}
        </span>
      </div>
    </motion.div>
  );
}
