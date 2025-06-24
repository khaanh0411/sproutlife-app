export const PLANT_LEVELS = [
  { level: 1, name: "Seed", xpRequired: 0, description: "A tiny seed waiting to sprout" },
  { level: 2, name: "Sprout", xpRequired: 500, description: "First signs of life emerge" },
  { level: 3, name: "Root", xpRequired: 1200, description: "Building a strong foundation" },
  { level: 4, name: "Shoot", xpRequired: 2000, description: "Reaching for the light" },
  { level: 5, name: "Leaf", xpRequired: 3000, description: "Producing energy from sunlight" },
  { level: 6, name: "Stem", xpRequired: 4200, description: "Growing strong and tall" },
  { level: 7, name: "Bud", xpRequired: 5600, description: "Preparing to bloom" },
  { level: 8, name: "Flower", xpRequired: 7200, description: "Beautiful blossoms appear" },
  { level: 9, name: "Fruit", xpRequired: 9000, description: "Bearing the fruits of labor" },
  { level: 10, name: "Spore", xpRequired: 11000, description: "Ready to spread new life" },
];

export function getNextLevel(currentXp: number) {
  const currentLevel = PLANT_LEVELS.find((level, index) => {
    const nextLevel = PLANT_LEVELS[index + 1];
    return currentXp >= level.xpRequired && (!nextLevel || currentXp < nextLevel.xpRequired);
  });

  const nextLevelIndex = PLANT_LEVELS.findIndex(level => level === currentLevel) + 1;
  const nextLevel = PLANT_LEVELS[nextLevelIndex];

  return {
    current: currentLevel || PLANT_LEVELS[0],
    next: nextLevel || PLANT_LEVELS[PLANT_LEVELS.length - 1],
    progress: nextLevel ? ((currentXp - (currentLevel?.xpRequired || 0)) / (nextLevel.xpRequired - (currentLevel?.xpRequired || 0))) * 100 : 100
  };
}

export function getLevelByXp(xp: number) {
  const levelInfo = getNextLevel(xp);
  return levelInfo.current;
}
