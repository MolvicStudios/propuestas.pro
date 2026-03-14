# Propuestas.pro

**Generador de Propuestas Comerciales con IA · by MolvicStudios**

Crea propuestas comerciales, cotizaciones y one-pagers profesionales en minutos.  
8 plantillas por sector, bilingüe ES/EN, con Groq AI o modo offline. 100% gratis, sin registro.

---

## ✦ Características

- **8 sectores**: Desarrollo Web, Marketing Digital, Consultoría, Diseño, E-commerce, Educación, Servicios Profesionales, Personalizado
- **Modo Online** — Propuestas únicas con Groq AI (Llama 3.3 70B · 8B) vía API key gratuita
- **Modo Offline** — Plantillas ricas por sector, sin conexión, sin API key
- **4 tipos de documento**: Propuesta completa, Cotización rápida, One-pager, Email de seguimiento
- **Bilingüe** — Interfaz y propuestas en Español e Inglés
- **Vista previa en tiempo real** mientras el usuario escribe
- **Historial** de las últimas 10 propuestas (localStorage)
- **Favoritos** con estrella para guardar las mejores
- **Variantes rápidas**: Más formal, Más persuasivo, Más corto, Añadir garantía
- **Autosave de borrador** (localStorage + sessionStorage seguro para la API key)
- **Exportar**: Copiar al portapapeles o descargar `.txt`
- **100% estático** — Sin backend, sin cookies de tracking, sin Node.js, sin npm

---

## 📁 Estructura de archivos

```
Propuestas/
├── index.html           # Estructura HTML completa con SEO
├── css/
│   └── styles.css       # Sistema de diseño Dark Editorial + Amber
├── js/
│   ├── app.js           # Lógica principal de la aplicación (ES Modules)
│   ├── templates.js     # 8 plantillas de sector + prompts para Groq
│   └── translations.js  # Textos UI en Español e Inglés
└── README.md
```

---

## 🚀 Uso local

Requiere un servidor HTTP (los ES Modules no funcionan directamente con `file://`).

```bash
# Python 3
cd /ruta/a/Propuestas
python3 -m http.server 8080
# → http://localhost:8080

# Node.js (si tienes npx)
npx serve .
```

---

## 🔑 Configuración de la API Key de Groq (Modo Online)

1. Ve a [console.groq.com/keys](https://console.groq.com/keys) y crea una cuenta gratuita
2. Haz clic en **"Create API Key"**
3. Copia la key (comienza con `gsk_`)
4. Pégala en el campo **Configuración de Groq AI** dentro de la app
5. Haz clic en **Guardar key**

> **Seguridad**: la key se almacena en `sessionStorage` — solo en tu navegador, nunca se envía a servidores externos.

---

## 🌐 Deploy en Cloudflare Pages

```bash
# 1. Conectar repositorio GitHub a Cloudflare Pages
# 2. Build command: (vacío — es 100% estático)
# 3. Output directory: /  (o la raíz del repositorio)
# 4. Deploy automático en cada push a main
```

También funciona en Vercel, Netlify, GitHub Pages o cualquier CDN estático.

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| HTML | HTML5 semántico con Schema.org JSON-LD |
| CSS | CSS puro con variables custom (sin frameworks) |
| JS | Vanilla JavaScript ES Modules (sin npm, sin build) |
| Fuentes | Google Fonts: Syne · DM Sans · JetBrains Mono |
| IA | Groq API — `llama-3.3-70b-versatile` / `llama-3.1-8b-instant` |
| Persistencia | localStorage (historial, favoritos, borrador) · sessionStorage (API key) |
| Deploy | Cloudflare Pages (también compatible con Netlify, GitHub Pages) |

---

## 📋 Sectores disponibles

| Valor | Sector |
|-------|--------|
| `webdev` | Desarrollo Web / App |
| `marketing` | Marketing Digital |
| `consulting` | Consultoría |
| `design` | Diseño Gráfico |
| `ecommerce` | E-commerce |
| `education` | Educación / Formación |
| `services` | Servicios Profesionales |
| `custom` | Personalizado |

---

## 🔗 Herramientas relacionadas (MolvicStudios)

- [Prospectly](https://prospectly.pro) — Generador de mensajes de prospección comercial
- [PromptGenius.pro](https://promptgenius.pro) — Generador de prompts para IA
- [iafacil.help](https://iafacil.help) — Aprende IA sin tecnicismos

---

## 📄 Licencia

© 2026 MolvicStudios. Todos los derechos reservados.  
Uso personal y comercial permitido. Redistribución del código fuente requiere atribución.
