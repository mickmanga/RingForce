export type DayId =
  | 'lundi'
  | 'mardi'
  | 'mercredi'
  | 'jeudi'
  | 'vendredi'
  | 'samedi'
  | 'dimanche';

export type MaxLiftKey =
  | 'deadliftOrSquat'
  | 'benchPress'
  | 'bulgarianSplitSquat'
  | 'highPull';

export interface UserMaxes {
  bodyweightKg: number;
  deadliftOrSquat: number;
  benchPress: number;
  bulgarianSplitSquat: number;
  highPull: number;
}

export interface ExerciseStep {
  id: string;
  name: string;
  prescription: string; // e.g., "4 séries de 3 reps à 87-90 % du max"
  setsCount: number;
  restLabel: string;
  restSeconds?: number;
  maxKey?: MaxLiftKey;
  pctMin?: number;
  pctMax?: number;
  pairedWithNext?: boolean;
}

export interface TrainingBlock {
  id: string;
  blockTitle?: string;
  exercises: ExerciseStep[];
  whyTitle: string;
  whyParagraphs: string[];
}

export interface DayProgram {
  id: DayId;
  dayName: string;
  shortName: string;
  title: string;
  categoryLabel: string; // e.g., "Force & PAP", "Boxe", "Récupération"
  carbLevelLabel: string; // e.g., "Jours durs · ~400 g glucides"
  carbTargetGrams75kg: number;
  dailySupplementNote?: string;
  blocks: TrainingBlock[];
}

export interface WhyNutritionPoint {
  nutrientOrFood: string;
  explanation: string;
}

export interface MealSection {
  id: string;
  orderLabel: string;
  title: string;
  subtitle: string;
  whatItems: {
    label?: string; // e.g. "Avant", "Pendant"
    text: string;
  }[];
  whyPoints: WhyNutritionPoint[];
}

export interface SupplementItem {
  id: string;
  name: string;
  dosageAndTiming: string;
  why: string;
}

export type AppSection = 'day_by_day' | 'nutrition' | 'week_overview';
