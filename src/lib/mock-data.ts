import { CheckpointData, WeeklyActivity } from "./types";

export const powerUserData: CheckpointData = {
  persona: "power_user",
  chapterSummary:
    "Your last few sessions in FitXR were all about your lower body — power through your legs in Box and rapid fire reps in HIIT.",
  goalConnection:
    "You've been lighting up some of the biggest muscle groups in your body — prime territory for losing weight.",
  goal: "Lose Weight",
  classesCompleted: 15,
  previousClassesCompleted: 11,
  highlightDate: "Jan 23rd",
  highlightDescription: "Lower Body Power — your highest combo of the chapter",
  totalMinutes: 140,
  previousTotalMinutes: 98,
  moodPoints: 120000,
  caloriesBurned: 421,
  previousCaloriesBurned: 310,
  streakWeeks: 2,
  streakDays: [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
  percentile: 5,
  seasonAchievements: [
    {
      icon: "🔥",
      title: "2 Week Streak",
      description: "You showed up 10 out of 14 days",
    },
    {
      icon: "💪",
      title: "Power Puncher",
      description: "Top 5% combo score in Box",
    },
    {
      icon: "⚡",
      title: "Calorie Crusher",
      description: "Burned 35% more than last chapter",
    },
  ],
  previousTag: "lower_body",
  upcomingTag: "core",
  tagComparison: "different",
  upcomingFocusDescription:
    "You laid the foundation with lower body work. Now we reinforce it by shifting focus to your core.",
  upcomingGoalConnection:
    "Core training improves your form & efficiency, helping you get more from each session to support your goal of losing weight.",
  planItems: [
    { id: "goal", label: "Goal", value: "Lose Weight", editable: false },
    {
      id: "length",
      label: "Workout Length",
      value: "30 mins",
      editable: true,
    },
    {
      id: "focus",
      label: "Upcoming Focus",
      value: "Core",
      editable: true,
    },
  ],
};

export const newUserData: CheckpointData = {
  persona: "new_user",
  chapterSummary:
    "Your first chapter in FitXR focused on building a foundation — mixing Box, HIIT, and Dance to find what feels right.",
  goalConnection:
    "Every session has been building your base fitness — exactly what you need to start losing weight effectively.",
  goal: "Lose Weight",
  classesCompleted: 8,
  previousClassesCompleted: 0,
  highlightDate: "Jan 18th",
  highlightDescription: "Your first HIIT class — you crushed it",
  totalMinutes: 65,
  previousTotalMinutes: 0,
  moodPoints: 48000,
  caloriesBurned: 198,
  previousCaloriesBurned: 0,
  streakWeeks: 1,
  streakDays: [1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  percentile: 30,
  seasonAchievements: [
    {
      icon: "🎉",
      title: "First Chapter Complete",
      description: "You made it through your first plan",
    },
    {
      icon: "🏆",
      title: "Explorer",
      description: "Tried 3 different workout styles",
    },
  ],
  previousTag: "full_body",
  upcomingTag: "full_body",
  tagComparison: "same",
  upcomingFocusDescription:
    "You're building a solid foundation with full body training. We're keeping this focus to help you develop consistency.",
  upcomingGoalConnection:
    "Full body training maximises calorie burn across sessions, directly fuelling your goal of losing weight.",
  planItems: [
    { id: "goal", label: "Goal", value: "Lose Weight", editable: false },
    {
      id: "length",
      label: "Workout Length",
      value: "20 mins",
      editable: true,
    },
    {
      id: "focus",
      label: "Upcoming Focus",
      value: "Full Body",
      editable: true,
    },
  ],
};

export const weeklyActivity: WeeklyActivity[] = [
  { day: "Mon", minutes: 25, completed: true },
  { day: "Tue", minutes: 30, completed: true },
  { day: "Wed", minutes: 0, completed: false },
  { day: "Thu", minutes: 20, completed: true },
  { day: "Fri", minutes: 35, completed: true },
  { day: "Sat", minutes: 0, completed: false },
  { day: "Sun", minutes: 30, completed: true },
];
