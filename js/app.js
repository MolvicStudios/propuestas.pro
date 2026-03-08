// js/app.js
// Propuestas.pro — Main application logic
// by MolvicStudios

import { translations, t } from './translations.js';
import { buildProposal, applyVariant, buildSystemPrompt, buildUserPrompt } from './templates.js';

// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────
const state = {
  lang:          localStorage.getItem('pp_lang') || 'es',
  mode:          null,      // 'online' | 'offline'
  currentStep:   1,
  totalSteps:    4,
  groqModel:     'llama-3.3-70b-versatile',
  currentProposal: null,
  isGenerating:  false,
  isFavorite:    false,
  debounceTimer: null,
  logoDataUrl:   null,   // base64 data URL for company logo
};

// ─────────────────────────────────────────────────────────────────────────────
// STORAGE KEYS
// ─────────────────────────────────────────────────────────────────────────────
const KEYS = {
  history:   'pp_history',
  favorites: 'pp_favorites',
  draft:     'pp_draft',
  lang:      'pp_lang',
  mode:      'pp_mode',
  apiKey:    'pp_groq_key',   // sessionStorage
};

// ─────────────────────────────────────────────────────────────────────────────
// DOM REFERENCES  (populated in init())
// ─────────────────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

let dom = {};

function cacheDOM() {
  dom = {
    // Navbar
    navLogo:       $('nav-logo'),
    navBy:         $('nav-by'),
    btnHistory:    $('btn-open-history'),
    btnFavorites:  $('btn-open-favorites'),
    btnLang:       $('btn-lang'),

    // Hero
    heroBadge:     $('hero-badge'),
    heroTitle1:    $('hero-title-1'),
    heroAccent:    $('hero-title-accent'),
    heroTitle2:    $('hero-title-2'),
    heroTagline:   $('hero-tagline'),
    heroDesc:      $('hero-desc'),

    // Mode
    modeHeading:   $('mode-heading'),
    cardOnline:    $('card-online'),
    cardOffline:   $('card-offline'),
    cardOnlineTitle: $('card-online-title'),
    cardOnlineTag:   $('card-online-tag'),
    cardOnlineDesc:  $('card-online-desc'),
    cardOnlineBadge: $('card-online-badge'),
    cardOfflineTitle: $('card-offline-title'),
    cardOfflineTag:   $('card-offline-tag'),
    cardOfflineDesc:  $('card-offline-desc'),
    cardOfflineBadge: $('card-offline-badge'),

    // API panel
    apiPanel:      $('api-panel'),
    apiPanelHeading: $('api-panel-heading'),
    apiKeyInput:   $('api-key-input'),
    btnSaveKey:    $('btn-save-key'),
    apiKeyNote:    $('api-key-note'),
    apiKeyLink:    $('api-key-link'),
    modelSelect:   $('model-select'),
    modelLabel:    $('model-label'),
    groqFaqToggle: $('groq-faq-toggle'),
    groqFaqTitle:  $('groq-faq-title'),
    groqFaqBody:   $('groq-faq-body'),
    groqFaqSteps:  $('groq-faq-steps'),
    groqFaq:       $('groq-faq'),

    // Wizard
    wizardSection:   $('wizard-section'),
    stepDots:        $$('.step-dot'),
    stepLabelItems:  $$('.step-label-item'),
    wizardSteps:     $$('.wizard-step'),
    wizardStepInfo:  $('wizard-step-info'),
    btnPrev:         $('btn-prev'),
    btnNext:         $('btn-next'),
    btnGenerate:     $('btn-generate'),
    draftToast:      $('draft-toast'),

    // Step 1
    companyInput:    $('company-input'),
    sectorSelect:    $('sector-select'),
    descTextarea:    $('desc-textarea'),
    descCounter:     $('desc-counter'),
    websiteInput:    $('website-input'),
    logoInput:       $('logo-input'),
    logoPreview:     $('logo-preview'),
    logoUploadPlaceholder: $('logo-upload-placeholder'),
    logoUploadHint:  $('logo-upload-hint'),
    btnLogoUpload:   $('btn-logo-upload'),
    btnLogoRemove:   $('btn-logo-remove'),

    // Step 2
    clientNameInput: $('client-name-input'),
    clientRoleInput: $('client-role-input'),
    clientNeedTA:    $('client-need-textarea'),
    clientNeedCounter: $('client-need-counter'),

    // Step 3
    docTypeSelect:   $('doc-type-select'),
    serviceTA:       $('service-textarea'),
    priceInput:      $('price-input'),
    currencySelect:  $('currency-select'),
    deliveryInput:   $('delivery-input'),
    differTA:        $('differ-textarea'),
    guaranteeInput:  $('guarantee-input'),

    // Step 4
    toneBtns:        $$('.tone-btn'),
    langBtns:        $$('.lang-btn'),
    sectionChecks:   $$('.section-check'),

    // Live preview
    livePreviewPanel:  $('live-preview-panel'),
    livePreviewPre:    $('live-preview-pre'),
    livePreviewEmpty:  $('live-preview-empty'),
    livePreviewTitle:  $('live-preview-title'),

    // Result
    resultSection:   $('result-section'),
    resultTitle:     $('result-title'),
    resultBadge:     $('result-badge'),
    btnFavorite:     $('btn-favorite'),
    btnFavoriteText: $('btn-favorite-text'),
    resultActions:   $('result-actions'),
    btnCopy:         $('btn-copy'),
    btnDownload:     $('btn-download'),
    btnDownloadDocx: $('btn-download-docx'),
    btnDownloadPdf:  $('btn-download-pdf'),
    btnRegenerate:   $('btn-regenerate'),
    btnNew:          $('btn-new'),
    variantChips:    $$('.variant-chip'),
    skeletonLoader:  $('skeleton-loader'),
    proposalPre:     $('proposal-pre'),
    variantsLabel:   $('variants-label'),

    // History
    historyPanel:    $('history-panel'),
    historyTitle:    $('history-panel-title'),
    historyList:     $('history-list'),
    btnCloseHistory: $('btn-close-history'),
    btnClearHistory: $('btn-clear-history'),

    // Favorites
    favoritesPanel:    $('favorites-panel'),
    favoritesTitle:    $('favorites-panel-title'),
    favoritesList:     $('favorites-list'),
    btnCloseFavorites: $('btn-close-favorites'),
    btnClearFavorites: $('btn-clear-favorites'),

    // Overlay
    overlay:         $('overlay'),

    // Footer
    footerBrand:     $('footer-brand'),
    footerTagline:   $('footer-tagline'),
    footerPromoTitle:$('footer-promo-title'),
    footerPromoLinks:$('footer-promo-links'),
    footerRights:    $('footer-rights'),
    footerDisclaimer:$('footer-disclaimer'),

    // How It Works + Hero CTA
    heroCta:      $('hero-cta'),
    hiwHeading:   $('hiw-heading'),
    hiwS1Title:   $('hiw-s1-title'),
    hiwS1Desc:    $('hiw-s1-desc'),
    hiwS2Title:   $('hiw-s2-title'),
    hiwS2Desc:    $('hiw-s2-desc'),
    hiwS3Title:   $('hiw-s3-title'),
    hiwS3Desc:    $('hiw-s3-desc'),
    hiwS4Title:   $('hiw-s4-title'),
    hiwS4Desc:    $('hiw-s4-desc'),

    // Result share
    btnShare:     $('btn-share'),
    btnShareText: $('btn-share-text'),

    // Toasts
    draftToastEl:    $('draft-toast'),
    errorToast:      $('error-toast'),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  cacheDOM();
  renderUI(state.lang);
  restoreDraft();
  restoreMode();
  restoreApiKey();
  bindEvents();
  initCookieBanner();
});

