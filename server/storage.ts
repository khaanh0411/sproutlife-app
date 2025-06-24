import { 
  users, categories, habits, achievements, goals, rewards,
  type User, type InsertUser,
  type Category, type InsertCategory,
  type Habit, type InsertHabit,
  type Achievement, type InsertAchievement,
  type Goal, type InsertGoal,
  type Reward, type InsertReward
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<Category>): Promise<Category | undefined>;

  // Habit operations
  getHabits(userId: number): Promise<Habit[]>;
  getHabitsByCategory(userId: number, categoryId: number): Promise<Habit[]>;
  createHabit(habit: InsertHabit): Promise<Habit>;
  updateHabit(id: number, habit: Partial<Habit>): Promise<Habit | undefined>;
  completeHabit(id: number): Promise<Habit | undefined>;

  // Achievement operations
  getAchievements(userId: number): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;

  // Goal operations
  getGoals(userId: number): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: number, goal: Partial<Goal>): Promise<Goal | undefined>;

  // Reward operations
  getRewards(userId: number): Promise<Reward[]>;
  createReward(reward: InsertReward): Promise<Reward>;
  claimReward(id: number): Promise<Reward | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private habits: Map<number, Habit>;
  private achievements: Map<number, Achievement>;
  private goals: Map<number, Goal>;
  private rewards: Map<number, Reward>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentHabitId: number;
  private currentAchievementId: number;
  private currentGoalId: number;
  private currentRewardId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.habits = new Map();
    this.achievements = new Map();
    this.goals = new Map();
    this.rewards = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentHabitId = 1;
    this.currentAchievementId = 1;
    this.currentGoalId = 1;
    this.currentRewardId = 1;

    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default user
    const defaultUser: User = {
      id: 1,
      username: "demo",
      level: 3,
      levelName: "Shoot",
      xp: 2850,
      coins: 1250,
      currentStreak: 7,
      totalHabitsCompleted: 156,
      badgesEarned: 12,
      createdAt: new Date(),
    };
    this.users.set(1, defaultUser);
    this.currentUserId = 2;

    // Create default categories
    const defaultCategories: Category[] = [
      { id: 1, name: "Health", icon: "heart", color: "red", level: 4, xp: 780, progress: 78, streak: 5 },
      { id: 2, name: "Finance", icon: "dollar-sign", color: "amber", level: 2, xp: 450, progress: 45, streak: 12 },
      { id: 3, name: "Family", icon: "home", color: "orange", level: 3, xp: 920, progress: 92, streak: 3 },
      { id: 4, name: "Personal Dev", icon: "brain", color: "purple", level: 5, xp: 1200, progress: 67, streak: 8 },
    ];

    defaultCategories.forEach(category => {
      this.categories.set(category.id, category);
    });
    this.currentCategoryId = 5;

    // Create default habits
    const defaultHabits: Habit[] = [
      { id: 1, userId: 1, categoryId: 1, title: "Drink 8 glasses of water", description: null, xpReward: 50, isCompleted: true, completedAt: new Date(), createdAt: new Date() },
      { id: 2, userId: 1, categoryId: 1, title: "Complete 30-min workout", description: null, xpReward: 100, isCompleted: false, completedAt: null, createdAt: new Date() },
      { id: 3, userId: 1, categoryId: 4, title: "Read for 20 minutes", description: null, xpReward: 75, isCompleted: true, completedAt: new Date(), createdAt: new Date() },
      { id: 4, userId: 1, categoryId: 2, title: "Track daily expenses", description: null, xpReward: 25, isCompleted: false, completedAt: null, createdAt: new Date() },
    ];

    defaultHabits.forEach(habit => {
      this.habits.set(habit.id, habit);
    });
    this.currentHabitId = 5;

    // Create default achievements
    const defaultAchievements: Achievement[] = [
      { id: 1, userId: 1, title: "Health Warrior", description: "Complete 7-day health streak", icon: "fire", xpReward: 200, earnedAt: new Date() },
      { id: 2, userId: 1, title: "Green Thumb", description: "Reach Level 3 in plant growth", icon: "leaf", xpReward: 150, earnedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
    ];

    defaultAchievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement);
    });
    this.currentAchievementId = 3;

    // Create default goals
    const defaultGoals: Goal[] = [
      { id: 1, userId: 1, categoryId: 2, title: "Emergency Fund Goal", description: "Save $10,000 for emergency fund", type: "long-term", targetValue: 10000, currentValue: 3200, isCompleted: false, completedAt: null, createdAt: new Date() },
      { id: 2, userId: 1, categoryId: 1, title: "30-Day Fitness Challenge", description: "Complete workout 30 days in a row", type: "short-term", targetValue: 30, currentValue: 18, isCompleted: false, completedAt: null, createdAt: new Date() },
    ];

    defaultGoals.forEach(goal => {
      this.goals.set(goal.id, goal);
    });
    this.currentGoalId = 3;

    // Create default rewards
    const defaultRewards: Reward[] = [
      { id: 1, userId: 1, title: "Coffee Date", description: "100 coins • Personal Dev reward", icon: "coffee", coinCost: 100, tier: "silver", isAvailable: true, isClaimed: false, claimedAt: null, createdAt: new Date() },
      { id: 2, userId: 1, title: "New Gear", description: "250 coins • Health milestone", icon: "dumbbell", coinCost: 250, tier: "gold", isAvailable: true, isClaimed: false, claimedAt: null, createdAt: new Date() },
    ];

    defaultRewards.forEach(reward => {
      this.rewards.set(reward.id, reward);
    });
    this.currentRewardId = 3;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userUpdate: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userUpdate };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, categoryUpdate: Partial<Category>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    
    const updatedCategory = { ...category, ...categoryUpdate };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  // Habit operations
  async getHabits(userId: number): Promise<Habit[]> {
    return Array.from(this.habits.values()).filter(habit => habit.userId === userId);
  }

  async getHabitsByCategory(userId: number, categoryId: number): Promise<Habit[]> {
    return Array.from(this.habits.values()).filter(
      habit => habit.userId === userId && habit.categoryId === categoryId
    );
  }

  async createHabit(insertHabit: InsertHabit): Promise<Habit> {
    const id = this.currentHabitId++;
    const habit: Habit = { 
      ...insertHabit, 
      id, 
      createdAt: new Date(),
      completedAt: null 
    };
    this.habits.set(id, habit);
    return habit;
  }

  async updateHabit(id: number, habitUpdate: Partial<Habit>): Promise<Habit | undefined> {
    const habit = this.habits.get(id);
    if (!habit) return undefined;
    
    const updatedHabit = { ...habit, ...habitUpdate };
    this.habits.set(id, updatedHabit);
    return updatedHabit;
  }

  async completeHabit(id: number): Promise<Habit | undefined> {
    const habit = this.habits.get(id);
    if (!habit) return undefined;
    
    const updatedHabit = { 
      ...habit, 
      isCompleted: true, 
      completedAt: new Date() 
    };
    this.habits.set(id, updatedHabit);
    return updatedHabit;
  }

  // Achievement operations
  async getAchievements(userId: number): Promise<Achievement[]> {
    return Array.from(this.achievements.values()).filter(achievement => achievement.userId === userId);
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const id = this.currentAchievementId++;
    const achievement: Achievement = { 
      ...insertAchievement, 
      id, 
      earnedAt: new Date() 
    };
    this.achievements.set(id, achievement);
    return achievement;
  }

  // Goal operations
  async getGoals(userId: number): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(goal => goal.userId === userId);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = this.currentGoalId++;
    const goal: Goal = { 
      ...insertGoal, 
      id, 
      createdAt: new Date(),
      completedAt: null 
    };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoal(id: number, goalUpdate: Partial<Goal>): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;
    
    const updatedGoal = { ...goal, ...goalUpdate };
    this.goals.set(id, updatedGoal);
    return updatedGoal;
  }

  // Reward operations
  async getRewards(userId: number): Promise<Reward[]> {
    return Array.from(this.rewards.values()).filter(reward => reward.userId === userId);
  }

  async createReward(insertReward: InsertReward): Promise<Reward> {
    const id = this.currentRewardId++;
    const reward: Reward = { 
      ...insertReward, 
      id, 
      createdAt: new Date(),
      claimedAt: null 
    };
    this.rewards.set(id, reward);
    return reward;
  }

  async claimReward(id: number): Promise<Reward | undefined> {
    const reward = this.rewards.get(id);
    if (!reward) return undefined;
    
    const updatedReward = { 
      ...reward, 
      isClaimed: true, 
      claimedAt: new Date() 
    };
    this.rewards.set(id, updatedReward);
    return updatedReward;
  }
}

export const storage = new MemStorage();
