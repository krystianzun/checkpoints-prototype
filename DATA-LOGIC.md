# Checkpoints — Data Logic

This document defines what data we show on each screen, where it comes from, and how we compute it. Use it as the source of truth when iterating on the prototype.

---

## Screen Flow

The checkpoint has two sections: **Wrapped Moment** (screens 0–5) and **Plan Reset** (screens 6–9).

| # | Screen | Section | Figma node |
|---|---|---|---|
| 0 | Welcome — Celebrate | Wrapped Moment | 3139:3609 |
| 1 | Stats (classes + highlight) | Wrapped Moment | 3139:3759 |
| 2 | Effort (time, MP, calories) | Wrapped Moment | 3139:3798 |
| 3 | Achievements (milestones) | Wrapped Moment | 3139:3844 |
| 4 | Streak | Wrapped Moment | 3139:3874 |
| 5 | League | Wrapped Moment | 3139:3941 |
| 6 | Welcome — Plan | Plan Reset | 3139:3627 |
| 7 | Intensity suggestion | Plan Reset | 3139:3671 |
| 8 | Plan (editable items) | Plan Reset | 3139:3701 |
| 9 | Completion | Plan Reset | — |

---

## Data Hierarchy

There are four levels at which we can aggregate data:

```
Chapter  ─── the full window of sessions since the last checkpoint
  └── Day  ─── all sessions on a given calendar date (path + explore)
        └── Workout  ─── 1–3 classes from the user's structured path for that day
              └── Class  ─── a single session (one row in the CSV)
```

**Class** — a single session. One row in the session CSV.

**Workout** — the structured set of 1–3 classes the user's daily path prescribed for that day. A user follows these from their "journey". Accessed via path, not freeplay.

**Day** — all sessions played on a given calendar date, regardless of source. This includes both path/journey workouts and any explore (freeplay) classes on top.

**Chapter** — the full window of sessions since the last checkpoint. Contains all days.

**Grouping sessions into workouts:** workout grouping needs a workout identifier field — `classId` and `dateCreation` alone are not sufficient to reliably group classes into the same structured workout. This is an **open Q** (see below).

---

## Data Sources

All per-session fields come from the raw session CSV. The chapter is the window of sessions since the last checkpoint. Cross-chapter comparisons use the equivalent window from the previous chapter.

### Session-level fields (from CSV)

| Field | Type | Notes |
|---|---|---|
| `profileId` | string | user identifier |
| `dateCreation` | Unix timestamp | session date, use for "Jan 23rd" formatting |
| `classId` | string | specific class played |
| `classType` | string | `Punch`, `Combat`, `Hiit`, `Aero`, `Sculpt`, `Dance` |
| `time` | number (seconds) | session duration |
| `calories` | number | kcal burned in session |
| `points` | number | Move Points earned in session |
| `medal` | number | session medal (1=none, 2=bronze, 3=silver, 4=gold) |
| `bestExplosiveStreak` | number | best explosive combo in session |
| `bestLegacyStreak` | number | best legacy combo in session |
| `bestLightningStreak` | number | best lightning combo in session |
| `bestDanceStreak` | number | best dance combo in session |
| `maxPunchSpeed` | number (km/h) | fastest single punch in session |
| `averagePunchSpeed` | number (km/h) | average punch speed in session |
| `averageReactionTime` | number (ms) | average reaction time in session |
| `jabsHitLeft` / `jabsHitRight` | number | jabs landed |
| `hooksHitLeft` / `hooksHitRight` | number | hooks landed |
| `uppercutsHitLeft` / `uppercutsHitRight` | number | uppercuts landed |
| `doublePunchesHit` | number | double punches landed |
| `hammerStrikesHitLeft` / `hammerStrikesHitRight` | number | hammer strikes landed |
| `elbowStrikesHitLeft` / `elbowStrikesHitRight` | number | elbow strikes landed |
| `powerMoves` | number | power moves landed in session |
| `blocksHit` | number | blocks landed |
| `risingBlocksHitLeft` / `risingBlocksHitRight` | number | rising blocks |
| `slipsHitLeft` / `slipsHitRight` | number | slips/dodges |
| `longAvoidsHitLeft` / `longAvoidsHitMiddle` / `longAvoidsHitRight` | number | long dodge moves |
| `jumpsHit` | number | jumps landed |
| `squatsHit` | number | squats hit |
| `stepsHitLeft` / `stepsHitRight` | number | footwork steps |
| `almostsPerformed` | number | near-miss attempts |
| `goodsPerformed` | number | "good" accuracy ratings |
| `totalBestMoves` | number | total best-rated moves in session |
| `handTrackingPercent` | number | hand tracking quality |
| `classesCompleted` | number | always 1 per session row |

