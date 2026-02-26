"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckpointData, Persona, Goal } from "@/lib/types";
import {
  powerUserData,
  newUserData,
  buildStrengthData,
  improveMobilityData,
  haveFunData,
} from "@/lib/mock-data";
import PhoneFrame from "./PhoneFrame";
import ProgressDots from "./ProgressDots";
import WelcomeScreen from "./screens/WelcomeScreen";
import SummaryScreen from "./screens/SummaryScreen";
import StatsScreen from "./screens/StatsScreen";
import EffortScreen from "./screens/EffortScreen";
import StreakScreen from "./screens/StreakScreen";
import FocusScreen from "./screens/FocusScreen";
import PlanScreen from "./screens/PlanScreen";
import CompletionScreen from "./screens/CompletionScreen";

const TOTAL_SCREENS = 9;

export default function CheckpointFlow() {
  const [persona, setPersona] = useState<Persona>("power_user");
  const [goal, setGoal] = useState<Goal>("Lose Weight");
  const [currentScreen, setCurrentScreen] = useState(0);
  const [direction, setDirection] = useState(1);

  const getDataForGoal = (selectedGoal: Goal): CheckpointData => {
    switch (selectedGoal) {
      case "Build Strength":
        return buildStrengthData;
      case "Improve Mobility":
        return improveMobilityData;
      case "Have Fun":
        return haveFunData;
      case "Lose Weight":
      default:
        return persona === "power_user" ? powerUserData : newUserData;
    }
  };

  const data: CheckpointData = getDataForGoal(goal);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentScreen((prev) => Math.min(prev + 1, TOTAL_SCREENS - 1));
  }, []);

  const skip = useCallback(() => {
    setDirection(1);
    setCurrentScreen(TOTAL_SCREENS - 1);
  }, []);

  const restart = useCallback(() => {
    setDirection(-1);
    setCurrentScreen(0);
  }, []);

  const switchPersona = (p: Persona) => {
    setPersona(p);
    setCurrentScreen(0);
    setDirection(-1);
  };

  const switchGoal = (g: Goal) => {
    setGoal(g);
    setCurrentScreen(0);
    setDirection(-1);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 0:
        return (
          <WelcomeScreen
            key="welcome-celebrate"
            data={data}
            onNext={next}
            section="celebrate"
          />
        );
      case 1:
        return <SummaryScreen key="summary" data={data} onNext={next} />;
      case 2:
        return <StatsScreen key="stats" data={data} onNext={next} />;
      case 3:
        return <EffortScreen key="effort" data={data} onNext={next} />;
      case 4:
        return <StreakScreen key="streak" data={data} onNext={next} />;
      case 5:
        return (
          <WelcomeScreen
            key="welcome-plan"
            data={data}
            onNext={next}
            section="plan"
          />
        );
      case 6:
        return <FocusScreen key="focus" data={data} onNext={next} />;
      case 7:
        return <PlanScreen key="plan" data={data} onNext={next} />;
      case 8:
        return (
          <CompletionScreen key="completion" data={data} onRestart={restart} />
        );
      default:
        return null;
    }
  };

  const sectionLabel =
    currentScreen <= 4
      ? "Wrapped Moment"
      : currentScreen <= 7
        ? "Plan Reset"
        : "Complete";

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Persona and Goal switchers */}
      <div className="flex flex-col items-center gap-4">
        {/* Persona switcher */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => switchPersona("power_user")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              persona === "power_user"
                ? "bg-accent text-background"
                : "bg-white/10 text-white/50 hover:bg-white/15"
            }`}
          >
            Power User
          </button>
          <button
            onClick={() => switchPersona("new_user")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              persona === "new_user"
                ? "bg-accent text-background"
                : "bg-white/10 text-white/50 hover:bg-white/15"
            }`}
          >
            New User (Post-Onboarding)
          </button>
        </div>

        {/* Goal switcher */}
        <div className="flex gap-2 flex-wrap justify-center">
          {(
            [
              "Lose Weight",
              "Build Strength",
              "Improve Mobility",
              "Have Fun",
            ] as Goal[]
          ).map((g) => (
            <button
              key={g}
              onClick={() => switchGoal(g)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                goal === g
                  ? "bg-blue-400 text-background"
                  : "bg-white/10 text-white/40 hover:bg-white/15"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              currentScreen <= 4
                ? "bg-accent/15 text-accent"
                : currentScreen <= 8
                  ? "bg-blue-400/15 text-blue-300"
                  : "bg-white/10 text-white/60"
            }`}
          >
            {sectionLabel}
          </span>
          <span className="text-xs text-white/30">
            Screen {currentScreen + 1} / {TOTAL_SCREENS}
          </span>
        </div>
      </div>

      {/* Phone frame */}
      <PhoneFrame>
        {/* Progress dots with skip */}
        {currentScreen < TOTAL_SCREENS - 1 && (
          <ProgressDots
            total={TOTAL_SCREENS - 1}
            current={currentScreen}
            onSkip={skip}
          />
        )}

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentScreen}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </PhoneFrame>

      {/* Feedback implementation notes */}
      <div className="max-w-md text-center pb-8">
        <p className="text-xs text-white/20">
          Tap screens to navigate. Use Skip to jump to end. Switch personas to
          see different user stories.
        </p>
      </div>
    </div>
  );
}