// ─────────────────────────────────────────────────────────────────────────────
// RENDER UI (all translatable text)
// ─────────────────────────────────────────────────────────────────────────────
function renderUI(lang) {
  const T = translations[lang];
  if (!T) return;

  document.documentElement.lang = lang;

  // Navbar
  if (dom.navLogo)      dom.navLogo.textContent    = T.nav.logo;
  if (dom.navBy)        dom.navBy.textContent       = T.nav.by;
  if (dom.btnHistory)   dom.btnHistory.textContent  = T.nav.history;
  if (dom.btnFavorites) dom.btnFavorites.textContent = T.nav.favorites;
  if (dom.btnLang)      dom.btnLang.textContent     = T.nav.langToggle;

  // Hero
  if (dom.heroBadge)   dom.heroBadge.textContent   = T.hero.badge;
  if (dom.heroTitle1)  dom.heroTitle1.textContent   = T.hero.titleLine1;
  if (dom.heroAccent)  dom.heroAccent.textContent   = T.hero.titleAccent;
  if (dom.heroTitle2)  dom.heroTitle2.textContent   = T.hero.titleLine2;
  if (dom.heroTagline) dom.heroTagline.textContent  = T.hero.tagline;
  if (dom.heroDesc)    dom.heroDesc.textContent     = T.hero.description;
  if (dom.heroCta)     dom.heroCta.textContent      = T.hero.ctaBtn;

  // How It Works
  if (dom.hiwHeading) dom.hiwHeading.textContent = T.howItWorks.heading;
  if (T.howItWorks?.steps) {
    const s = T.howItWorks.steps;
    if (dom.hiwS1Title) dom.hiwS1Title.textContent = s[0].title;
    if (dom.hiwS1Desc)  dom.hiwS1Desc.textContent  = s[0].desc;
    if (dom.hiwS2Title) dom.hiwS2Title.textContent = s[1].title;
    if (dom.hiwS2Desc)  dom.hiwS2Desc.textContent  = s[1].desc;
    if (dom.hiwS3Title) dom.hiwS3Title.textContent = s[2].title;
    if (dom.hiwS3Desc)  dom.hiwS3Desc.textContent  = s[2].desc;
    if (dom.hiwS4Title) dom.hiwS4Title.textContent = s[3].title;
    if (dom.hiwS4Desc)  dom.hiwS4Desc.textContent  = s[3].desc;
  }

  // Mode
  if (dom.modeHeading)    dom.modeHeading.textContent    = T.mode.heading;
  if (dom.cardOnlineTitle) dom.cardOnlineTitle.textContent = T.mode.onlineTitle;
  if (dom.cardOnlineTag)   dom.cardOnlineTag.textContent  = T.mode.onlineTag;
  if (dom.cardOnlineDesc)  dom.cardOnlineDesc.textContent = T.mode.onlineDesc;
  if (dom.cardOnlineBadge) dom.cardOnlineBadge.textContent = T.mode.activeBadgeOnline;
  if (dom.cardOfflineTitle) dom.cardOfflineTitle.textContent = T.mode.offlineTitle;
  if (dom.cardOfflineTag)   dom.cardOfflineTag.textContent = T.mode.offlineTag;
  if (dom.cardOfflineDesc)  dom.cardOfflineDesc.textContent = T.mode.offlineDesc;
  if (dom.cardOfflineBadge) dom.cardOfflineBadge.textContent = T.mode.activeBadgeOffline;

  // API Panel
  if (dom.apiPanelHeading) dom.apiPanelHeading.textContent = T.mode.apiKeyHeading;
  const apiKeyLabel = document.querySelector('label[for="api-key-input"]');
  if (apiKeyLabel) apiKeyLabel.textContent = T.mode.apiKeyLabel;
  if (dom.apiKeyInput) dom.apiKeyInput.placeholder = T.mode.apiKeyPlaceholder;
  if (dom.btnSaveKey)  dom.btnSaveKey.textContent  = T.mode.apiKeySave;
  if (dom.apiKeyNote)  dom.apiKeyNote.textContent  = T.mode.apiKeyNote;
  if (dom.apiKeyLink)  dom.apiKeyLink.textContent  = T.mode.apiKeyLink;
  if (dom.modelLabel)  dom.modelLabel.textContent  = T.mode.modelLabel;
  if (dom.groqFaqTitle) dom.groqFaqTitle.textContent = T.mode.groqFaqTitle;

  // Model select options
  if (dom.modelSelect && T.mode.modelOptions) {
    dom.modelSelect.innerHTML = T.mode.modelOptions
      .map(m => `<option value="${m.id}"${m.id === state.groqModel ? ' selected' : ''}>${m.label}</option>`)
      .join('');
  }

  // Groq FAQ steps
  if (dom.groqFaqSteps && T.mode.groqFaqSteps) {
    dom.groqFaqSteps.innerHTML = T.mode.groqFaqSteps
      .map(s => `<li class="groq-faq__step">
        <span class="groq-faq__step-n">${s.n}</span>
        <span class="groq-faq__step-text">${s.text}</span>
      </li>`)
      .join('');
  }

  // Wizard step labels
  if (dom.stepLabelItems && T.wizard.stepLabels) {
    dom.stepLabelItems.forEach((el, i) => {
      el.textContent = T.wizard.stepLabels[i] || '';
    });
  }

  // Wizard nav buttons
  const btnPrevText = document.getElementById('btn-prev-text');
  const btnNextText = document.getElementById('btn-next-text');
  const btnGenText  = document.getElementById('btn-generate-text');
  if (btnPrevText) btnPrevText.textContent = T.wizard.prevBtn;
  if (btnNextText) btnNextText.textContent = T.wizard.nextBtn;
  if (btnGenText)  btnGenText.textContent  = T.wizard.generateBtn;

  // Live preview title
  if (dom.livePreviewTitle) dom.livePreviewTitle.textContent = T.wizard.livePreviewTitle;
  if (dom.livePreviewEmpty) dom.livePreviewEmpty.textContent = T.wizard.livePreviewEmpty;

  // Step headings
  renderStepHeadings(lang);

  // Step 1 form fields
  renderStep1(lang);

  // Step 2 form fields
  renderStep2(lang);

  // Step 3 form fields
  renderStep3(lang);

  // Step 4 form fields
  renderStep4(lang);

  // Result
  if (dom.resultTitle) dom.resultTitle.textContent = T.result.heading;
  const btnFavText = document.getElementById('btn-favorite-text');
  if (btnFavText) btnFavText.textContent = state.isFavorite ? T.result.favoriteBtnOn : T.result.favoriteBtnOff;
  if (dom.btnCopy)       dom.btnCopy.querySelector('span').textContent = T.result.copyBtn;
  if (dom.btnDownload)   dom.btnDownload.querySelector('span').textContent = T.result.downloadBtn;
  if (dom.btnDownloadDocx) dom.btnDownloadDocx.querySelector('span').textContent = T.result.downloadDocxBtn;
  if (dom.btnDownloadPdf)  dom.btnDownloadPdf.querySelector('span').textContent  = T.result.downloadPdfBtn;
  if (dom.btnRegenerate) dom.btnRegenerate.querySelector('span').textContent = T.result.regenerateBtn;
  if (dom.btnNew)        dom.btnNew.querySelector('span').textContent = T.result.newBtn;
  if (dom.btnShareText)  dom.btnShareText.textContent = T.result.shareBtn;
  if (dom.variantsLabel) dom.variantsLabel.textContent = T.result.variantsLabel;
  dom.variantChips.forEach(chip => {
    const key = chip.dataset.variant;
    const found = T.result.variantChips.find(v => v.key === key);
    if (found) chip.textContent = found.label;
  });

  // History/Favorites panels
  if (dom.historyTitle)    dom.historyTitle.textContent   = T.history.panelTitle;
  if (dom.favoritesTitle)  dom.favoritesTitle.textContent = T.favorites.panelTitle;
  if (dom.btnClearHistory)   dom.btnClearHistory.textContent = T.history.clearAllBtn;
  if (dom.btnClearFavorites) dom.btnClearFavorites.textContent = T.favorites.clearAllBtn;
  if (dom.btnCloseHistory)   dom.btnCloseHistory.setAttribute('aria-label', T.history.closeBtn);
  if (dom.btnCloseFavorites) dom.btnCloseFavorites.setAttribute('aria-label', T.favorites.closeBtn);

  // Footer
  if (dom.footerTagline)    dom.footerTagline.textContent = T.footer.tagline;
  if (dom.footerPromoTitle) dom.footerPromoTitle.textContent = T.footer.crossPromoTitle;
  if (dom.footerRights)     dom.footerRights.textContent = T.footer.rights;
  if (dom.footerDisclaimer) dom.footerDisclaimer.textContent = T.footer.disclaimer;
  if (dom.footerPromoLinks) {
    dom.footerPromoLinks.innerHTML = T.footer.crossPromoLinks
      .map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
      .join('');
  }

  // Legal links
  const privLink = document.getElementById('footer-privacy-link');
  const cookLink = document.getElementById('footer-cookies-link');
  if (privLink && T.legal) privLink.textContent = T.legal.privacyLink;
  if (cookLink && T.legal) cookLink.textContent = T.legal.cookiesLink;

  // Draft toast
  if (dom.draftToastEl) {
    // already handled at relevant points
  }

  // Update step info label
  renderStepInfo();
}

