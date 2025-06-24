import { useLocation } from "wouter";
import { Home, CheckSquare, BarChart3, Gift, User } from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/habits", icon: CheckSquare, label: "Habits" },
  { path: "/progress", icon: BarChart3, label: "Progress" },
  { path: "/rewards", icon: Gift, label: "Rewards" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNavigation() {
  const [location, setLocation] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="grid grid-cols-5 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.path;
          const IconComponent = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              className={`flex flex-col items-center py-2 transition-colors ${
                isActive ? "text-green-600" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <IconComponent className="w-5 h-5 mb-1" />
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full"
                    layoutId="activeIndicator"
                  />
                )}
              </div>
              <span className={`text-xs ${isActive ? "font-medium" : ""}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
