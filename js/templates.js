// js/templates.js
// Propuestas.pro — Offline proposal templates (8 sectors)
// by MolvicStudios

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function todayFormatted(lang) {
  const d = new Date();
  if (lang === 'en') {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function refCode() {
  return 'PROP-' + Date.now().toString(36).toUpperCase().slice(-6);
}

const W = 68; // line width

function line(char = '═') {
  return char.repeat(W);
}

function center(text) {
  if (text.length >= W) return text;
  const pad = Math.floor((W - text.length) / 2);
  return ' '.repeat(pad) + text;
}

function sectionTitle(title) {
  return `\n${line('─')}\n${center(title.toUpperCase())}\n${line('─')}\n`;
}

function bullets(text, symbol = '  ✦ ') {
  if (!text || !text.trim()) return '';
  return text
    .split(/[\n,;]+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => `${symbol}${s}`)
    .join('\n');
}

function wrap(text, maxCols = W) {
  if (!text) return '';
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length > maxCols) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = (current + ' ' + word).trim();
    }
  }
  if (current) lines.push(current);
  return lines.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTOR-SPECIFIC CONTENT BLOCKS
// ─────────────────────────────────────────────────────────────────────────────

function sectorBlock_webdev(data, isES) {
  const { service, delivery } = data;
  const phases = isES
    ? [
        'FASE 1 — DESCUBRIMIENTO & REQUERIMIENTOS (Sem 1-2)',
        '  · Reunión de kick-off y definición de objetivos',
        '  · Levantamiento de requerimientos funcionales y no funcionales',
        '  · Arquitectura técnica y stack definitivo',
        '  · Creación de wireframes y mapa de navegación',
        '',
        'FASE 2 — DISEÑO UI/UX (Sem 2-3)',
        '  · Diseño de interfaces en Figma',
        '  · Design system completo: tipografías, colores, componentes',
        '  · Prototipo interactivo para aprobación del cliente',
        '  · Diseño responsivo para móvil, tablet y desktop',
        '',
        'FASE 3 — DESARROLLO (Sem 4-7)',
        '  · Desarrollo frontend (HTML/CSS/JS o framework acordado)',
        '  · Desarrollo backend y API REST/GraphQL',
        '  · Integración de CMS, pasarelas de pago o servicios terceros',
        '  · Control de versiones con Git + entregables parciales semanales',
        '',
        'FASE 4 — TESTING & QA (Sem 8)',
        '  · Pruebas unitarias y de integración',
        '  · Testing cross-browser (Chrome, Firefox, Safari, Edge)',
        '  · Pruebas de rendimiento y accesibilidad (Lighthouse)',
        '  · Corrección de bugs y refinamientos',
        '',
        'FASE 5 — LANZAMIENTO & HANDOFF (Sem 9)',
        '  · Deploy en producción y configuración de dominio',
        '  · Certificado SSL y optimizaciones de performance',
        '  · Documentación técnica y capacitación al equipo cliente',
        '  · Monitoreo post-lanzamiento (14 días)',
      ]
    : [
        'PHASE 1 — DISCOVERY & REQUIREMENTS (Wk 1-2)',
        '  · Kick-off meeting and goal definition',
        '  · Functional and non-functional requirements gathering',
        '  · Technical architecture and stack definition',
        '  · Wireframes and navigation map creation',
        '',
        'PHASE 2 — UI/UX DESIGN (Wk 2-3)',
        '  · Interface design in Figma',
        '  · Complete design system: typography, colors, components',
        '  · Interactive prototype for client approval',
        '  · Responsive design for mobile, tablet and desktop',
        '',
        'PHASE 3 — DEVELOPMENT (Wk 4-7)',
        '  · Frontend development (HTML/CSS/JS or agreed framework)',
        '  · Backend development and REST/GraphQL API',
        '  · CMS, payment gateway or third-party service integrations',
        '  · Git version control + weekly partial deliverables',
        '',
        'PHASE 4 — TESTING & QA (Wk 8)',
        '  · Unit and integration testing',
        '  · Cross-browser testing (Chrome, Firefox, Safari, Edge)',
        '  · Performance and accessibility testing (Lighthouse)',
        '  · Bug fixes and refinements',
        '',
        'PHASE 5 — LAUNCH & HANDOFF (Wk 9)',
        '  · Production deploy and domain configuration',
        '  · SSL certificate and performance optimizations',
        '  · Technical documentation and client team training',
        '  · Post-launch monitoring (14 days)',
      ];

  const slaTitle = isES ? 'ACUERDO DE NIVEL DE SERVICIO (SLA)' : 'SERVICE LEVEL AGREEMENT (SLA)';
  const stackTitle = isES ? 'STACK TECNOLÓGICO PROPUESTO' : 'PROPOSED TECHNICAL STACK';

  return [
    sectionTitle(isES ? 'METODOLOGÍA DE DESARROLLO' : 'DEVELOPMENT METHODOLOGY'),
    phases.join('\n'),
    sectionTitle(stackTitle),
    isES
      ? `  · Frontend:        React.js / Vue.js / Vanilla JS (según alcance)
  · Backend:         Node.js + Express / Python + FastAPI
  · Base de datos:   PostgreSQL / MongoDB / Firestore
  · Infraestructura: Vercel / AWS / Cloudflare Pages
  · CI/CD:           GitHub Actions
  · Control versión: Git (repositorio privado entregado al cliente)`
      : `  · Frontend:        React.js / Vue.js / Vanilla JS (per scope)
  · Backend:         Node.js + Express / Python + FastAPI
  · Database:        PostgreSQL / MongoDB / Firestore
  · Infrastructure:  Vercel / AWS / Cloudflare Pages
  · CI/CD:           GitHub Actions
  · Version control: Git (private repository delivered to client)`,
    sectionTitle(slaTitle),
    isES
      ? `  · Uptime garantizado:                    99.5%
  · Tiempo de respuesta a incidentes críticos:  4 horas hábiles
  · Tiempo de respuesta a solicitudes normales: 24 horas hábiles
  · Soporte post-lanzamiento incluido:          30 días
  · Documentación técnica:                      incluida`
      : `  · Guaranteed uptime:                    99.5%
  · Response time for critical incidents:  4 business hours
  · Response time for normal requests:     24 business hours
  · Post-launch support included:          30 days
  · Technical documentation:               included`,
  ].join('\n');
}

function sectorBlock_marketing(data, isES) {
  return [
    sectionTitle(isES ? 'ESTRATEGIA DE MARKETING DIGITAL' : 'DIGITAL MARKETING STRATEGY'),
    isES
      ? `CANALES PROPUESTOS:
  · SEO On-Page y Off-Page (posicionamiento orgánico)
  · Google Ads — Search, Display y Performance Max
  · Meta Ads — Facebook e Instagram (remarketing + prospección)
  · Email Marketing automatizado (secuencias de nurturing)
  · Marketing de contenidos y Blog corporativo
  · LinkedIn Ads (si aplica al sector B2B)`
      : `PROPOSED CHANNELS:
  · On-Page and Off-Page SEO (organic positioning)
  · Google Ads — Search, Display and Performance Max
  · Meta Ads — Facebook and Instagram (remarketing + prospecting)
  · Automated email marketing (nurturing sequences)
  · Content marketing and corporate blog
  · LinkedIn Ads (if applicable for B2B sector)`,
    sectionTitle(isES ? 'KPIs Y OBJETIVOS MEDIBLES' : 'MEASURABLE KPIs & GOALS'),
    isES
      ? `  · Aumento de tráfico orgánico:     +40–60% en 6 meses
  · Crecimiento en seguidores:       +1,500–3,000 / mes
  · Tasa de conversión (leads):      3–5% del tráfico
  · ROI estimado campañas pagadas:   3x–6x inversión mensual
  · CPL (Costo por Lead) objetivo:   < $15 USD / lead
  · Open Rate email:                 ≥ 25%
  · CTR campañas display:            ≥ 2.5%`
      : `  · Organic traffic increase:        +40–60% in 6 months
  · Follower growth:                 +1,500–3,000 / month
  · Conversion rate (leads):         3–5% of traffic
  · Estimated ROI paid campaigns:    3x–6x monthly investment
  · CPL (Cost per Lead) target:      < $15 USD / lead
  · Email open rate:                 ≥ 25%
  · Display CTR:                     ≥ 2.5%`,
    sectionTitle(isES ? 'CALENDARIO EDITORIAL — PRIMER MES' : 'EDITORIAL CALENDAR — FIRST MONTH'),
    isES
      ? `  Semana 1:  Auditoría digital completa + configuración de cuentas
  Semana 2:  Creación de 12 piezas de contenido + copy publicitario
  Semana 3:  Lanzamiento de campañas pagadas + primeras publicaciones
  Semana 4:  Análisis de resultados + optimización + informe mensual`
      : `  Week 1:   Full digital audit + account setup
  Week 2:   Creation of 12 content pieces + ad copy
  Week 3:   Paid campaigns launch + first publications
  Week 4:   Results analysis + optimization + monthly report`,
    sectionTitle(isES ? 'REPORTES E INFORMES' : 'REPORTING'),
    isES
      ? `  · Informe semanal de métricas clave (dashboard en vivo)
  · Reporte mensual completo con análisis y recomendaciones
  · Reunión mensual de estrategia (videoconferencia 60 min)
  · Acceso en tiempo real al dashboard de analíticas`
      : `  · Weekly key metrics report (live dashboard)
  · Full monthly report with analysis and recommendations
  · Monthly strategy meeting (60-min video call)
  · Real-time access to analytics dashboard`,
  ].join('\n');
}

