/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Terminal, 
  Dumbbell, 
  ArrowRight,
  Zap
} from 'lucide-react';

// Types
type Routine = {
  title: string;
  exercises: string[];
  duration: number;
};

// Hardcoded routines data
const ROUTINES: Record<number, Routine> = {
  1: {
    title: "Quick Core Activation",
    exercises: [
      "Hollow Body Hold (30s)",
      "Superman Hold (30s)"
    ],
    duration: 1
  },
  5: {
    title: "Arch Body Holds & Core",
    exercises: [
      "Arch Body Holds (3 x 45s)",
      "Leg Raises (3 x 12)",
      "Plank Variation (1 min)"
    ],
    duration: 5
  },
  10: {
    title: "Ring Chest Flys & Push-ups",
    exercises: [
      "Chest Flys on Rings (3 x 10)",
      "Diamond Push-ups (3 x 15)",
      "Pseudo Planche Push-ups (3 x 8)"
    ],
    duration: 10
  },
  15: {
    title: "Pull-up Foundations & Scapula Shrugs",
    exercises: [
      "Scapula Pull-ups (4 x 12)",
      "Negative Pull-ups (3 x 8)",
      "Australian Pull-ups (3 x 12)",
      "Active Hang (1 min)"
    ],
    duration: 15
  },
  20: {
    title: "Handstand Practice & Tuck Front Levers",
    exercises: [
      "Wall Walk-ups (3 x 5)",
      "Tuck Front Lever Holds (4 x 15s)",
      "Freestanding HS Practice (10 min)",
      "Pike Push-ups (3 x 10)"
    ],
    duration: 20
  },
  30: {
    title: "Full Muscle-Up Progressions",
    exercises: [
      "Explosive Pull-ups (5 x 5)",
      "Deep Ring Dips (4 x 10)",
      "Muscle-up Transition Drills (5 x 3)",
      "High Pull-ups (Chest to Bar) (3 x 8)",
      "L-Sit Hold (4 x 20s)"
    ],
    duration: 30
  }
};

export default function App() {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [currentRoutine, setCurrentRoutine] = useState<Routine | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial setup for the design
  useEffect(() => {
    // Inject fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      handleComplete();
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleGenerate = () => {
    if (selectedDuration && ROUTINES[selectedDuration]) {
      const routine = ROUTINES[selectedDuration];
      setCurrentRoutine(routine);
      setTimeLeft(routine.duration * 60);
      setIsRunning(false);
      setShowSuccess(false);
    }
  };

  const handleStartPause = () => {
    if (timeLeft > 0) {
      setIsRunning(!isRunning);
    }
  };

  const handleReset = () => {
    if (currentRoutine) {
      setTimeLeft(currentRoutine.duration * 60);
      setIsRunning(false);
      setShowSuccess(false);
    }
  };

  const handleComplete = () => {
    setIsRunning(false);
    setShowSuccess(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const durations = [1, 5, 10, 15, 20, 30];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-slate-950 via-slate-950 to-emerald-950/20"></div>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 lg:py-20">
        {/* Header */}
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 bg-emerald-500 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Terminal className="w-6 h-6 text-slate-950" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tighter text-white font-mono">
              Cali<span className="text-emerald-400">Code</span>
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 max-w-xl leading-relaxed"
          >
            Senior Calisthenics Engine. Turn your agent's <code className="text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded text-sm">long-running-tasks</code> into body-building sessions.
          </motion.p>
        </header>

        {/* Configuration Section */}
        <section className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" /> Session Setup
          </h2>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
            {durations.map((d) => (
              <button
                key={d}
                id={`duration-${d}`}
                onClick={() => setSelectedDuration(d)}
                className={`
                  py-3 rounded-xl border font-mono transition-all duration-200
                  ${selectedDuration === d 
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                    : 'bg-slate-800/50 border-slate-700 hover:border-emerald-400 text-slate-300 hover:bg-slate-800'
                  }
                `}
              >
                {d}m
              </button>
            ))}
          </div>

          <button
            id="generate-btn"
            onClick={handleGenerate}
            disabled={!selectedDuration}
            className={`
              w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
              ${selectedDuration 
                ? 'bg-slate-200 text-slate-950 hover:bg-white active:scale-[0.98]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }
            `}
          >
            <Dumbbell className="w-5 h-5" /> Generate Routine
          </button>
        </section>

        {/* Routine Display Area */}
        <AnimatePresence mode="wait">
          {currentRoutine && (
            <motion.div
              key={currentRoutine.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid lg:grid-cols-5 gap-8"
            >
              {/* Timer Component */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                <div className="mb-6 relative">
                  <svg className="w-48 h-48 -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-slate-800"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray="552.92"
                      animate={{ 
                        strokeDashoffset: 552.92 - (552.92 * (timeLeft / (currentRoutine.duration * 60))) 
                      }}
                      className="text-emerald-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold font-mono tracking-wider tabular-nums text-white">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">Remaining</span>
                  </div>
                </div>

                <div className="flex gap-4 w-full">
                  <button
                    id="timer-start-pause"
                    onClick={handleStartPause}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    {isRunning ? 'Pause' : 'Start'}
                  </button>
                  <button
                    id="timer-reset"
                    onClick={handleReset}
                    className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Workout List */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{currentRoutine.title}</h3>
                      <p className="text-slate-500 text-sm flex items-center gap-2">
                        <Timer className="w-4 h-4" /> {currentRoutine.duration} minutes session
                      </p>
                    </div>
                    {showSuccess && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-500/20 text-emerald-400 p-2 rounded-full border border-emerald-500/30"
                      >
                        <CheckCircle className="w-6 h-6" />
                      </motion.div>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {currentRoutine.exercises.map((ex, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-start gap-4 p-4 bg-slate-800/40 rounded-xl border border-slate-800/50 hover:bg-slate-800/60 transition-colors group"
                      >
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></div>
                        <span className="text-slate-300 font-medium">{ex}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {showSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-500 text-slate-950 p-4 rounded-xl font-bold text-center flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    >
                      <CheckCircle className="w-6 h-6" /> Workout Completed! Clean code, clean reps.
                    </motion.div>
                  ) : (
                    <button
                      id="mark-done-btn"
                      onClick={handleComplete}
                      className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-xl font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
                    >
                      Mark as Done
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Info */}
        <footer className="mt-20 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs font-mono uppercase tracking-widest">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Ready to Build</span>
            <span>Version 1.0.0-cali</span>
          </div>
          <div className="flex items-center gap-2 group cursor-default">
            <span>Powered by</span>
            <span className="text-emerald-500 font-bold">CaliCode Protocol</span>
          </div>
        </footer>
      </main>

      {/* Decorative Blur Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