### Derived aggregates

**Class level** — raw from CSV, no derivation needed.

**Workout level** — group sessions by workout ID (TBD field). Sum or max fields across the 1–3 classes in that workout.

| Derived | Formula |
|---|---|
| `workout.calories` | `sum(calories)` across classes in workout |
| `workout.minutes` | `sum(time) / 60` across classes in workout |
| `workout.movePoints` | `sum(points)` across classes in workout |
| `workout.totalPunches` | sum of all punch fields across classes in workout |

**Day level** — group sessions by calendar date from `dateCreation`. Sum across all classes that day.

| Derived | Formula |
|---|---|
| `day.calories` | `sum(calories)` across all sessions on that date |
| `day.minutes` | `sum(time) / 60` across all sessions on that date |
| `day.movePoints` | `sum(points)` across all sessions on that date |
| `day.sessionCount` | count of sessions on that date |

**Chapter level** — aggregate across the full chapter window.

| Variable | Derivation |
|---|---|
| `classesCompleted` | count of session rows in chapter window |
| `workoutsCompleted` | count of distinct workouts in chapter window |
| `totalMinutes` | `sum(time) / 60` across all sessions |
| `caloriesBurned` | `sum(calories)` across all sessions |
| `movePoints` | `sum(points)` across all sessions |
| `sessionsByClassType` | group sessions by `classType`, sort by count desc — used for plan Focus default |
| `streakDays` | binary array: 1 for each day in chapter window with ≥1 session |
| `streakWeeks` | longest unbroken run of 7-day windows with ≥ N active days (TBD threshold) |

---

## Screen-by-Screen Logic

---

### 0. Welcome — Celebrate

Full-screen background photo. Static copy, no computed data needed.

| Element | Value |
|---|---|
| Header pill | `"Checkpoint"` |
| Headline | `"Let's celebrate your progress!"` |
| Sub-copy | `"Let's take a look at what you've accomplished and what's ahead."` |
| CTA | `"Celebrate"` |
| Secondary action | `"SKIP"` — jumps to end of Wrapped Moment |

---

### 1. Stats Screen

Classes completed count + one highlight moment from the chapter.

| Element | Variable | Logic |
|---|---|---|
| Classes completed | `classesCompleted` | count of sessions in chapter |
| Delta badge | `classesCompleted - previousClassesCompleted` | shown only if `previousClassesCompleted > 0` |
| Highlight value | `highlight.value` | see Highlight logic below |
| Highlight label | `highlight.label` | see Highlight logic below |
| Highlight sub-label | `highlight.subLabel` | `"{classType}, {date}"` of that session |
| Goal reminder | `goal` | user profile |

**Delta format:** `↑ {N} more than last chapter`
**First chapter:** no delta shown, highlight uses "first class" variant

---

#### Highlight Logic

The highlight is the single most impressive, tangible number from the chapter. It must feel like a specific memory, not a summary metric. The value, label, and sub-label all change based on what actually stands out.

**What makes a good highlight:**
- Concrete and human-readable (`312 punches`, not `performance score 72.4`)
- Specific to a session (anchored with class type + date)
- Varies across checkpoints so it doesn't go stale

**Highlight candidates:**

##### Available for all class types

