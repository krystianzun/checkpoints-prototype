export type Persona = "power_user" | "new_user";

export type Goal =
  | "Lose Weight"
  | "Build Strength"
  | "Improve Mobility"
  | "Have Fun";

export type BodyTag = "lower_body" | "core" | "upper_body" | "full_body";

export type TagComparison = "same" | "different";

export type StudioType =
  | "box"
  | "combat"
  | "hiit"
  | "sculpt"
  | "dance"
  | "zumba"
  | "slam";

export interface StudioCount {
  studio: StudioType;
  count: number;
}

export interface CheckpointData {
  persona: Persona;
  // Wrapped moment
  topStudios: StudioCount[]; // Top 2-3 studios by frequency
  chapterSummary: string;
  goalConnection: string;
  goal: string;
  classesCompleted: number;
  previousClassesCompleted: number;
  highlightDate: string;
  highlightDescription: string;
  totalMinutes: number;
  previousTotalMinutes: number;
  movePoints: number;
  caloriesBurned: number;
  previousCaloriesBurned: number;
  streakWeeks: number;
  streakDays: number[];
  percentile: number;
  seasonAchievements: Achievement[];
  // League progress
  leagueName: string;
  leagueRank: number;
  leagueTotalPlayers: number;
  leaguePointsToNextRank: number;
  leagueIcon: string;
  // Plan reset - tag-based theming
  previousTag: BodyTag;
  upcomingTag: BodyTag;
  tagComparison: TagComparison;
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