function sectorBlock_consulting(data, isES) {
  return [
    sectionTitle(isES ? 'METODOLOGÍA DE CONSULTORÍA' : 'CONSULTING METHODOLOGY'),
    isES
      ? `Nuestra metodología se basa en el modelo de consultoría estratégica
Diagnose → Design → Implement → Measure, adaptado a las necesidades
específicas de cada cliente:

  ETAPA 1 — DIAGNÓSTICO (Semanas 1-2)
  · Análisis profundo de la situación actual (AS-IS)
  · Entrevistas con stakeholders clave
  · Revisión de procesos, métricas y KPIs existentes
  · Identificación de brechas y oportunidades de mejora

  ETAPA 2 — DISEÑO DE SOLUCIÓN (Semanas 3-4)
  · Definición del estado objetivo (TO-BE)
  · Diseño del plan de acción con hitos medibles
  · Business case y análisis de ROI proyectado
  · Presentación y aprobación de la hoja de ruta

  ETAPA 3 — IMPLEMENTACIÓN (Semanas 5-10)
  · Ejecución del plan de acción por fases
  · Talleres de capacitación con el equipo
  · Gestión del cambio organizacional
  · Reportes de avance semanales

  ETAPA 4 — MEDICIÓN & CIERRE (Semanas 11-12)
  · Medición de KPIs vs objetivos definidos
  · Documento final con hallazgos y recomendaciones
  · Manual de sostenibilidad de mejoras
  · Sesión de transferencia de conocimiento`
      : `Our methodology is based on the strategic consulting model
Diagnose → Design → Implement → Measure, adapted to the specific
needs of each client:

  STAGE 1 — DIAGNOSIS (Weeks 1-2)
  · In-depth current situation analysis (AS-IS)
  · Key stakeholder interviews
  · Review of existing processes, metrics and KPIs
  · Identification of gaps and improvement opportunities

  STAGE 2 — SOLUTION DESIGN (Weeks 3-4)
  · Definition of target state (TO-BE)
  · Action plan design with measurable milestones
  · Business case and projected ROI analysis
  · Presentation and approval of the roadmap

  STAGE 3 — IMPLEMENTATION (Weeks 5-10)
  · Phased execution of the action plan
  · Training workshops with the team
  · Organizational change management
  · Weekly progress reports

  STAGE 4 — MEASUREMENT & CLOSE (Weeks 11-12)
  · KPI measurement vs defined objectives
  · Final document with findings and recommendations
  · Improvement sustainability manual
  · Knowledge transfer session`,
    sectionTitle(isES ? 'ENTREGABLES POR FASE' : 'DELIVERABLES BY PHASE'),
    isES
      ? `  · Diagnóstico ejecutivo (PDF, 20-30 páginas)
  · Mapa de procesos AS-IS y TO-BE
  · Plan de acción detallado con responsables y fechas
  · Business case con análisis financiero
  · Talleres virtuales/presenciales (4 sesiones de 2 horas)
  · Dashboard de seguimiento compartido
  · Informe final de resultados y recomendaciones`
      : `  · Executive diagnostic report (PDF, 20-30 pages)
  · AS-IS and TO-BE process maps
  · Detailed action plan with owners and dates
  · Business case with financial analysis
  · Virtual/in-person workshops (4 sessions of 2 hours each)
  · Shared monitoring dashboard
  · Final results and recommendations report`,
    sectionTitle(isES ? 'EQUIPO ASIGNADO' : 'ASSIGNED TEAM'),
    isES
      ? `  · 1 Consultor Senior (responsable de cuenta)
  · 1 Analista de Procesos
  · 1 Especialista en la vertical del cliente
  · Acceso a red de expertos especializados según necesidad`
      : `  · 1 Senior Consultant (account manager)
  · 1 Process Analyst
  · 1 Client-vertical specialist
  · Access to specialized expert network as needed`,
  ].join('\n');
}

function sectorBlock_design(data, isES) {
  return [
    sectionTitle(isES ? 'PROCESO CREATIVO' : 'CREATIVE PROCESS'),
    isES
      ? `  FASE 1 — BRIEF & INVESTIGACIÓN
  · Análisis del brief creativo
  · Investigación de competencia y referencias visuales
  · Moodboard con dirección de arte propuesta

  FASE 2 — CONCEPTO
  · Presentación de 2-3 conceptos visuales iniciales
  · Elección de dirección creativa + feedback
  · Refinamiento del concepto seleccionado

  FASE 3 — DESARROLLO
  · Diseño de todos los elementos acordados
  · Revisiones iterativas con el cliente
  · Preparación de artes finales

  FASE 4 — ENTREGA
  · Archivos en todos los formatos especificados
  · Style guide / guía de uso de marca (si aplica)
  · Briefing de uso y especificaciones técnicas`
      : `  PHASE 1 — BRIEF & RESEARCH
  · Creative brief analysis
  · Competition research and visual references
  · Moodboard with proposed art direction

  PHASE 2 — CONCEPT
  · Presentation of 2-3 initial visual concepts
  · Creative direction choice + feedback
  · Refinement of selected concept

  PHASE 3 — DEVELOPMENT
  · Design of all agreed elements
  · Iterative reviews with the client
  · Final artwork preparation

  PHASE 4 — DELIVERY
  · Files in all specified formats
  · Style guide / brand usage guide (if applicable)
  · Usage briefing and technical specifications`,
    sectionTitle(isES ? 'ENTREGABLES VISUALES' : 'VISUAL DELIVERABLES'),
    isES
      ? `  · Archivos fuente editables (AI, PSD, Figma)
  · Versiones en: PNG, SVG, PDF, JPG (alta resolución)
  · Versiones para: impresión (CMYK 300dpi) + digital (RGB 72dpi)
  · Versiones sobre fondo claro, oscuro y transparente
  · Guía de colores con códigos HEX, RGB, CMYK y Pantone
  · Tipografías utilizadas con licencias indicadas`
      : `  · Editable source files (AI, PSD, Figma)
  · Versions in: PNG, SVG, PDF, JPG (high resolution)
  · Versions for: print (CMYK 300dpi) + digital (RGB 72dpi)
  · Versions on light, dark and transparent backgrounds
  · Color guide with HEX, RGB, CMYK and Pantone codes
  · Fonts used with licenses indicated`,
    sectionTitle(isES ? 'REVISIONES INCLUIDAS' : 'INCLUDED REVISIONS'),
    isES
      ? `  · Ronda 1: Feedback sobre concepto inicial (cambios mayores)
  · Ronda 2: Refinamientos y ajustes (cambios medios)
  · Ronda 3: Correcciones menores y polish final
  · Nota: revisiones adicionales a $[tarifa/hora] por hora`
      : `  · Round 1: Feedback on initial concept (major changes)
  · Round 2: Refinements and adjustments (medium changes)
  · Round 3: Minor corrections and final polish
  · Note: additional revisions at $[rate/hour] per hour`,
  ].join('\n');
}

