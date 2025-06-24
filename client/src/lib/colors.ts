export const CATEGORY_COLORS = {
  health: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-600",
    icon: "text-red-500",
    gradient: "from-red-400 to-red-600",
  },
  finance: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-600",
    icon: "text-amber-600",
    gradient: "from-amber-400 to-amber-600",
  },
  family: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
    icon: "text-orange-600",
    gradient: "from-orange-400 to-orange-600",
  },
  personal: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-600",
    icon: "text-purple-600",
    gradient: "from-purple-400 to-purple-600",
  },
} as const;

export const TIER_COLORS = {
  bronze: {
    bg: "bg-gray-100",
    border: "border-gray-200",
    text: "text-gray-700",
    icon: "text-gray-600",
  },
  silver: {
    bg: "bg-amber-100",
    border: "border-amber-200",
    text: "text-amber-700",
    icon: "text-amber-600",
  },
  gold: {
    bg: "bg-yellow-200",
    border: "border-yellow-300",
    text: "text-yellow-700",
    icon: "text-yellow-700",
  },
} as const;