function renderStepHeadings(lang) {
  const T = translations[lang];
  const headings = [
    { id: 'step1-heading', txt: T.step1.heading },
    { id: 'step2-heading', txt: T.step2.heading },
    { id: 'step3-heading', txt: T.step3.heading },
    { id: 'step4-heading', txt: T.step4.heading },
  ];
  headings.forEach(h => {
    const el = $(h.id);
    if (el) el.textContent = h.txt;
  });
}

function renderStep1(lang) {
  const T = translations[lang].step1;
  setLabel('label-company', T.companyLabel);
  setPlaceholder('company-input', T.companyPlaceholder);
  setLabel('label-sector', T.sectorLabel);
  setLabel('label-desc', T.descLabel);
  setPlaceholder('desc-textarea', T.descPlaceholder);
  setLabel('label-website', T.websiteLabel);
  setPlaceholder('website-input', T.websitePlaceholder);
  setLabel('label-logo', T.logoLabel);
  if (dom.logoUploadHint) dom.logoUploadHint.textContent = T.logoHint;
  if (dom.btnLogoUpload)  dom.btnLogoUpload.textContent  = T.logoBtn;
  if (dom.btnLogoRemove)  dom.btnLogoRemove.textContent  = `✕ ${T.logoRemove}`;

  const sectorSel = $('sector-select');
  if (sectorSel && T.sectorOptions) {
    const current = sectorSel.value;
    sectorSel.innerHTML = `<option value="">${T.sectorDefault}</option>` +
      T.sectorOptions.map(o => `<option value="${o.value}"${o.value === current ? ' selected' : ''}>${o.label}</option>`).join('');
    if (current) sectorSel.value = current;
  }
}

function renderStep2(lang) {
  const T = translations[lang].step2;
  setLabel('label-client-name', T.clientNameLabel);
  setPlaceholder('client-name-input', T.clientNamePlaceholder);
  setLabel('label-client-role', T.clientRoleLabel);
  setPlaceholder('client-role-input', T.clientRolePlaceholder);
  setLabel('label-client-need', T.clientNeedLabel);
  setPlaceholder('client-need-textarea', T.clientNeedPlaceholder);
}

function renderStep3(lang) {
  const T = translations[lang].step3;
  setLabel('label-doc-type', T.docTypeLabel);
  setLabel('label-service', T.serviceLabel);
  setPlaceholder('service-textarea', T.servicePlaceholder);
  setLabel('label-price', T.priceLabel);
  setPlaceholder('price-input', T.pricePlaceholder);
  setLabel('label-currency', T.currencyLabel);
  setLabel('label-delivery', T.deliveryLabel);
  setPlaceholder('delivery-input', T.deliveryPlaceholder);
  setLabel('label-differ', T.differLabel);
  setPlaceholder('differ-textarea', T.differPlaceholder);
  setLabel('label-guarantee', T.guaranteeLabel);
  setPlaceholder('guarantee-input', T.guaranteePlaceholder);

  const docTypeSel = $('doc-type-select');
  if (docTypeSel && T.docTypeOptions) {
    const cur = docTypeSel.value;
    docTypeSel.innerHTML = T.docTypeOptions
      .map(o => `<option value="${o.value}"${o.value === cur ? ' selected' : ''}>${o.label}</option>`)
      .join('');
    if (cur) docTypeSel.value = cur;
  }
}

function renderStep4(lang) {
  const T = translations[lang].step4;
  setLabel('label-tone', T.toneLabel);
  setLabel('label-lang-prop', T.langLabel);
  setLabel('label-sections', T.sectionsLabel);

  // Tone buttons
  dom.toneBtns.forEach(btn => {
    const val = btn.dataset.tone;
    const found = T.tones.find(to => to.value === val);
    if (found) btn.textContent = found.label;
  });

  // Language buttons
  dom.langBtns.forEach(btn => {
    const val = btn.dataset.lang;
    if (val === 'es') btn.textContent = T.langEs;
    if (val === 'en') btn.textContent = T.langEn;
  });

  // Section checkboxes
  const sectionLabels = document.querySelectorAll('.section-label');
  sectionLabels.forEach(el => {
    const key = el.dataset.section;
    const found = T.sectionOptions.find(s => s.key === key);
    if (found) el.textContent = found.label;
  });
}