| # | Label | Granularity | Value | Source | Sub-label |
|---|---|---|---|---|---|
| H1 | Highest Combo | Class | e.g. `1,523` | `max(bestExplosiveStreak, bestLegacyStreak, bestLightningStreak, bestDanceStreak)` across all sessions | `"{classType}, {date}"` |
| H2 | Move Points in One Class | Class | e.g. `5,338 MP` | `max(points)` across sessions | `"{classType}, {date}"` |
| H3 | Move Points in One Workout | Workout | e.g. `9,100 MP` | `max(workout.movePoints)` across workouts — only eligible if workouts have ≥2 classes | `"Workout, {date}"` |
| H4 | Move Points in One Day | Day | e.g. `11,200 MP` | `max(day.movePoints)` — only eligible if user played on ≥1 day with multiple sessions | `"{date}"` |
| H5 | Calories in One Class | Class | e.g. `127 kcal` | `max(calories)` across sessions | `"{classType}, {date}"` |
| H6 | Calories in One Workout | Workout | e.g. `210 kcal` | `max(workout.calories)` across workouts — only eligible if workouts have ≥2 classes | `"Workout, {date}"` |
| H7 | Calories in One Day | Day | e.g. `290 kcal` | `max(day.calories)` — only eligible if user played on ≥1 day with multiple sessions | `"{date}"` |
| H8 | Longest Session | Class | e.g. `28 min` | `max(time) / 60` rounded down | `"{classType}, {date}"` |

##### Punch / Combat class types only

| # | Label | Granularity | Value | Source | Sub-label |
|---|---|---|---|---|---|
| H9 | Punches in One Class | Class | e.g. `312 punches` | `jabsHitLeft + jabsHitRight + hooksHitLeft + hooksHitRight + uppercutsHitLeft + uppercutsHitRight + doublePunchesHit + hammerStrikesHitLeft + hammerStrikesHitRight + elbowStrikesHitLeft + elbowStrikesHitRight` — single session with highest total | `"{classType}, {date}"` |
| H10 | Punches in One Workout | Workout | e.g. `580 punches` | same formula, summed across classes in best workout | `"Workout, {date}"` |
| H11 | Punches This Chapter | Chapter | e.g. `2,841 punches` | same formula, `sum` across all punch/combat sessions | `"Across {N} classes"` |
| H12 | Fastest Punch | Class | e.g. `7.4 km/h` | `max(maxPunchSpeed)` across punch/combat sessions | `"{classType}, {date}"` |
| H13 | Power Moves | Class | e.g. `19 power moves` | `max(powerMoves)` in a single session | `"{classType}, {date}"` |
| H14 | Blocks Landed | Class | e.g. `34 blocks` | `max(blocksHit + risingBlocksHitLeft + risingBlocksHitRight)` in a single session | `"{classType}, {date}"` |
| H15 | Dodges Nailed | Class | e.g. `18 dodges` | `max(slipsHitLeft + slipsHitRight + longAvoidsHitLeft + longAvoidsHitMiddle + longAvoidsHitRight)` in a single session | `"{classType}, {date}"` |
| H16 | Best Reaction Time | Class | e.g. `558 ms` | `min(averageReactionTime)` across sessions (lower = better) | `"{classType}, {date}"` |

##### Hiit / Aero / Sculpt / Dance class types only

| # | Label | Granularity | Value | Source | Sub-label |
|---|---|---|---|---|---|
| H17 | Jumps Hit | Class | e.g. `95 jumps` | `max(jumpsHit)` in a single session | `"{classType}, {date}"` |
| H18 | Squats Hit | Class | e.g. `86 squats` | `max(squatsHit)` in a single session | `"{classType}, {date}"` |
| H19 | Footwork Steps | Class | e.g. `156 steps` | `max(stepsHitLeft + stepsHitRight)` in a single session | `"{classType}, {date}"` |
| H20 | Near Misses | Class | e.g. `33 almosts` | `max(almostsPerformed)` in a single session — signals how hard they pushed | `"{classType}, {date}"` |

