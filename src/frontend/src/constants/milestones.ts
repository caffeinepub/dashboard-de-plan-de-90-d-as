import { formatDateRange } from '@/utils/dateUtils';

// Complete milestone data structure for the 6-phase, 18-milestone flight plan

export interface MilestoneData {
  phase: number;
  milestone: number;
  emoji: string;
  title: string;
  dayRange: string;
  dateRange: string;
  startDay: number;
  endDay: number;
  content: {
    description: string;
    items: string[];
    notes?: string[];
  };
}

export interface PhaseData {
  number: number;
  title: string;
  dayRange: string;
  dateRange: string;
  startDay: number;
  endDay: number;
}

export const PHASES: PhaseData[] = [
  { 
    number: 1, 
    title: 'Arquitectura Estratégica y Fundamentos', 
    dayRange: 'Días 1–14',
    startDay: 1,
    endDay: 14,
    dateRange: formatDateRange(1, 14),
  },
  { 
    number: 2, 
    title: 'Construcción Web + SEO Base', 
    dayRange: 'Días 15–30',
    startDay: 15,
    endDay: 30,
    dateRange: formatDateRange(15, 30),
  },
  { 
    number: 3, 
    title: 'Automatización y Backend', 
    dayRange: 'Días 31–45',
    startDay: 31,
    endDay: 45,
    dateRange: formatDateRange(31, 45),
  },
  { 
    number: 4, 
    title: 'Social y Activos Digitales', 
    dayRange: 'Días 46–60',
    startDay: 46,
    endDay: 60,
    dateRange: formatDateRange(46, 60),
  },
  { 
    number: 5, 
    title: 'Lanzamiento de Paid Ads', 
    dayRange: 'Días 61–75',
    startDay: 61,
    endDay: 75,
    dateRange: formatDateRange(61, 75),
  },
  { 
    number: 6, 
    title: 'Optimización y Escalado', 
    dayRange: 'Días 76–90',
    startDay: 76,
    endDay: 90,
    dateRange: formatDateRange(76, 90),
  },
];