function sectorBlock_ecommerce(data, isES) {
  return [
    sectionTitle(isES ? 'SOLUCIÓN E-COMMERCE PROPUESTA' : 'PROPOSED E-COMMERCE SOLUTION'),
    isES
      ? `PLATAFORMA RECOMENDADA:
  Shopify Plus / WooCommerce / Magento 2 (según volumen y presupuesto)
  Criterios de selección: escalabilidad, coste de operación, integraciones
  disponibles, facilidad de gestión para el equipo del cliente.`
      : `RECOMMENDED PLATFORM:
  Shopify Plus / WooCommerce / Magento 2 (based on volume and budget)
  Selection criteria: scalability, operating cost, available integrations,
  ease of management for the client's team.`,
    sectionTitle(isES ? 'INTEGRACIONES INCLUIDAS' : 'INCLUDED INTEGRATIONS'),
    isES
      ? `  · Pasarelas de pago:   Stripe, PayPal, MercadoPago, Conekta
  · Envíos y logística:  DHL, FedEx, Sendcloud, EasyPost
  · CRM/Email:           Klaviyo, HubSpot, Mailchimp
  · Analytics:           Google Analytics 4, Meta Pixel, TikTok Pixel
  · Inventario:          gestión multi-almacén, alertas de stock
  · Facturación:         emisión automática de facturas/boletas`
      : `  · Payment gateways:  Stripe, PayPal, Braintree, Square
  · Shipping:          DHL, FedEx, Sendcloud, EasyPost
  · CRM/Email:         Klaviyo, HubSpot, Mailchimp
  · Analytics:         Google Analytics 4, Meta Pixel, TikTok Pixel
  · Inventory:         multi-warehouse management, stock alerts
  · Billing:           automatic invoice generation`,
    sectionTitle(isES ? 'MÉTRICAS DE CONVERSIÓN OBJETIVO' : 'TARGET CONVERSION METRICS'),
    isES
      ? `  · Tasa de conversión e-commerce:      2.5–4% (industria: 1.5–2%)
  · Tasa de abandono de carrito:        < 65% (vs media 75%)
  · Ticket promedio objetivo:           según catálogo a definir
  · Tiempo de carga (Core Web Vitals):  LCP < 2.5s, CLS < 0.1
  · Mobile conversion rate:             > 60% del total
  · Customer Lifetime Value (CLV):      +30% vs línea base actual`
      : `  · E-commerce conversion rate:         2.5–4% (industry: 1.5–2%)
  · Cart abandonment rate:              < 65% (vs avg 75%)
  · Average order value target:         per catalog TBD
  · Page load time (Core Web Vitals):   LCP < 2.5s, CLS < 0.1
  · Mobile conversion rate:             > 60% of total
  · Customer Lifetime Value (CLV):      +30% vs current baseline`,
  ].join('\n');
}

function sectorBlock_education(data, isES) {
  return [
    sectionTitle(isES ? 'PROGRAMA FORMATIVO' : 'TRAINING PROGRAM'),
    isES
      ? `ESTRUCTURA DEL PROGRAMA:

  MÓDULO 1 — Fundamentos y conceptos clave         (2 horas)
  · Introducción y contextualización del tema
  · Conceptos esenciales y terminología
  · Evaluación diagnóstica inicial

  MÓDULO 2 — Herramientas y metodologías           (4 horas)
  · Herramientas principales del sector
  · Metodologías aplicadas con casos reales
  · Ejercicios prácticos guiados

  MÓDULO 3 — Aplicación práctica                  (4 horas)
  · Proyecto integrador individual o grupal
  · Simulaciones y casos de estudio
  · Retroalimentación personalizada

  MÓDULO 4 — Avanzado y especialización           (3 horas)
  · Técnicas avanzadas y tendencias actuales
  · Best practices de la industria
  · Recursos para continuar aprendiendo

  MÓDULO 5 — Evaluación y certificación           (1 hora)
  · Evaluación final de competencias
  · Entrega de proyecto final
  · Ceremonia de certificación`
      : `PROGRAM STRUCTURE:

  MODULE 1 — Fundamentals and key concepts          (2 hours)
  · Introduction and topic contextualization
  · Essential concepts and terminology
  · Initial diagnostic assessment

  MODULE 2 — Tools and methodologies               (4 hours)
  · Main sector tools
  · Applied methodologies with real cases
  · Guided practical exercises

  MODULE 3 — Practical application                 (4 hours)
  · Individual or group integrating project
  · Simulations and case studies
  · Personalized feedback

  MODULE 4 — Advanced and specialization           (3 hours)
  · Advanced techniques and current trends
  · Industry best practices
  · Resources to continue learning

  MODULE 5 — Assessment and certification          (1 hour)
  · Final competency assessment
  · Final project delivery
  · Certification ceremony`,
    sectionTitle(isES ? 'MODALIDAD Y LOGÍSTICA' : 'MODALITY & LOGISTICS'),
    isES
      ? `  · Modalidad:       Online en vivo (Zoom/Meet) + grabaciones disponibles
  · Duración total:  14 horas (distribuidas según acuerdo)
  · Grupo máximo:    20 participantes por cohorte
  · Material:        Manual digital, slides, recursos descargables
  · Plataforma LMS:  Acceso a plataforma de aprendizaje por 6 meses
  · Soporte:         Canal de dudas por Slack/WhatsApp (30 días post-curso)`
      : `  · Modality:        Live online (Zoom/Meet) + recordings available
  · Total duration:  14 hours (distributed as agreed)
  · Max group:       20 participants per cohort
  · Materials:       Digital manual, slides, downloadable resources
  · LMS Platform:    Learning platform access for 6 months
  · Support:         Q&A channel via Slack/WhatsApp (30 days post-course)`,
    sectionTitle(isES ? 'CERTIFICACIÓN' : 'CERTIFICATION'),
    isES
      ? `  · Certificado digital con firma e insignia verificable (Open Badge)
  · Compartible en LinkedIn con un clic
  · Expedido a nombre de cada participante
  · Válido como constancia de formación profesional`
      : `  · Digital certificate with verifiable signature and badge (Open Badge)
  · Shareable on LinkedIn with one click
  · Issued in each participant's name
  · Valid as professional training credential`,
  ].join('\n');
}

function sectorBlock_services(data, isES) {
  return [
    sectionTitle(isES ? 'ALCANCE DETALLADO DEL SERVICIO' : 'DETAILED SERVICE SCOPE'),
    isES
      ? `INCLUIDO EN ESTA PROPUESTA:
  ✓ Servicio según lo descrito en la sección "Alcance del Servicio"
  ✓ Comunicación directa con el responsable asignado
  ✓ Reuniones de seguimiento (máximo 2 por mes incluidas)
  ✓ Reportes de avance en los plazos acordados
  ✓ Revisiones y ajustes dentro del alcance definido
  ✓ Soporte vía email en horario hábil (respuesta ≤ 24h)

NO INCLUIDO (fuera de alcance):
  ✗ Servicios adicionales no especificados en esta propuesta
  ✗ Desplazamientos fuera del área metropolitana (cotización aparte)
  ✗ Licencias de software de terceros (se indican las necesarias)
  ✗ Cambios de alcance posteriores a la firma (sujetos a cotización)`
      : `INCLUDED IN THIS PROPOSAL:
  ✓ Service as described in the "Service Scope" section
  ✓ Direct communication with the assigned account manager
  ✓ Progress meetings (maximum 2 per month included)
  ✓ Progress reports on agreed timelines
  ✓ Revisions and adjustments within the defined scope
  ✓ Email support during business hours (response ≤ 24h)

NOT INCLUDED (out of scope):
  ✗ Additional services not specified in this proposal
  ✗ Travel outside the metropolitan area (quoted separately)
  ✗ Third-party software licenses (required ones are listed)
  ✗ Scope changes after signing (subject to separate quote)`,
    sectionTitle(isES ? 'CONDICIONES DE SERVICIO' : 'SERVICE CONDITIONS'),
    isES
      ? `  · Inicio del servicio:    a los 5 días hábiles de recibir el pago inicial
  · Duración del contrato:  según lo pactado en esta propuesta
  · Renovación:             automática por períodos iguales (con 30 días de aviso)
  · Cancelación:            preaviso de 30 días por escrito
  · Confidencialidad:       acuerdo de confidencialidad (NDA) incluido
  · Propiedad intelectual:  los entregables son del cliente al 100% al pagar`
      : `  · Service start:          within 5 business days of receiving the initial payment
  · Contract duration:      as agreed in this proposal
  · Renewal:                automatic for equal periods (30-day notice required)
  · Cancellation:           30-day written notice required
  · Confidentiality:        Non-disclosure agreement (NDA) included
  · Intellectual property:  deliverables are 100% client-owned upon payment`,
  ].join('\n');
}