**Selection algorithm:**

1. **Filter** — exclude any candidate where the key fields are empty/zero across the chapter, or where the granularity condition isn't met (e.g. no multi-class days → skip day-level candidates)
2. **Score** — for each eligible candidate: `score = value / impressive_threshold` (thresholds below)
3. **Pick** — candidate with highest score wins. Ties: prefer class-level over workout/day/chapter (more specific = more memorable)
4. **Variety** — if the same category won last checkpoint, skip it and use the next highest score
5. **Sub-label format:**
   - Class-level: `"{displayClassType}, {formattedDate}"`
   - Workout-level: `"Workout, {formattedDate}"`
   - Day-level: `"{formattedDate}"`
   - Chapter-level: `"Across {N} classes"`

**Impressive thresholds (placeholder — calibrate with real distribution data):**

| # | Category | Threshold |
|---|---|---|
| H1 | Highest Combo | 400 |
| H2 | Move Points — Class | 3,500 MP |
| H3 | Move Points — Workout | 7,000 MP |
| H4 | Move Points — Day | 10,000 MP |
| H5 | Calories — Class | 70 kcal |
| H6 | Calories — Workout | 150 kcal |
| H7 | Calories — Day | 220 kcal |
| H8 | Longest Session | 25 min |
| H9 | Punches — Class | 150 |
| H10 | Punches — Workout | 400 |
| H11 | Punches — Chapter | 1,000 |
| H12 | Fastest Punch | 6.0 km/h |
| H13 | Power Moves | 15 |
| H14 | Blocks Landed | 20 |
| H15 | Dodges Nailed | 12 |
| H16 | Best Reaction Time | 600 ms (invert: `threshold / value`) |
| H17 | Jumps Hit | 50 |
| H18 | Squats Hit | 40 |
| H19 | Footwork Steps | 80 |
| H20 | Near Misses | 15 |

**Class type display names:**

| `classType` | Display name |
|---|---|
| `Punch` | Box |
| `Combat` | Combat |
| `Hiit` | HIIT |
| `Aero` | Aero |
| `Sculpt` | Sculpt |
| `Dance` | Dance |

**New user (first chapter) override:**
- Skip scoring entirely. Show: label `"First Class Complete"`, sub-label `"{displayClassType}, {date of first session}"`, no numeric value

---

### 2. Effort Screen

The aggregate effort for the chapter, with chapter-over-chapter deltas.

| Element | Variable | Logic |
|---|---|---|
| Workout time | `totalMinutes` | `sum(time) / 60` rounded — chapter total |
| Time delta | `totalMinutes - previousTotalMinutes` | shown if `previousTotalMinutes > 0` |
| Move Points | `movePoints` | `sum(points)` — chapter total |
| Calories | `caloriesBurned` | `sum(calories)` — chapter total |
| Calorie delta | `caloriesBurned - previousCaloriesBurned` | shown if `previousCaloriesBurned > 0` |
| Percentile badge | `percentile` | server-side, shown only if `percentile <= 10` |

All three stats are chapter-level totals (classes + workouts + days all rolled up). The Highlight screen (screen 1) is where we surface the more granular class/workout/day breakdowns.

**Delta format:** `↑ {N} mins` / `↑ {N} kcal`
**Percentile copy:** `"Top {N}% of FitXR users this chapter"`

**Open Q:** Does Move Points get a delta too? Currently no delta shown — revisit if it adds value.

---

### 3. Achievements Screen

Milestone-style achievement pills. The design shows them as light grey capsules with a large illustrated badge image on the left and a single line of text on the right (e.g. `"500 minutes worked out"`, `"2 week streak"`).

These are **cumulative milestones** — thresholds the user crossed this chapter (or ever), not relative comparisons. Max 2–3 shown.

| Element | Variable | Logic |
|---|---|---|
| Headline | — | `"You earned some awesome achievements that are proof of your progress!"` |
| Achievement pills | `seasonAchievements[]` | `{ badgeImage, label }` — see candidates below |

