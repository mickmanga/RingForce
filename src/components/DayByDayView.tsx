import React, { useEffect, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Pause,
  Play,
  RotateCcw,
  Timer,
  Utensils,
} from 'lucide-react';
import { DayId, ExerciseStep, UserMaxes } from '../types/program';
import { WEEKLY_PROGRAM } from '../data/boxingProgramData';
import { NutritionPlanView } from './NutritionPlanView';

interface DayByDayViewProps {
  selectedDayId: DayId;
  onSelectDay: (dayId: DayId) => void;
  userMaxes: UserMaxes;
  onUpdateBodyweight: (kg: number) => void;
  completedSets: Record<string, boolean[]>;
  onToggleSet: (exerciseId: string, setIndex: number, totalSets: number) => void;
  onResetDaySets: (dayId: DayId) => void;
}

function playBeep() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(680, ctx.currentTime);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.46);
  } catch {
    // Ignore audio context block
  }
}

function formatComputedLoad(ex: ExerciseStep, maxes: UserMaxes): string | null {
  if (!ex.maxKey || ex.pctMin === undefined || ex.pctMax === undefined) {
    return null;
  }
  const baseMax = maxes[ex.maxKey];
  if (!baseMax || baseMax <= 0) return null;

  const round25 = (v: number) => Math.round(v / 2.5) * 2.5;
  const minKg = round25(baseMax * ex.pctMin);
  const maxKg = round25(baseMax * ex.pctMax);

  if (minKg === maxKg) {
    return `${minKg} kg`;
  }
  return `${minKg} – ${maxKg} kg`;
}

function formatSecLabel(sec: number): string {
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s === 0 ? `${m} min` : `${m}m${String(s).padStart(2, '0')}`;
}

