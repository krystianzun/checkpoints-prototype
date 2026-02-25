export type Persona = "power_user" | "new_user";

export type IntensityDirection = "lower" | "maintain" | "increase";

export interface CheckpointData {
  persona: Persona;
  // Wrapped moment
  chapterSummary: string;
  goalConnection: string;
  goal: string;
  classesCompleted: number;
  previousClassesCompleted: number;
  highlightDate: string;
  highlightDescription: string;
  totalMinutes: number;
  previousTotalMinutes: number;
  moodPoints: number;
  caloriesBurned: number;
  previousCaloriesBurned: number;
  streakWeeks: number;
  streakDays: number[];
  percentile: number;
  seasonAchievements: Achievement[];
  // Plan reset
  intensityDirection: IntensityDirection;
  intensityCopy: string;
  intensityReason: string;
  upcomingFocus: string;
  upcomingFocusDescription: string;
  upcomingGoalConnection: string;
  planItems: PlanItem[];
}

export interface Achievement {
  icon: string;
  title: string;
  description: string;
}

export interface PlanItem {
  id: string;
  label: string;
  value: string;
  editable: boolean;
}

export interface WeeklyActivity {
  day: string;
  minutes: number;
  completed: boolean;
}