**Milestone candidates:**

| Label | Trigger | Badge image |
|---|---|---|
| `"{N} minutes worked out"` | cumulative `totalMinutes` crosses a round threshold (100, 250, 500, 1000…) | Minutes-Workout badge |
| `"{N} week streak"` | `streakWeeks >= N` | Week-Streak badge |
| `"{N} classes completed"` | `classesCompleted` (lifetime) crosses threshold (10, 25, 50, 100…) | Classes badge |
| `"{N} calories burned"` | cumulative lifetime `caloriesBurned` crosses threshold (1000, 2500, 5000…) | Calories badge |
| `"First chapter complete"` | `previousClassesCompleted === 0` | First Chapter badge |
| `"Top {N}% this chapter"` | `percentile <= 10` | Top Performer badge |
| `"{N} punches thrown"` | cumulative lifetime punch total crosses threshold (500, 1000, 5000…) | Punches badge |

**Selection:** Show the 2–3 milestones that were crossed during this chapter window. If more than 3 crossed, prioritise streak → minutes → classes → others.

**Open Q:**
- Are these milestone badges a pre-existing system in FitXR (i.e. we just surface ones the game already awarded), or are we defining them from scratch here?
- Do they persist in a collection the user can review later?

---

### 4. Streak Screen

Visual proof of showing up.

| Element | Variable | Logic |
|---|---|---|
| Streak weeks | `streakWeeks` | longest run of full weeks with ≥ N active days (threshold TBD, maybe 3/7) |
| Active / total days | `activeDays` / `totalDays` | count of 1s in `streakDays` / length of `streakDays` |
| Calendar grid | `streakDays[]` | binary array, one entry per day in chapter window (always 14 entries = 2 weeks) |

**Open Q:**
- What counts as "one week streak" — 7 consecutive days? Or any 7 days in a 7-day window?
- Should we show the actual calendar dates, or just M/T/W/T/F/S/S labels?

---

### 5. League Screen

Where the user sits in the social leaderboard.

| Element | Variable | Logic |
|---|---|---|
| League tier name | `leagueName` | server-side (e.g. Diamond, Gold, Silver, Bronze) |
| League icon | `leagueIcon` | server-side emoji |
| Rank position | `leagueRank` / `leagueTotalPlayers` | server-side |
| Rank change | `leagueRankChange` | positive = climbed, negative = dropped |
| Leaderboard preview | top 2 players + current user | server-side: usernames + MP totals |
| Motivational copy | — | `"↑ You climbed {N} places this chapter!"` if `leagueRankChange > 0` |

**Open Q:** Do we show league promotion/demotion? (e.g. moved from Silver to Gold this chapter)

---

### 6. Welcome — Plan

Static transition screen.

**Copy:**
- Default: `"Now — time to plan for the road ahead."`
- New user: show `"⬆ Plan Upgrade"` pill — acknowledges they're getting a proper plan for first time
- CTA: `"Plan"`

---

### 7. Intensity Suggestion Screen

Adaptive screen shown between the Plan welcome and the Plan editor. Tells the user what the system recommends for the next chapter and why.

| Element | Variable | Logic |
|---|---|---|
| Headline | — | Variant A or B (see below) |
| Body copy | — | Explains the recommendation |
| CTAs | — | `"Let's lock in!"` + `"Keep it as it is"` |

**Variant A — Push harder** (`"You're KILLING it recently!"`)

Show when ALL of:
- `classesCompleted >= 8` in this chapter
- `streakWeeks >= 2`
- Chapter-over-chapter calorie delta > 0 (improving output)

Copy: `"Let's increase your intensity. You can handle a little extra spice in your next set of workouts. We're going to push the intensity a little more — you've got this!"`

**Variant B — Standard** (`"Now — time to plan for the road ahead."`)

Show for everyone else. Standard transition with no intensity recommendation.

**Open Q:** What does "increase intensity" actually map to in the plan? A different workout length tier? A difficulty flag? A specific class type recommendation?