export const MILESTONES: MilestoneData[] = [
  // PHASE 1: Arquitectura Estratégica y Fundamentos (Días 1-14)
  {
    phase: 1,
    milestone: 1,
    emoji: '1️⃣',
    title: 'Definición del Modelo de Negocio',
    dayRange: 'Días 1-3',
    startDay: 1,
    endDay: 3,
    dateRange: formatDateRange(1, 3),
    content: {
      description: 'Antes de tocar un dominio, define el modelo de negocio:',
      items: [
        '¿Exclusivo para 1 abogado o multi-abogado?',
        '¿Venta por firmado o por lead?',
        '¿Exclusividad geográfica?',
        '¿Vertical único o motor multi-industria?',
      ],
      notes: ['Definir esto evita rehacer todo en 60 días.'],
    },
  },
  {
    phase: 1,
    milestone: 2,
    emoji: '2️⃣',
    title: 'Estrategia de Dominio',
    dayRange: 'Días 4-6',
    startDay: 4,
    endDay: 6,
    dateRange: formatDateRange(4, 6),
    content: {
      description: 'Decisión recomendada: Empresa matriz neutral (ej: RHM Group LLC) + Dominio vertical dedicado para accidentes.',
      items: [
        'Incluya "Utah" o ciudad principal',
        'Incluya intención (accidente, lesiones, ayuda)',
        'Fácil de recordar',
        'Sin marca personal',
        '.com preferible',
        'Ejemplos: AyudaAccidenteUtah.com, LesionesUtah.com, UtahInjuryHelp.com, AccidenteLegalUtah.com',
      ],
      notes: [
        'Comprar también: Versión .net si disponible',
        'Variantes cercanas para protección',
      ],
    },
  },
  {
    phase: 1,
    milestone: 3,
    emoji: '3️⃣',
    title: 'Branding',
    dayRange: 'Días 7-10',
    startDay: 7,
    endDay: 10,
    dateRange: formatDateRange(7, 10),
    content: {
      description: 'No sobre-diseñar. Necesitas:',
      items: [
        'Logo limpio (azul oscuro + amarillo acento)',
        '1 tipografía principal',
        '1 secundaria',
        'Paleta definida (máx 3 colores)',
        'Versión horizontal y versión icono',
      ],
      notes: [
        'Mensaje de marca: "Conectamos personas lesionadas con abogados licenciados en Utah."',
        'No fingir ser firma si no lo son.',
      ],
    },
  },
  {
    phase: 1,
    milestone: 4,
    emoji: '4️⃣',
    title: 'Estructura Legal Básica',
    dayRange: 'Días 11-14',
    startDay: 11,
    endDay: 14,
    dateRange: formatDateRange(11, 14),
    content: {
      description: 'Documentos legales esenciales:',
      items: [
        'Términos y condiciones',
        'Política de privacidad',
        'Aviso de que no somos firma de abogados',
        'Disclosure de generación de leads',
        'Aviso de grabación si se usa call tracking',
      ],
      notes: ['Google revisa esto.'],
    },
  },

  // PHASE 2: Construcción Web + SEO Base (Días 15-30)
  {
    phase: 2,
    milestone: 5,
    emoji: '5️⃣',
    title: 'Arquitectura del Sitio',
    dayRange: 'Días 15-20',
    startDay: 15,
    endDay: 20,
    dateRange: formatDateRange(15, 20),
    content: {
      description: 'Estructura mínima del sitio:',
      items: [
        'Home (landing principal)',
        'Página "Cómo funciona"',
        'Página "Abogados en Utah"',
        'FAQ',
        'Política de privacidad',
        'Blog base',
      ],
      notes: [
        'Landing principal debe incluir: H1 claro, Subtítulo fuerte, CTA arriba del fold, Formulario multi-step, Prueba social (aunque sea estructural), FAQs optimizadas',
      ],
    },
  },
  {
    phase: 2,
    milestone: 6,
    emoji: '6️⃣',
    title: 'SEO Base',
    dayRange: 'Días 21-26',
    startDay: 21,
    endDay: 26,
    dateRange: formatDateRange(21, 26),
    content: {
      description: 'Antes de lanzar ads:',
      items: [
        'Keyword research específico Utah',
        'Identificar 10–15 keywords principales',
        'Crear 3–5 artículos pilar: Qué hacer después de un accidente en Utah, Plazo para demanda en Utah, Lesiones comunes en accidentes, ¿Qué pasa si no fue mi culpa?',
        'Optimizar: Meta titles, Meta descriptions, Schema FAQ, Schema LocalBusiness',
        'Velocidad (PageSpeed arriba de 80 móvil)',
      ],
    },
  },
  {
    phase: 2,
    milestone: 7,
    emoji: '7️⃣',
    title: 'Configuración Técnica',
    dayRange: 'Días 27-30',
    startDay: 27,
    endDay: 30,
    dateRange: formatDateRange(27, 30),
    content: {
      description: 'Herramientas de tracking y análisis:',
      items: [
        'Google Analytics 4',
        'Google Tag Manager',
        'Conversion tracking',
        'Pixel Meta',
        'Enhanced Conversions',
        'Eventos configurados',
        'Heatmap (Hotjar o similar)',
      ],
      notes: ['Sin datos no hay escala.'],
    },
  },

  // PHASE 3: Automatización y Backend (Días 31-45)
  {
    phase: 3,
    milestone: 8,
    emoji: '8️⃣',
    title: 'CRM',
    dayRange: 'Días 31-35',
    startDay: 31,
    endDay: 35,
    dateRange: formatDateRange(31, 35),
    content: {
      description: 'Pipeline definido:',
      items: [
        'Nuevo Lead',
        'Intento de contacto',
        'Precalificado',
        'Enviado',
        'Firmado',
        'No viable',
      ],
      notes: ['CRM recomendado: HubSpot Starter, GoHighLevel o similar.'],
    },
  },
  {
    phase: 3,
    milestone: 9,
    emoji: '9️⃣',
    title: 'Automatizaciones',
    dayRange: 'Días 36-40',
    startDay: 36,
    endDay: 40,
    dateRange: formatDateRange(36, 40),
    content: {
      description: 'Zapier o Make:',
      items: [
        'Lead → CRM',
        'Lead → SMS automático',
        'Lead → Email secuencia',
        'Notificación instantánea al intake',
      ],
      notes: ['Velocidad de respuesta objetivo: Menos de 5 minutos.'],
    },
  },
  {
    phase: 3,
    milestone: 10,
    emoji: '🔟',
    title: 'Chatbot',
    dayRange: 'Días 41-45',
    startDay: 41,
    endDay: 45,
    dateRange: formatDateRange(41, 45),
    content: {
      description: 'Web + Facebook Messenger. Flujo:',
      items: [
        '¿Tuviste accidente?',
        '¿Fue tu culpa?',
        '¿Hubo lesiones?',
        '¿Cuándo ocurrió?',
        'Teléfono y nombre',
      ],
      notes: ['El chatbot precalifica antes de pasar al formulario largo.'],
    },
  },

  // PHASE 4: Social y Activos Digitales (Días 46-60)
  {
    phase: 4,
    milestone: 11,
    emoji: '1️⃣1️⃣',
    title: 'Redes Sociales',
    dayRange: 'Días 46-52',
    startDay: 46,
    endDay: 52,
    dateRange: formatDateRange(46, 52),
    content: {
      description: 'Crear presencia en:',
      items: [
        'Facebook Page',
        'Instagram',
        'Google Business Profile (si aplica)',
      ],
      notes: [
        'Publicar: 3–4 posts semanales',
        'Contenido: Educación básica, Mini guías, FAQs, Mensajes de confianza',
        'No necesitas viralidad. Necesitas presencia y legitimidad.',
      ],
    },
  },
  {
    phase: 4,
    milestone: 12,
    emoji: '1️⃣2️⃣',
    title: 'Recolección de Activos',
    dayRange: 'Días 53-60',
    startDay: 53,
    endDay: 60,
    dateRange: formatDateRange(53, 60),
    content: {
      description: 'Preparar materiales visuales:',
      items: [
        'Fotos de stock realistas',
        'Mockups',
        'Elementos gráficos consistentes',
        'Creativos base para ads',
      ],
    },
  },

  // PHASE 5: Lanzamiento de Paid Ads (Días 61-75)
  {
    phase: 5,
    milestone: 13,
    emoji: '1️⃣3️⃣',
    title: 'Google Ads',
    dayRange: 'Días 61-66',
    startDay: 61,
    endDay: 66,
    dateRange: formatDateRange(61, 66),
    content: {
      description: 'Campañas:',
      items: [
        'Search (intención alta)',
        'Keywords exact + phrase',
        'Negativas agresivas',
        'Extensiones de llamada',
      ],
      notes: ['Presupuesto inicial: $3k–$5k para test real.'],
    },
  },
  {
    phase: 5,
    milestone: 14,
    emoji: '1️⃣4️⃣',
    title: 'Facebook Ads',
    dayRange: 'Días 67-71',
    startDay: 67,
    endDay: 71,
    dateRange: formatDateRange(67, 71),
    content: {
      description: 'Objetivo:',
      items: [
        'Generación de leads',
        'Tráfico retargeting',
        'Audiencia lookalike',
      ],
      notes: ['Evitar copy que asuma culpa directa.'],
    },
  },
  {
    phase: 5,
    milestone: 15,
    emoji: '1️⃣5️⃣',
    title: 'Call Tracking',
    dayRange: 'Días 72-75',
    startDay: 72,
    endDay: 75,
    dateRange: formatDateRange(72, 75),
    content: {
      description: 'Sistema de seguimiento de llamadas:',
      items: [
        'Número dedicado',
        'Grabar llamadas',
        'Medir duración',
        'Evaluar calidad',
      ],
    },
  },

  // PHASE 6: Optimización y Escalado (Días 76-90)
  {
    phase: 6,
    milestone: 16,
    emoji: '1️⃣6️⃣',
    title: 'Análisis de Métricas Clave',
    dayRange: 'Días 76-80',
    startDay: 76,
    endDay: 80,
    dateRange: formatDateRange(76, 80),
    content: {
      description: 'Métricas a analizar:',
      items: [
        'CPL real',
        'Costo por firmado',
        'Tiempo de respuesta',
        'Tasa de contacto',
        'Tasa de firma',
      ],
    },
  },
  {
    phase: 6,
    milestone: 17,
    emoji: '1️⃣7️⃣',
    title: 'Ajuste de Funnel',
    dayRange: 'Días 81-85',
    startDay: 81,
    endDay: 85,
    dateRange: formatDateRange(81, 85),
    content: {
      description: 'Optimizaciones:',
      items: [
        'Mejorar formulario si CPL alto',
        'Ajustar copy si baja conversión',
        'Refinar keywords',
        'Optimizar presupuesto',
      ],
    },
  },
  {
    phase: 6,
    milestone: 18,
    emoji: '1️⃣8️⃣',
    title: 'Evaluación de Modelo',
    dayRange: 'Días 86-90',
    startDay: 86,
    endDay: 90,
    dateRange: formatDateRange(86, 90),
    content: {
      description: 'Al día 90 debes saber:',
      items: [
        'Costo real por firmado',
        'Si $500 es sostenible',
        'Si necesitas renegociar payout',
        'Si puedes escalar',
      ],
    },
  },
];

// Helper function to get milestones by phase
export function getMilestonesByPhase(phase: number): MilestoneData[] {
  return MILESTONES.filter((m) => m.phase === phase);
}

// Helper function to get phase info
export function getPhaseInfo(phase: number) {
  return PHASES.find((p) => p.number === phase);
}

// Milestone options for dropdowns
export const MILESTONE_OPTIONS = MILESTONES.map((m) => ({
  value: m.milestone,
  label: `${m.emoji} ${m.milestone}. ${m.title}`,
  phase: m.phase,
}));

export const PHASE_OPTIONS = PHASES.map((p) => ({
  value: p.number,
  label: `Fase ${p.number}: ${p.title}`,
}));
