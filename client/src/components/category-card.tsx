import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  DollarSign, 
  Home, 
  Brain,
  Activity,
  Wallet,
  Users,
  BookOpen
} from "lucide-react";
import { CATEGORY_COLORS } from "@/lib/colors";
import type { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

const CATEGORY_ICONS = {
  heart: Heart,
  "dollar-sign": DollarSign,
  home: Home,
  brain: Brain,
  activity: Activity,
  wallet: Wallet,
  users: Users,
  book: BookOpen,
} as const;

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const colorKey = category.color as keyof typeof CATEGORY_COLORS;
  const colors = CATEGORY_COLORS[colorKey] || CATEGORY_COLORS.health;
  
  const IconComponent = CATEGORY_ICONS[category.icon as keyof typeof CATEGORY_ICONS] || Heart;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.bg}`}>
          <IconComponent className={`w-5 h-5 ${colors.icon}`} />
        </div>
        <span className={`text-xs px-2 py-1 rounded font-medium ${colors.bg} ${colors.text}`}>
          Level {category.level}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-800 mb-2">{category.name}</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className={`font-medium ${colors.text}`}>{category.progress}%</span>
        </div>
        
        <Progress value={category.progress} className="h-2" />
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>{category.streak} day streak</span>
          <span>+{category.xp} XP</span>
        </div>
      </div>
    </motion.div>
  );
}
