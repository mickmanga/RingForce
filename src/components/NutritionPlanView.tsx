import React, { useEffect, useState } from 'react';
import {
  NUTRITION_MEALS,
  STRATEGIC_SUPPLEMENTS,
} from '../data/boxingProgramData';
import { DayProgram } from '../types/program';

interface NutritionPlanViewProps {
  bodyweightKg: number;
  onUpdateBodyweight: (kg: number) => void;
  selectedDay?: DayProgram;
}

export function NutritionPlanView({
  bodyweightKg,
  onUpdateBodyweight,
  selectedDay,
}: NutritionPlanViewProps) {
  const [selectedDayMode, setSelectedDayMode] = useState<'hard' | 'sunday'>('hard');

  useEffect(() => {
    if (!selectedDay) return;
    setSelectedDayMode(selectedDay.id === 'dimanche' ? 'sunday' : 'hard');
  }, [selectedDay]);

  const ratio = bodyweightKg / 75;
  const proteinG = Math.round(150 * ratio);
  const fatMinG = Math.round(75 * ratio);
  const fatMaxG = Math.round(90 * ratio);
  const carbsHardG = Math.round(400 * ratio);
  const carbsSundayG = Math.round(185 * ratio);

  const activeDayCarbsG = selectedDay
    ? Math.round(selectedDay.carbTargetGrams75kg * ratio)
    : selectedDayMode === 'hard'
    ? carbsHardG
    : carbsSundayG;

  const isRestDay = selectedDay?.id === 'dimanche';
  const isFriday = selectedDay?.id === 'vendredi';

  return (
    <div id="partie-alimentation" className="space-y-6 scroll-mt-20">
      {/* Calibration Header for 75 kg (adjustable) */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-slate-500">
              PARTIE 2 · Le Programme d’Alimentation
              {selectedDay ? ` · Calibré pour ${selectedDay.dayName}` : ''}
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-900 tracking-tight">
              {selectedDay
                ? `Alimentation du ${selectedDay.dayName} (Quoi manger et Pourquoi)`
                : 'Plan Nutrition & Compléments Stratégiques'}
            </h2>
            <p className="text-sm text-slate-600 max-w-2xl">
              Calibré pour un profil type de <strong className="font-semibold text-slate-900">75 kg</strong> (ajustable ci-contre). Chaque repas détaille ce qu’on mange suivi de son rôle physiologique.
            </p>
            {selectedDay?.dailySupplementNote && (
              <p className="text-xs font-medium text-red-700 pt-1">
                Priorité du {selectedDay.dayName.toLowerCase()} : {selectedDay.dailySupplementNote}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-3">
              <label
                htmlFor={selectedDay ? 'day-nutrition-bw' : 'nutrition-bw'}
                className="text-xs font-medium text-slate-700 whitespace-nowrap"
              >
                Votre poids (kg) :
              </label>
              <input
                id={selectedDay ? 'day-nutrition-bw' : 'nutrition-bw'}
                type="number"
                min="45"
                max="140"
                step="0.5"
                value={bodyweightKg}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  if (!Number.isNaN(v) && v >= 45 && v <= 140) {
                    onUpdateBodyweight(v);
                  }
                }}
                className="w-20 px-2.5 py-1 text-sm font-mono tabular-nums border border-slate-200 rounded-md bg-white text-slate-900"
              />
              {bodyweightKg !== 75 && (
                <button
                  type="button"
                  onClick={() => onUpdateBodyweight(75)}
                  className="text-xs font-medium text-red-600 hover:text-red-700 whitespace-nowrap"
                >
                  75 kg
                </button>
              )}
            </div>

            {!selectedDay && (
              <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setSelectedDayMode('hard')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDayMode === 'hard'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Jours durs
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedDayMode('sunday')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedDayMode === 'sunday'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Dimanche (repos)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4-Column Macro Targets Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-slate-200 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-slate-50/50">
          <div className="p-5">
            <div className="text-xs font-medium text-slate-500">Protéines / jour</div>
            <div className="font-display text-3xl font-bold text-slate-900 tabular-nums mt-0.5">
              ~{proteinG} g
            </div>
            <div className="text-xs text-slate-500 mt-0.5">2,0 g / kg de poids de corps</div>
          </div>

          <div className="p-5">
            <div className="text-xs font-medium text-slate-500">Lipides / jour</div>
            <div className="font-display text-3xl font-bold text-slate-900 tabular-nums mt-0.5">
              {fatMinG}–{fatMaxG} g
            </div>
            <div className="text-xs text-slate-500 mt-0.5">1,0–1,2 g / kg (hormones & neurones)</div>
          </div>

          <div className="p-5">
            <div className="text-xs font-medium text-slate-500">
              Glucides {selectedDay ? `(${selectedDay.dayName})` : selectedDayMode === 'hard' ? '(Jours durs)' : '(Dimanche)'}
            </div>
            <div className="font-display text-3xl font-bold text-red-600 tabular-nums mt-0.5">
              {activeDayCarbsG} g
            </div>
            <div className="text-xs text-slate-500 mt-0.5 font-mono tabular-nums">
              {isRestDay
                ? `Descendent à ${carbsSundayG} g le dimanche`
                : `Montent jusqu’à ${carbsHardG} g les jours durs`}
            </div>
          </div>

          <div className="p-5">
            <div className="text-xs font-medium text-slate-500">
              {isRestDay ? 'Hydratation (Repos)' : 'Boisson d’effort'}
            </div>
            <div className="font-display text-3xl font-bold text-slate-900 tabular-nums mt-0.5">
              {isRestDay ? '2,5 L' : '750 ml'}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {isRestDay
                ? 'Eau pure répartie sur la journée'
                : 'Eau + pincée sel de mer + ½ citron'}
            </div>
          </div>
        </div>
      </section>

      {/* Meals 1 to 4: What to Eat + Why We Eat It */}
      <div className="space-y-6">
        {NUTRITION_MEALS.map((meal) => {
          const isPreWorkoutOnRestDay =
            isRestDay && meal.id === 'pre_workout';

          return (
            <section
              key={meal.id}
              className={`bg-white border border-slate-200 rounded-xl overflow-hidden ${
                isPreWorkoutOnRestDay ? 'opacity-75' : ''
              }`}
            >
              <div className="px-6 py-4 border-b border-slate-200 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-xs font-medium text-slate-500">
                    {meal.orderLabel} · {meal.subtitle}
                    {isPreWorkoutOnRestDay
                      ? ' · Facultatif le dimanche (jour de repos, glucides réduits à 185 g)'
                      : ''}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
                    {meal.title}
                  </h3>
                </div>
              </div>

              {/* Ce qu'on mange / boit */}
              <div className="p-6 space-y-3">
                <div className="text-xs font-semibold text-slate-500">
                  Ce qu’on {meal.id === 'pre_workout' ? 'mange / boit' : 'mange'}
                </div>
                <div className="space-y-2">
                  {meal.whatItems.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed"
                    >
                      {item.label && (
                        <span className="font-semibold text-red-700 mr-2">
                          {item.label} :
                        </span>
                      )}
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Pourquoi on le mange / prend */}
              <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="text-xs font-semibold text-red-700">
                  Pourquoi on le {meal.id === 'pre_workout' ? 'prend' : 'mange'}
                </div>

                <div className="divide-y divide-slate-200/80">
                  {meal.whyPoints.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 ${
                        pIdx > 0 ? 'pt-3 mt-3' : ''
                      }`}
                    >
                      <div className="md:col-span-3 text-sm font-semibold text-slate-900">
                        {pt.nutrientOrFood}
                      </div>
                      <div className="md:col-span-9 text-sm text-slate-700 leading-relaxed">
                        {pt.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Section 5: Strategic Supplements (Quoi et Pourquoi) */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <div className="text-xs font-medium text-slate-500">
            5. Les 4 Compléments Stratégiques
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
            Quoi prendre et Pourquoi
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {STRATEGIC_SUPPLEMENTS.map((supp, idx) => {
            const highlightFriday = isFriday && supp.id === 'collagen';
            return (
              <div
                key={supp.id}
                className={`p-6 space-y-3 ${
                  idx >= 2 ? 'md:border-t md:border-slate-200' : ''
                } ${highlightFriday ? 'bg-amber-50/40' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-slate-900">{supp.name}</h4>
                    {highlightFriday && (
                      <span className="text-xs font-semibold text-red-700">
                        Clé du vendredi
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-red-700 font-medium mt-1">
                    Quoi & Quand : {supp.dosageAndTiming}
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 mb-1">
                    Pourquoi
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{supp.why}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
