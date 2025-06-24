import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Calendar, DollarSign, TrendingUp } from "lucide-react";
import type { Goal } from "@shared/schema";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const progressPercent = goal.targetValue > 0 ? (goal.currentValue / goal.targetValue) * 100 : 0;
  
  const getGoalIcon = (title: string) => {
    if (title.toLowerCase().includes("fund") || title.toLowerCase().includes("money")) {
      return DollarSign;
    }
    if (title.toLowerCase().includes("fitness") || title.toLowerCase().includes("workout")) {
      return TrendingUp;
    }
    return Target;
  };

  const getGoalColors = (type: string) => {
    return type === "long-term" 
      ? { bg: "from-blue-50 to-indigo-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-700" }
      : { bg: "from-green-50 to-green-50", border: "border-green-200", badge: "bg-green-100 text-green-700" };
  };

  const IconComponent = getGoalIcon(goal.title);
  const colors = getGoalColors(goal.type);

  const formatValue = (value: number) => {
    if (goal.title.toLowerCase().includes("fund") || goal.title.toLowerCase().includes("money")) {
      return `$${value.toLocaleString()}`;
    }
    return `${value}`;
  };

  const formatUnit = () => {
    if (goal.title.toLowerCase().includes("fund") || goal.title.toLowerCase().includes("money")) {
      return "";
    }
    if (goal.title.toLowerCase().includes("day")) {
      return " days";
    }
    return "";
  };

  return (
    <motion.div
      className={`p-4 bg-gradient-to-r ${colors.bg} rounded-lg border ${colors.border}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <IconComponent className="w-5 h-5 text-gray-600" />
          <h4 className="font-semibold text-gray-800">{goal.title}</h4>
        </div>
        <Badge className={colors.badge}>
          {goal.type === "long-term" ? "Long-term" : "Short-term"}
        </Badge>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-800">
            {formatValue(goal.currentValue)} / {formatValue(goal.targetValue)}{formatUnit()}
          </span>
        </div>
        <Progress value={Math.min(progressPercent, 100)} className="h-2" />
        <div className="text-xs text-gray-500">
          {progressPercent >= 100 ? "Goal completed!" : `${Math.round(progressPercent)}% complete`}
        </div>
      </div>
    </motion.div>
  );
}
