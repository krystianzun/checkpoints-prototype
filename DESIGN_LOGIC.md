# Checkpoints Prototype - Design Logic & Documentation

## Overview

The Checkpoints prototype is a multi-screen user journey that celebrates user progress and sets up their next training chapter. It combines data-driven insights with goal-specific messaging to create a personalized experience.

---

## Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Layout**: 540x720px landscape frame (optimized for VR headset display)

### Core Components
- `CheckpointFlow.tsx` - Main orchestrator managing screen flow and state
- `PhoneFrame.tsx` - Container providing the 540x720 viewport
- `ProgressDots.tsx` - Visual indicator of progress through the flow
- Individual screen components in `/src/components/screens/`

---

## User Journey Structure

The checkpoint experience is divided into **3 sections** across **11 screens**:

### Section 1: Wrapped Moment (Screens 1-7)
Celebrates past performance and achievements.

1. **Welcome/Celebrate** - Opening screen with motivational message
2. **Summary** - Chapter recap with studio-based templating
3. **Stats** - Classes completed with delta comparison
4. **Effort** - Move Points and percentile ranking
5. **Achievements** - Season achievements earned
6. **Streak** - Workout consistency calendar
7. **League** - League standing and rank progress

### Section 2: Plan Reset (Screens 8-10)
Introduces the upcoming training focus.

8. **Plan Welcome** - Transition to planning mode
9. **Focus** - Upcoming body focus with tag-based theming
10. **Plan** - Editable plan items (goal, length, focus)

### Section 3: Complete (Screen 11)
Confirms the new plan.

11. **Completion** - Final confirmation with plan summary

---

## Data Model

### CheckpointData Interface
The core data structure that powers all screens:

```typescript
interface CheckpointData {
  // Meta
  persona: Persona; // "power_user" | "new_user"
  
  // Studio tracking
  topStudios: StudioCount[]; // Top 3 studios with counts
  
  // Chapter summary
  chapterSummary: string; // Templated based on studios
  goalConnection: string; // How chapter supports goal
  goal: string; // User's primary goal
  
  // Stats
  classesCompleted: number;
  previousClassesCompleted: number;
  highlightDescription: string;
  
  // Effort metrics
  movePoints: number; // Renamed from moodPoints
  percentile: number;
  
  // Streak tracking
  streakWeeks: number;
  streakDays: number[]; // Binary array (1=active, 0=rest)
  
  // Achievements
  seasonAchievements: Achievement[];
  
  // League progress
  leagueName: string;
  leagueRank: number;
  leagueTotalPlayers: number;
  leaguePointsToNextRank: number;
  leagueIcon: string;
  leagueRankChange: number; // Positive = climbed up
  
  // Plan reset - tag-based theming
  previousTag: BodyTag; // "lower_body" | "core" | "upper_body" | "full_body"
  upcomingTag: BodyTag;
  tagComparison: TagComparison; // "same" | "different"
  upcomingFocusDescription: string;
  upcomingGoalConnection: string;
  planItems: PlanItem[];
}
```

---

## Templating System

### 1. Studio-Based Chapter Summaries

**Problem**: Chapter summaries need to dynamically reflect which studio types the user completed.

**Solution**: `generateChapterSummary()` function in `studio-templates.ts`

**Logic**:
- Takes `topStudios` array (e.g., `[{studio: "box", count: 12}, {studio: "hiit", count: 8}]`)
- Extracts body tags from studios (box → upper_body, hiit → full_body)
- Generates descriptive copy based on studio mix
- Returns templated string with studio names and body focus

**Example Output**:
```
"You crushed 12 Box and 8 HIIT sessions, building serious upper body power and full body endurance."
```

**Template Recipe for Figma**:
```
Input: topStudios = [{studio, count}, ...]
Process:
  1. Map studios to descriptors (box → "building upper body power")
  2. Format counts and studio names
  3. Combine into natural sentence
Output: "You crushed {count} {Studio} and {count} {Studio} sessions, {descriptor} and {descriptor}."
```

### 2. Tag-Based Focus Screen

