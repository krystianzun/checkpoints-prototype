import { CheckpointData, WeeklyActivity } from "./types";

export const powerUserData: CheckpointData = {
  persona: "power_user",
  topStudios: [
    { studio: "box", count: 6 },
    { studio: "hiit", count: 5 },
    { studio: "dance", count: 4 },
  ],
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
  movePoints: 120000,
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
  leagueName: "Diamond League",
  leagueRank: 47,
  leagueTotalPlayers: 1000,
  leaguePointsToNextRank: 2500,
  leagueIcon: "💎",
  leagueRankChange: 15,
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
  topStudios: [
    { studio: "box", count: 3 },
    { studio: "hiit", count: 3 },
    { studio: "dance", count: 2 },
  ],
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
  movePoints: 48000,
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
      icon: "�",
      title: "Consistency Builder",
      description: "Completed 5 workouts in 7 days",
    },
  ],
  leagueName: "Bronze League",
  leagueRank: 342,
  leagueTotalPlayers: 1000,
  leaguePointsToNextRank: 5200,
  leagueIcon: "🥉",
  leagueRankChange: 8,
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

// Build Strength variant - power user
export const buildStrengthData: CheckpointData = {
  persona: "power_user",
  topStudios: [
    { studio: "combat", count: 7 },
    { studio: "sculpt", count: 5 },
    { studio: "box", count: 3 },
  ],
  chapterSummary:
    "Your last few sessions in FitXR were all about your lower body — power through your legs in Combat and strength-building moves in Sculpt.",
  goalConnection:
    "You've been targeting some of the biggest muscle groups in your body — perfect for building a strong foundation.",
  goal: "Build Strength",
  classesCompleted: 15,
  previousClassesCompleted: 11,
  highlightDate: "Jan 23rd",
  highlightDescription: "Lower Body Power — your highest combo of the chapter",
  totalMinutes: 140,
  previousTotalMinutes: 98,
  movePoints: 120000,
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
      icon: "🧘",
      title: "Flexibility Focus",
      description: "Completed 10+ Sculpt sessions",
    },
    {
      icon: "📈",
      title: "Range Expander",
      description: "Improved mobility metrics by 15%",
    },
  ],
  leagueName: "Gold League",
  leagueRank: 89,
  leagueTotalPlayers: 1000,
  leaguePointsToNextRank: 3200,
  leagueIcon: "🥇",
  leagueRankChange: 12,
  previousTag: "lower_body",
  upcomingTag: "core",
  tagComparison: "different",
  upcomingFocusDescription:
    "You've been working on lower body flexibility. Now we shift focus to your core to improve stability and range of motion.",
  upcomingGoalConnection:
    "Core training builds a stronger foundation and improves stability, essential for building overall strength.",
  planItems: [
    { id: "goal", label: "Goal", value: "Build Strength", editable: false },
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

// Improve Mobility variant - power user
export const improveMobilityData: CheckpointData = {
  persona: "power_user",
  topStudios: [
    { studio: "sculpt", count: 6 },
    { studio: "dance", count: 5 },
    { studio: "hiit", count: 4 },
  ],
  chapterSummary:
    "Your last few sessions in FitXR were all about your lower body — controlled movements in Sculpt and dynamic flow in Dance.",
  goalConnection:
    "You've been working on lower body flexibility and range of motion — key areas for improving overall mobility.",
  goal: "Improve Mobility",
  classesCompleted: 15,
  previousClassesCompleted: 11,
  highlightDate: "Jan 23rd",
  highlightDescription: "Lower Body Power — your highest combo of the chapter",
  totalMinutes: 140,
  previousTotalMinutes: 98,
  movePoints: 120000,
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
      icon: "🧘",
      title: "Flexibility Focus",
      description: "Consistent mobility work",
    },
    {
      icon: "⚡",
      title: "Range Expander",
      description: "Improved movement patterns",
    },
  ],
  leagueName: "Gold League",
  leagueRank: 89,
  leagueTotalPlayers: 1000,
  leaguePointsToNextRank: 3200,
  leagueIcon: "🥇",
  leagueRankChange: 21,
  previousTag: "lower_body",
  upcomingTag: "core",
  tagComparison: "different",
  upcomingFocusDescription:
    "You've been working on lower body flexibility. Now we shift focus to your core to improve stability and range of motion.",
  upcomingGoalConnection:
    "Core mobility improves your overall movement quality and helps unlock better range of motion throughout your body.",
  planItems: [
    { id: "goal", label: "Goal", value: "Improve Mobility", editable: false },
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

// Have Fun variant - power user
export const haveFunData: CheckpointData = {
  persona: "power_user",
  topStudios: [
    { studio: "dance", count: 8 },
    { studio: "zumba", count: 4 },
    { studio: "box", count: 3 },
  ],
  chapterSummary:
    "Your last few sessions in FitXR were all about your lower body — grooving through Dance and bringing the party energy in Zumba.",
  goalConnection:
    "You've been crushing lower body workouts and having a blast — that's what it's all about!",
  goal: "Have Fun",
  classesCompleted: 15,
  previousClassesCompleted: 11,
  highlightDate: "Jan 23rd",
  highlightDescription: "Lower Body Power — your highest combo of the chapter",
  totalMinutes: 140,
  previousTotalMinutes: 98,
  movePoints: 120000,
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
      icon: "�",
      title: "Party Starter",
      description: "Completed 15+ Dance sessions",
    },
    {
      icon: "😊",
      title: "Mood Booster",
      description: "Highest enjoyment rating this season",
    },
  ],
  leagueName: "Silver League",
  leagueRank: 156,
  leagueTotalPlayers: 1000,
  leaguePointsToNextRank: 4100,
  leagueIcon: "🥈",
  leagueRankChange: 18,
  previousTag: "lower_body",
  upcomingTag: "core",
  tagComparison: "different",
  upcomingFocusDescription:
    "You've been vibing with lower body workouts. Now we're mixing it up with core-focused sessions to keep things fresh and exciting.",
  upcomingGoalConnection:
    "Core workouts add variety to your routine and keep the fun going with new challenges and movements.",
  planItems: [
    { id: "goal", label: "Goal", value: "Have Fun", editable: false },
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

export const weeklyActivity: WeeklyActivity[] = [
  { day: "Mon", minutes: 25, completed: true },
  { day: "Tue", minutes: 30, completed: true },
  { day: "Wed", minutes: 0, completed: false },
  { day: "Thu", minutes: 20, completed: true },
  { day: "Fri", minutes: 35, completed: true },
  { day: "Sat", minutes: 0, completed: false },
  { day: "Sun", minutes: 30, completed: true },
];
