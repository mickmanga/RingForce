import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Dumbbell } from 'lucide-react';
import { DayId, UserMaxes } from '../types/program';
import { WEEKLY_PROGRAM } from '../data/boxingProgramData';

interface WeekOverviewViewProps {
  userMaxes: UserMaxes;
  onUpdateMaxes: (maxes: UserMaxes) => void;
  onSelectDayAndOpen: (dayId: DayId) => void;
}

export function WeekOverviewView({
  userMaxes,
  onUpdateMaxes,
  onSelectDayAndOpen,
}: WeekOverviewViewProps) {
  const [draft, setDraft] = useState<UserMaxes>(userMaxes);
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMaxes(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Visual Split + 1RM Calibration */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-medium text-slate-500">
              Calibrage des charges en kg
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              Vos Maximums (1RM) pour le programme
            </h2>
            <p className="text-sm text-slate-600">
              Renseignez vos maximums actuels : les pourcentages du lundi (87–90 %, 85–88 %) et du mercredi (75 %, 60 %) afficheront automatiquement la fourchette de charge exacte en kg.
            </p>
          </div>

          {saved && (
            <div
              role="status"
              className="bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2.5 rounded-lg flex items-center gap-2 text-xs font-medium"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Maximums mis à jour sur tout le programme.</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Trap Bar Deadlift ou Squat (1RM kg)
                </label>
                <input
                  type="number"
                  min="20"
                  max="400"
                  value={draft.deadliftOrSquat}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      deadliftOrSquat: parseInt(e.target.value, 10) || 100,
                    })
                  }
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-200 rounded-lg bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Développé couché (1RM kg)
                </label>
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={draft.benchPress}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      benchPress: parseInt(e.target.value, 10) || 80,
                    })
                  }
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-200 rounded-lg bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Split Squat Bulgare (1RM total kg)
                </label>
                <input
                  type="number"
                  min="10"
                  max="250"
                  value={draft.bulgarianSplitSquat}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      bulgarianSplitSquat: parseInt(e.target.value, 10) || 60,
                    })
                  }
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-200 rounded-lg bg-white text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  High Pull / Tirage haut (1RM kg)
                </label>
                <input
                  type="number"
                  min="20"
                  max="250"
                  value={draft.highPull}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      highPull: parseInt(e.target.value, 10) || 70,
                    })
                  }
                  className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-200 rounded-lg bg-white text-slate-900"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Enregistrer mes max
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-900">
          {!imgError ? (
            <img
              src="/src/assets/images/boxing_strength_banner_1794852385134.jpg"
              alt="Boxe et rack de force avec disques olympiques"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover lg:absolute lg:inset-0"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-slate-300 bg-slate-900">
              <Dumbbell className="h-10 w-10 mb-2 text-red-500" />
              <span className="text-sm font-medium">RingForce · Force & Boxe</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="text-xs text-slate-300">Architecture hebdomadaire</div>
            <div className="font-display text-xl font-bold">
              Force PAP · Balistique · Pliométrie · Ring
            </div>
          </div>
        </div>
      </section>

      {/* Complete 7-Day Schedule Summary Table */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-base font-semibold text-slate-900">
            Vue d’ensemble de la semaine (Lundi à Dimanche)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cliquez sur un jour pour afficher les exercices détaillés et leur explication physiologique.
          </p>
        </div>

        <div className="divide-y divide-slate-200">
          {WEEKLY_PROGRAM.map((day) => {
            const exerciseNames = day.blocks
              .flatMap((b) => b.exercises)
              .map((e) => e.name)
              .join(' · ');

            return (
              <div
                key={day.id}
                className="px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-red-600">{day.dayName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{day.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      ~{day.carbTargetGrams75kg} g glucides
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900">{day.title}</div>
                  <p className="text-xs text-slate-600 line-clamp-2">{exerciseNames}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectDayAndOpen(day.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 self-start md:self-center"
                >
                  <span>Ouvrir {day.dayName}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