function sectorBlock_custom(data, isES) {
  return [
    sectionTitle(isES ? 'ENFOQUE Y METODOLOGÍA' : 'APPROACH & METHODOLOGY'),
    isES
      ? `Nuestro enfoque garantiza resultados medibles y alineados con los
objetivos estratégicos de ${data.clientName || 'su organización'}:

  PASO 1 — ANÁLISIS INICIAL
  · Revisión a fondo de la situación actual del cliente
  · Definición conjunta de objetivos y métricas de éxito
  · Identificación de recursos y restricciones

  PASO 2 — PLANIFICACIÓN
  · Diseño del plan de trabajo detallado
  · Asignación de responsabilidades y plazos
  · Establecimiento de canales de comunicación

  PASO 3 — EJECUCIÓN
  · Desarrollo del servicio según el plan acordado
  · Actualizaciones periódicas de avance
  · Gestión ágil de cambios e imprevistos

  PASO 4 — ENTREGA Y CIERRE
  · Presentación de resultados y entregables finales
  · Sesión de revisión y feedback
  · Documentación completa del trabajo realizado`
      : `Our approach ensures measurable results aligned with the strategic
objectives of ${data.clientName || 'your organization'}:

  STEP 1 — INITIAL ANALYSIS
  · In-depth review of the client's current situation
  · Joint definition of objectives and success metrics
  · Identification of resources and constraints

  STEP 2 — PLANNING
  · Detailed work plan design
  · Responsibility and deadline assignment
  · Communication channel establishment

  STEP 3 — EXECUTION
  · Service development according to the agreed plan
  · Periodic progress updates
  · Agile management of changes and unforeseen events

  STEP 4 — DELIVERY & CLOSE
  · Presentation of final results and deliverables
  · Review and feedback session
  · Complete documentation of work performed`,
  ].join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// OPTIONAL SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

function testimonialSection(data, isES) {
  const company = data.company || (isES ? 'nuestra empresa' : 'our company');
  return [
    sectionTitle(isES ? 'TESTIMONIOS Y CASOS DE ÉXITO' : 'TESTIMONIALS & SUCCESS CASES'),
    isES
      ? `"Trabajar con ${company} fue una de las mejores decisiones que tomamos
  este año. Los resultados superaron nuestras expectativas en tiempo y calidad."
    — Director de Operaciones, empresa del sector tecnológico

"El equipo demostró un nivel de profesionalismo y compromiso excepcional.
  La propuesta fue clara desde el principio y cumplieron cada promesa."
    — CEO, startup de SaaS B2B

"Recomiendo sin dudar sus servicios. Entendieron exactamente lo que
  necesitábamos y entregaron por encima de lo acordado."
    — Directora de Marketing, empresa de retail (500+ empleados)

──────────────────────────────────────────────────────────────────────
RESULTADOS DESTACADOS:
  · +185% de aumento en métricas clave en los primeros 90 días
  · Reducción del 40% en costos operativos para el cliente
  · NPS (Net Promoter Score) promedio de nuestros clientes: 9.2/10
  · 94% de clientes renuevan el contrato tras el primer año`
      : `"Working with ${company} was one of the best decisions we made
  this year. Results exceeded our expectations in time and quality."
    — Operations Director, technology sector company

"The team showed an exceptional level of professionalism and commitment.
  The proposal was clear from the start and they kept every promise."
    — CEO, B2B SaaS startup

"I recommend their services without hesitation. They understood exactly
  what we needed and delivered above and beyond."
    — Marketing Director, retail company (500+ employees)

──────────────────────────────────────────────────────────────────────
HIGHLIGHTED RESULTS:
  · +185% increase in key metrics in the first 90 days
  · 40% reduction in operating costs for the client
  · Average NPS (Net Promoter Score) from our clients: 9.2/10
  · 94% of clients renew their contract after the first year`,
  ].join('\n');
}

function pricingTableSection(data, isES) {
  const { price, currency, delivery } = data;
  return [
    sectionTitle(isES ? 'TABLA DE PRECIOS DETALLADA' : 'DETAILED PRICING TABLE'),
    isES
      ? `┌─────────────────────────────────┬──────────────┬──────────────┐
│ CONCEPTO                        │ CANTIDAD     │ VALOR        │
├─────────────────────────────────┼──────────────┼──────────────┤
│ Servicio principal               │ 1 proyecto   │ ${String(price).padEnd(12)} │
│ Gestión y coordinación          │ Incluida     │ $ 0.00       │
│ Revisiones (3 rondas)           │ Incluidas    │ $ 0.00       │
│ Documentación y entregables     │ Incluida     │ $ 0.00       │
│ Soporte post-entrega (30 días)  │ Incluido     │ $ 0.00       │
├─────────────────────────────────┼──────────────┼──────────────┤
│ TOTAL                           │              │ ${String(currency + ' ' + price).padEnd(12)} │
└─────────────────────────────────┴──────────────┴──────────────┘

CONDICIONES DE PAGO:
  · 50% al inicio del proyecto (contra firma de contrato)
  · 25% al completar hito intermedio
  · 25% restante a la entrega final y aprobación
  · Métodos aceptados: transferencia bancaria, tarjeta, PayPal`
      : `┌─────────────────────────────────┬──────────────┬──────────────┐
│ ITEM                            │ QUANTITY     │ VALUE        │
├─────────────────────────────────┼──────────────┼──────────────┤
│ Main service                    │ 1 project    │ ${String(price).padEnd(12)} │
│ Management and coordination     │ Included     │ $ 0.00       │
│ Revisions (3 rounds)            │ Included     │ $ 0.00       │
│ Documentation and deliverables  │ Included     │ $ 0.00       │
│ Post-delivery support (30 days) │ Included     │ $ 0.00       │
├─────────────────────────────────┼──────────────┼──────────────┤
│ TOTAL                           │              │ ${String(currency + ' ' + price).padEnd(12)} │
└─────────────────────────────────┴──────────────┴──────────────┘

PAYMENT CONDITIONS:
  · 50% at project start (upon contract signing)
  · 25% upon completion of the intermediate milestone
  · 25% remaining upon final delivery and approval
  · Accepted methods: bank transfer, credit card, PayPal`,
  ].join('\n');
}

function timelineSection(data, isES) {
  const { delivery } = data;
  const totalTime = delivery || (isES ? '6-8 semanas' : '6-8 weeks');
  return [
    sectionTitle(isES ? 'TIMELINE Y FASES DEL PROYECTO' : 'PROJECT TIMELINE & PHASES'),
    isES
      ? `CRONOGRAMA ESTIMADO (${totalTime} totales):

  SEMANA 1-2   ██████░░░░░░░░░░░░░░   INICIO
               · Firma de contrato y pago inicial
               · Kick-off meeting y onboarding
               · Recopilación de materiales necesarios

  SEMANA 3-4   ████████████░░░░░░░░   DESARROLLO
               · Ejecución de la primera fase del trabajo
               · Entrega de avance parcial para revisión
               · Incorporación de feedback del cliente

  SEMANA 5-6   ████████████████░░░░   AVANZADO
               · Desarrollo de la segunda fase
               · Revisiones y refinamientos
               · Preparación de entregables finales

  SEMANA 7-8   ████████████████████   ENTREGA
               · Presentación y entrega final
               · Revisión de aprobación
               · Cierre y documentación

  ── HITOS CLAVE ──────────────────────────────────────────────
  ✓ Día 1:      Firma de contrato — inicio formal del proyecto
  ✓ Semana 2:   Entrega de primer borrador / avance
  ✓ Semana ${delivery ? '—' : '5'}:   Revisión intermedia con el cliente
  ✓ Semana ${delivery ? '—' : '8'}:   Entrega final y aprobación`
      : `ESTIMATED SCHEDULE (${totalTime} total):

  WEEK 1-2     ██████░░░░░░░░░░░░░░   START
               · Contract signing and initial payment
               · Kick-off meeting and onboarding
               · Collection of required materials

  WEEK 3-4     ████████████░░░░░░░░   DEVELOPMENT
               · First phase of work execution
               · Partial progress delivery for review
               · Client feedback incorporation

  WEEK 5-6     ████████████████░░░░   ADVANCED
               · Second phase development
               · Reviews and refinements
               · Final deliverables preparation

  WEEK 7-8     ████████████████████   DELIVERY
               · Final presentation and delivery
               · Approval review
               · Closing and documentation

  ── KEY MILESTONES ───────────────────────────────────────────
  ✓ Day 1:      Contract signing — formal project start
  ✓ Week 2:     First draft / progress delivery
  ✓ Week ${delivery ? '—' : '5'}:     Intermediate review with client
  ✓ Week ${delivery ? '—' : '8'}:     Final delivery and approval`,
  ].join('\n');
}

function faqSection(data, isES) {
  const { company, price, currency, delivery, guarantee } = data;
  return [
    sectionTitle(isES ? 'PREGUNTAS FRECUENTES (FAQ)' : 'FREQUENTLY ASKED QUESTIONS (FAQ)'),
    isES
      ? `P: ¿Cuándo podemos empezar?
R: Una vez firmado el contrato y recibido el pago inicial, el proyecto
   arranca en un plazo máximo de 5 días hábiles.

P: ¿Qué pasa si necesitamos cambios durante el proceso?
R: Los cambios menores dentro del alcance acordado están incluidos.
   Los cambios de alcance se gestionan mediante orden de cambio con
   cotización adicional previa aprobación.

P: ¿Cómo será la comunicación durante el proyecto?
R: Tendrás asignado un responsable de cuenta con acceso directo por
   email y videoconferencia. Reuniones de seguimiento incluidas.

P: ¿Qué garantía tenemos de que obtendremos los resultados?
R: ${guarantee || 'Nuestra trayectoria habla por nosotros. Trabajamos con hitos claros y revisiones para asegurar que el resultado cumpla con los objetivos definidos al inicio.'}

P: ¿Cómo se realiza el pago?
R: El pago se divide en etapas: 50% al inicio, 25% al hito intermedio
   y 25% a la entrega final. Aceptamos transferencia y tarjeta.

P: ¿Qué sucede después de entregar el proyecto?
R: Incluimos soporte post-entrega${delivery ? ' durante ' + delivery : ' (período a definir)'}
   para resolver dudas y ajustes menores sin costo adicional.

P: ¿Pueden adaptarse a nuestro presupuesto?
R: Esta propuesta está diseñada al valor de ${currency} ${price}. Si necesitas
   ajustar el alcance, podemos plantear alternativas. Contáctanos.`
      : `Q: When can we start?
A: Once the contract is signed and the initial payment received, the
   project starts within a maximum of 5 business days.

Q: What if we need changes during the process?
A: Minor changes within the agreed scope are included.
   Scope changes are managed via change order with additional
   quote prior to approval.

Q: How will communication work during the project?
A: You'll have a dedicated account manager with direct access via
   email and video call. Progress meetings included.

Q: What guarantee do we have of getting results?
A: ${guarantee || 'Our track record speaks for itself. We work with clear milestones and reviews to ensure the result meets the objectives defined at the start.'}

Q: How is payment structured?
A: Payment is split in stages: 50% upfront, 25% at the intermediate
   milestone, and 25% at final delivery. We accept bank transfer and card.

Q: What happens after project delivery?
A: We include post-delivery support${delivery ? ' for ' + delivery : ' (period to be defined)'}
   to resolve questions and minor adjustments at no extra cost.

Q: Can you adapt to our budget?
A: This proposal is designed at the value of ${currency} ${price}. If you need
   to adjust scope, we can propose alternatives. Contact us.`,
  ].join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCUMENT-TYPE BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

function buildFollowUpEmail(data, lang) {
  const isES = lang === 'es';
  const {
    company = '',
    clientName = '',
    clientRole = '',
    service = '',
    price = '',
    currency = 'USD',
    delivery = ''
  } = data;

  if (isES) {
    return `Asunto: Seguimiento a nuestra propuesta — ${service || 'servicios de ' + company}

Estimado/a ${clientRole ? clientRole + ' de ' + clientName : clientName},

Espero que este mensaje te encuentre bien. Me pongo en contacto contigo
para hacer seguimiento a la propuesta que te hice llegar recientemente
sobre ${service || 'nuestros servicios'}.

Entiendo que en este momento pueden estar evaluando varias opciones, y
quiero asegurarte que en ${company} estamos completamente comprometidos
a ayudarles a alcanzar sus objetivos.

RESUMEN RÁPIDO DE LO QUE PROPONEMOS:
────────────────────────────────────────
  · Servicio:  ${service || '(ver propuesta adjunta)'}
  · Inversión: ${currency} ${price || '(ver propuesta adjunta)'}
  · Plazo:     ${delivery || 'A definir según tu disponibilidad'}

¿Hay alguna duda o punto de la propuesta que quisieras que aclaráramos?
Estoy disponible para una llamada de 20-30 minutos cuando sea conveniente.

Te propongo los siguientes horarios:
  · Lunes o miércoles, de 10:00 a 12:00
  · Jueves o viernes, de 15:00 a 17:00

Si alguno te conviene, puedes responder a este email o escribirme
directamente y coordinamos.

Quedo a tu entera disposición.

Un saludo cordial,
${company}
────────────────────────
Propuestas.pro · by MolvicStudios`;
  }

  return `Subject: Follow-up on our proposal — ${service || 'services by ' + company}

Dear ${clientRole ? clientRole + ' at ' + clientName : clientName},

I hope this message finds you well. I'm reaching out to follow up on the
proposal I recently shared with you regarding ${service || 'our services'}.

I understand you may be evaluating several options at this time, and I
want to assure you that at ${company} we are fully committed to helping
you achieve your goals.

QUICK RECAP OF WHAT WE'RE PROPOSING:
────────────────────────────────────────
  · Service:    ${service || '(see attached proposal)'}
  · Investment: ${currency} ${price || '(see attached proposal)'}
  · Timeline:   ${delivery || 'To be defined based on your availability'}

Is there any question or point in the proposal you'd like us to clarify?
I'm available for a 20-30 minute call whenever convenient for you.

I'd like to suggest the following times:
  · Monday or Wednesday, 10:00 AM – 12:00 PM
  · Thursday or Friday, 3:00 PM – 5:00 PM

If any of these work for you, feel free to reply to this email or reach
out directly and we'll coordinate.

Looking forward to hearing from you.

Best regards,
${company}
────────────────────────
Propuestas.pro · by MolvicStudios`;
}

function buildQuickQuote(data, lang) {
  const isES = lang === 'es';
  const {
    company = '',
    clientName = '',
    clientRole = '',
    service = '',
    price = '',
    currency = 'USD',
    delivery = '',
    guarantee = ''
  } = data;

  const date = todayFormatted(lang);
  const ref = refCode();

  return `${line()}
${center(isES ? 'COTIZACIÓN RÁPIDA' : 'QUICK QUOTE')}
${line()}

${isES ? 'Ref.:     ' : 'Ref.:     '}${ref}
${isES ? 'Fecha:    ' : 'Date:     '}${date}
${isES ? 'Para:     ' : 'To:       '}${clientName}${clientRole ? ' — ' + clientRole : ''}
${isES ? 'De:       ' : 'From:     '}${company}
${line('─')}

${isES ? 'DESCRIPCIÓN DEL SERVICIO' : 'SERVICE DESCRIPTION'}
${line('─')}

${wrap(service)}

${line('─')}
${isES ? 'INVERSIÓN' : 'INVESTMENT'}
${line('─')}

  ${isES ? 'Precio total:  ' : 'Total price:   '}${currency} ${price}
  ${isES ? 'Plazo:         ' : 'Timeline:      '}${delivery || (isES ? 'A definir' : 'To be defined')}
  ${isES ? 'Validez:       ' : 'Valid for:     '}${isES ? '30 días a partir de la fecha de emisión' : '30 days from issue date'}

${guarantee
  ? `  ${isES ? 'Garantía:      ' : 'Guarantee:     '}${guarantee}\n`
  : ''}
${line('─')}
${isES ? 'CONDICIONES DE PAGO' : 'PAYMENT CONDITIONS'}
${line('─')}

  ${isES
  ? '· 50% al firmar · 50% a la entrega\n  · Transferencia bancaria / tarjeta de crédito aceptada\n  · Factura emitida al momento del pago'
  : '· 50% upon signing · 50% upon delivery\n  · Bank transfer / credit card accepted\n  · Invoice issued upon payment'}

${line('─')}
${isES ? 'PRÓXIMOS PASOS' : 'NEXT STEPS'}
${line('─')}

  ${isES
  ? `1. Aprueba esta cotización respondiendo a este documento\n  2. Te enviaremos el contrato y los datos de pago\n  3. Inicio del proyecto en 5 días hábiles`
  : `1. Approve this quote by responding to this document\n  2. We'll send you the contract and payment details\n  3. Project start within 5 business days`}

${line()}
${center(company + '  ·  propuestas.pro  ·  by MolvicStudios')}
${line()}`;
}

function buildOnePager(data, lang) {
  const isES = lang === 'es';
  const {
    company = '',
    description = '',
    clientName = '',
    clientNeed = '',
    service = '',
    price = '',
    currency = 'USD',
    delivery = '',
    differentiators = '',
    sector = 'custom'
  } = data;

  const date = todayFormatted(lang);
  const ref = refCode();
  const differLines = differentiators
    ? differentiators.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean).slice(0, 4)
    : [];

  return `${line()}
${center(isES ? 'PROPUESTA EN UNA PÁGINA' : 'ONE-PAGE PROPOSAL')}
${center('─ ' + company + ' para ' + clientName + ' ─')}
${line()}
  ${isES ? 'Referencia:' : 'Reference:'}  ${ref}          ${isES ? 'Fecha:' : 'Date:'}  ${date}

${line('─')}
${center(isES ? 'EL PROBLEMA' : 'THE PROBLEM')}
${line('─')}
${wrap(clientNeed)}

${line('─')}
${center(isES ? 'NUESTRA SOLUCIÓN' : 'OUR SOLUTION')}
${line('─')}
${wrap(service)}

${line('─')}
${center(isES ? 'POR QUÉ ELEGIRNOS' : 'WHY CHOOSE US')}
${line('─')}
${wrap(description)}
${differLines.length > 0 ? '\n' + differLines.map(d => '  ✦ ' + d).join('\n') : ''}

${line('─')}
${center(isES ? 'INVERSIÓN Y PLAZO' : 'INVESTMENT & TIMELINE')}
${line('─')}
  ${isES ? 'Precio:  ' : 'Price:   '}${currency} ${price}
  ${isES ? 'Plazo:   ' : 'Timeline:'}${delivery || (isES ? 'A definir' : 'TBD')}
  ${isES ? 'Validez: ' : 'Valid:   '}${isES ? '30 días' : '30 days'}

${line('─')}
${center(isES ? 'ACCIÓN INMEDIATA' : 'IMMEDIATE ACTION')}
${line('─')}
${isES
  ? `  Responde a este documento o agenda una llamada de 30 minutos
  para revisar los detalles y dar inicio al proyecto.\n\n  ¿Listo para avanzar? → Escríbenos hoy mismo.`
  : `  Reply to this document or schedule a 30-minute call
  to review the details and start the project.\n\n  Ready to move forward? → Contact us today.`}

${line()}
${center(company + '  ·  propuestas.pro  ·  by MolvicStudios')}
${line()}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT: buildProposal
// ─────────────────────────────────────────────────────────────────────────────

export function buildProposal(data, lang) {
  const isES = lang === 'es';
  const {
    company = '',
    sector = 'custom',
    description = '',
    website = '',
    clientName = '',
    clientRole = '',
    clientNeed = '',
    docType = 'full',
    service = '',
    price = '',
    currency = 'USD',
    delivery = '',
    differentiators = '',
    guarantee = '',
    tone = 'formal',
    sections = {}
  } = data;

  // Route to specialized builders
  if (docType === 'followup') return buildFollowUpEmail(data, lang);
  if (docType === 'quote') return buildQuickQuote(data, lang);
  if (docType === 'onepager') return buildOnePager(data, lang);

  // ── Full proposal ──────────────────────────────────────────────────────────
  const date = todayFormatted(lang);
  const ref = refCode();

  const differList = differentiators
    ? differentiators.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean)
    : [];

  const parts = [];

  // ── HEADER ────────────────────────────────────────────────────────────────
  parts.push(
    `${line()}\n${center(isES ? 'PROPUESTA COMERCIAL PROFESIONAL' : 'PROFESSIONAL BUSINESS PROPOSAL')}\n${line()}\n`
  );

  parts.push(
    `${isES ? 'Para:         ' : 'To:           '}${clientName}${clientRole ? '  —  ' + clientRole : ''}
${isES ? 'De:           ' : 'From:         '}${company}${website ? '  ·  ' + website : ''}
${isES ? 'Fecha:        ' : 'Date:         '}${date}
${isES ? 'Referencia:   ' : 'Reference:    '}${ref}
${isES ? 'Validez:      ' : 'Valid for:    '}${isES ? '30 días a partir de la fecha de emisión' : '30 days from issue date'}`
  );

  // ── EXECUTIVE SUMMARY ─────────────────────────────────────────────────────
  parts.push(sectionTitle(isES ? 'RESUMEN EJECUTIVO' : 'EXECUTIVE SUMMARY'));
  parts.push(
    isES
      ? `${company} comprende que ${clientName} enfrenta el siguiente desafío:

"${wrap(clientNeed)}"

Ante esta necesidad, proponemos: ${wrap(service)}

${wrap(description)}

Esta propuesta ha sido desarrollada específicamente para ${clientName} con
el objetivo de resolver este desafío de forma eficiente, profesional y
con resultados medibles desde el primer día de colaboración.`
      : `${company} understands that ${clientName} faces the following challenge:

"${wrap(clientNeed)}"

To address this need, we propose: ${wrap(service)}

${wrap(description)}

This proposal has been developed specifically for ${clientName} with the
goal of resolving this challenge efficiently, professionally, and with
measurable results from day one of our collaboration.`
  );

  // ── ABOUT US ──────────────────────────────────────────────────────────────
  parts.push(sectionTitle(isES ? 'SOBRE NOSOTROS' : 'ABOUT US'));
  parts.push(
    `${company} ${isES ? 'es una empresa especializada en ofrecer soluciones de alto impacto. Nuestro equipo combina experiencia técnica y visión estratégica para garantizar resultados excepcionales.' : 'is a company specialized in delivering high-impact solutions. Our team combines technical expertise and strategic vision to ensure exceptional results.'}\n\n${wrap(description)}`
  );
  if (differList.length > 0) {
    parts.push(
      `\n${isES ? 'NUESTROS DIFERENCIADORES:' : 'OUR DIFFERENTIATORS:'}\n${differList.map(d => '  ✦ ' + d).join('\n')}`
    );
  } else {
    parts.push(
      `\n${isES ? 'NUESTROS DIFERENCIADORES:' : 'OUR DIFFERENTIATORS:'}\n${[
        isES ? 'Experiencia probada en proyectos similares' : 'Proven experience in similar projects',
        isES ? 'Equipo dedicado y comunicación directa' : 'Dedicated team and direct communication',
        isES ? 'Metodología ágil con entregas parciales' : 'Agile methodology with partial deliveries',
        isES ? 'Soporte post-entrega incluido' : 'Post-delivery support included',
        isES ? 'Transparencia total en costos y plazos' : 'Full transparency in costs and timelines'
      ].map(d => '  ✦ ' + d).join('\n')}`
    );
  }

  // ── SECTOR-SPECIFIC ───────────────────────────────────────────────────────
  switch (sector) {
    case 'webdev':     parts.push(sectorBlock_webdev(data, isES));     break;
    case 'marketing':  parts.push(sectorBlock_marketing(data, isES));  break;
    case 'consulting': parts.push(sectorBlock_consulting(data, isES)); break;
    case 'design':     parts.push(sectorBlock_design(data, isES));     break;
    case 'ecommerce':  parts.push(sectorBlock_ecommerce(data, isES));  break;
    case 'education':  parts.push(sectorBlock_education(data, isES));  break;
    case 'services':   parts.push(sectorBlock_services(data, isES));   break;
    default:           parts.push(sectorBlock_custom(data, isES));     break;
  }

  // ── SERVICE SCOPE ─────────────────────────────────────────────────────────
  parts.push(sectionTitle(isES ? 'ALCANCE DEL SERVICIO' : 'SERVICE SCOPE'));
  parts.push(wrap(service));
  const defaultIncludes = isES
    ? [
        'Reunión de kick-off y onboarding',
        'Comunicación directa con el equipo asignado',
        'Entregables según lo detallado en esta propuesta',
        'Revisiones y ajustes dentro del alcance',
        '3 rondas de revisión incluidas',
        'Soporte post-entrega (30 días)',
        'Documentación completa del trabajo'
      ]
    : [
        'Kick-off meeting and onboarding',
        'Direct communication with the assigned team',
        'Deliverables as detailed in this proposal',
        'Revisions and adjustments within scope',
        '3 revision rounds included',
        'Post-delivery support (30 days)',
        'Complete work documentation'
      ];
  parts.push(
    `\n${isES ? '¿QUÉ INCLUYE?' : "WHAT'S INCLUDED?"}\n${defaultIncludes.map(i => '  ✓ ' + i).join('\n')}`
  );

  // ── INVESTMENT ────────────────────────────────────────────────────────────
  parts.push(sectionTitle(isES ? 'INVERSIÓN' : 'INVESTMENT'));
  parts.push(
    `  ${isES ? 'Precio total:       ' : 'Total price:        '}${currency} ${price}
  ${isES ? 'Plazo de entrega:   ' : 'Delivery timeline:  '}${delivery || (isES ? 'A definir en reunión de inicio' : 'To be defined at kick-off meeting')}
  ${isES ? 'Validez propuesta:  ' : 'Proposal validity:  '}${isES ? '30 días a partir de la fecha de emisión' : '30 days from issue date'}

${isES ? 'CONDICIONES DE PAGO:' : 'PAYMENT CONDITIONS:'}
  · ${isES ? '50% al firmar el contrato (pago inicial de arranque)' : '50% upon contract signing (startup payment)'}
  · ${isES ? '25% al completar el hito intermedio del proyecto' : '25% upon project intermediate milestone completion'}
  · ${isES ? '25% restante a la entrega y aprobación final' : '25% remaining upon final delivery and approval'}
  · ${isES ? 'Métodos: transferencia bancaria, tarjeta, PayPal, Wise' : 'Methods: bank transfer, credit card, PayPal, Wise'}`
  );

  // ── GUARANTEE ─────────────────────────────────────────────────────────────
  if (guarantee) {
    parts.push(sectionTitle(isES ? 'GARANTÍA' : 'GUARANTEE'));
    parts.push(wrap(guarantee));
  } else {
    parts.push(sectionTitle(isES ? 'NUESTRA GARANTÍA' : 'OUR GUARANTEE'));
    parts.push(
      isES
        ? `  En ${company} nos enorgullece nuestro historial de clientes satisfechos.
  Si el resultado final no cumple con los objetivos definidos en esta
  propuesta, nos comprometemos a realizar las correcciones necesarias
  sin costo adicional hasta lograr su satisfacción completa.

  · Política de revisiones: 3 rondas incluidas sin cargo
  · Soporte post-lanzamiento: 30 días para ajustes menores
  · Confidencialidad: aplicamos acuerdo de no divulgación (NDA)`
        : `  At ${company} we take pride in our track record of satisfied clients.
  If the final result does not meet the objectives defined in this
  proposal, we commit to making the necessary corrections at no
  additional cost until your complete satisfaction is achieved.

  · Revision policy: 3 rounds included at no extra charge
  · Post-launch support: 30 days for minor adjustments
  · Confidentiality: we apply a non-disclosure agreement (NDA)`
    );
  }

  // ── OPTIONAL SECTIONS ─────────────────────────────────────────────────────
  if (sections.testimonials) parts.push(testimonialSection(data, isES));
  if (sections.pricing)      parts.push(pricingTableSection(data, isES));
  if (sections.timeline)     parts.push(timelineSection(data, isES));
  if (sections.faq)          parts.push(faqSection(data, isES));

  // ── NEXT STEPS ────────────────────────────────────────────────────────────
  parts.push(sectionTitle(isES ? 'PRÓXIMOS PASOS' : 'NEXT STEPS'));
  parts.push(
    isES
      ? `Si esta propuesta se alinea con tus expectativas, el siguiente paso
es sencillo:

  1. ✉  Responde a este email / documento con tu aprobación
  2. 📄  Te enviamos el contrato formal para firma
  3. 💳  Realizas el pago inicial (50%)
  4. 🚀  Hacemos el kick-off y comenzamos el proyecto

Si necesitas ajustar algún punto, estamos disponibles para una llamada
de estrategia de 30 minutos. No hay compromiso.

¿Tienes preguntas? Escríbenos — respondemos en menos de 2 horas.`
      : `If this proposal aligns with your expectations, the next step
is simple:

  1. ✉  Reply to this email / document with your approval
  2. 📄  We send you the formal contract for signing
  3. 💳  You make the initial payment (50%)
  4. 🚀  We hold the kick-off and start the project

If you need to adjust any point, we're available for a 30-minute
strategy call. No commitment required.

Questions? Write to us — we respond in less than 2 hours.`
  );

  // ── TERMS ─────────────────────────────────────────────────────────────────
  parts.push(sectionTitle(isES ? 'TÉRMINOS Y CONDICIONES' : 'TERMS & CONDITIONS'));
  parts.push(
    isES
      ? `  · Validez:        Esta propuesta es válida por 30 días desde su emisión.
  · Confidencial:   El contenido de esta propuesta es confidencial.
  · Propiedad:      Los entregables pasan a ser propiedad del cliente
                    al realizarse el pago final en su totalidad.
  · Cancelación:    Preaviso de 30 días por escrito. Los pagos realizados
                    por fases completadas no son reembolsables.
  · Legislación:    Sujeto a las leyes del país del proveedor del servicio.`
      : `  · Validity:       This proposal is valid for 30 days from date of issue.
  · Confidential:   The content of this proposal is confidential.
  · Ownership:      Deliverables become the property of the client
                    upon receipt of full final payment.
  · Cancellation:   30-day written notice required. Payments made
                    for completed phases are non-refundable.
  · Governing law:  Subject to the laws of the service provider's country.`
  );

  // ── FOOTER ────────────────────────────────────────────────────────────────
  parts.push(
    `\n${line()}\n${center(company + '  ·  propuestas.pro  ·  by MolvicStudios')}\n${line()}`
  );

  return parts.join('\n');
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT: applyVariant
// ─────────────────────────────────────────────────────────────────────────────

export function applyVariant(proposal, variant, lang) {
  const isES = lang === 'es';
  const variantBlocks = {
    formal: isES
      ? `\n${'═'.repeat(68)}\n${' '.repeat(20)}NOTA DE ESTILO: VARIANTE FORMAL\n${'═'.repeat(68)}\nEsta propuesta ha sido adaptada al tono más formal. En una versión\nfinal, se recomienda:\n  · Eliminar contracciones y lenguaje coloquial\n  · Usar títulos de cargo completos (Estimado Sr./Sra. + apellido)\n  · Añadir membrete corporativo en la versión en papel\n  · Incluir firma escaneada o firma digital certificada\n  · Lenguaje impersonal y tercera persona donde sea apropiado`
      : `\n${'═'.repeat(68)}\n${' '.repeat(20)}STYLE NOTE: FORMAL VARIANT\n${'═'.repeat(68)}\nThis proposal has been adapted to a more formal tone. In a final\nversion, it is recommended to:\n  · Remove contractions and colloquial language\n  · Use full job titles (Dear Mr./Ms. + last name)\n  · Add corporate letterhead in the printed version\n  · Include scanned or certified digital signature\n  · Use impersonal language and third person where appropriate`,
    persuasive: isES
      ? `\n${'═'.repeat(68)}\n${' '.repeat(18)}NOTA: VARIANTE PERSUASIVA\n${'═'.repeat(68)}\nPara maximizar el poder persuasivo de esta propuesta:\n\n  ✦ URGENCIA: "Los precios de esta propuesta están garantizados\n    solo hasta [fecha + 30 días]. Después, sujetos a actualización."\n\n  ✦ PRUEBA SOCIAL: "Más de 50 empresas como ${'' } ya confían\n    en nosotros. Únete a los que ya están creciendo."\n\n  ✦ ESCASEZ: "Sólo aceptamos 3 nuevos proyectos al mes para\n    garantizar la calidad. Este espacio puede llenarse pronto."\n\n  ✦ CTA PODER: "No pierdas más tiempo ni clientes. Firma hoy\n    y empieza a ver resultados en las próximas semanas."`
      : `\n${'═'.repeat(68)}\n${' '.repeat(18)}NOTE: PERSUASIVE VARIANT\n${'═'.repeat(68)}\nTo maximize the persuasive power of this proposal:\n\n  ✦ URGENCY: "The prices in this proposal are guaranteed\n    only until [date + 30 days]. Afterwards, subject to change."\n\n  ✦ SOCIAL PROOF: "More than 50 companies already trust us.\n    Join those who are already growing."\n\n  ✦ SCARCITY: "We only accept 3 new projects per month to\n    guarantee quality. This spot may fill soon."\n\n  ✦ POWER CTA: "Don't lose more time or clients. Sign today\n    and start seeing results within the coming weeks."`,
    shorter: isES
      ? `\n${'═'.repeat(68)}\n${' '.repeat(18)}NOTA: VARIANTE RESUMIDA\n${'═'.repeat(68)}\nPara crear una versión más corta de esta propuesta, mantén solo:\n  · Encabezado (Para/De/Fecha/Referencia)\n  · Resumen ejecutivo (3-4 líneas)\n  · Alcance del servicio (bullet points únicamente)\n  · Tabla de inversión simplificada\n  · Próximos pasos (3 pasos máximo)\n\nElimina: secciones de sector, sobre nosotros extenso, FAQ y testimonios.`
      : `\n${'═'.repeat(68)}\n${' '.repeat(18)}NOTE: SHORTER VARIANT\n${'═'.repeat(68)}\nTo create a shorter version of this proposal, keep only:\n  · Header (To/From/Date/Reference)\n  · Executive summary (3-4 lines)\n  · Service scope (bullet points only)\n  · Simplified investment table\n  · Next steps (3 steps maximum)\n\nRemove: sector sections, extended about us, FAQ and testimonials.`,
    guarantee: isES
      ? `\n${'═'.repeat(68)}\n${' '.repeat(16)}SECCIÓN ADICIONAL: GARANTÍA REFORZADA\n${'═'.repeat(68)}\n  🛡️  GARANTÍA TOTAL DE SATISFACCIÓN — SIN RIESGO PARA TI\n\n  En ${'' } nos comprometemos con resultados reales. Por eso ofrecemos:\n\n  ✓ GARANTÍA DE CALIDAD: Si el entregable no cumple las especificaciones\n    acordadas, lo corregimos sin costo hasta tu aprobación total.\n\n  ✓ GARANTÍA DE PLAZO: Si superamos la fecha de entrega acordada sin\n    causa justificada, aplicamos un descuento del 10% por semana de retraso.\n\n  ✓ CONFIDENCIALIDAD GARANTIZADA: Firmamos NDA antes de comenzar.\n    Tu información, ideas y datos nunca serán compartidos.\n\n  ✓ PROPIEDAD INTELECTUAL: Al pago final, todos los entregables son\n    100% tuyos. Sin restricciones de uso.`
      : `\n${'═'.repeat(68)}\n${' '.repeat(16)}ADDITIONAL SECTION: REINFORCED GUARANTEE\n${'═'.repeat(68)}\n  🛡️  TOTAL SATISFACTION GUARANTEE — ZERO RISK FOR YOU\n\n  At ${'' } we are committed to real results. That's why we offer:\n\n  ✓ QUALITY GUARANTEE: If the deliverable does not meet the agreed\n    specifications, we fix it at no cost until your full approval.\n\n  ✓ TIMELINE GUARANTEE: If we exceed the agreed delivery date without\n    justified cause, we apply a 10% discount per week of delay.\n\n  ✓ CONFIDENTIALITY GUARANTEED: We sign an NDA before starting.\n    Your information, ideas and data will never be shared.\n\n  ✓ INTELLECTUAL PROPERTY: Upon final payment, all deliverables are\n    100% yours. No usage restrictions.`
  };

  return proposal + (variantBlocks[variant] || '');
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT: buildSystemPrompt (for Groq AI)
// ─────────────────────────────────────────────────────────────────────────────

export function buildSystemPrompt(sector, lang) {
  const isES = lang === 'es';

  const sectorContext = {
    webdev: isES
      ? 'desarrollo web y aplicaciones móviles, stack tecnológico, fases de desarrollo ágil, SLA, UX/UI'
      : 'web and mobile app development, tech stack, agile development phases, SLA, UX/UI',
    marketing: isES
      ? 'marketing digital, KPIs, ROI, campañas en Meta/Google, SEO, email marketing, analítica web'
      : 'digital marketing, KPIs, ROI, Meta/Google campaigns, SEO, email marketing, web analytics',
    consulting: isES
      ? 'consultoría estratégica y de negocios, diagnóstico organizacional, metodologías, entregables'
      : 'strategic and business consulting, organizational diagnosis, methodologies, deliverables',
    design: isES
      ? 'diseño gráfico, branding, identidad visual, UI/UX, entregables visuales, revisiones'
      : 'graphic design, branding, visual identity, UI/UX, visual deliverables, revisions',
    ecommerce: isES
      ? 'e-commerce, tiendas online, Shopify/WooCommerce, conversión, integraciones, logística'
      : 'e-commerce, online stores, Shopify/WooCommerce, conversion, integrations, logistics',
    education: isES
      ? 'formación, cursos, capacitación corporativa, módulos, certificación, LMS'
      : 'training, courses, corporate learning, modules, certification, LMS',
    services: isES
      ? 'servicios profesionales, alcance, SLA, condiciones contractuales, entregables'
      : 'professional services, scope, SLA, contractual conditions, deliverables',
    custom: isES
      ? 'servicios empresariales, propuesta comercial, metodología, entregables'
      : 'business services, commercial proposal, methodology, deliverables'
  };

  if (isES) {
    return `Eres un experto redactor de propuestas comerciales con 15 años de experiencia en ${sectorContext[sector] || sectorContext.custom}.

Tu tarea es redactar una propuesta comercial COMPLETA, PROFESIONAL y PERSUASIVA en español.

INSTRUCCIONES OBLIGATORIAS:
- El documento debe tener mínimo 600 palabras
- Usa texto plano solamente (sin markdown, sin asteriscos, sin #)
- Estructura con líneas separadoras de ═ y secciones con ─
- Incluye: Encabezado, Resumen Ejecutivo, Sobre Nosotros, Metodología/Contenido Específico del Sector, Alcance del Servicio, Inversión, Garantía, Próximos Pasos, Términos
- Tono profesional, conciso y orientado a cerrar el trato
- Resalta los diferenciadores del cliente
- Termina con un CTA claro y urgente
- Usa contenido específico del sector: ${sectorContext[sector] || sectorContext.custom}
- NO uses placeholders como [nombre], [fecha], etc. — usa los datos que te proporcionan
- Al final: footer "propuestas.pro · by MolvicStudios"`;
  }

  return `You are an expert commercial proposal writer with 15 years of experience in ${sectorContext[sector] || sectorContext.custom}.

Your task is to write a COMPLETE, PROFESSIONAL, and PERSUASIVE business proposal in English.

MANDATORY INSTRUCTIONS:
- The document must have at least 600 words
- Use plain text only (no markdown, no asterisks, no #)
- Structure with ═ separator lines and sections with ─
- Include: Header, Executive Summary, About Us, Sector-Specific Methodology/Content, Service Scope, Investment, Guarantee, Next Steps, Terms
- Professional, concise tone focused on closing the deal
- Highlight the client's differentiators
- End with a clear, urgent CTA
- Use sector-specific content: ${sectorContext[sector] || sectorContext.custom}
- Do NOT use placeholders like [name], [date], etc. — use the data provided to you
- Footer at the end: "propuestas.pro · by MolvicStudios"`;
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT: buildUserPrompt (for Groq AI)
// ─────────────────────────────────────────────────────────────────────────────

export function buildUserPrompt(data, lang) {
  const isES = lang === 'es';
  const {
    company, sector, description, website,
    clientName, clientRole, clientNeed,
    docType, service, price, currency, delivery,
    differentiators, guarantee, tone, sections
  } = data;

  const sectionsList = Object.entries(sections || {})
    .filter(([, v]) => v)
    .map(([k]) => k);

  if (isES) {
    return `Genera una propuesta comercial con los siguientes datos:

DATOS DEL PROVEEDOR:
- Empresa/Marca: ${company}
- Sector: ${sector}
- Descripción: ${description}
- Web/Redes: ${website || 'No indicado'}

DATOS DEL CLIENTE:
- Cliente: ${clientName}
- Cargo: ${clientRole || 'No indicado'}
- Necesidad/Problema: ${clientNeed}

PROPUESTA:
- Tipo de documento: ${docType}
- Servicio ofrecido: ${service}
- Precio: ${currency} ${price}
- Plazo de entrega: ${delivery || 'Por definir'}
- Diferenciadores: ${differentiators || 'No especificados'}
- Garantía: ${guarantee || 'No especificada'}
- Tono requerido: ${tone}
- Idioma: Español
- Secciones adicionales: ${sectionsList.length > 0 ? sectionsList.join(', ') : 'Ninguna'}

Redacta la propuesta completa ahora.`;
  }

  return `Generate a business proposal with the following data:

VENDOR DATA:
- Company/Brand: ${company}
- Sector: ${sector}
- Description: ${description}
- Web/Social: ${website || 'Not provided'}

CLIENT DATA:
- Client: ${clientName}
- Role: ${clientRole || 'Not provided'}
- Need/Problem: ${clientNeed}

PROPOSAL:
- Document type: ${docType}
- Offered service: ${service}
- Price: ${currency} ${price}
- Delivery timeline: ${delivery || 'TBD'}
- Differentiators: ${differentiators || 'Not specified'}
- Guarantee: ${guarantee || 'Not specified'}
- Required tone: ${tone}
- Language: English
- Additional sections: ${sectionsList.length > 0 ? sectionsList.join(', ') : 'None'}

Write the complete proposal now.`;
}