export function DayByDayView({
  selectedDayId,
  onSelectDay,
  userMaxes,
  onUpdateBodyweight,
  completedSets,
  onToggleSet,
  onResetDaySets,
}: DayByDayViewProps) {
  const dayIndex = WEEKLY_PROGRAM.findIndex((d) => d.id === selectedDayId);
  const currentDay = WEEKLY_PROGRAM[dayIndex >= 0 ? dayIndex : 0];

  const prevDay =
    WEEKLY_PROGRAM[(dayIndex - 1 + WEEKLY_PROGRAM.length) % WEEKLY_PROGRAM.length];
  const nextDay = WEEKLY_PROGRAM[(dayIndex + 1) % WEEKLY_PROGRAM.length];

  // Rest & Round Timer state
  const [timerPresetSec, setTimerPresetSec] = useState<number>(150);
  const [secondsLeft, setSecondsLeft] = useState<number>(150);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (!timerRunning) return;
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          playBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [timerRunning]);

  const startTimer = (sec: number) => {
    setTimerPresetSec(sec);
    setSecondsLeft(sec);
    setTimerRunning(true);
  };

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <div className="space-y-8">
      {/* 7-Day Switcher Bar */}
      <section className="bg-white border border-slate-200 rounded-xl p-2">
        <div
          role="tablist"
          aria-label="Choisir un jour de la semaine"
          className="grid grid-cols-4 sm:grid-cols-7 gap-1"
        >
          {WEEKLY_PROGRAM.map((day) => {
            const isSelected = day.id === currentDay.id;
            return (
              <button
                key={day.id}
                role="tab"
                aria-selected={isSelected}
                type="button"
                onClick={() => onSelectDay(day.id)}
                className={`px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isSelected
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-semibold whitespace-nowrap">
                  <span className="sm:hidden">{day.shortName}</span>
                  <span className="hidden sm:inline">{day.dayName}</span>
                </div>
                <div
                  className={`text-[11px] truncate mt-0.5 ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {day.categoryLabel}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Day Header + Compact Chronometer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <section className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
                <span>PARTIE 1 · Entraînement</span>
                <span aria-hidden="true">·</span>
                <span>{currentDay.categoryLabel}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectDay(prevDay.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>{prevDay.shortName}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectDay(nextDay.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
                >
                  <span>{nextDay.shortName}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {currentDay.dayName} : {currentDay.title}
            </h2>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#partie-entrainement"
                className="inline-flex items-center gap-1.5 font-medium text-slate-900 hover:text-red-600 transition-colors"
              >
                <Dumbbell className="h-3.5 w-3.5" />
                <span>Exercices ({currentDay.blocks.length} blocs)</span>
              </a>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <a
                href="#partie-alimentation"
                className="inline-flex items-center gap-1.5 font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                <Utensils className="h-3.5 w-3.5" />
                <span>Plan alimentaire ({currentDay.carbTargetGrams75kg} g glucides)</span>
              </a>
            </div>

            {currentDay.id !== 'dimanche' && (
              <button
                type="button"
                onClick={() => onResetDaySets(currentDay.id)}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Réinitialiser les cases du jour
              </button>
            )}
          </div>
        </section>

        {/* Chronomètre Repos & Round */}
        <section className="lg:col-span-4 bg-slate-950 text-white border border-slate-800 rounded-xl p-5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
              <Timer className="h-4 w-4 text-red-500" />
              <span>Chronomètre</span>
            </div>
            <div className="font-mono tabular-nums text-3xl font-bold">
              {mins}:{secs}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { label: '25s', sec: 25 },
              { label: '45s', sec: 45 },
              { label: '50s', sec: 50 },
              { label: '90s', sec: 90 },
              { label: '2m30', sec: 150 },
              { label: '3m30', sec: 210 },
            ].map((p) => (
              <button
                key={p.sec}
                type="button"
                onClick={() => startTimer(p.sec)}
                className={`px-2 py-1 text-xs font-mono rounded transition-colors ${
                  timerPresetSec === p.sec
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTimerRunning((r) => !r)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
            >
              {timerRunning ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Démarrer</span>
                </>
              )}
            </button>
            <button
              type="button"
              aria-label="Remettre le chrono à zéro"
              onClick={() => {
                setTimerRunning(false);
                setSecondsLeft(timerPresetSec);
              }}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-800 rounded-md"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>

      {/* PARTIE 1 : Exercices ("Ce qu'on fait") + Explication ("Pourquoi on le fait") */}
      <div id="partie-entrainement" className="space-y-6 scroll-mt-20">
        {currentDay.blocks.map((block, blockIdx) => (
          <section
            key={block.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            {block.blockTitle && (
              <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between gap-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  {String(blockIdx + 1).padStart(2, '0')}. {block.blockTitle}
                </h3>
                <span className="text-xs text-slate-500">
                  Ce qu’on fait & Pourquoi
                </span>
              </div>
            )}

            {/* Ce qu'on fait */}
            <div className="p-6 space-y-5">
              <div className="text-xs font-semibold text-slate-500">
                Ce qu’on fait
              </div>

              <div className="divide-y divide-slate-100 space-y-4">
                {block.exercises.map((ex, exIdx) => {
                  const computedLoad = formatComputedLoad(ex, userMaxes);
                  const setsState =
                    completedSets[ex.id] ?? Array(ex.setsCount).fill(false);

                  return (
                    <div key={ex.id} className={exIdx > 0 ? 'pt-4' : ''}>
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h4 className="text-base font-semibold text-slate-900">
                              {ex.name}
                            </h4>
                            {computedLoad && (
                              <span className="font-mono tabular-nums text-xs font-semibold text-red-700">
                                Charge estimée : {computedLoad}
                              </span>
                            )}
                          </div>

                          <p className="text-sm text-slate-700 leading-relaxed">
                            {ex.prescription}
                          </p>

                          {ex.pairedWithNext && (
                            <p className="text-xs font-medium text-slate-500">
                              Enchaînement immédiat (contraste PAP) avec l’exercice suivant.
                            </p>
                          )}
                        </div>

                        {currentDay.id !== 'dimanche' && (
                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: ex.setsCount }, (_, sIdx) => {
                                const done = Boolean(setsState[sIdx]);
                                return (
                                  <button
                                    key={sIdx}
                                    type="button"
                                    onClick={() => {
                                      onToggleSet(ex.id, sIdx, ex.setsCount);
                                      if (!done && ex.restSeconds) {
                                        startTimer(ex.restSeconds);
                                      }
                                    }}
                                    aria-label={`Valider série ${sIdx + 1} de ${ex.name}`}
                                    className={`inline-flex items-center justify-center h-8 px-2.5 text-xs font-mono tabular-nums rounded-md border transition-colors ${
                                      done
                                        ? 'bg-emerald-600 border-emerald-600 text-white'
                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    {done ? (
                                      <Check className="h-3.5 w-3.5" />
                                    ) : (
                                      `S${sIdx + 1}`
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {ex.restSeconds && (
                              <button
                                type="button"
                                onClick={() => startTimer(ex.restSeconds!)}
                                className="inline-flex items-center gap-1 px-2.5 h-8 text-xs font-mono text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
                              >
                                <Timer className="h-3 w-3" />
                                <span>{formatSecLabel(ex.restSeconds)}</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pourquoi on le fait */}
            <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 space-y-2.5">
              <div className="text-xs font-semibold text-red-700">
                {block.whyTitle}
              </div>
              <div className="space-y-2 text-sm text-slate-700 leading-relaxed max-w-4xl">
                {block.whyParagraphs.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* PARTIE 2 : Le Programme d'Alimentation directement intégré sur la page du jour */}
      <div className="pt-4 border-t border-slate-200">
        <NutritionPlanView
          bodyweightKg={userMaxes.bodyweightKg}
          onUpdateBodyweight={onUpdateBodyweight}
          selectedDay={currentDay}
        />
      </div>
    </div>
  );
}
