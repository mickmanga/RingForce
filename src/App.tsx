/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { AppSection, DayId, UserMaxes } from './types/program';
import {
  DEFAULT_USER_MAXES,
  WEEKLY_PROGRAM,
} from './data/boxingProgramData';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DayByDayView } from './components/DayByDayView';
import { NutritionPlanView } from './components/NutritionPlanView';
import { WeekOverviewView } from './components/WeekOverviewView';

const STORAGE_KEYS = {
  maxes: 'ringforce_exact_maxes_v1',
  completedSets: 'ringforce_exact_sets_v1',
  selectedDay: 'ringforce_exact_day_v1',
};

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<AppSection>('day_by_day');
  const [selectedDayId, setSelectedDayId] = useState<DayId>(() =>
    loadStorage(STORAGE_KEYS.selectedDay, 'lundi')
  );
  const [userMaxes, setUserMaxes] = useState<UserMaxes>(() =>
    loadStorage(STORAGE_KEYS.maxes, DEFAULT_USER_MAXES)
  );
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>(
    () => loadStorage(STORAGE_KEYS.completedSets, {})
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.selectedDay, JSON.stringify(selectedDayId));
      localStorage.setItem(STORAGE_KEYS.maxes, JSON.stringify(userMaxes));
      localStorage.setItem(
        STORAGE_KEYS.completedSets,
        JSON.stringify(completedSets)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [selectedDayId, userMaxes, completedSets]);

  const handleNextDay = () => {
    const idx = WEEKLY_PROGRAM.findIndex((d) => d.id === selectedDayId);
    const nextIdx = (idx + 1) % WEEKLY_PROGRAM.length;
    setSelectedDayId(WEEKLY_PROGRAM[nextIdx].id);
  };

  const handlePrevDay = () => {
    const idx = WEEKLY_PROGRAM.findIndex((d) => d.id === selectedDayId);
    const prevIdx = (idx - 1 + WEEKLY_PROGRAM.length) % WEEKLY_PROGRAM.length;
    setSelectedDayId(WEEKLY_PROGRAM[prevIdx].id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSection !== 'day_by_day') return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowRight') {
        handleNextDay();
      } else if (e.key === 'ArrowLeft') {
        handlePrevDay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleToggleSet = (
    exerciseId: string,
    setIndex: number,
    totalSets: number
  ) => {
    setCompletedSets((prev) => {
      const current = prev[exerciseId]
        ? [...prev[exerciseId]]
        : Array(totalSets).fill(false);
      while (current.length < totalSets) current.push(false);
      current[setIndex] = !current[setIndex];
      return { ...prev, [exerciseId]: current };
    });
  };

  const handleResetDaySets = (dayId: DayId) => {
    const day = WEEKLY_PROGRAM.find((d) => d.id === dayId);
    if (!day) return;
    const exerciseIds = day.blocks.flatMap((b) => b.exercises.map((e) => e.id));
    setCompletedSets((prev) => {
      const next = { ...prev };
      for (const id of exerciseIds) {
        delete next[id];
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        selectedDayId={selectedDayId}
        onSelectDay={setSelectedDayId}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar
          activeSection={activeSection}
          selectedDayId={selectedDayId}
          onOpenMobile={() => setMobileOpen(true)}
          onNextDay={handleNextDay}
          onGoToDayView={() => setActiveSection('day_by_day')}
        />

        <main className="flex-1 px-4 sm:px-8 py-6 sm:py-8 max-w-[1440px] w-full mx-auto">
          {activeSection === 'day_by_day' && (
            <DayByDayView
              selectedDayId={selectedDayId}
              onSelectDay={setSelectedDayId}
              userMaxes={userMaxes}
              onUpdateBodyweight={(kg) =>
                setUserMaxes((prev) => ({ ...prev, bodyweightKg: kg }))
              }
              completedSets={completedSets}
              onToggleSet={handleToggleSet}
              onResetDaySets={handleResetDaySets}
            />
          )}

          {activeSection === 'nutrition' && (
            <NutritionPlanView
              bodyweightKg={userMaxes.bodyweightKg}
              onUpdateBodyweight={(kg) =>
                setUserMaxes((prev) => ({ ...prev, bodyweightKg: kg }))
              }
            />
          )}

          {activeSection === 'week_overview' && (
            <WeekOverviewView
              userMaxes={userMaxes}
              onUpdateMaxes={setUserMaxes}
              onSelectDayAndOpen={(dayId) => {
                setSelectedDayId(dayId);
                setActiveSection('day_by_day');
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