---

### 8. Plan Screen

Editable plan items for the next chapter. User taps any item to cycle through options.

| Item | Variable | Editable | Options |
|---|---|---|---|
| Goal | `goal` | No | — |
| Workout Length | `planItems[length].value` | Yes | 15 / 20 / 25 / 30 / 40 mins |
| Upcoming Focus | `planItems[focus].value` | Yes | Core / Full Body / Upper Body / Lower Body |

**Workout Length default logic:**
- New user: start at `20 mins`
- Returning user: carry over last checkpoint's confirmed value
- If intensity suggestion is Variant A → pre-select one tier higher than last chapter

**Upcoming Focus default logic:**
- Rotate to the body area least worked this chapter (by class type session count)
- Override with goal preference if the rotation result doesn't fit the goal well:
  - `Lose Weight` → prefer `Full Body` or `Core`
  - `Build Strength` → prefer `Upper Body` or `Lower Body`
  - `Improve Mobility` → prefer `Core` or `Lower Body`
  - `Have Fun` → pick for variety

**ClassType → body area mapping:**

| classType | Body area |
|---|---|
| Punch | Upper Body |
| Combat | Full Body |
| Hiit | Lower Body |
| Aero | Full Body |
| Sculpt | Core |
| Dance | Lower Body |

**Open Q:** Should Upcoming Focus be removed as a user-editable item and be fully system-driven? Or is user control important here?

---

### 9. Completion Screen

Summary of confirmed plan. No new data — reflects final `planItems` state after any edits on screen 8.

| Element | Variable | Logic |
|---|---|---|
| Focus reminder | `upcomingTag` | confirmed value from plan |
| Plan summary list | `planItems[]` | final confirmed values |
| CTA | — | `"Let's Go!"` |

---

## Open Questions

1. **Workout identifier** — There's no workout ID field in the current CSV. How do we group 1–3 classes into the same structured workout? Options: (a) a `workoutId` field gets added to the session data, (b) we group by date + consecutive timestamp proximity, (c) we treat all path classes on the same day as one workout. This is a blocker for any workout-level highlight.
2. **Path vs explore sessions** — Is there a field that distinguishes path/journey classes from explore (freeplay) classes? Needed to correctly attribute sessions to workouts. `classId` references a studio class but doesn't indicate source.
3. **Chapter window** — What defines a chapter? Fixed 2-week window? Rolling? Event-triggered by the user hitting a goal?
4. **`dateCreation` timezone** — Unix timestamp. Which timezone to display dates in — user's local, or UTC?
3. **`percentile`** — pre-computed server-side or derived from `leagueRank / leagueTotalPlayers`?
4. **`medal` field scale** — values seen in data: `1` and `4`. Is it 1=none, 2=bronze, 3=silver, 4=gold?
5. **`handTrackingPercent = 0`** — does 0 mean perfect tracking (zero drops) or 0% tracked? Direction is unclear.
6. **Combo field semantics** — are `bestExplosiveStreak`, `bestLegacyStreak`, `bestLightningStreak` different names for the same combo mechanic in different class modes, or genuinely different move types? Affects whether we always take the max or surface them separately.
7. **Almosts** — does a high `almostsPerformed` count mean the user pushed hard (positive signal) or struggled (neutral/negative)? Affects whether it's a good highlight candidate.
8. **Streak definition** — what counts as "one week streak"? 7 consecutive days? Or ≥ N sessions in any 7-day window?
9. **Achievements as game system** — are the milestone badges a pre-existing FitXR achievement system we surface here, or are we defining them from scratch? Does the user collect them persistently?
10. **Highlight rotation** — how do we track which highlight category was shown last checkpoint to enforce variety? Stored server-side on the user profile?
11. **Highlight thresholds** — all thresholds in this doc are rough estimates. Need real distribution data to calibrate what's genuinely impressive vs ordinary.
12. **Intensity → plan mapping** — what does "increase intensity" concretely change? Workout length only, or a difficulty parameter in the class recommendation?