**Problem**: The upcoming focus needs to explain the transition from previous to upcoming body focus.

**Solution**: Tag comparison system with templated copy.

**Logic**:
- Compare `previousTag` vs `upcomingTag`
- Set `tagComparison` to "same" or "different"
- Display badge: "New Focus" (different) or "Continuing Focus" (same)
- Use pre-written `upcomingFocusDescription` that explains the transition

**Example**:
```typescript
previousTag: "lower_body"
upcomingTag: "core"
tagComparison: "different"
upcomingFocusDescription: "You laid the foundation with lower body work. Now we reinforce it by shifting focus to your core."
```

**Template Recipe for Figma**:
```
Input: previousTag, upcomingTag
Process:
  1. Compare tags → set badge ("New Focus" | "Continuing Focus")
  2. Select transition copy based on tag pair
Output: 
  - Badge color: different=blue, same=purple
  - Description: pre-written for each tag transition
  - Goal connection: how this focus supports user's goal
```

### 3. Goal-Specific Variants

**Problem**: Different goals (Lose Weight, Build Strength, etc.) need different framing.

**Solution**: Separate mock data objects per goal with goal-specific copy.

**Logic**:
- Each goal has its own `CheckpointData` object
- Copy fields are rewritten to align with goal:
  - `goalConnection` - How chapter supports THIS goal
  - `upcomingGoalConnection` - How upcoming focus supports THIS goal
  - `highlightDescription` - Framed for goal relevance
  - `planItems` - Goal set to match

**Goals Supported**:
1. **Lose Weight** - Emphasizes calorie burn, consistency
2. **Build Strength** - Emphasizes power, progressive overload
3. **Improve Mobility** - Emphasizes flexibility, range of motion
4. **Have Fun** - Emphasizes enjoyment, variety, energy

**Template Recipe for Figma**:
```
Input: goal selection
Process:
  1. Load goal-specific data object
  2. All copy pre-written for goal context
  3. Metrics emphasized based on goal priorities
Output: Entire flow reframed for selected goal
```

---

## Key Design Decisions

### 1. Removed Intensity-Based System
**Why**: Developer constraints - can't reliably control workout intensity per session.

**What Changed**:
- Removed `IntensityScreen` from flow
- Removed intensity fields from data model
- Switched to tag-based body focus system instead

### 2. Tag-Based Theming
**Why**: Body part focus (lower_body, core, etc.) is controllable and meaningful.

**Benefits**:
- Clear, actionable focus areas
- Easy to explain transitions
- Aligns with actual workout programming

### 3. Studio Counts Instead of Names
**Why**: Need to show variety and volume, not just list studios.

**Implementation**:
- Track top 3 studios with counts
- Generate dynamic descriptions
- Show actual workout distribution

### 4. Move Points (not Mood Points)
**Why**: Terminology alignment with FitXR's actual metrics.

**Impact**: Renamed throughout codebase for consistency.

### 5. Separate Achievements Screen
**Why**: Achievements deserve dedicated focus, not buried in streak screen.

**Flow Impact**: Added as screen 5, before streak screen.

### 6. League Progress Screen
**Why**: Competitive element motivates continued engagement.

**Features**:
- League card with rank and icon
- Leaderboard preview (top 2 + user)
- Rank change indicator (climbed X places)
- Motivational copy about competition

---

## Screen-by-Screen Logic

### 1. Welcome/Celebrate
- **Purpose**: Set positive tone
- **Data**: Uses `section` prop to show different messages
- **Animation**: Fade in with stagger

### 2. Summary
- **Purpose**: Recap chapter with studio context
- **Data**: `chapterSummary` (templated), `goalConnection`
- **Key Logic**: Studio-based templating via `generateChapterSummary()`

### 3. Stats
- **Purpose**: Show volume with comparison
- **Data**: `classesCompleted`, `previousClassesCompleted`
- **Key Logic**: Calculate delta, show +/- indicator if previous data exists

### 4. Effort
- **Purpose**: Celebrate effort metrics
- **Data**: `movePoints`, `percentile`, `highlightDescription`
- **Key Logic**: Show top percentile badge if ≤10%