function setLabel(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}
function setPlaceholder(id, text) {
  const el = $(id);
  if (el) el.placeholder = text;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────
function renderStepInfo() {
  if (!dom.wizardStepInfo) return;
  const T = translations[state.lang];
  dom.wizardStepInfo.textContent = `${T.wizard.prevBtn.includes('←') ? '' : ''}${state.currentStep} / ${state.totalSteps}`;
}

function goToStep(step) {
  if (step < 1 || step > state.totalSteps) return;
  state.currentStep = step;
  renderStepInfo();

  // Propuesta #17: actualizar aria-valuenow del progressbar
  const progressBar = dom.wizardSection?.querySelector('[role="progressbar"]');
  if (progressBar) progressBar.setAttribute('aria-valuenow', step);

  // Show/hide steps
  dom.wizardSteps.forEach((el, i) => {
    el.classList.toggle('active', i + 1 === step);
  });

  // Update progress dots
  dom.stepDots.forEach((dot, i) => {
    dot.classList.remove('active', 'done');
    if (i + 1 === step) dot.classList.add('active');
    if (i + 1 < step)  dot.classList.add('done');
  });

  // Update step labels
  dom.stepLabelItems.forEach((el, i) => {
    el.classList.remove('active', 'done');
    if (i + 1 === step) el.classList.add('active');
    if (i + 1 < step)  el.classList.add('done');
  });

  // Show/hide prev/next/generate buttons
  if (dom.btnPrev) dom.btnPrev.disabled = step === 1;
  if (dom.btnNext)     dom.btnNext.classList.toggle('hidden', step === state.totalSteps);
  if (dom.btnGenerate) dom.btnGenerate.classList.toggle('hidden', step !== state.totalSteps);

  // Scroll to wizard
  if (dom.wizardSection) {
    dom.wizardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function validateStep(step) {
  const T = translations[state.lang];
  let valid = true;

  clearErrors();

  if (step === 1) {
    if (!dom.companyInput.value.trim()) {
      showFieldError('company-input', T.errors.required);
      valid = false;
    }
    if (!dom.sectorSelect.value) {
      showFieldError('sector-select', T.errors.required);
      valid = false;
    }
    if (!dom.descTextarea.value.trim()) {
      showFieldError('desc-textarea', T.errors.required);
      valid = false;
    }
    if (!valid) showToastError(T.errors.step1Missing);
  }

  if (step === 2) {
    if (!dom.clientNameInput.value.trim()) {
      showFieldError('client-name-input', T.errors.required);
      valid = false;
    }
    if (!dom.clientNeedTA.value.trim()) {
      showFieldError('client-need-textarea', T.errors.required);
      valid = false;
    }
    if (!valid) showToastError(T.errors.step2Missing);
  }

  if (step === 3) {
    if (!dom.serviceTA.value.trim()) {
      showFieldError('service-textarea', T.errors.required);
      valid = false;
    }
    if (!dom.priceInput.value.trim()) {
      showFieldError('price-input', T.errors.required);
      valid = false;
    }
    if (!valid) showToastError(T.errors.step3Missing);
  }

  return valid;
}

function showFieldError(id, msg) {
  const input = $(id);
  if (!input) return;
  input.classList.add('error');
  const group = input.closest('.form-group');
  if (group) {
    group.classList.add('has-error');
    const errEl = group.querySelector('.form-error');
    if (errEl) errEl.textContent = msg;
  }
}

function clearErrors() {
  $$('.form-input.error, .form-textarea.error, .form-select.error').forEach(el => el.classList.remove('error'));
  $$('.form-group.has-error').forEach(el => el.classList.remove('has-error'));
}

// ─────────────────────────────────────────────────────────────────────────────
// FORM DATA COLLECTION
// ─────────────────────────────────────────────────────────────────────────────
function collectFormData() {
  const tone = document.querySelector('.tone-btn.active')?.dataset.tone || 'formal';
  const propLang = document.querySelector('.lang-btn.active')?.dataset.lang || state.lang;

  const sections = {};
  dom.sectionChecks.forEach(cb => {
    sections[cb.dataset.section] = cb.checked;
  });

  return {
    company:       dom.companyInput?.value.trim()    || '',
    sector:        dom.sectorSelect?.value           || 'custom',
    description:   dom.descTextarea?.value.trim()    || '',
    website:       dom.websiteInput?.value.trim()    || '',
    clientName:    dom.clientNameInput?.value.trim() || '',
    clientRole:    dom.clientRoleInput?.value.trim() || '',
    clientNeed:    dom.clientNeedTA?.value.trim()    || '',
    docType:       dom.docTypeSelect?.value          || 'full',
    service:       dom.serviceTA?.value.trim()       || '',
    price:         dom.priceInput?.value.trim()      || '',
    currency:      dom.currencySelect?.value         || 'USD',
    delivery:      dom.deliveryInput?.value.trim()   || '',
    differentiators: dom.differTA?.value.trim()      || '',
    guarantee:     dom.guaranteeInput?.value.trim()  || '',
    tone,
    proposalLang:  propLang,
    sections,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// DRAFT AUTOSAVE / RESTORE
// ─────────────────────────────────────────────────────────────────────────────
function saveDraft() {
  try {
    const data = collectFormData();
    localStorage.setItem(KEYS.draft, JSON.stringify(data));
    showDraftToast();
  } catch (e) { /* ignore quota errors */ }
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem(KEYS.draft);
    if (!raw) return;
    const data = JSON.parse(raw);

    if (data.company       && dom.companyInput)    dom.companyInput.value    = data.company;
    if (data.sector        && dom.sectorSelect)    dom.sectorSelect.value    = data.sector;
    if (data.description   && dom.descTextarea)    dom.descTextarea.value    = data.description;
    if (data.website       && dom.websiteInput)    dom.websiteInput.value    = data.website;
    if (data.clientName    && dom.clientNameInput) dom.clientNameInput.value = data.clientName;
    if (data.clientRole    && dom.clientRoleInput) dom.clientRoleInput.value = data.clientRole;
    if (data.clientNeed    && dom.clientNeedTA)    dom.clientNeedTA.value    = data.clientNeed;
    if (data.docType       && dom.docTypeSelect)   dom.docTypeSelect.value   = data.docType;
    if (data.service       && dom.serviceTA)       dom.serviceTA.value       = data.service;
    if (data.price         && dom.priceInput)      dom.priceInput.value      = data.price;
    if (data.currency      && dom.currencySelect)  dom.currencySelect.value  = data.currency;
    if (data.delivery      && dom.deliveryInput)   dom.deliveryInput.value   = data.delivery;
    if (data.differentiators && dom.differTA)      dom.differTA.value        = data.differentiators;
    if (data.guarantee     && dom.guaranteeInput)  dom.guaranteeInput.value  = data.guarantee;

    // Tone
    if (data.tone) {
      dom.toneBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tone === data.tone);
      });
    }
    // Proposal lang
    if (data.proposalLang) {
      dom.langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === data.proposalLang);
      });
    }
    // Section checkboxes
    if (data.sections) {
      dom.sectionChecks.forEach(cb => {
        if (data.sections[cb.dataset.section] !== undefined) {
          cb.checked = !!data.sections[cb.dataset.section];
        }
      });
    }

    // Update counters
    updateCounter('desc-textarea', 'desc-counter', 300);
    updateCounter('client-need-textarea', 'client-need-counter', 500);

    const T = translations[state.lang];
    showDraftToast(T.wizard.draftRestored);
  } catch (e) { /* ignore */ }
}

function restoreMode() {
  const saved = localStorage.getItem(KEYS.mode);
  if (saved === 'online' || saved === 'offline') {
    selectMode(saved);
  }
}

