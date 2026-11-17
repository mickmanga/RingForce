import {
  DayProgram,
  MealSection,
  SupplementItem,
  UserMaxes,
} from '../types/program';

export const DEFAULT_USER_MAXES: UserMaxes = {
  bodyweightKg: 75,
  deadliftOrSquat: 140,
  benchPress: 95,
  bulgarianSplitSquat: 70,
  highPull: 80,
};

export const WEEKLY_PROGRAM: DayProgram[] = [
  {
    id: 'lundi',
    dayName: 'Lundi',
    shortName: 'Lun',
    title: 'Force Maximale & Contraste PAP (Bas du corps + Poussée)',
    categoryLabel: 'Force & Puissance PAP',
    carbLevelLabel: 'Jour dur · ~400 g glucides (profil 75 kg)',
    carbTargetGrams75kg: 400,
    dailySupplementNote: 'Créatine monohydrate (5 g) après la séance.',
    blocks: [
      {
        id: 'lun_pap_lower',
        blockTitle: 'Bloc 1 — Contraste PAP Bas du corps',
        exercises: [
          {
            id: 'lun_trap_bar',
            name: 'Trap Bar Deadlift (ou Squat)',
            prescription: '4 séries de 3 reps à 87-90 % du max (repos 45 sec)',
            setsCount: 4,
            restLabel: '45 sec avant les sauts · 3 min 30 entre les blocs',
            restSeconds: 45,
            maxKey: 'deadliftOrSquat',
            pctMin: 0.87,
            pctMax: 0.90,
            pairedWithNext: true,
          },
          {
            id: 'lun_box_jumps',
            name: 'Box Jumps (sauts sur boîte haute)',
            prescription: 'Enchaîné immédiatement : 4 sauts explosifs · 3 min 30 de repos entre les blocs',
            setsCount: 4,
            restLabel: '3 min 30 entre les blocs',
            restSeconds: 210,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Soulever lourd oblige le cerveau à recruter les fibres rapides IIx (les plus puissantes) et déclenche un état d'hyper-excitation électrique appelé Potentiation Post-Activation (PAP). En enchaînant immédiatement avec un saut léger, le cerveau applique cette force maximale à haute vitesse, ce qui augmente votre accélération de frappe (RFD).",
        ],
      },
      {
        id: 'lun_pap_push',
        blockTitle: 'Bloc 2 — Contraste PAP Poussée',
        exercises: [
          {
            id: 'lun_bench',
            name: 'Développé couché',
            prescription: '4 séries de 3 reps à 85-88 % du max (repos 45 sec)',
            setsCount: 4,
            restLabel: '45 sec avant les lancers · 3 min entre les blocs',
            restSeconds: 45,
            maxKey: 'benchPress',
            pctMin: 0.85,
            pctMax: 0.88,
            pairedWithNext: true,
          },
          {
            id: 'lun_landmine_throws',
            name: 'Landmine Punch Throws',
            prescription: 'Enchaîné immédiatement : 4 projections explosives par bras d’une barre en garde de boxe · 3 min de repos',
            setsCount: 4,
            restLabel: '3 min de repos',
            restSeconds: 180,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Même mécanisme de Potentiation Post-Activation (PAP) appliqué à la poussée horizontale : la charge lourde au développé couché sur-active les fibres rapides IIx du haut du corps, et la projection explosive immédiate en garde de boxe transfère ce pic électrique directement dans la vitesse de frappe (RFD).",
        ],
      },
      {
        id: 'lun_pullups',
        blockTitle: 'Bloc 3 — Tirage lourd antagoniste',
        exercises: [
          {
            id: 'lun_weighted_pullups',
            name: 'Tractions lestées',
            prescription: '3 séries de 4 reps lourdes (2 min de repos)',
            setsCount: 3,
            restLabel: '2 min de repos',
            restSeconds: 120,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Les tractions renforcent le dos et l'arrière de l'épaule pour freiner le bras en fin de coup et éviter les blessures (coiffe des rotateurs, tendons du coude et de l'épaule lors des coups lancés à vide).",
        ],
      },
      {
        id: 'lun_ab_wheel',
        blockTitle: 'Bloc 4 — Gainage anti-extension',
        exercises: [
          {
            id: 'lun_ab_wheel_ex',
            name: 'Ab Wheel (roulette abdominale)',
            prescription: '3 séries de 6 à 8 reps lentes (90 sec de repos)',
            setsCount: 3,
            restLabel: '90 sec de repos',
            restSeconds: 90,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "La roulette abdominale rigidifie le tronc pour ne perdre aucune énergie entre les jambes et les poings.",
        ],
      },
    ],
  },
  {
    id: 'mardi',
    dayName: 'Mardi',
    shortName: 'Mar',
    title: 'Boxe — Transfert d’impact lourd',
    categoryLabel: 'Boxe · Puissance pure',
    carbLevelLabel: 'Jour modéré-actif · ~300-340 g glucides (profil 75 kg)',
    carbTargetGrams75kg: 320,
    dailySupplementNote: 'Créatine (5 g) après la séance · Boisson eau + sel + citron pendant le sac.',
    blocks: [
      {
        id: 'mar_heavy_bag',
        blockTitle: 'Séance sur sac lourd — Impact maximal',
        exercises: [
          {
            id: 'mar_bag_power',
            name: 'Coups isolés & enchaînements courts (2 coups max) à 100 %',
            prescription: 'Frappes à 100 % de puissance sur sac lourd · 20 à 30 sec de récupération complète entre chaque frappe',
            setsCount: 6,
            restLabel: '20 à 30 sec entre chaque frappe',
            restSeconds: 25,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Cela permet de transférer la force nerveuse gagnée la veille dans le geste technique exact.",
          "Les longs temps de repos évitent la fatigue et permettent de travailler le double pic d'activation musculaire : départ explosif, relâchement total du bras pendant le trajet (pour la vitesse), et contraction brutale de tout le corps à la milliseconde de l'impact (pour verrouiller le poignet et transférer tout votre poids dans la cible).",
        ],
      },
    ],
  },
  {
    id: 'mercredi',
    dayName: 'Mercredi',
    shortName: 'Mer',
    title: 'Puissance Balistique & Rotation (Chaîne cinétique)',
    categoryLabel: 'Balistique & Rotation',
    carbLevelLabel: 'Jour dur · ~400 g glucides (profil 75 kg)',
    carbTargetGrams75kg: 400,
    dailySupplementNote: 'Créatine (5 g) après la séance.',
    blocks: [
      {
        id: 'mer_medball',
        blockTitle: 'Bloc 1 — Projection rotative sans freinage',
        exercises: [
          {
            id: 'mer_medball_throw',
            name: 'Medicine Ball Rotational Throw',
            prescription: '4 séries de 4 lancers explosifs par côté contre un mur avec un médecine-ball de 4 à 6 kg (repos 2 min 30)',
            setsCount: 4,
            restLabel: '2 min 30 de repos',
            restSeconds: 150,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Contrairement à la musculation classique où l'on ralentit la barre en fin de mouvement, le lancer de médecine-ball supprime toute phase de freinage et entraîne la déconnexion hanche-épaule (la hanche pivote avant l'épaule pour créer un effet de fouet).",
        ],
      },
      {
        id: 'mer_split_squat',
        blockTitle: 'Bloc 2 — Blocage de la jambe avant',
        exercises: [
          {
            id: 'mer_bulgarian',
            name: 'Split Squat Bulgare explosif',
            prescription: '3 séries de 5 reps par jambe à 75 % du max (repos 2 min 30)',
            setsCount: 3,
            restLabel: '2 min 30 de repos',
            restSeconds: 150,
            maxKey: 'bulgarianSplitSquat',
            pctMin: 0.75,
            pctMax: 0.75,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Le Split Squat renforce la capacité de la jambe avant à bloquer net votre avancée pour catapulter le haut du corps.",
        ],
      },
      {
        id: 'mer_high_pull',
        blockTitle: 'Bloc 3 — Triple extension explosive',
        exercises: [
          {
            id: 'mer_high_pull_ex',
            name: 'High Pull (tirage haut explosif)',
            prescription: '3 séries de 4 reps à 60 % du max (repos 2 min 30)',
            setsCount: 3,
            restLabel: '2 min 30 de repos',
            restSeconds: 150,
            maxKey: 'highPull',
            pctMin: 0.60,
            pctMax: 0.60,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Développe la vitesse d'extension complète des hanches et des chevilles associée à un tirage rapide des trapèzes et des dorsaux, en améliorant la coordination de la chaîne postérieure sur les accélérations courtes.",
        ],
      },
      {
        id: 'mer_pallof',
        blockTitle: 'Bloc 4 — Anti-rotation des obliques',
        exercises: [
          {
            id: 'mer_pallof_ex',
            name: 'Pallof Press explosif (à la poulie ou élastique)',
            prescription: '3 séries de 8 reps par côté avec maintien de 2 sec bras tendus (repos 90 sec)',
            setsCount: 3,
            restLabel: '90 sec de repos',
            restSeconds: 90,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Le Pallof Press apprend aux obliques à résister à la torsion pour transférer la force sans fuite.",
        ],
      },
      {
        id: 'mer_wrist',
        blockTitle: 'Bloc 5 — Solidité de l’avant-bras & du poignet',
        exercises: [
          {
            id: 'mer_wrist_roller',
            name: 'Enrouleur de poignet (Wrist Roller)',
            prescription: '3 séries de 10 reps (repos 60 sec)',
            setsCount: 3,
            restLabel: '60 sec de repos',
            restSeconds: 60,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "L'enrouleur de poignet bétonne l'articulation pour encaisser l'impact.",
        ],
      },
    ],
  },
  {
    id: 'jeudi',
    dayName: 'Jeudi',
    shortName: 'Jeu',
    title: 'Boxe — Vitesse gestuelle & Technique',
    categoryLabel: 'Boxe · Récupération nerveuse active',
    carbLevelLabel: 'Jour modéré · ~300 g glucides (profil 75 kg)',
    carbTargetGrams75kg: 300,
    dailySupplementNote: 'Créatine (5 g) après la séance.',
    blocks: [
      {
        id: 'jeu_tech',
        blockTitle: 'Séance technique sans force brute',
        exercises: [
          {
            id: 'jeu_shadow_pads',
            name: 'Shadow boxing, pattes d’ours & sparring léger à thème',
            prescription: 'Travail fluide axé sur le relâchement, la vitesse gestuelle et les déplacements, sans recherche de puissance brute',
            setsCount: 4,
            restLabel: '1 min entre les rounds',
            restSeconds: 60,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Le système nerveux et les tendons ont besoin de récupérer des séances lourdes du lundi et du mercredi. Cette séance entretient la coordination fine, les automatismes et la fluidité sans accumuler de fatigue centrale ni de micro-déchirures musculaires.",
        ],
      },
    ],
  },
  {
    id: 'vendredi',
    dayName: 'Vendredi',
    shortName: 'Ven',
    title: 'Vitesse-Force, Pliométrie & Raideur Tendineuse',
    categoryLabel: 'Pliométrie & Tendons',
    carbLevelLabel: 'Jour dur · ~400 g glucides (profil 75 kg)',
    carbTargetGrams75kg: 400,
    dailySupplementNote:
      '45 min avant la séance : Collagène hydrolysé (15 g) + Vitamine C (100 mg) · Créatine (5 g) après.',
    blocks: [
      {
        id: 'ven_plyo',
        blockTitle: 'Bloc 1 — Pliométrie courte & effet ressort (< 180 ms)',
        exercises: [
          {
            id: 'ven_drop_jumps',
            name: 'Drop Jumps (sauts en contrebas d’une boîte de 30-40 cm)',
            prescription: '4 séries de 4 sauts (repos 2 min 30)',
            setsCount: 4,
            restLabel: '2 min 30 de repos',
            restSeconds: 150,
          },
          {
            id: 'ven_plyo_pushups',
            name: 'Pompes claquées (pliométriques)',
            prescription: '4 séries de 4 reps (repos 2 min)',
            setsCount: 4,
            restLabel: '2 min de repos',
            restSeconds: 120,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Sur les Drop Jumps et pompes claquées, le but est de rebondir au sol le plus vite possible (< 180 ms) pour augmenter la raideur élastique des tendons : ils se comportent comme des ressorts qui renvoient l'énergie gratuitement sans consommer d'ATP.",
        ],
      },
      {
        id: 'ven_band_shadow',
        blockTitle: 'Bloc 2 — Vitesse maximale assistée par élastique',
        exercises: [
          {
            id: 'ven_band_punches',
            name: 'Shadow boxing avec bande élastique légère',
            prescription: '4 séries de 6 frappes par bras à vitesse maximale (repos 2 min)',
            setsCount: 4,
            restLabel: '2 min de repos',
            restSeconds: 120,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Habitue le système nerveux à accélérer le coup dès les premiers millimètres contre une résistance légère et progressive, améliorant la vitesse de démarrage sans surcharger les articulations.",
        ],
      },
      {
        id: 'ven_isometrics',
        blockTitle: 'Bloc 3 — Levée des freins nerveux (Organes de Golgi)',
        exercises: [
          {
            id: 'ven_iso_pull',
            name: 'Isométrie maximale (tirage contre une barre bloquée et immobile)',
            prescription: '3 séries de 4 secondes d’effort à 100 % (repos 2 min)',
            setsCount: 3,
            restLabel: '2 min de repos',
            restSeconds: 120,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Tirer à 100 % contre une barre immobile désactive les organes tendineux de Golgi (les capteurs de sécurité du corps qui brident votre force par peur de la blessure).",
        ],
      },
      {
        id: 'ven_neck_face',
        blockTitle: 'Bloc 4 — Absorption des chocs & équilibre scapulaire',
        exercises: [
          {
            id: 'ven_neck_face_ex',
            name: 'Gainage du cou (4 directions) + Face Pulls',
            prescription: '3 séries de 15 reps (repos 60 sec)',
            setsCount: 3,
            restLabel: '60 sec de repos',
            restSeconds: 60,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Le travail du cou absorbe les chocs pour prévenir les KO, pendant que les Face Pulls protègent la santé de l'arrière d'épaule face au volume de frappes.",
        ],
      },
    ],
  },
  {
    id: 'samedi',
    dayName: 'Samedi',
    shortName: 'Sam',
    title: 'Conditionnement Métabolique (Endurance de puissance)',
    categoryLabel: 'Métabolique & Rounds',
    carbLevelLabel: 'Jour dur · ~400 g glucides (profil 75 kg)',
    carbTargetGrams75kg: 400,
    dailySupplementNote: 'Créatine (5 g) après la séance · Boisson eau + sel + citron pendant les rounds.',
    blocks: [
      {
        id: 'sam_sprints',
        blockTitle: 'Bloc 1 — Sprints alactiques (ATP-PCr)',
        exercises: [
          {
            id: 'sam_sprint_6_8',
            name: 'Sprints courts de 6 à 8 secondes à fond (Assault Bike ou sac de frappe)',
            prescription: '8 à 10 répétitions de 6-8 sec à fond suivies de 50 secondes de repos',
            setsCount: 8,
            restLabel: '50 sec de repos',
            restSeconds: 50,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Les sprints de 6-8 secondes entraînent la filière ATP-PCr, le carburant pur des enchaînements explosifs.",
        ],
      },
      {
        id: 'sam_rounds',
        blockTitle: 'Bloc 2 — Rounds de boxe à haute intensité',
        exercises: [
          {
            id: 'sam_high_rounds',
            name: 'Rounds de boxe à haute intensité',
            prescription: 'Enchaînés après les sprints · Rythme soutenu de combat (rounds de 3 min)',
            setsCount: 4,
            restLabel: '1 min entre les rounds',
            restSeconds: 60,
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "Les rounds intenses développent votre capacité aérobie (VO₂max), indispensable pour éliminer l'acidité musculaire (ions H⁺) et recharger vos batteries entre deux échanges afin de frapper aussi fort au dernier round qu'au premier.",
        ],
      },
    ],
  },
  {
    id: 'dimanche',
    dayName: 'Dimanche',
    shortName: 'Dim',
    title: 'Repos complet & Récupération',
    categoryLabel: 'Récupération SNC',
    carbLevelLabel: 'Jour de repos · ~185 g glucides (profil 75 kg)',
    carbTargetGrams75kg: 185,
    dailySupplementNote: 'Magnésium bisglycinate (350 mg) avant de dormir · Glucides abaissés à 185 g.',
    blocks: [
      {
        id: 'dim_rest',
        blockTitle: 'Protocole de régénération nerveuse et tissulaire',
        exercises: [
          {
            id: 'dim_walk_stretch',
            name: 'Marche légère, étirements doux & sommeil optimal',
            prescription: 'Zéro entraînement intense · 20-30 min de marche tranquille, mobilité douce et coucher tôt',
            setsCount: 1,
            restLabel: 'Repos complet',
          },
        ],
        whyTitle: 'Pourquoi on le fait',
        whyParagraphs: [
          "La progression nerveuse et tendineuse ne se fait pas pendant l'effort mais pendant le repos. C'est durant le sommeil profond que le système nerveux central se régénère et que l'hormone de croissance répare les tissus.",
        ],
      },
    ],
  },
];

export const NUTRITION_MEALS: MealSection[] = [
  {
    id: 'breakfast',
    orderLabel: '1. Petit-déjeuner',
    title: 'Carburant nerveux et hormonal',
    subtitle: 'Premier apport de la journée',
    whatItems: [
      {
        text: "3 œufs entiers + 80 g de flocons d'avoine + 100 g de fruits rouges + 1 banane mûre avec 1 c. à café de miel.",
      },
    ],
    whyPoints: [
      {
        nutrientOrFood: 'Les œufs',
        explanation:
          "Apportent de la leucine (qui lance la réparation musculaire), du cholestérol (matière première pour fabriquer la testostérone), de la vitamine D (force explosive) et de la choline (qui fabrique l'acétylcholine, le messager électrique entre le cerveau et le muscle).",
      },
      {
        nutrientOrFood: "L'avoine",
        explanation:
          "Fournit des glucides lents, du magnésium et des vitamines B pour fabriquer de l'énergie (ATP) sans coup de fatigue.",
      },
      {
        nutrientOrFood: 'Les fruits rouges',
        explanation:
          "Apportent de la vitamine C et des antioxydants qui protègent les cellules contre l'inflammation.",
      },
      {
        nutrientOrFood: 'La banane et le miel',
        explanation:
          'Rechargent le glycogène du foie pour le cerveau et apportent du potassium pour éviter les crampes.',
      },
    ],
  },
  {
    id: 'lunch',
    orderLabel: '2. Déjeuner',
    title: 'Recharge énergétique et oxygénation',
    subtitle: 'Repas structurant de mi-journée',
    whatItems: [
      {
        text: "160 g de viande blanche (poulet/dinde) ou bœuf maigre 5 % + 120 g de riz basmati (ou 350 g de patate douce) + 200 g de légumes verts (brocolis, épinards) + 1 c. à soupe d'huile d'olive.",
      },
    ],
    whyPoints: [
      {
        nutrientOrFood: 'La viande',
        explanation:
          "Apporte des protéines pour réparer les fibres, du zinc (immunité et hormones) et du fer héminique (dans le bœuf) pour fabriquer l'hémoglobine qui transporte l'oxygène dans le sang pendant les rounds.",
      },
      {
        nutrientOrFood: 'Le riz ou la patate douce',
        explanation:
          'Remplissent les réserves de glycogène des muscles pour les séances explosives, tout en apportant de la vitamine A (patate douce) qui protège les voies respiratoires.',
      },
      {
        nutrientOrFood: 'Les légumes verts',
        explanation:
          "Apportent du magnésium, du calcium et de la vitamine K qui solidifient les os (mains, côtes) et neutralisent l'acidité produite par le sport.",
      },
      {
        nutrientOrFood: "L'huile d'olive",
        explanation:
          "Fournit des lipides protecteurs et permet d'absorber les vitamines A, D, E et K.",
      },
    ],
  },
  {
    id: 'pre_workout',
    orderLabel: '3. Collation Pré-Entraînement & Boisson d’Effort',
    title: '60 min avant et pendant la séance',
    subtitle: 'Soutien électrique, musculaire et hydratation',
    whatItems: [
      {
        label: 'Avant (60 min)',
        text: '2 tranches de pain au levain (ou 4 galettes de riz) + 1 compote sans sucre + 25 g de whey isolate (ou 200 g de fromage blanc 0 %) + 1 café (optionnel).',
      },
      {
        label: 'Pendant',
        text: "750 ml d'eau + 1 pincée de sel de mer + jus d'un demi-citron.",
      },
    ],
    whyPoints: [
      {
        nutrientOrFood: 'Le pain et la compote',
        explanation:
          "Donnent du glucose rapide au cerveau pour éviter la fatigue nerveuse sans alourdir l'estomac.",
      },
      {
        nutrientOrFood: 'La whey / fromage blanc & le café',
        explanation:
          "La whey / fromage blanc met des acides aminés dans le sang pour empêcher le corps de détruire ses propres muscles pendant l'effort. Le café accélère la décharge électrique des nerfs.",
      },
      {
        nutrientOrFood: "L'eau, le sel et le citron",
        explanation:
          "L'eau, le sel (sodium) et le citron (vitamine C) maintiennent le volume sanguin et assurent le passage de l'influx nerveux vers les muscles (pompe sodium/potassium).",
      },
    ],
  },
  {
    id: 'dinner',
    orderLabel: '4. Dîner Post-Entraînement',
    title: 'Réparation nerveuse, tendineuse et sommeil',
    subtitle: 'Repas du soir et récupération nocturne',
    whatItems: [
      {
        text: "170 g de poisson gras (saumon, maquereau, sardines — 3x/semaine) ou poisson/viande blanche + 100 g de quinoa ou pâtes semi-complètes + 200 g de légumes variés + 1 c. à soupe d'huile de colza ou noix + 150 g de skyr avec 1 kiwi.",
      },
    ],
    whyPoints: [
      {
        nutrientOrFood: 'Les poissons gras',
        explanation:
          "Regorgent d'Oméga-3, de vitamine D, d'iode (pour la thyroïde) et de sélénium : les Oméga-3 assouplissent la membrane des neurones pour accélérer la vitesse de l'influx nerveux et calment l'inflammation des articulations.",
      },
      {
        nutrientOrFood: 'Le quinoa ou les pâtes',
        explanation:
          "Apportent du magnésium et déclenchent une légère sécrétion d'insuline qui aide le cerveau à produire de la mélatonine (l'hormone du sommeil profond).",
      },
      {
        nutrientOrFood: 'Le skyr et le kiwi',
        explanation:
          'Clôturent la journée : le skyr contient de la caséine (protéine lente qui nourrit les muscles pendant 7 heures la nuit) et du calcium, tandis que le kiwi est une bombe de vitamine C indispensable pour fabriquer le collagène qui répare et renforce vos tendons.',
      },
    ],
  },
];

export const STRATEGIC_SUPPLEMENTS: SupplementItem[] = [
  {
    id: 'creatine',
    name: 'Créatine monohydrate',
    dosageAndTiming: "5 g / jour après l'entraînement",
    why: "Augmente les réserves d'énergie immédiate (ATP-PCr) pour frapper plus fort et plus vite sur les séries explosives.",
  },
  {
    id: 'beta_alanine',
    name: 'Bêta-alanine',
    dosageAndTiming: '4,8 g / jour répartis aux repas',
    why: "Tamponne l'acidité musculaire (brûlure) lors des enchaînements longs pour garder de la vitesse en fin de round.",
  },
  {
    id: 'magnesium',
    name: 'Magnésium bisglycinate',
    dosageAndTiming: '350 mg avant de dormir',
    why: 'Détend les muscles, calme le système nerveux après les séances explosives et améliore la récupération nocturne.',
  },
  {
    id: 'collagen',
    name: 'Collagène hydrolysé + Vitamine C',
    dosageAndTiming: '15 g de collagène + 100 mg de Vitamine C · 45 min avant la séance du vendredi',
    why: 'Nourrit directement les tendons avant la pliométrie pour renforcer leur effet ressort et prévenir les tendinites.',
  },
];