### 5. Achievements
- **Purpose**: Display earned achievements
- **Data**: `seasonAchievements` array
- **Key Logic**: List all achievements with icons and descriptions
- **Copy**: "You earned some awesome achievements that are proof of your progress!"

### 6. Streak
- **Purpose**: Visualize consistency
- **Data**: `streakWeeks`, `streakDays` (binary array)
- **Key Logic**: 
  - Map days to calendar grid
  - Show active days (1) vs rest days (0)
  - Calculate active/total ratio

### 7. League
- **Purpose**: Show competitive standing
- **Data**: League name, rank, total players, rank change, icon
- **Key Logic**:
  - Display league card with gradient
  - Show leaderboard preview (mock top 2 + user)
  - Show rank change if positive: "↑ You climbed X places"
- **Design**: Matches reference with card + leaderboard + motivational copy

### 8. Plan Welcome
- **Purpose**: Transition to planning mode
- **Data**: Uses `section="plan"` prop
- **Animation**: Similar to celebrate screen

### 9. Focus
- **Purpose**: Introduce upcoming body focus
- **Data**: `upcomingTag`, `tagComparison`, `upcomingFocusDescription`, `upcomingGoalConnection`
- **Key Logic**:
  - Badge color based on comparison (new=blue, continuing=purple)
  - Explain transition from previous to upcoming
  - Connect to user's goal

### 10. Plan
- **Purpose**: Show editable plan
- **Data**: `planItems` array
- **Key Logic**: 
  - Display plan items with labels and values
  - Show edit icon (functionality not implemented in prototype)
  - Items: Goal, Workout Length, Focus

### 11. Completion
- **Purpose**: Confirm and close
- **Data**: `upcomingTag`, `planItems`
- **Key Logic**: 
  - Show success message
  - List plan items as confirmation
  - Restart button to loop prototype

---

## Persona & Goal Switching

### UI Controls
Two switcher rows at top of prototype:
1. **Persona Switcher**: Power User | New User
2. **Goal Switcher**: Lose Weight | Build Strength | Improve Mobility | Have Fun

### Logic
```typescript
const getDataForGoal = (selectedGoal: Goal): CheckpointData => {
  switch (selectedGoal) {
    case "Build Strength": return buildStrengthData;
    case "Improve Mobility": return improveMobilityData;
    case "Have Fun": return haveFunData;
    case "Lose Weight":
    default:
      return persona === "power_user" ? powerUserData : newUserData;
  }
};
```

**Note**: Persona only affects "Lose Weight" goal. Other goals use single data set.

---

## Animation Patterns

### Consistent Patterns
- **Screen transitions**: Slide animation (300px offset)
- **Element entrance**: Staggered delays (0.2s, 0.4s, 0.6s, 0.8s)
- **Scale animations**: Spring physics for organic feel
- **Progress dots**: Smooth fill animation

### Framer Motion Usage
```typescript
// Screen transition
<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={currentScreen}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
  />
</AnimatePresence>

// Element entrance
<motion.div
  initial={{ y: 20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ delay: 0.4 }}
/>
```

---

## Mock Data Structure

### Data Files
- `mock-data.ts` - Contains all persona and goal variants
- `studio-templates.ts` - Studio-to-descriptor mapping and templating logic

### Variants Included
1. **powerUserData** - Lose Weight (high volume, strong metrics)
2. **newUserData** - Lose Weight (lower volume, building consistency)
3. **buildStrengthData** - Build Strength goal framing
4. **improveMobilityData** - Improve Mobility goal framing
5. **haveFunData** - Have Fun goal framing

### Example Studio Mix
```typescript
topStudios: [
  { studio: "box", count: 12 },      // Upper body focus
  { studio: "hiit", count: 8 },      // Full body cardio
  { studio: "dance", count: 5 }      // Full body fun
]
```

---

## Future Considerations

### Not Yet Implemented
- **Plan editing**: Edit UI shown but not functional
- **Real data integration**: Currently using mock data
- **Persistence**: No state saved between sessions
- **Accessibility**: Focus management, screen readers
- **Responsive design**: Fixed 540x720 layout only