function restoreApiKey() {
  const key = sessionStorage.getItem(KEYS.apiKey);
  if (key && dom.apiKeyInput) {
    dom.apiKeyInput.value = key;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODE SELECTION
// ─────────────────────────────────────────────────────────────────────────────
function selectMode(mode) {
  state.mode = mode;
  localStorage.setItem(KEYS.mode, mode);

  if (dom.cardOnline)  dom.cardOnline.classList.toggle('active',  mode === 'online');
  if (dom.cardOffline) dom.cardOffline.classList.toggle('active', mode === 'offline');

  if (dom.apiPanel) {
    dom.apiPanel.classList.toggle('hidden', mode !== 'online');
  }

  // Propuesta #9: abrir automáticamente el FAQ de Groq al seleccionar modo Online
  if (mode === 'online' && dom.groqFaq && !dom.groqFaq.classList.contains('open')) {
    dom.groqFaq.classList.add('open');
  }

  scrollToWizard();
}

function scrollToWizard() {
  setTimeout(() => {
    if (dom.wizardSection) {
      dom.wizardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// ─────────────────────────────────────────────────────────────────────────────
// LIVE PREVIEW
// ─────────────────────────────────────────────────────────────────────────────
function triggerLivePreview() {
  clearTimeout(state.debounceTimer);
  state.debounceTimer = setTimeout(updateLivePreview, 200);
}

function updateLivePreview() {
  const data = collectFormData();
  const propLang = data.proposalLang || state.lang;

  // Only show preview when minimum fields filled
  const hasMinData = data.company && data.clientName && data.service;

  if (!dom.livePreviewPanel) return;

  if (!hasMinData) {
    if (dom.livePreviewEmpty)  dom.livePreviewEmpty.classList.remove('hidden');
    if (dom.livePreviewPre)    dom.livePreviewPre.classList.add('hidden');
    return;
  }

  if (dom.livePreviewEmpty) dom.livePreviewEmpty.classList.add('hidden');
  if (dom.livePreviewPre)   dom.livePreviewPre.classList.remove('hidden');

  try {
    const preview = buildProposal(data, propLang);
    if (dom.livePreviewPre) {
      dom.livePreviewPre.textContent = preview.slice(0, 3000) + (preview.length > 3000 ? '\n...' : '');
    }
  } catch (e) { /* ignore preview errors */ }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROPOSAL GENERATION
// ─────────────────────────────────────────────────────────────────────────────
async function generateProposal() {
  const T = translations[state.lang];

  if (!state.mode) {
    showToastError(T.errors.noModeSelected);
    return;
  }

  const data   = collectFormData();
  const propLang = data.proposalLang || state.lang;

  // Show result section, hide wizard
  showResultSection();
  showSkeleton(T.result.generatingTitle, T.result.generatingDesc);

  try {
    let proposal;
    if (state.mode === 'online') {
      const apiKey = sessionStorage.getItem(KEYS.apiKey);
      if (!apiKey) {
        hideSkeleton();
        showToastError(T.errors.apiKeyMissing);
        hideResultSection();
        return;
      }
      if (!apiKey.startsWith('gsk_')) {
        hideSkeleton();
        showToastError(T.errors.apiKeyInvalid);
        hideResultSection();
        return;
      }
      proposal = await callGroq(data, propLang, apiKey);
    } else {
      // Small artificial delay so skeleton is visible
      await new Promise(r => setTimeout(r, 500));
      proposal = buildProposal(data, propLang);
    }

    state.currentProposal = proposal;
    state.isFavorite = false;

    hideSkeleton();
    showProposal(proposal, state.mode === 'online');
    addToHistory(data, proposal);
    updateFavoriteBtn();

  } catch (err) {
    hideSkeleton();
    hideResultSection();
    const msg = err.message?.includes('API') || err.message?.includes('fetch')
      ? T.errors.groqError
      : T.errors.networkError;
    showToastError(msg);
    console.error('[Propuestas.pro] Generation error:', err.message);
  }
}

function showResultSection() {
  if (dom.wizardSection)  dom.wizardSection.classList.add('hidden');
  if (dom.resultSection)  dom.resultSection.classList.remove('hidden');
  if (dom.resultSection)  dom.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Inicializar ad unit in-content cuando el panel se hace visible
  try {
    const inResultAd = document.getElementById('ad-incontent')?.querySelector('.adsbygoogle');
    if (inResultAd && !inResultAd.dataset.adsbygoogleStatus) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  } catch (_) {}
}

function hideResultSection() {
  if (dom.resultSection) dom.resultSection.classList.add('hidden');
  if (dom.wizardSection) dom.wizardSection.classList.remove('hidden');
}

function showSkeleton(title, desc) {
  if (dom.skeletonLoader)  dom.skeletonLoader.classList.remove('hidden');
  if (dom.proposalPre)     dom.proposalPre.classList.add('hidden');

  const titleEl = document.getElementById('skeleton-title');
  const descEl  = document.getElementById('skeleton-desc');
  if (titleEl) titleEl.textContent = title;
  if (descEl)  descEl.textContent  = desc;
}

function hideSkeleton() {
  if (dom.skeletonLoader) dom.skeletonLoader.classList.add('hidden');
  if (dom.proposalPre)    dom.proposalPre.classList.remove('hidden');
}

function showProposal(text, isOnline) {
  if (dom.proposalPre) dom.proposalPre.textContent = text;

  const T = translations[state.lang];
  if (dom.resultBadge) {
    dom.resultBadge.textContent = isOnline ? T.result.badgeOnline : T.result.badgeOffline;
    dom.resultBadge.className = 'result-badge ' + (isOnline ? 'online' : 'offline');
  }

  // Show saved toast
  setTimeout(() => showSavedToast(T.result.savedToHistory), 800);
}

// ─────────────────────────────────────────────────────────────────────────────
// GROQ API CALL
// ─────────────────────────────────────────────────────────────────────────────
async function callGroq(data, lang, apiKey) {
  const model   = state.groqModel;
  const sysPrompt  = buildSystemPrompt(data.sector, lang);
  const userPrompt = buildUserPrompt(data, lang);

  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: sysPrompt  },
        { role: 'user',   content: userPrompt },
      ],
      temperature: 0.72,
      max_tokens:  2048,
    }),
  });

  if (!resp.ok) {
    let errMsg = `HTTP ${resp.status}`;
    try {
      const errJson = await resp.json();
      errMsg = errJson?.error?.message || errMsg;
    } catch (_) {}
    throw new Error(`API Error: ${errMsg}`);
  }

  const json = await resp.json();
  return json?.choices?.[0]?.message?.content || '';
}

// ─────────────────────────────────────────────────────────────────────────────
// HISTORY
// ─────────────────────────────────────────────────────────────────────────────
function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.history) || '[]');
  } catch { return []; }
}

function saveHistory(arr) {
  try {
    localStorage.setItem(KEYS.history, JSON.stringify(arr.slice(0, 10)));
  } catch { /* ignore */ }
}

