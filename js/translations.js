// js/translations.js
// Propuestas.pro — All UI text in ES / EN
// by MolvicStudios

export const translations = {
  es: {
    nav: {
      logo: 'Propuestas.pro',
      by: 'by MolvicStudios',
      history: '📜 Historial',
      favorites: '⭐ Favoritos',
      langToggle: 'EN',
      ariaMain: 'Navegación principal',
      ariaHistory: 'Abrir historial de propuestas',
      ariaFavorites: 'Abrir propuestas favoritas',
      ariaLang: 'Cambiar a inglés'
    },
    hero: {
      badge: '100% Gratis · Sin Registro · Sin Backend',
      titleLine1: 'Genera Propuestas',
      titleAccent: 'Comerciales',
      titleLine2: 'que Cierran Negocios',
      tagline: 'Generador de Propuestas Comerciales con IA',
      description:
        '8 plantillas por sector. Modo online con Groq AI (Llama 3.3) o modo offline sin conexión. Bilingüe ES/EN. Gratis, sin registro.'
    },
    mode: {
      heading: 'Elige cómo quieres generar tu propuesta',
      onlineTitle: 'Modo Online',
      onlineTag: 'Groq AI',
      onlineDesc:
        'Propuestas únicas y persuasivas generadas por IA (Llama 3.3 · 70B). Requiere API key gratuita de Groq.',
      offlineTitle: 'Modo Offline',
      offlineTag: 'Plantillas',
      offlineDesc:
        'Propuestas profesionales con 8 plantillas por sector. Sin conexión, sin API key, funciona siempre.',
      activeBadgeOnline: '✓ Modo Online Activo',
      activeBadgeOffline: '✓ Modo Offline Activo',
      apiKeyHeading: 'Configuración de Groq AI',
      apiKeyLabel: 'API Key de Groq',
      apiKeyPlaceholder: 'gsk_...',
      apiKeySave: 'Guardar key',
      apiKeyNote:
        '🔒 Tu key se guarda solo en sessionStorage de tu navegador. Nunca se envía a nuestros servidores.',
      apiKeyLink: 'Obtén tu key gratis →',
      modelLabel: 'Modelo de IA:',
      modelOptions: [
        { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B — Potente (recomendado)' },
        { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B — Rápido' }
      ],
      groqFaqTitle: '¿Qué es la API de Groq y cómo la consigo?',
      groqFaqSteps: [
        { n: '1', text: 'Ve a console.groq.com/keys y crea una cuenta gratuita.' },
        { n: '2', text: 'Haz clic en "Create API Key" para generar tu key personal.' },
        { n: '3', text: 'Copia la key (comienza con gsk_) y pégala en el campo de arriba.' },
        { n: '4', text: '¡Listo! Genera propuestas profesionales con IA de forma completamente gratuita.' }
      ]
    },
    wizard: {
      progressLabel: 'Progreso',
      prevBtn: '← Anterior',
      nextBtn: 'Siguiente →',
      generateBtn: '✦ Generar Propuesta',
      draftSaved: '✓ Borrador guardado',
      draftRestored: '✓ Borrador restaurado automáticamente',
      stepLabels: ['Tu Negocio', 'El Cliente', 'La Propuesta', 'Estilo'],
      livePreviewTitle: '✦ Vista Previa en Tiempo Real',
      livePreviewEmpty:
        'Completa al menos empresa, cliente y servicio para ver la vista previa actualizada automaticamente...'
    },
    step1: {
      heading: 'Tu Negocio',
      companyLabel: 'Nombre de empresa o marca',
      companyPlaceholder: 'Ej: Agencia Digital Nexo',
      sectorLabel: 'Sector o industria',
      sectorDefault: 'Selecciona un sector...',
      descLabel: 'Descripción breve de lo que ofreces',
      descPlaceholder:
        'Ej: Somos una agencia especializada en diseño web y posicionamiento SEO para pymes del sector retail...',
      descMax: 300,
      websiteLabel: 'Sitio web o redes sociales (opcional)',
      websitePlaceholder: 'https://tuagencia.com o @tuagencia',
      sectorOptions: [
        { value: 'webdev', label: 'Desarrollo Web / App' },
        { value: 'marketing', label: 'Marketing Digital' },
        { value: 'consulting', label: 'Consultoría' },
        { value: 'design', label: 'Diseño Gráfico' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'education', label: 'Educación / Formación' },
        { value: 'services', label: 'Servicios Profesionales' },
        { value: 'custom', label: 'Otro (personalizado)' }
      ]
    },
    step2: {
      heading: 'El Cliente',
      clientNameLabel: 'Nombre del cliente o empresa',
      clientNamePlaceholder: 'Ej: Corporación Horizonte S.A.',
      clientRoleLabel: 'Cargo del contacto (opcional)',
      clientRolePlaceholder: 'Ej: Director General, CMO, Fundador',
      clientNeedLabel: 'Problema o necesidad específica del cliente',
      clientNeedPlaceholder:
        'Describe el reto o necesidad específica que tiene el cliente y que tú vas a resolver con tu servicio...',
      clientNeedMax: 500
    },
    step3: {
      heading: 'La Propuesta',
      docTypeLabel: 'Tipo de documento',
      docTypeOptions: [
        { value: 'full', label: 'Propuesta completa' },
        { value: 'quote', label: 'Cotización rápida' },
        { value: 'onepager', label: 'One-pager' },
        { value: 'followup', label: 'Email de seguimiento' }
      ],
      serviceLabel: 'Servicio o producto que ofreces',
      servicePlaceholder:
        'Describe en detalle el servicio o producto que vas a ofrecer al cliente...',
      priceLabel: 'Precio o rango de precios',
      pricePlaceholder: 'Ej: $2,500 · Desde $1,000 · $50/hora',
      currencyLabel: 'Moneda',
      currencies: ['USD', 'EUR', 'MXN', 'COP', 'ARS', 'CLP', 'PEN'],
      deliveryLabel: 'Plazo de entrega estimado',
      deliveryPlaceholder: 'Ej: 4-6 semanas',
      differLabel: 'Diferenciadores clave',
      differPlaceholder:
        '¿Qué te hace diferente de la competencia? Lista tus ventajas principales, metodología, experiencia...',
      guaranteeLabel: 'Garantía o política de satisfacción (opcional)',
      guaranteePlaceholder: 'Ej: 30 días de soporte post-entrega incluidos sin costo adicional'
    },
    step4: {
      heading: 'Estilo y Opciones',
      toneLabel: 'Tono de la propuesta',
      tones: [
        { value: 'formal', label: 'Formal' },
        { value: 'friendly', label: 'Cercano' },
        { value: 'technical', label: 'Técnico' },
        { value: 'persuasive', label: 'Persuasivo' }
      ],
      langLabel: 'Idioma de la propuesta',
      langEs: '🇪🇸 Español',
      langEn: '🇺🇸 English',
      sectionsLabel: 'Secciones adicionales (opcional)',
      sectionOptions: [
        { key: 'testimonials', label: 'Testimonios / Casos de éxito' },
        { key: 'pricing', label: 'Tabla de precios detallada' },
        { key: 'timeline', label: 'Timeline / Fases del proyecto' },
        { key: 'faq', label: 'Preguntas frecuentes (FAQ)' }
      ]
    },
    result: {
      heading: 'Tu Propuesta Comercial',
      badgeOnline: '⚡ Generada con IA (Groq)',
      badgeOffline: '📄 Generada offline',
      copyBtn: '⎘ Copiar',
      copiedBtn: '✓ ¡Copiado!',
      downloadBtn: '↓ Descargar .txt',
      regenerateBtn: '↺ Regenerar',
      newBtn: '+ Nueva propuesta',
      favoriteBtnOff: '☆ Guardar en favoritos',
      favoriteBtnOn: '★ En favoritos',
      variantsLabel: 'Variantes rápidas:',
      variantChips: [
        { key: 'formal', label: 'Más formal' },
        { key: 'persuasive', label: 'Más persuasivo' },
        { key: 'shorter', label: 'Más corto' },
        { key: 'guarantee', label: 'Añadir garantía' }
      ],
      generatingTitle: 'Generando tu propuesta...',
      generatingDesc:
        'La IA está redactando una propuesta única y persuasiva para tu cliente. Espera un momento...',
      savedToHistory: '✓ Guardada en historial'
    },
    history: {
      panelTitle: '📜 Historial de Propuestas',
      empty:
        'Aún no has generado propuestas. Cuando generes una, aparecerá aquí automáticamente.',
      useBtn: 'Usar',
      deleteBtn: 'Eliminar',
      clearAllBtn: 'Borrar todo el historial',
      closeBtn: '✕',
      label: 'Historial'
    },
    favorites: {
      panelTitle: '⭐ Propuestas Favoritas',
      empty:
        'No tienes propuestas favoritas todavía. Marca una propuesta con ★ para guardarla aquí.',
      useBtn: 'Usar',
      removeBtn: 'Quitar',
      clearAllBtn: 'Borrar todos los favoritos',
      closeBtn: '✕',
      label: 'Favoritos'
    },
    footer: {
      tagline: 'Generador de Propuestas Comerciales con IA',
      crossPromoTitle: 'Más herramientas gratuitas de MolvicStudios:',
      crossPromoLinks: [
        { label: '¿Necesitas más clientes? → Prospectly', url: 'https://prospectly.pro' },
        { label: 'Genera prompts para IA → PromptGenius.pro', url: 'https://promptgenius.pro' },
        { label: 'Aprende sobre IA → iafacil.help', url: 'https://iafacil.help' }
      ],
      rights: '© 2026 MolvicStudios. Todos los derechos reservados.',
      disclaimer: 'Sin cookies de seguimiento · Sin backend · 100% en tu navegador'
    },
    errors: {
      required: 'Este campo es obligatorio.',
      step1Missing: 'Completa el nombre de empresa y el sector antes de continuar.',
      step2Missing: 'Completa el nombre del cliente y su necesidad antes de continuar.',
      step3Missing: 'Completa la descripción del servicio y el precio antes de continuar.',
      apiKeyMissing: 'Para usar el modo online, primero pega tu API key de Groq.',
      apiKeyInvalid: 'La API key no parece válida. Debe comenzar con "gsk_".',
      groqError: 'Error al conectar con Groq. Verifica tu API key o intenta más tarde.',
      networkError: 'Error de red. Verifica tu conexión a internet.',
      noModeSelected: 'Selecciona el modo Online u Offline antes de generar.'
    },
    legal: {
      privacyLink: 'Política de Privacidad',
      cookiesLink: 'Política de Cookies'
    }
  },

  en: {
    nav: {
      logo: 'Propuestas.pro',
      by: 'by MolvicStudios',
      history: '📜 History',
      favorites: '⭐ Favorites',
      langToggle: 'ES',
      ariaMain: 'Main navigation',
      ariaHistory: 'Open proposal history',
      ariaFavorites: 'Open favorite proposals',
      ariaLang: 'Switch to Spanish'
    },
    hero: {
      badge: '100% Free · No Sign-up · No Backend',
      titleLine1: 'Generate Business',
      titleAccent: 'Proposals',
      titleLine2: 'that Close Deals',
      tagline: 'AI-Powered Business Proposal Generator',
      description:
        '8 sector-specific templates. Online mode with Groq AI (Llama 3.3) or offline without internet. Bilingual ES/EN. Free, no sign-up.'
    },
    mode: {
      heading: 'Choose how to generate your proposal',
      onlineTitle: 'Online Mode',
      onlineTag: 'Groq AI',
      onlineDesc:
        'Unique, persuasive proposals generated by AI (Llama 3.3 · 70B). Requires free Groq API key.',
      offlineTitle: 'Offline Mode',
      offlineTag: 'Templates',
      offlineDesc:
        'Professional proposals with 8 sector templates. No internet, no API key, always works.',
      activeBadgeOnline: '✓ Online Mode Active',
      activeBadgeOffline: '✓ Offline Mode Active',
      apiKeyHeading: 'Groq AI Configuration',
      apiKeyLabel: 'Groq API Key',
      apiKeyPlaceholder: 'gsk_...',
      apiKeySave: 'Save key',
      apiKeyNote:
        "🔒 Your key is stored only in your browser's sessionStorage. Never sent to our servers.",
      apiKeyLink: 'Get your free key →',
      modelLabel: 'AI Model:',
      modelOptions: [
        { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B — Powerful (recommended)' },
        { id: 'llama-3.1-8b-instant', label: 'Llama 3.1 8B — Fast' }
      ],
      groqFaqTitle: 'What is the Groq API and how do I get it?',
      groqFaqSteps: [
        { n: '1', text: 'Go to console.groq.com/keys and create a free account.' },
        { n: '2', text: 'Click "Create API Key" to generate your personal key.' },
        {
          n: '3',
          text: 'Copy the key (starts with gsk_) and paste it in the field above.'
        },
        { n: '4', text: "Done! Generate professional AI proposals completely for free." }
      ]
    },
    wizard: {
      progressLabel: 'Progress',
      prevBtn: '← Previous',
      nextBtn: 'Next →',
      generateBtn: '✦ Generate Proposal',
      draftSaved: '✓ Draft saved',
      draftRestored: '✓ Draft restored automatically',
      stepLabels: ['Your Business', 'The Client', 'The Proposal', 'Style'],
      livePreviewTitle: '✦ Real-Time Preview',
      livePreviewEmpty:
        'Fill in at least company, client, and service to see the live preview updated automatically...'
    },
    step1: {
      heading: 'Your Business',
      companyLabel: 'Company or brand name',
      companyPlaceholder: 'E.g.: Digital Agency Nexo',
      sectorLabel: 'Sector or industry',
      sectorDefault: 'Select a sector...',
      descLabel: 'Brief description of what you offer',
      descPlaceholder:
        'E.g.: We are an agency specializing in web design and SEO for SMBs in the retail sector...',
      descMax: 300,
      websiteLabel: 'Website or social media (optional)',
      websitePlaceholder: 'https://youragency.com or @youragency',
      sectorOptions: [
        { value: 'webdev', label: 'Web / App Development' },
        { value: 'marketing', label: 'Digital Marketing' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'design', label: 'Graphic Design' },
        { value: 'ecommerce', label: 'E-commerce' },
        { value: 'education', label: 'Education / Training' },
        { value: 'services', label: 'Professional Services' },
        { value: 'custom', label: 'Other (custom)' }
      ]
    },
    step2: {
      heading: 'The Client',
      clientNameLabel: 'Client or company name',
      clientNamePlaceholder: 'E.g.: Horizon Corporation Inc.',
      clientRoleLabel: 'Contact role (optional)',
      clientRolePlaceholder: 'E.g.: CEO, CMO, Founder',
      clientNeedLabel: "Client's specific problem or need",
      clientNeedPlaceholder:
        "Describe the specific challenge or need the client has that you will solve with your service...",
      clientNeedMax: 500
    },
    step3: {
      heading: 'The Proposal',
      docTypeLabel: 'Document type',
      docTypeOptions: [
        { value: 'full', label: 'Full proposal' },
        { value: 'quote', label: 'Quick quote' },
        { value: 'onepager', label: 'One-pager' },
        { value: 'followup', label: 'Follow-up email' }
      ],
      serviceLabel: 'Service or product you offer',
      servicePlaceholder:
        'Describe in detail the service or product you will offer the client...',
      priceLabel: 'Price or price range',
      pricePlaceholder: 'E.g.: $2,500 · From $1,000 · $50/hour',
      currencyLabel: 'Currency',
      currencies: ['USD', 'EUR', 'MXN', 'COP', 'ARS', 'CLP', 'PEN'],
      deliveryLabel: 'Estimated delivery time',
      deliveryPlaceholder: 'E.g.: 4-6 weeks',
      differLabel: 'Key differentiators',
      differPlaceholder:
        'What makes you different from the competition? List your main advantages, methodology, experience...',
      guaranteeLabel: 'Guarantee or satisfaction policy (optional)',
      guaranteePlaceholder: 'E.g.: 30 days of post-delivery support included at no extra cost'
    },
    step4: {
      heading: 'Style & Options',
      toneLabel: 'Proposal tone',
      tones: [
        { value: 'formal', label: 'Formal' },
        { value: 'friendly', label: 'Friendly' },
        { value: 'technical', label: 'Technical' },
        { value: 'persuasive', label: 'Persuasive' }
      ],
      langLabel: 'Proposal language',
      langEs: '🇪🇸 Spanish',
      langEn: '🇺🇸 English',
      sectionsLabel: 'Additional sections (optional)',
      sectionOptions: [
        { key: 'testimonials', label: 'Testimonials / Success cases' },
        { key: 'pricing', label: 'Detailed pricing table' },
        { key: 'timeline', label: 'Timeline / Project phases' },
        { key: 'faq', label: 'Frequently asked questions (FAQ)' }
      ]
    },
    result: {
      heading: 'Your Commercial Proposal',
      badgeOnline: '⚡ Generated with AI (Groq)',
      badgeOffline: '📄 Generated offline',
      copyBtn: '⎘ Copy',
      copiedBtn: '✓ Copied!',
      downloadBtn: '↓ Download .txt',
      regenerateBtn: '↺ Regenerate',
      newBtn: '+ New proposal',
      favoriteBtnOff: '☆ Save to favorites',
      favoriteBtnOn: '★ In favorites',
      variantsLabel: 'Quick variants:',
      variantChips: [
        { key: 'formal', label: 'More formal' },
        { key: 'persuasive', label: 'More persuasive' },
        { key: 'shorter', label: 'Shorter' },
        { key: 'guarantee', label: 'Add guarantee' }
      ],
      generatingTitle: 'Generating your proposal...',
      generatingDesc:
        'AI is writing a unique and persuasive proposal for your client. Please wait a moment...',
      savedToHistory: '✓ Saved to history'
    },
    history: {
      panelTitle: '📜 Proposal History',
      empty:
        "You haven't generated any proposals yet. When you do, they'll appear here automatically.",
      useBtn: 'Use',
      deleteBtn: 'Delete',
      clearAllBtn: 'Clear all history',
      closeBtn: '✕',
      label: 'History'
    },
    favorites: {
      panelTitle: '⭐ Favorite Proposals',
      empty:
        "You have no favorite proposals yet. Mark a proposal with ★ to save it here.",
      useBtn: 'Use',
      removeBtn: 'Remove',
      clearAllBtn: 'Clear all favorites',
      closeBtn: '✕',
      label: 'Favorites'
    },
    footer: {
      tagline: 'AI-Powered Business Proposal Generator',
      crossPromoTitle: 'More free tools by MolvicStudios:',
      crossPromoLinks: [
        { label: 'Need more clients? → Prospectly', url: 'https://prospectly.pro' },
        { label: 'Generate AI prompts → PromptGenius.pro', url: 'https://promptgenius.pro' },
        { label: 'Learn about AI → iafacil.help', url: 'https://iafacil.help' }
      ],
      rights: '© 2026 MolvicStudios. All rights reserved.',
      disclaimer: 'No tracking cookies · No backend · 100% in your browser'
    },
    errors: {
      required: 'This field is required.',
      step1Missing: 'Fill in the company name and sector before continuing.',
      step2Missing: 'Fill in the client name and their need before continuing.',
      step3Missing: 'Fill in the service description and price before continuing.',
      apiKeyMissing: 'To use online mode, first paste your Groq API key.',
      apiKeyInvalid: 'The API key does not seem valid. It should start with "gsk_".',
      groqError: 'Error connecting to Groq. Check your API key or try again later.',
      networkError: 'Network error. Check your internet connection.',
      noModeSelected: 'Select Online or Offline mode before generating.'
    },
    legal: {
      privacyLink: 'Privacy Policy',
      cookiesLink: 'Cookie Policy'
    }
  }
};

/**
 * Simple translation helper.
 * Usage: t(lang, 'hero', 'badge')  ➜  returns string
 */
export function t(lang, section, key) {
  const langData = translations[lang] || translations.es;
  if (!section) return langData;
  const sectionData = langData[section];
  if (!sectionData) return key || '';
  if (!key) return sectionData;
  return sectionData[key] !== undefined ? sectionData[key] : key;
}
