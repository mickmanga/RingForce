import React from 'react';
import { ChevronRight, Menu } from 'lucide-react';
import { AppSection, DayId } from '../types/program';
import { WEEKLY_PROGRAM } from '../data/boxingProgramData';

interface TopBarProps {
  activeSection: AppSection;
  selectedDayId: DayId;
  onOpenMobile: () => void;
  onNextDay: () => void;
  onGoToDayView: () => void;
}

const SECTION_LABELS: Record<AppSection, string> = {
  day_by_day: 'Programme d’Entraînement',
  nutrition: 'Programme d’Alimentation',
  week_overview: 'Vue Semaine & Max (1RM)',
};

export function TopBar({
  activeSection,
  selectedDayId,
  onOpenMobile,
  onNextDay,
  onGoToDayView,
}: TopBarProps) {
  const currentDay = WEEKLY_PROGRAM.find((d) => d.id === selectedDayId);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobile}
          aria-label="Ouvrir le menu"
          className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-md"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-sm min-w-0 truncate">
          <span className="font-medium text-slate-500 hidden sm:inline whitespace-nowrap">
            RingForce
          </span>
          <span className="text-slate-300 hidden sm:inline" aria-hidden="true">
            /
          </span>
          <h1 className="font-sans text-base font-semibold text-slate-900 truncate">
            {SECTION_LABELS[activeSection]}
          </h1>
          {activeSection === 'day_by_day' && currentDay && (
            <>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <span className="text-xs font-medium text-red-600 whitespace-nowrap shrink-0">
                {currentDay.dayName}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {activeSection === 'day_by_day' ? (
          <button
            type="button"
            onClick={onNextDay}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Jour suivant</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onGoToDayView}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Programme du jour</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </button>
        )}
      </div>
    </header>
  );
}