function addToHistory(data, content) {
  const history = getHistory();
  const entry = {
    id:      Date.now(),
    sector:  data.sector,
    company: data.company,
    client:  data.clientName,
    date:    new Date().toLocaleDateString(state.lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    preview: content.slice(0, 300),
    content,
  };
  history.unshift(entry);
  saveHistory(history);
  renderHistoryPanel();
}

function renderHistoryPanel() {
  if (!dom.historyList) return;
  const T = translations[state.lang];
  const history = getHistory();

  if (history.length === 0) {
    dom.historyList.innerHTML = `<p class="panel-empty">${T.history.empty}</p>`;
    return;
  }

  dom.historyList.innerHTML = history.map(entry => `
    <div class="panel-item" data-id="${entry.id}">
      <div class="panel-item__meta">
        <span class="panel-item__sector">${entry.sector || 'custom'}</span>
        <span class="panel-item__date">${entry.date || T.history.label}</span>
      </div>
      <div class="panel-item__preview">${escHtml(entry.preview)}</div>
      <div class="panel-item__actions">
        <button class="btn-panel-action use" data-action="use" data-id="${entry.id}">${T.history.useBtn}</button>
        <button class="btn-panel-action danger" data-action="delete" data-id="${entry.id}">${T.history.deleteBtn}</button>
      </div>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// FAVORITES
// ─────────────────────────────────────────────────────────────────────────────
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.favorites) || '[]');
  } catch { return []; }
}

function saveFavorites(arr) {
  try {
    localStorage.setItem(KEYS.favorites, JSON.stringify(arr));
  } catch { /* ignore */ }
}

function toggleFavorite() {
  if (!state.currentProposal) return;
  const T = translations[state.lang];

  if (state.isFavorite) {
    // Remove from favorites
    const favs = getFavorites().filter(f => f.content !== state.currentProposal);
    saveFavorites(favs);
    state.isFavorite = false;
  } else {
    // Add to favorites
    const data = collectFormData();
    const favs = getFavorites();
    favs.unshift({
      id:      Date.now(),
      sector:  data.sector,
      company: data.company,
      client:  data.clientName,
      date:    new Date().toLocaleDateString(state.lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      preview: state.currentProposal.slice(0, 300),
      content: state.currentProposal,
    });
    saveFavorites(favs);
    state.isFavorite = true;
  }

  updateFavoriteBtn();
  renderFavoritesPanel();
}

function updateFavoriteBtn() {
  const T = translations[state.lang];
  const btnFavText = document.getElementById('btn-favorite-text');
  if (dom.btnFavorite) dom.btnFavorite.classList.toggle('active', state.isFavorite);
  if (btnFavText) btnFavText.textContent = state.isFavorite ? T.result.favoriteBtnOn : T.result.favoriteBtnOff;
}

function renderFavoritesPanel() {
  if (!dom.favoritesList) return;
  const T = translations[state.lang];
  const favs = getFavorites();

  if (favs.length === 0) {
    dom.favoritesList.innerHTML = `<p class="panel-empty">${T.favorites.empty}</p>`;
    return;
  }

  dom.favoritesList.innerHTML = favs.map(entry => `
    <div class="panel-item" data-id="${entry.id}">
      <div class="panel-item__meta">
        <span class="panel-item__sector">${entry.sector || 'custom'}</span>
        <span class="panel-item__date">${entry.date || ''}</span>
      </div>
      <div class="panel-item__preview">${escHtml(entry.preview)}</div>
      <div class="panel-item__actions">
        <button class="btn-panel-action use" data-action="fav-use" data-id="${entry.id}">${T.favorites.useBtn}</button>
        <button class="btn-panel-action danger" data-action="fav-remove" data-id="${entry.id}">${T.favorites.removeBtn}</button>
      </div>
    </div>
  `).join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// PANEL OPEN / CLOSE
// ─────────────────────────────────────────────────────────────────────────────
function openPanel(type) {
  if (type === 'history') {
    renderHistoryPanel();
    dom.historyPanel?.classList.add('open');
  } else {
    renderFavoritesPanel();
    dom.favoritesPanel?.classList.add('open');
  }
  dom.overlay?.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeAllPanels() {
  dom.historyPanel?.classList.remove('open');
  dom.favoritesPanel?.classList.remove('open');
  dom.overlay?.classList.remove('visible');
  document.body.style.overflow = '';
}

// ─────────────────────────────────────────────────────────────────────────────
// LAZY SCRIPT LOADER
// ─────────────────────────────────────────────────────────────────────────────
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.onload  = resolve;
    s.onerror = () => reject(new Error(`Failed to load: ${src}`));
    document.head.appendChild(s);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// COPY & DOWNLOAD
// ─────────────────────────────────────────────────────────────────────────────
async function copyToClipboard() {
  if (!state.currentProposal) return;
  const T = translations[state.lang];
  const spanEl = dom.btnCopy?.querySelector('span');
  try {
    await navigator.clipboard.writeText(state.currentProposal);
    if (spanEl) spanEl.textContent = T.result.copiedBtn;
    dom.btnCopy?.classList.add('primary');
    setTimeout(() => {
      if (spanEl) spanEl.textContent = T.result.copyBtn;
      dom.btnCopy?.classList.remove('primary');
    }, 2000);
  } catch (_) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = state.currentProposal;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    if (spanEl) spanEl.textContent = T.result.copiedBtn;
    setTimeout(() => { if (spanEl) spanEl.textContent = T.result.copyBtn; }, 2000);
  }
}

function downloadTxt() {
  if (!state.currentProposal) return;
  const data = collectFormData();
  const filename = `propuesta-${data.company.replace(/\s+/g, '-').toLowerCase() || 'comercial'}-${Date.now()}.txt`;
  const blob = new Blob([state.currentProposal], { type: 'text/plain;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGO UPLOAD
// ─────────────────────────────────────────────────────────────────────────────
function handleLogoUpload(file) {
  if (!file) return;
  if (!file.type.startsWith('image/')) return;
  const MAX_BYTES = 2 * 1024 * 1024;
  if (file.size > MAX_BYTES) {
    showToastError(state.lang === 'es'
      ? 'El logo es demasiado grande (máx. 2 MB).'
      : 'Logo is too large (max 2 MB).');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    state.logoDataUrl = e.target.result;
    showLogoPreview(state.logoDataUrl);
  };
  reader.readAsDataURL(file);
}

function showLogoPreview(dataUrl) {
  if (!dom.logoPreview) return;
  dom.logoPreview.src = dataUrl;
  dom.logoPreview.classList.remove('hidden');
  if (dom.logoUploadPlaceholder) dom.logoUploadPlaceholder.classList.add('hidden');
  if (dom.btnLogoRemove)         dom.btnLogoRemove.classList.remove('hidden');
}

function clearLogo() {
  state.logoDataUrl = null;
  if (dom.logoPreview) {
    dom.logoPreview.src = '';
    dom.logoPreview.classList.add('hidden');
  }
  if (dom.logoUploadPlaceholder) dom.logoUploadPlaceholder.classList.remove('hidden');
  if (dom.btnLogoRemove)         dom.btnLogoRemove.classList.add('hidden');
  if (dom.logoInput) dom.logoInput.value = '';
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT TO DOCX
// ─────────────────────────────────────────────────────────────────────────────
async function downloadDocx() {
  if (!state.currentProposal) return;
  if (typeof htmlDocx === 'undefined') {
    try {
      await loadScript('https://unpkg.com/html-docx-js@0.3.1/dist/html-docx.js');
    } catch (_) {
      showToastError(state.lang === 'es'
        ? 'La librería DOCX no está disponible. Verifica tu conexión a internet.'
        : 'DOCX library not available. Check your internet connection.');
      return;
    }
  }
  const data = collectFormData();
  const logoHtml = state.logoDataUrl
    ? `<img src="${state.logoDataUrl}" style="max-height:80px;max-width:220px;object-fit:contain;display:block;margin-bottom:16px;">`
    : '';
  const bodyText = escHtml(state.currentProposal).replace(/\n/g, '<br>');
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:Arial,sans-serif;font-size:11pt;line-height:1.6;">${logoHtml}<div style="white-space:pre-wrap;">${bodyText}</div></body></html>`;
  try {
    const blob = htmlDocx.asBlob(html);
    const filename = `propuesta-${(data.company || 'comercial').replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.docx`;
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    showToastError(state.lang === 'es' ? 'Error al generar el DOCX.' : 'Error generating DOCX.');
    console.error('[Propuestas.pro] DOCX error:', err.message);
  }
}

async function downloadPdf() {
  if (!state.currentProposal) return;
  if (typeof window.jspdf === 'undefined') {
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
    } catch (_) {
      showToastError(state.lang === 'es'
        ? 'La librería PDF no está disponible. Verifica tu conexión a internet.'
        : 'PDF library not available. Check your internet connection.');
      return;
    }
  }
  const { jsPDF } = window.jspdf;
  const data = collectFormData();
  const doc  = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageW  = doc.internal.pageSize.getWidth();
  const margin = 18;
  const maxW   = pageW - margin * 2;
  let y = margin;

  // Logo
  if (state.logoDataUrl) {
    try {
      const imgProps = doc.getImageProperties(state.logoDataUrl);
      const logoH = 18;
      const logoW = Math.min((imgProps.width / imgProps.height) * logoH, 70);
      doc.addImage(state.logoDataUrl, imgProps.fileType || 'JPEG', margin, y, logoW, logoH);
      y += logoH + 6;
    } catch (_) { /* skip if image format unsupported */ }
  }

  // Company name as title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(30, 30, 30);
  if (data.company) {
    doc.text(data.company, margin, y);
    y += 8;
  }

  // Divider
  doc.setDrawColor(180, 160, 80);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 7;

  // Body text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(40, 40, 40);
  const lines = doc.splitTextToSize(state.currentProposal, maxW);
  for (const line of lines) {
    if (y > 278) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 5;
  }

  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(7.5);
  doc.setTextColor(160, 160, 160);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Propuestas.pro by MolvicStudios · ${i} / ${pageCount}`, pageW / 2, 291, { align: 'center' });
  }

  const filename = `propuesta-${(data.company || 'comercial').replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.pdf`;
  doc.save(filename);
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
async function applyVariantChip(variant) {
  if (!state.currentProposal) return;
  const T = translations[state.lang];
  const propLang = document.querySelector('.lang-btn.active')?.dataset.lang || state.lang;

  if (state.mode === 'online') {
    // Re-call Groq with variant modifier
    const data = collectFormData();
    const apiKey = sessionStorage.getItem(KEYS.apiKey);
    if (!apiKey) {
      showToastError(T.errors.apiKeyMissing);
      return;
    }
    showSkeleton(T.result.generatingTitle, T.result.generatingDesc);
    try {
      const variantInstruction = getVariantInstruction(variant, propLang);
      const modifiedUserPrompt = buildUserPrompt(data, propLang) + `\n\nPOR FAVOR APLICA ESTA VARIANTE A LA PROPUESTA: ${variantInstruction}`;

      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: state.groqModel,
          messages: [
            { role: 'system', content: buildSystemPrompt(data.sector, propLang) },
            { role: 'user',   content: modifiedUserPrompt },
          ],
          temperature: 0.72,
          max_tokens:  2048,
        }),
      });

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const json = await resp.json();
      const newContent = json?.choices?.[0]?.message?.content || '';
      state.currentProposal = newContent;
      hideSkeleton();
      showProposal(newContent, true);
    } catch (err) {
      hideSkeleton();
      showToastError(T.errors.groqError);
    }
  } else {
    // Offline mode: append variant block
    const modified = applyVariant(state.currentProposal, variant, propLang);
    state.currentProposal = modified;
    showProposal(modified, false);
  }
}

function getVariantInstruction(variant, lang) {
  const isES = lang === 'es';
  const map = {
    formal:     isES ? 'Hazla MÁS FORMAL: usa usted, tercera persona, lenguaje ejecutivo, elimina coloquialismos.' : 'Make it MORE FORMAL: use formal titles, third person, executive language.',
    persuasive: isES ? 'Hazla MÁS PERSUASIVA: añade urgencia, prueba social, escasez, beneficios emocionales y un CTA más fuerte.' : 'Make it MORE PERSUASIVE: add urgency, social proof, scarcity, emotional benefits, and a stronger CTA.',
    shorter:    isES ? 'Hazla MÁS CORTA: elimina secciones redundantes, usa bullet points, máximo 400 palabras.' : 'Make it SHORTER: remove redundant sections, use bullet points, maximum 400 words.',
    guarantee:  isES ? 'AÑADE UNA SECCIÓN DE GARANTÍA robusta con: garantía de calidad, garantía de plazo, política de satisfacción y NDA.' : 'ADD A ROBUST GUARANTEE SECTION with: quality guarantee, timeline guarantee, satisfaction policy and NDA.',
  };
  return map[variant] || variant;
}

// ─────────────────────────────────────────────────────────────────────────────
// NEW PROPOSAL / RESET
// ─────────────────────────────────────────────────────────────────────────────
function newProposal() {
  state.currentProposal = null;
  state.isFavorite = false;
  hideResultSection();
  goToStep(1);
  updateFavoriteBtn();
}

// ─────────────────────────────────────────────────────────────────────────────
// LANGUAGE TOGGLE
// ─────────────────────────────────────────────────────────────────────────────
function toggleLanguage() {
  state.lang = state.lang === 'es' ? 'en' : 'es';
  localStorage.setItem(KEYS.lang, state.lang);
  renderUI(state.lang);
  renderHistoryPanel();
  renderFavoritesPanel();
  updateCookieBannerText();
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAR COUNTERS
// ─────────────────────────────────────────────────────────────────────────────
function updateCounter(textareaId, counterId, maxChars) {
  const ta = $(textareaId);
  const counter = $(counterId);
  if (!ta || !counter) return;
  const len = ta.value.length;
  counter.textContent = `${len} / ${maxChars}`;
  counter.classList.toggle('near',   len > maxChars * 0.85);
  counter.classList.toggle('at-max', len >= maxChars);
  if (len > maxChars) {
    ta.value = ta.value.slice(0, maxChars);
    counter.textContent = `${maxChars} / ${maxChars}`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TOAST NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────
let draftToastTimer;
function showDraftToast(msg) {
  const T = translations[state.lang];
  const el = dom.draftToastEl;
  if (!el) return;
  el.textContent = msg || T.wizard.draftSaved;
  el.classList.add('show');
  clearTimeout(draftToastTimer);
  draftToastTimer = setTimeout(() => el.classList.remove('show'), 2500);
}

function showSavedToast(msg) {
  showDraftToast(msg);
}

let errorToastTimer;
function showToastError(msg) {
  const el = dom.errorToast;
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(errorToastTimer);
  errorToastTimer = setTimeout(() => el.classList.remove('show'), 4000);
}

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY HELPER: HTML escape
// ─────────────────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT BINDING
// ─────────────────────────────────────────────────────────────────────────────
function bindEvents() {
  // Language toggle
  dom.btnLang?.addEventListener('click', toggleLanguage);

  // Mode cards
  dom.cardOnline?.addEventListener('click', () => selectMode('online'));
  dom.cardOffline?.addEventListener('click', () => selectMode('offline'));

  // Propuesta #8: accesibilidad de teclado para mode cards
  [dom.cardOnline, dom.cardOffline].forEach(card => {
    card?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  // API key save
  dom.btnSaveKey?.addEventListener('click', () => {
    const key = dom.apiKeyInput?.value.trim();
    if (!key) return;
    if (!key.startsWith('gsk_')) {
      showToastError(translations[state.lang].errors.apiKeyInvalid);
      return;
    }
    sessionStorage.setItem(KEYS.apiKey, key);
    showDraftToast('✓ API Key guardada en sessionStorage');
  });

  // API key input — save on change
  dom.apiKeyInput?.addEventListener('change', () => {
    const key = dom.apiKeyInput.value.trim();
    if (key && key.startsWith('gsk_')) {
      sessionStorage.setItem(KEYS.apiKey, key);
    }
  });

  // Model select
  dom.modelSelect?.addEventListener('change', () => {
    state.groqModel = dom.modelSelect.value;
  });

  // Groq FAQ toggle
  dom.groqFaqToggle?.addEventListener('click', () => {
    dom.groqFaq?.classList.toggle('open');
  });

  // Wizard prev / next
  dom.btnPrev?.addEventListener('click', () => {
    if (state.currentStep > 1) goToStep(state.currentStep - 1);
  });

  dom.btnNext?.addEventListener('click', () => {
    if (validateStep(state.currentStep)) {
      goToStep(state.currentStep + 1);
    }
  });

  dom.btnGenerate?.addEventListener('click', () => {
    if (validateStep(state.currentStep)) generateProposal();
  });

  // Form field changes → autosave draft + live preview
  const allFields = [
    dom.companyInput, dom.sectorSelect, dom.descTextarea, dom.websiteInput,
    dom.clientNameInput, dom.clientRoleInput, dom.clientNeedTA,
    dom.docTypeSelect, dom.serviceTA, dom.priceInput, dom.currencySelect,
    dom.deliveryInput, dom.differTA, dom.guaranteeInput,
  ].filter(Boolean);

  allFields.forEach(el => {
    el.addEventListener('input', () => { saveDraft(); triggerLivePreview(); });
    el.addEventListener('change', () => { saveDraft(); triggerLivePreview(); });
  });

  // Char counters
  dom.descTextarea?.addEventListener('input', () => updateCounter('desc-textarea', 'desc-counter', 300));
  dom.clientNeedTA?.addEventListener('input', () => updateCounter('client-need-textarea', 'client-need-counter', 500));

  // Tone buttons
  dom.toneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.toneBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      saveDraft();
      triggerLivePreview();
    });
  });

  // Language buttons (proposal lang)
  dom.langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      dom.langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      saveDraft();
      triggerLivePreview();
    });
  });

  // Section checkboxes
  dom.sectionChecks.forEach(cb => {
    cb.addEventListener('change', () => { saveDraft(); triggerLivePreview(); });
  });

  // Result actions
  dom.btnCopy?.addEventListener('click', copyToClipboard);
  dom.btnDownload?.addEventListener('click', downloadTxt);
  dom.btnDownloadDocx?.addEventListener('click', downloadDocx);
  dom.btnDownloadPdf?.addEventListener('click', downloadPdf);
  dom.btnRegenerate?.addEventListener('click', generateProposal);
  dom.btnNew?.addEventListener('click', newProposal);
  dom.btnFavorite?.addEventListener('click', toggleFavorite);
  dom.btnShare?.addEventListener('click', shareProposal);

  // Variant chips
  dom.variantChips.forEach(chip => {
    chip.addEventListener('click', () => applyVariantChip(chip.dataset.variant));
  });

  // History / Favorites panel open
  dom.btnHistory?.addEventListener('click', () => openPanel('history'));
  dom.btnFavorites?.addEventListener('click', () => openPanel('favorites'));

  // Panel close
  dom.btnCloseHistory?.addEventListener('click', closeAllPanels);
  dom.btnCloseFavorites?.addEventListener('click', closeAllPanels);

  // Overlay close
  dom.overlay?.addEventListener('click', closeAllPanels);

  // Clear history
  dom.btnClearHistory?.addEventListener('click', () => {
    localStorage.removeItem(KEYS.history);
    renderHistoryPanel();
  });

  // Clear favorites
  dom.btnClearFavorites?.addEventListener('click', () => {
    localStorage.removeItem(KEYS.favorites);
    renderFavoritesPanel();
    if (state.isFavorite) {
      state.isFavorite = false;
      updateFavoriteBtn();
    }
  });

  // History & Favorites item actions (event delegation)
  dom.historyList?.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const history = getHistory();
    const entry = history.find(h => h.id === id);
    if (!entry) return;

    if (btn.dataset.action === 'use') {
      state.currentProposal = entry.content;
      state.isFavorite = false;
      closeAllPanels();
      showResultSection();
      hideSkeleton();
      showProposal(entry.content, false);
      updateFavoriteBtn();
    } else if (btn.dataset.action === 'delete') {
      saveHistory(history.filter(h => h.id !== id));
      renderHistoryPanel();
    }
  });

  dom.favoritesList?.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    const favs = getFavorites();
    const entry = favs.find(f => f.id === id);
    if (!entry) return;

    if (btn.dataset.action === 'fav-use') {
      state.currentProposal = entry.content;
      state.isFavorite = true;
      closeAllPanels();
      showResultSection();
      hideSkeleton();
      showProposal(entry.content, false);
      updateFavoriteBtn();
    } else if (btn.dataset.action === 'fav-remove') {
      saveFavorites(favs.filter(f => f.id !== id));
      renderFavoritesPanel();
      if (state.currentProposal === entry.content) {
        state.isFavorite = false;
        updateFavoriteBtn();
      }
    }
  });

  // Logo upload
  dom.btnLogoUpload?.addEventListener('click', () => dom.logoInput?.click());
  dom.logoInput?.addEventListener('change', e => handleLogoUpload(e.target.files?.[0]));
  dom.btnLogoRemove?.addEventListener('click', clearLogo);

  // Keyboard: Escape closes panels
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAllPanels();
  });

  // Initialize step 1 active
  goToStep(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// COOKIE CONSENT BANNER
// ─────────────────────────────────────────────────────────────────────────────
function initCookieBanner() {
  if (localStorage.getItem('cookies_accepted')) return;
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  banner.classList.add('visible');
  updateCookieBannerText();
  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('cookies_accepted', 'true');
    banner.classList.remove('visible');
  });
}

function updateCookieBannerText() {
  const banner = document.getElementById('cookie-banner');
  if (!banner || !banner.classList.contains('visible')) return;
  const isES = state.lang === 'es';
  document.getElementById('cookie-text').textContent = isES
    ? 'Utilizamos cookies propias y de terceros (Google AdSense) para mostrar publicidad personalizada. Al continuar navegando, aceptas su uso.'
    : 'We use our own and third-party cookies (Google AdSense) to display personalized advertising. By continuing to browse, you accept their use.';
  document.getElementById('cookie-accept').textContent = isES ? 'Aceptar' : 'Accept';
  document.getElementById('cookie-info').textContent   = isES ? 'Más información' : 'More info';
}