### Potential Enhancements
- **More goals**: Add "Reduce Stress", "Increase Energy", etc.
- **Achievements detail**: Tap to see achievement details
- **League detail**: Full leaderboard view
- **Social features**: Share achievements, compare with friends
- **Historical data**: View past checkpoints
- **Animations**: More sophisticated transitions between sections

---

## Development Notes

### File Structure
```
src/
├── app/
│   └── page.tsx                    # Root page
├── components/
│   ├── CheckpointFlow.tsx          # Main orchestrator
│   ├── PhoneFrame.tsx              # Viewport container
│   ├── ProgressDots.tsx            # Progress indicator
│   └── screens/                    # Individual screens
│       ├── WelcomeScreen.tsx
│       ├── SummaryScreen.tsx
│       ├── StatsScreen.tsx
│       ├── EffortScreen.tsx
│       ├── AchievementsScreen.tsx
│       ├── StreakScreen.tsx
│       ├── LeagueScreen.tsx
│       ├── FocusScreen.tsx
│       ├── PlanScreen.tsx
│       └── CompletionScreen.tsx
└── lib/
    ├── types.ts                    # TypeScript interfaces
    ├── mock-data.ts                # All mock data variants
    └── studio-templates.ts         # Templating logic
```

### Running the Prototype
```bash
npm run dev
# Navigate to http://localhost:3088
```

### Key Dependencies
- `next`: 15.1.4
- `react`: 19.0.0
- `framer-motion`: 11.15.0
- `tailwindcss`: 3.4.17

---

## Templating Recipes for Figma

### Recipe 1: Chapter Summary
**Input Variables**:
- `topStudios`: Array of {studio, count}
- `goal`: User's goal

**Process**:
1. Take top 2-3 studios from array
2. Map each studio to descriptor:
   - box → "building upper body power"
   - combat → "developing striking technique"
   - hiit → "pushing full body endurance"
   - sculpt → "toning and defining"
   - dance → "moving with rhythm and energy"
   - zumba → "dancing with high energy"
   - slam → "building explosive power"
3. Format: "You crushed {count} {Studio} and {count} {Studio} sessions, {descriptor} and {descriptor}."

**Output Example**:
"You crushed 12 Box and 8 HIIT sessions, building serious upper body power and full body endurance."

---

### Recipe 2: Upcoming Focus
**Input Variables**:
- `previousTag`: Body part from last chapter
- `upcomingTag`: Body part for next chapter
- `goal`: User's goal

**Process**:
1. Compare tags:
   - If different → Badge: "New Focus" (blue)
   - If same → Badge: "Continuing Focus" (purple)
2. Select transition copy based on tag pair
3. Add goal connection explaining why this focus supports their goal

**Output Example**:
- Badge: "New Focus"
- Description: "You laid the foundation with lower body work. Now we reinforce it by shifting focus to your core."
- Goal Connection: "Core training improves your form & efficiency, helping you get more from each session to support your goal of losing weight."

---

### Recipe 3: League Display
**Input Variables**:
- `leagueName`: e.g., "Diamond League"
- `leagueRank`: e.g., 47
- `leagueTotalPlayers`: e.g., 1000
- `leagueRankChange`: e.g., 15
- `leagueIcon`: e.g., "💎"

**Process**:
1. Display league card with name and icon
2. Show position: "{rank}/{total}"
3. Show leaderboard preview with user highlighted
4. If rankChange > 0: Show "↑ You climbed {rankChange} places this chapter!"

**Output Example**:
- Card: "DIAMOND LEAGUE" with 💎 icon
- Position: "Your position 47/1000"
- Rank change: "↑ You climbed 15 places this chapter!"

---

## Summary

This prototype demonstrates a data-driven, goal-oriented user journey that:
- Celebrates past achievements with personalized metrics
- Uses templating to generate dynamic, contextual copy
- Provides clear, actionable focus for the next chapter
- Adapts messaging based on user goals
- Maintains consistent visual and animation language

The system is designed to be extensible, with clear separation between data, logic, and presentation layers.
