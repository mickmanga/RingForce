import React from 'react';
import { CalendarDays, CalendarRange, Utensils, X } from 'lucide-react';
import { AppSection, DayId } from '../types/program';
import { WEEKLY_PROGRAM } from '../data/boxingProgramData';

interface SidebarProps {
  activeSection: AppSection;
  onSelectSection: (section: AppSection) => void;
  selectedDayId: DayId;
  onSelectDay: (dayId: DayId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: {
  id: AppSection;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: 'day_by_day', label: 'Programme Jour par Jour', icon: CalendarDays },
  { id: 'nutrition', label: 'Alimentation & Compléments', icon: Utensils },
  { id: 'week_overview', label: 'Vue Semaine & Max (1RM)', icon: CalendarRange },
];

export function Sidebar({
  activeSection,
  onSelectSection,
  selectedDayId,
  onSelectDay,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const navContent = (
    <div className="flex h-full flex-col justify-between bg-slate-950 text-slate-100 border-r border-slate-800">
      <div className="overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
          <button
            type="button"
            onClick={() => {
              onSelectSection('day_by_day');
              onCloseMobile();
            }}
            className="font-display text-2xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 text-left"
          >
            RingForce
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Fermer le menu"
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Navigation principale" className="px-3 py-5 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectSection(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-red-600 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-4 pt-3 pb-4 border-t border-slate-800/80">
          <div className="px-2 pb-2 text-xs font-medium text-slate-400">
            Accès rapide par jour
          </div>
          <div className="space-y-0.5">
            {WEEKLY_PROGRAM.map((day) => {
              const isSelected =
                activeSection === 'day_by_day' && selectedDayId === day.id;
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => {
                    onSelectDay(day.id);
                    onSelectSection('day_by_day');
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 text-xs rounded-md transition-colors text-left ${
                    isSelected
                      ? 'bg-slate-800 text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <span className="whitespace-nowrap">{day.dayName}</span>
                  <span className="text-[11px] text-slate-500 truncate">
                    {day.categoryLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
        <div className="font-medium text-slate-200">Programme Boxe Force</div>
        <div className="font-mono tabular-nums text-slate-400">
          7 jours · Profil 75 kg
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        {navContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative w-64 max-w-[80vw] h-full z-10">
            {navContent}
          </aside>
        </div>
      )}
    </>
  );
}
